<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

header("Content-Type: application/json");

include("../config/db.php");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

// ================= UPDATE PROFILE =================
if (isset($data['action']) && $data['action'] === "update") {

    $user_id = $data['user_id'] ?? null;
    $full_name = $data['full_name'] ?? '';
    $email = $data['email'] ?? '';
    $phone = $data['phone'] ?? '';

    // 🔍 DEBUG
    if (!$user_id) {
        echo json_encode([
            "status" => "error",
            "message" => "User ID missing"
        ]);
        exit;
    }

    $sql = "UPDATE users 
            SET full_name=?, email=?, phone=? 
            WHERE user_id=?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssi", $full_name, $email, $phone, $user_id);

    if ($stmt->execute()) {

        // 🔍 check rows affected
        if ($stmt->affected_rows > 0) {
            echo json_encode([
                "status" => "success",
                "message" => "Profile updated successfully"
            ]);
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "No changes made (same data or wrong user_id)"
            ]);
        }

    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Update failed"
        ]);
    }
}

// ================= GET PROFILE =================
else {

    $user_id = $data['user_id'] ?? null;

    if (!$user_id) {
        echo json_encode([
            "status" => "error",
            "message" => "User ID missing"
        ]);
        exit;
    }

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

$conn->close();
?>