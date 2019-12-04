<?php
namespace PCFUTBOL;
ini_set('error_reporting', E_ALL ^ E_NOTICE ^ E_WARNING);
ini_set('display_errors', 'on');

use Imagick;
use PDO;
use PDOException;
use pracMANDUCA2\oConexionPDO as ConexionManduca;


class Consulta
{

    private $conexionUsuario;
    private $insertPlayers;

    public function __construct()
    {
        $this->conexionUsuario=new ConexionManduca();
        $this->insertPlayers=$this->conexionUsuario->prepare("");


    }

    function traeUsuarios()
    {
        $this->stmtConsultaUsuarios->setFetchMode(PDO::FETCH_ASSOC);
        $this->stmtConsultaUsuarios->execute();
        $resultado=$this->stmtConsultaUsuarios->fetchAll();
        return $resultado;

    }

    function traeProductos()
    {
        $this->stmtConsultaProductos->setFetchMode(PDO::FETCH_ASSOC);
        $this->stmtConsultaProductos->execute();
        //$resultado=$this->stmtConsultaProductos->fetchAll();
        while ($fila = $this->stmtConsultaProductos->fetch()) {
            $resultado []= ["id"=>$fila["ID"],"value"=>$fila["NOMBRE"],"nombre"=>$fila["NOMBRE"],"cantidad"=>1,"precio"=>$fila["PRECIO"],"foto"=>'<img class="foto-small" src="data:image/jpg;base64,' . base64_encode($fila["FOTO"] ). '" alt="" />'];
        }
        return $resultado;

    }

   function generaNuevoProducto($idPedido){
       $this->stmtGeneraNuevoProducto->bindParam(1,$idPedido);
       $this->stmtGeneraNuevoProducto->execute();
       return $this->conexionUsuario->lastInsertId();

   }
   function generaNuevoPedido($nick){
       $this->stmtGeneraNuevoPedido->bindParam(1,$nick);
       $this->stmtGeneraNuevoPedido->execute();
       return $this->conexionUsuario->lastInsertId();

   }
   function actualizaProducto($datosProducto){
       $this->stmtActualizaProducto->bindParam(1,$datosProducto["cantidad"]);
       $this->stmtActualizaProducto->bindParam(2,$datosProducto["id"]);
       $this->stmtActualizaProducto->bindParam(3,$datosProducto["precio"]);
       $this->stmtActualizaProducto->bindParam(4,$datosProducto["idProducto"]);
       $this->stmtActualizaProducto->execute();
   }

    function actualizaCantidadProducto($datosProducto){
        try{
            $this->stmtActualizaCantidadProducto->bindParam(1,$datosProducto["cantidad"]);
            $this->stmtActualizaCantidadProducto->bindParam(2,$datosProducto["id"]);
            $this->stmtActualizaCantidadProducto->execute();

            $this->stmtPrecioPorCantidad->bindParam(1,$datosProducto["id"]);
            $this->stmtPrecioPorCantidad->execute();
            return $this->stmtPrecioPorCantidad->fetch()["SUMA"];

        }catch(PDOException $e){
            echo $e->getMessage();
        }
    }

    function borraProducto($datosProducto){
        try{

            $this->stmtBorraProducto->bindParam(1,$datosProducto["id"]);
            $this->stmtBorraProducto->execute();

        }catch(PDOException $e){
            echo $e->getMessage();
        }
    }

    function actualizaCarrito($idPedido){
        try{

            $this->stmtActualizaCarrito->bindParam(1,$idPedido);
            $this->stmtActualizaCarrito->execute();
            $total=$this->stmtActualizaCarrito->fetchAll();
            $precioTotal=0;
            foreach ($total as $producto){
                $precioTotal+=$producto["IMPORTE"]*$producto["CANTIDAD"];

            }
            return $precioTotal;

        }catch(PDOException $e){
            echo $e->getMessage();
        }
    }



    function cambiarTamañoFoto($foto1)
    {
        $foto = new Imagick($foto1);
        $foto->resizeImage(128, 128, Imagick::FILTER_LANCZOS, 1, 1);
        return '<img src="data:image/jpg;base64,' . base64_encode($foto->getImageBlob()) . '" alt="" />';

    }
}