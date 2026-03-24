<?php
header("Access-Control-Allow-Origin: *");

include("../config/db.php");

$fullName = $_POST['fullName'];
$email = $_POST['email'];
$password = $_POST['password'];
$role = $_POST['role'];
$phone = $_POST['phone'];

// check if email exists
$check = "SELECT * FROM users WHERE email='$email'";
$result = $conn->query($check);

if ($result->num_rows > 0) {
    echo "Email already exists";
} else {

    $sql = "INSERT INTO users (full_name, email, password, role, phone)
            VALUES ('$fullName', '$email', '$password', '$role', '$phone')";

    if ($conn->query($sql)) {
        echo "Registration Successful";
    } else {
        echo "Error";
    }
}

$conn->close();
?>