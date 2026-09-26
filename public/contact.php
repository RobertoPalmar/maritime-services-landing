<?php
/**
 * Endpoint de contacto — envía el RFQ por Resend.
 *
 * Vive junto al sitio estático, así que el formulario lo llama en el mismo
 * origen y no hace falta CORS.
 *
 * La API key se lee de resend-config.php, que debe quedar UN NIVEL ARRIBA de
 * public_html para que el servidor web no pueda servirlo nunca.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

function fail(string $code, int $status): never {
    http_response_code($status);
    echo json_encode(['error' => $code]);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    fail('method_not_allowed', 405);
}

$configPath = __DIR__ . '/../resend-config.php';
if (!is_readable($configPath)) {
    error_log('contact.php: falta resend-config.php');
    fail('server_misconfigured', 500);
}
$config = require $configPath;

foreach (['api_key', 'to', 'from'] as $key) {
    if (empty($config[$key])) {
        error_log("contact.php: falta '$key' en resend-config.php");
        fail('server_misconfigured', 500);
    }
}

// Honeypot: los bots llenan todo campo que encuentran, los humanos no lo ven.
if (trim((string)($_POST['_gotcha'] ?? '')) !== '') {
    echo json_encode(['ok' => true]);
    exit;
}

$field = static fn(string $k): string => trim((string)($_POST[$k] ?? ''));

$name    = $field('name');
$email   = $field('email');
$message = $field('message');

if ($name === '' || $email === '' || $message === '') {
    fail('missing_fields', 400);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fail('invalid_email', 400);
}

const MAX_FILE_BYTES  = 5 * 1024 * 1024;
const MAX_TOTAL_BYTES = 15 * 1024 * 1024;
const MAX_FILES       = 3;

$allowedMime = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

$attachments = [];
$totalBytes  = 0;
$uploads     = $_FILES['rfqDocuments'] ?? null;

if (is_array($uploads) && isset($uploads['name'])) {
    // Un input multiple llega como arrays paralelos; uno simple llega plano.
    $names = (array)$uploads['name'];
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
            error_log("contact.php: upload error $error");
            fail('upload_failed', 400);
        }

        if (count($attachments) >= MAX_FILES) {
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
        if ($size > MAX_FILE_BYTES) {
            fail('file_too_large', 413);
        }
        $totalBytes += $size;
        if ($totalBytes > MAX_TOTAL_BYTES) {
            fail('file_too_large', 413);
        }

        // El tipo lo decide el contenido real, no la cabecera que mandó el navegador.
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $mime  = $finfo->file($tmp);
        if (!in_array($mime, $allowedMime, true)) {
            fail('file_type_not_allowed', 415);
        }

        $contents = file_get_contents($tmp);
        if ($contents === false) {
            fail('upload_failed', 400);
        }

        // Nos quedamos solo con el nombre base, sin rutas.
        $safeName = basename(str_replace('\', '/', $orig));
        $safeName = preg_replace('/[^A-Za-z0-9._ -]/', '_', $safeName) ?: 'adjunto';

        $attachments[] = [
            'filename' => mb_substr($safeName, 0, 120),
            'content'  => base64_encode($contents),
        ];
    }
}

$labels = [
    'name'       => 'Nombre',
    'company'    => 'Empresa',
    'email'      => 'Correo',
    'phone'      => 'Teléfono',
    'vesselName' => 'Buque',
    'imo'        => 'IMO',
    'portOfCall' => 'Puerto de escala',
    'eta'        => 'ETA',
    'service'    => 'Servicio de interés',
    'message'    => 'Mensaje',
];

$rows = '';
foreach ($labels as $key => $label) {
    $value = $field($key);
    if ($value === '') {
        continue;
    }
    $safe = nl2br(htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'));
    $rows .= '<tr>'
        . '<td style="padding:6px 12px 6px 0;vertical-align:top;color:#64748b;white-space:nowrap">' . $label . '</td>'
        . '<td style="padding:6px 0;vertical-align:top;color:#0f172a">' . $safe . '</td>'
        . '</tr>';
}

$note = $attachments
    ? '<p style="margin:16px 0 0;color:#64748b;font-size:13px">' . count($attachments) . ' archivo(s) adjunto(s).</p>'
    : '';

$company = $field('company');
$subject = 'Nueva solicitud web — ' . $name . ($company !== '' ? " ($company)" : '');

$payload = [
    'from'     => $config['from'],
    'to'       => [$config['to']],
    'reply_to' => $email,
    'subject'  => $subject,
    'html'     => '<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:14px;line-height:1.5">'
        . '<h2 style="margin:0 0 16px;font-size:18px;color:#0f172a">Nueva solicitud desde el sitio web</h2>'
        . '<table style="border-collapse:collapse">' . $rows . '</table>' . $note . '</div>',
];

if ($attachments) {
    $payload['attachments'] = $attachments;
}

$ch = curl_init('https://api.resend.com/emails');
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 30,
    CURLOPT_HTTPHEADER     => [
        'Authorization: Bearer ' . $config['api_key'],
        'Content-Type: application/json',
    ],
    CURLOPT_POSTFIELDS     => json_encode($payload, JSON_UNESCAPED_UNICODE),
]);

$response = curl_exec($ch);
$status   = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
$curlErr  = curl_error($ch);
curl_close($ch);

if ($response === false) {
    error_log('contact.php: curl falló — ' . $curlErr);
    fail('send_failed', 502);
}
if ($status < 200 || $status >= 300) {
    error_log('contact.php: Resend respondió ' . $status . ' — ' . $response);
    fail('send_failed', 502);
}

echo json_encode(['ok' => true]);
