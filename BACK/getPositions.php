<?php
namespace PCFUTBOL;
require __DIR__ . "/vendor/autoload.php";
use PCFUTBOL\Consulta as ConsultaPCFutbol;
use PDO;
use PDOException;
use PCFUTBOL\oConexionPDO as Conexion;
error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);
set_time_limit(10);

$conexion=new Conexion();
$stmt=$conexion->prepare("SELECT * FROM POSITION ");
$stmt->execute();
echo json_encode($stmt->fetchAll());