<?php
namespace PCFUTBOL;
require __DIR__ . "/vendor/autoload.php";
use PCFUTBOL\Consulta as ConsultaPCFutbol;
use PDO;
use PDOException;
use PCFUTBOL\oConexionPDO as Conexion;
error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);
set_time_limit(10);

$player=json_decode(file_get_contents('php://input'));

$conexion=new Conexion();
$stmt=$conexion->prepare("DELETE FROM PLAYERS WHERE ID=?; ");
$stmt->bindParam(1,$player->ID);


if($stmt->execute()){
    echo "Jugador borrado!!";
}else{
    echo $conexion->errorInfo();
}