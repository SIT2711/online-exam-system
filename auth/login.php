<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0); // handle preflight
}
error_reporting(E_ALL);
ini_set('display_errors', 1);

include("../config/db.php");

// Get POST data
$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'] ?? '';
$password = $data['password'] ?? '';
$role = $data['role'] ?? '';

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
        echo json_encode([
        "status" => "success",
        "user" => $user
]);
        // Here you can start a session if needed:
        // session_start();
        // $_SESSION['user_id'] = $user['user_id'];
    } else {
        echo json_encode([
        "status" => "error",
        "message" => "Invalid email, password, or role."
]);
    }
} else {
    echo json_encode([
    "status" => "error",
    "message" => "All fields are required."
]);
}

$stmt->close();
$conn->close();

?>