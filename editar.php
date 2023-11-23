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
        $id = $_POST['id'];

        $marca = $_POST['marca'];
        $modelo = $_POST['modelo'];
        $descripcion = $_POST['descripcion'];
        $tipo = $_POST['tipo'];
        $año = $_POST['año'];

        $sql = "UPDATE vehiculos SET marca = '$marca', modelo = '$modelo', descripcion = '$descripcion', tipo = '$tipo', año = '$año' WHERE id = $id";
        $result = mysqli_query($con, $sql);

        if ($result) {
            echo "Vehiculo actualizado correctamente";
            mysqli_close($con);
        } else {
            echo "Error al actualizar el Vehiculo: " . mysqli_error($con);
        }

    } else {
        echo "Error al conectar a la base de datos: " . mysqli_connect_error();
    }
?>