<?php


// ✅ CORS
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

header("Content-Type: application/json");

session_start();
include("../config/db.php");

// ✅ Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ✅ Check session
if (!isset($_SESSION['user_id'])) {
    echo json_encode([
        "status" => "error",
        "message" => "User not logged in"
    ]);
    exit;
}

$user_id = $_SESSION['user_id'];


// ================= GET PROFILE =================
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $sql = "SELECT full_name, email, phone, role, created_at AS join_date 
            FROM users WHERE user_id = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();

    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    echo json_encode([
        "status" => "success",
        "user" => $user
    ]);
}


// ================= UPDATE PROFILE =================
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $data = json_decode(file_get_contents("php://input"), true);

    $full_name = $data['full_name'] ?? '';
    $email = $data['email'] ?? '';
    $phone = $data['phone'] ?? '';

    // ✅ Validation
    if (empty($full_name) || empty($email) || empty($phone)) {
        echo json_encode([
            "status" => "error",
            "message" => "All fields are required"
        ]);
        exit;
    }

    $sql = "UPDATE users 
            SET full_name = ?, email = ?, phone = ? 
            WHERE user_id = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssi", $full_name, $email, $phone, $user_id);

    if ($stmt->execute()) {
        echo json_encode([
            "status" => "success",
            "message" => "Profile updated successfully"
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Update failed"
        ]);
    }
}

$conn->close();
?>