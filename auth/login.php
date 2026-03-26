<?php
// Enable CORS
header("Access-Control-Allow-Origin: *"); // allow all origins
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // allowed methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // allow headers
header("Content-Type: application/json");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$conn = new mysqli("localhost", "root", "", "online_exam_system");

if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "DB connection failed"]);
    exit();
}

// Read JSON input
$input = json_decode(file_get_contents('php://input'), true);

$email = $input['email'] ?? '';
$password = $input['password'] ?? '';

if (empty($email) || empty($password)) {
    echo json_encode(["status" => "error", "message" => "All fields required"]);
    exit();
}

$sql = "SELECT * FROM users WHERE email='$email' AND password='$password'";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    $user = $result->fetch_assoc();

    echo json_encode([
        "status" => "success",
        "user" => [
            "id" => $user['user_id'],
            "name" => $user['full_name'],
            "role" => $user['role']
        ]
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid email or password"
    ]);
}
?>