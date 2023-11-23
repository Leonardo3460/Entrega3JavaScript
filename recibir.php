<?php
    error_reporting(E_ALL);
    ini_set('display_errors', -1);

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type");
        exit;
    }

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "actividad3";

    $con = mysqli_connect($servername, $username, $password, $dbname);
    $dato = $_POST;

    if ($con) {
        $result = mysqli_query($con, "SELECT * FROM vehiculos");
        if ($result) {
            $datos = array();
            while ($dato = mysqli_fetch_assoc($result)) {
                $datos[] = $dato;
            }
            header("Content-Type: application/json");
            echo json_encode($datos);
        } else {
            echo "Error al ejecutar la consulta: " . mysqli_error($con);
        }

    } else {
        echo "Error al conectar a la base de datos: " . mysqli_connect_error();
    }
?>