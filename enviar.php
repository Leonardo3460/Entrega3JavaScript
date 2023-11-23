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

    $imagen = $_FILES["imagen"];
    $nombrei = $imagen["name"];
    $extension = pathinfo($nombrei, PATHINFO_EXTENSION);
    $nombre_unico = uniqid() . "." . $extension;
    $ruta = "img/" . $nombre_unico;
    if (move_uploaded_file($imagen["tmp_name"], $ruta)) {
        echo json_encode(["success" => true, "nombre" => $nombre_unico, "ruta" => $ruta]); }
    else {
        echo json_encode(["success" => false, "error" => "No se pudo subir la imagen"]);
    }

    if ($con) {
        $query = "INSERT INTO vehiculos (marca, modelo, descripcion, tipo, año, imagen) 
        VALUES ('{$dato['marca']}', '{$dato['modelo']}', '{$dato['descripcion']}', '{$dato['tipo']}', '{$dato['año']}', '{$ruta}')";
        $result = mysqli_query($con, $query);

        if ($result) {
            echo "Vehiculo insertado correctamente";
            mysqli_close($con);
        } else {
            echo "Error al insertar el Vehiculo: " . mysqli_error($con);
        }

    } else {
        echo "Error al conectar a la base de datos: " . mysqli_connect_error();
    }
?>