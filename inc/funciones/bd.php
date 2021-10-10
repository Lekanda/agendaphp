<?php

// Credenciales de la DB.
define('DB_USUARIO', 'root');
define('DB_PASSWORD', 'root');
define('DB_HOST', 'localhost');
define('DB_NOMBRE', 'agendaphp');
define('DB_PORT', 3306);


$conn = new mysqli(DB_HOST,DB_USUARIO,DB_PASSWORD,DB_NOMBRE);

// ping da 1 si la conexion a la db es ok. Nada si nok
// echo $conn->ping();
