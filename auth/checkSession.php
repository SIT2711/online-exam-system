<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");

if(isset($_SESSION['email'])){
    echo "Session working: " . $_SESSION['email'] . " | Role: " . $_SESSION['role'];
} else {
    echo "No session found";
}
?>