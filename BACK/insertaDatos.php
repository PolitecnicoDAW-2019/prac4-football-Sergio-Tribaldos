<?php
namespace PCFUTBOL;
require __DIR__ . "/vendor/autoload.php";
use PCFUTBOL\Consulta as ConsultaPCFutbol;
use PDO;
use PDOException;
use PCFUTBOL\oConexionPDO as Conexion;
error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);
set_time_limit(10);

$players=json_decode(file_get_contents("players.json"));


$conexion=new Conexion();
$stmt=$conexion->prepare("INSERT INTO PLAYERS (ALIAS,NAME,BIRTH_DATE,POSITION,IMAGE) VALUES (?,?,?,?,?)");

foreach ($players as $player){
    $stmt->execute([$player->alias,$player->name,$player->birth_date,$player->position,$player->image]);
}