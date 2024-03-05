<?php

namespace App\Helpers;

class Hash
{
    public static function make($password){
        return password_hash($password, PASSWORD_DEFAULT);
    }

    public static function verify($password, $password_bdd){
        return password_verify($password, $password_bdd);
    }
}
?>