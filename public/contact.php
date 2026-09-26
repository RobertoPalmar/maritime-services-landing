<?php
/**
 * Endpoint de contacto — envía el RFQ por Resend.
 *
 * Vive junto al sitio estático, así que el formulario lo llama en el mismo
 * origen y no hace falta CORS.
 *
 * Las credenciales se leen de resend-config.php, que debe quedar UN NIVEL
 * ARRIBA de public_html para que el servidor web no pueda servirlo nunca.
 *
 * Compatible con PHP 7.4+. Sin tipos de retorno `never` ni sintaxis de 8.x:
 * en hosting compartido la versión activa no siempre es la que uno cree.
 */

// Los errores se registran, nunca se imprimen: un warning impreso rompe el JSON.
ini_set('display_errors', '0');
error_reporting(E_ALL);

header('Content-Type: application/json; charset=utf-8');

/**
 * Sin este handler un fatal deja la respuesta vacía y el cliente solo ve un
 * 500 sin explicación. Así siempre sale JSON y el motivo queda en el log.
 */
register_shutdown_function(function () {
    $err = error_get_last();
    $fatales = array(E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR);
    if ($err !== null && in_array($err['type'], $fatales, true)) {
        if (!headers_sent()) {
            http_response_code(500);
            header('Content-Type: application/json; charset=utf-8');
        }
        error_log('contact.php fatal: ' . $err['message'] . ' en ' . $err['file'] . ':' . $err['line']);
        echo json_encode(array('error' => 'php_fatal'));
    }
});

function respond($payload, $status = 200) {
    http_response_code($status);
    echo json_encode($payload);
    exit;
}

function fail($code, $status) {
    respond(array('error' => $code), $status);
}

function field($k) {
    return isset($_POST[$k]) ? trim((string)$_POST[$k]) : '';
}

if (!isset($_SERVER['REQUEST_METHOD']) || $_SERVER['REQUEST_METHOD'] !== 'POST') {
    fail('method_not_allowed', 405);
}

$configPath = __DIR__ . '/../resend-config.php';
if (!is_readable($configPath)) {
    error_log('contact.php: no encuentro ' . $configPath);
    fail('config_not_found', 500);
}

$config = require $configPath;
if (!is_array($config)) {
    error_log('contact.php: resend-config.php no devuelve un array');
    fail('config_invalid', 500);
}
foreach (array('api_key', 'to', 'from') as $k) {
    if (empty($config[$k])) {
        error_log("contact.php: falta '$k' en resend-config.php");
        fail('config_incomplete', 500);
    }
}

if (!extension_loaded('curl')) {
    error_log('contact.php: extension curl no cargada');
    fail('curl_missing', 500);
}

// Honeypot: los bots llenan todo campo que encuentran, los humanos no lo ven.
if (trim(isset($_POST['_gotcha']) ? (string)$_POST['_gotcha'] : '') !== '') {
    respond(array('ok' => true));
}

$name    = field('name');
$email   = field('email');
$message = field('message');

if ($name === '' || $email === '' || $message === '') {
    fail('missing_fields', 400);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fail('invalid_email', 400);
}

$MAX_FILE_BYTES  = 5 * 1024 * 1024;
$MAX_TOTAL_BYTES = 15 * 1024 * 1024;
$MAX_FILES       = 3;

$allowedMime = array(
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    // Algunos servidores reportan los .docx/.xlsx modernos como zip genérico.
    'application/zip',
);

$attachments = array();
$totalBytes  = 0;
$uploads     = isset($_FILES['rfqDocuments']) ? $_FILES['rfqDocuments'] : null;

if (is_array($uploads) && isset($uploads['name'])) {
    // Un input multiple llega como arrays paralelos; uno simple llega plano.
    $names = is_array($uploads['name']) ? $uploads['name'] : array($uploads['name']);
    $count = count($names);

    for ($i = 0; $i < $count; $i++) {
        $error = is_array($uploads['error']) ? $uploads['error'][$i] : $uploads['error'];

        if ($error === UPLOAD_ERR_NO_FILE) {
            continue;
        }
        if ($error === UPLOAD_ERR_INI_SIZE || $error === UPLOAD_ERR_FORM_SIZE) {
            fail('file_too_large', 413);
        }
        if ($error !== UPLOAD_ERR_OK) {
            error_log('contact.php: upload error ' . $error);
            fail('upload_failed', 400);
        }
        if (count($attachments) >= $MAX_FILES) {
            fail('too_many_files', 400);
        }

        $tmp  = is_array($uploads['tmp_name']) ? $uploads['tmp_name'][$i] : $uploads['tmp_name'];
        $orig = is_array($uploads['name']) ? $uploads['name'][$i] : $uploads['name'];

        if (!is_uploaded_file($tmp)) {
            fail('upload_failed', 400);
        }

        $size = filesize($tmp);
        if ($size === false || $size === 0) {
            continue;
        }
        if ($size > $MAX_FILE_BYTES) {
            fail('file_too_large', 413);
        }
        $totalBytes += $size;
        if ($totalBytes > $MAX_TOTAL_BYTES) {
            fail('file_too_large', 413);
        }

        // El tipo lo decide el contenido real, no la cabecera del navegador.
        // Si fileinfo no está disponible caemos a la extensión del nombre.
        $mime = null;
        if (class_exists('finfo')) {
            $finfo = new finfo(FILEINFO_MIME_TYPE);
            $mime  = $finfo->file($tmp);
        } elseif (function_exists('mime_content_type')) {
            $mime = mime_content_type($tmp);
        }

        if ($mime !== null && $mime !== false) {
            if (!in_array($mime, $allowedMime, true)) {
                error_log("contact.php: mime rechazado '$mime' para '$orig'");
                fail('file_type_not_allowed', 415);
            }
        } else {
            $ext = strtolower(pathinfo($orig, PATHINFO_EXTENSION));
            if (!in_array($ext, array('pdf', 'doc', 'docx', 'xls', 'xlsx'), true)) {
                fail('file_type_not_allowed', 415);
            }
        }

        $contents = file_get_contents($tmp);
        if ($contents === false) {
            fail('upload_failed', 400);
        }

        // Nos quedamos solo con el nombre base, sin rutas.
        $safeName = basename(str_replace(chr(92), '/', $orig));
        $safeName = preg_replace('/[^A-Za-z0-9._ -]/', '_', $safeName);
        if ($safeName === null || $safeName === '') {
            $safeName = 'adjunto';
        }

        $attachments[] = array(
            'filename' => substr($safeName, 0, 120),
            'content'  => base64_encode($contents),
        );
    }
}

$labels = array(
    'name'       => 'Nombre',
    'company'    => 'Empresa',
    'email'      => 'Correo',
    'phone'      => 'Telefono',
    'vesselName' => 'Buque',
    'imo'        => 'IMO',
    'portOfCall' => 'Puerto de escala',
    'eta'        => 'ETA',
    'service'    => 'Servicio de interes',
    'message'    => 'Mensaje',
);

$rows = '';
foreach ($labels as $key => $label) {
    $value = field($key);
    if ($value === '') {
        continue;
    }
    $safe = nl2br(htmlspecialchars($value, ENT_QUOTES, 'UTF-8'));
    $rows .= '<tr>'
        . '<td style="padding:6px 12px 6px 0;vertical-align:top;color:#64748b;white-space:nowrap">' . $label . '</td>'
        . '<td style="padding:6px 0;vertical-align:top;color:#0f172a">' . $safe . '</td>'
        . '</tr>';
}

$note = count($attachments) > 0
    ? '<p style="margin:16px 0 0;color:#64748b;font-size:13px">' . count($attachments) . ' archivo(s) adjunto(s).</p>'
    : '';

$company = field('company');
$subject = 'Nueva solicitud web - ' . $name . ($company !== '' ? ' (' . $company . ')' : '');

$payload = array(
    'from'     => $config['from'],
    'to'       => array($config['to']),
    'reply_to' => $email,
    'subject'  => $subject,
    'html'     => '<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:14px;line-height:1.5">'
        . '<h2 style="margin:0 0 16px;font-size:18px;color:#0f172a">Nueva solicitud desde el sitio web</h2>'
        . '<table style="border-collapse:collapse">' . $rows . '</table>' . $note . '</div>',
);

if (count($attachments) > 0) {
    $payload['attachments'] = $attachments;
}

$json = json_encode($payload, JSON_UNESCAPED_UNICODE);
if ($json === false) {
    error_log('contact.php: json_encode fallo - ' . json_last_error_msg());
    fail('encode_failed', 500);
}

$ch = curl_init('https://api.resend.com/emails');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Authorization: Bearer ' . $config['api_key'],
    'Content-Type: application/json',
));
curl_setopt($ch, CURLOPT_POSTFIELDS, $json);

$response = curl_exec($ch);
$status   = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
$curlErr  = curl_error($ch);
curl_close($ch);

if ($response === false) {
    error_log('contact.php: curl fallo - ' . $curlErr);
    fail('send_failed', 502);
}
if ($status < 200 || $status >= 300) {
    error_log('contact.php: Resend respondio ' . $status . ' - ' . $response);
    fail('send_failed', 502);
}

respond(array('ok' => true));
