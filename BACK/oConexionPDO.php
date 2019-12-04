<?php
namespace PCFUTBOL;
ini_set('error_reporting', E_ALL ^ E_NOTICE ^ E_WARNING);
ini_set('display_errors', 'on');
use PDO;

class oConexionPDO extends PDO
{
public function __construct()
{
    $datos = parse_ini_file(".env", TRUE);
    $dsn=$datos["driver"].":host=".$datos["host"].";dbname=".$datos["db"].";charset=utf8";
    $username=$datos["username"];
    $passwd=$datos["password"];
    parent::__construct($dsn, $username, $passwd);
    $this->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $this->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    $this->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
}

}