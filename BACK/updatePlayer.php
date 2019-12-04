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
$stmt=$conexion->prepare("UPDATE PLAYERS SET ALIAS=?,NAME=?,BIRTH_DATE=?,POSITION=?,IMAGE=? WHERE ID=?; ");
$stmt->bindParam(1,$player->ALIAS);
$stmt->bindParam(2,$player->NAME);
$stmt->bindParam(3,$player->BIRTH_DATE);
$stmt->bindParam(4,$player->POSITION);
$stmt->bindParam(5,$player->IMAGE);
$stmt->bindParam(6,$player->ID);
if($stmt->execute()){
    echo "Jugador actualizado!!";
}else{
    echo $conexion->errorInfo();
}
