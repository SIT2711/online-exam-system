<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

include("../config/db.php");


$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'] ?? '';
$password = $data['password'] ?? '';
$role = $data['role'] ?? '';

if (empty($email) || empty($password) || empty($role)) {
    echo json_encode([
        "status" => "error",
        "message" => "All fields are required."
    ]);
    exit();
}


$stmt = $conn->prepare("SELECT * FROM users WHERE email=?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode([
        "status" => "error",
        "message" => "Email not found."
    ]);
    exit();
}

$user = $result->fetch_assoc();


if ($user['role'] !== $role) {
    echo json_encode([
        "status" => "error",
        "message" => "Incorrect role selected."
    ]);
    exit();
}


if ($user['password'] !== $password) {
    echo json_encode([
        "status" => "error",
        "message" => "Incorrect password."
    ]);
    exit();
}


echo json_encode([
    "status" => "success",
    "user" => $user
]);

$stmt->close();
$conn->close();
?>