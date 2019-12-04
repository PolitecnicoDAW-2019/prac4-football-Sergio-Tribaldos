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
$matricula=$_FILES["IMAGE"]["tmp_name"];
$nombreArchivo=$_REQUEST["ALIAS"].".png";

move_uploaded_file($matricula,"/var/www/html/dwes/MisPracticas/PCFUTBOL/BACK/datas/$nombreArchivo");
$direccionImagen="http://vps730338.ovh.net/dwes/MisPracticas/PCFUTBOL/BACK/datas/$nombreArchivo";

$conexion=new Conexion();
$stmt=$conexion->prepare("INSERT INTO PLAYERS (ALIAS,NAME,BIRTH_DATE,POSITION,IMAGE) VALUES (?,?,?,?,?); ");
$stmt->bindParam(1,filter_input(INPUT_POST, 'ALIAS'));
$stmt->bindParam(2,filter_input(INPUT_POST, 'NAME'));
$stmt->bindParam(3,filter_input(INPUT_POST, 'BIRTH_DATE'));
$stmt->bindParam(4,filter_input(INPUT_POST, 'POSITION'));
$stmt->bindParam(5,$direccionImagen);

if($stmt->execute()){
    echo "Jugador insertado!!";
}else{
    echo $conexion->errorInfo();
}