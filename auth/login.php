<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0); // handle preflight
}
error_reporting(E_ALL);
ini_set('display_errors', 1);

include("../config/db.php");

// Get POST data
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';
$role = $_POST['role'] ?? '';

if (empty($email) || empty($password) || empty($role)) {
    echo "All fields are required.";
    exit();
}

// Prepare SQL statement
$stmt = $conn->prepare("SELECT * FROM users WHERE email=? AND role=?");
$stmt->bind_param("ss", $email, $role);
$stmt->execute();
$result = $stmt->get_result();

if ($result && $result->num_rows > 0) {
    $user = $result->fetch_assoc();

    if ($password === $user['password']) { // plain-text check
        echo "Login successful! Welcome " . $user['full_name'];
        // Here you can start a session if needed:
        // session_start();
        // $_SESSION['user_id'] = $user['user_id'];
    } else {
        echo "Invalid email, password, or role.";
    }
} else {
    echo "Invalid email, password, or role.";
}

$stmt->close();
$conn->close();

?>