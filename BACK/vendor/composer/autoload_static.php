<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit29c58edf918daae42042829b031c93ff
{
    public static $classMap = array (
        'ComposerAutoloaderInit29c58edf918daae42042829b031c93ff' => __DIR__ . '/..' . '/composer/autoload_real.php',
        'Composer\\Autoload\\ClassLoader' => __DIR__ . '/..' . '/composer/ClassLoader.php',
        'Composer\\Autoload\\ComposerStaticInit29c58edf918daae42042829b031c93ff' => __DIR__ . '/..' . '/composer/autoload_static.php',
        'PCFUTBOL\\Consulta' => __DIR__ . '/../..' . '/Consulta.class.php',
        'PCFUTBOL\\oConexionPDO' => __DIR__ . '/../..' . '/oConexionPDO.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->classMap = ComposerStaticInit29c58edf918daae42042829b031c93ff::$classMap;

        }, null, ClassLoader::class);
    }
}
