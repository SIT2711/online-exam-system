<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include "../config/db.php";

// Handle CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get data
$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'];
$password = $data['password'];
$role = strtolower(trim($data['role'])); // ✅ get role from frontend

$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    $dbRole = strtolower(trim($user['role'])); // ✅ normalize DB role

    // ❌ ROLE MISMATCH
    if ($role !== $dbRole) {
        echo json_encode([
            "status" => "error",
            "message" => "Invalid role selected"
        ]);
        exit();
    }

    // ❌ PASSWORD WRONG
    if ($password !== $user['password']) {
        echo json_encode([
            "status" => "error",
            "message" => "Invalid password"
        ]);
        exit();
    }

    // ✅ SUCCESS
    $_SESSION['user_id'] = $user['user_id'];
    $_SESSION['role'] = $dbRole;

    echo json_encode([
        "status" => "success",
        "user" => $user
    ]);

} else {
    echo json_encode([
        "status" => "error",
        "message" => "User not found"
    ]);
}
?>