<?php
/**
 * Copiar a resend-config.php y subirlo UN NIVEL ARRIBA de public_html.
 * Fuera del document root el servidor web no lo puede servir jamás.
 */
return [
    'api_key' => 'TU_API_KEY_DE_RESEND',
    'to'      => 'info@wmaritimes.com',
    // Debe usar un dominio verificado en Resend.
    'from'    => 'W Maritimes <noreply@agenafalca.com>',
];
