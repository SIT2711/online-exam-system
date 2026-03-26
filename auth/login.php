<?php
// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Connect to database
header("Content-Type: application/json");  // ✅ semicolon added
$conn = new mysqli("localhost", "root", "", "online_exam_system");
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "DB connection failed"]);
    exit();
}

// Read JSON input
$input = json_decode(file_get_contents('php://input'), true);

$email = $input['email'] ?? '';
$password = $input['password'] ?? '';
$role = $input['role'] ?? '';

if (empty($email) || empty($password) || empty($role)) {
    echo json_encode(["status" => "error", "message" => "All fields required"]);
    exit();
}

// Prepare and execute query
$sql = "SELECT * FROM users WHERE email=? AND role=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $email, $role);
$stmt->execute();
$result = $stmt->get_result();

if ($result && $result->num_rows > 0) {
    $user = $result->fetch_assoc();

    // For plain-text password check (since your DB stores plain text)
    if ($password === $user['password']) {

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
            "message" => "Invalid email, password, or role"
        ]);
    }
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid email, password, or role"
    ]);
}

$stmt->close();
$conn->close();

?>