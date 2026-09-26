<?php
/**
 * Diagnostico temporal. BORRAR del servidor despues de usarlo.
 * Subir a public_html/ junto a contact.php y abrir en el navegador.
 */
header('Content-Type: text/plain; charset=utf-8');

echo "PHP version      : " . PHP_VERSION . (version_compare(PHP_VERSION, '8.1', '>=') ? "  OK" : "  <-- PROBLEMA: contact.php necesita 8.1+") . "\n";
echo "extension curl   : " . (extension_loaded('curl') ? "OK" : "<-- FALTA") . "\n";
echo "extension fileinfo: " . (extension_loaded('fileinfo') ? "OK" : "<-- FALTA (validacion de adjuntos)") . "\n";
echo "upload_max_filesize: " . ini_get('upload_max_filesize') . "\n";
echo "post_max_size      : " . ini_get('post_max_size') . "\n";
echo "file_uploads       : " . (ini_get('file_uploads') ? "on" : "<-- off") . "\n";
echo "\n";

echo "__DIR__          : " . __DIR__ . "\n";
$cfgPath = __DIR__ . '/../resend-config.php';
echo "busca config en  : " . $cfgPath . "\n";
echo "  existe         : " . (file_exists($cfgPath) ? "si" : "NO  <-- aqui esta el problema") . "\n";
echo "  legible        : " . (is_readable($cfgPath) ? "si" : "NO") . "\n";

if (is_readable($cfgPath)) {
    $cfg = require $cfgPath;
    echo "  es array       : " . (is_array($cfg) ? "si" : "NO  <-- falta el 'return [...]'") . "\n";
    if (is_array($cfg)) {
        foreach (['api_key', 'to', 'from'] as $k) {
            $v = $cfg[$k] ?? null;
            $shown = $k === 'api_key'
                ? ($v ? substr((string)$v, 0, 6) . '...' . substr((string)$v, -4) : '(vacio)')
                : ($v ?: '(vacio)');
            echo "  $k" . str_repeat(' ', max(1, 15 - strlen($k))) . ": " . $shown . (empty($v) ? "  <-- VACIO" : "") . "\n";
        }
    }
}

echo "\n";
echo "contact.php presente: " . (file_exists(__DIR__ . '/contact.php') ? "si" : "NO") . "\n";

// Prueba de conectividad a Resend sin enviar correo.
if (extension_loaded('curl') && is_readable($cfgPath)) {
    $cfg = require $cfgPath;
    if (!empty($cfg['api_key'])) {
        $ch = curl_init('https://api.resend.com/domains');
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT        => 15,
            CURLOPT_HTTPHEADER     => ['Authorization: Bearer ' . $cfg['api_key']],
        ]);
        $res    = curl_exec($ch);
        $status = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
        $err    = curl_error($ch);
        curl_close($ch);

        echo "\nConexion a Resend (no envia correo):\n";
        if ($res === false) {
            echo "  curl fallo   : $err  <-- el hosting puede estar bloqueando salidas HTTPS\n";
        } else {
            echo "  HTTP         : $status" . ($status === 200 ? "  OK, la key sirve" : "  <-- la key fue rechazada") . "\n";
            echo "  respuesta    : " . substr($res, 0, 300) . "\n";
        }
    }
}
