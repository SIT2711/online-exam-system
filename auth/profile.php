<?php

include("../config/db.php");
session_start();

header("Content-Type: application/json");

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["error" => "User not logged in"]);
    exit;
}

$user_id = $_SESSION['user_id'];


if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    $sql = "SELECT full_name, email, phone, role, created_at AS join_date 
            FROM users WHERE id = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode($result->fetch_assoc());
    } else {
        echo json_encode(["error" => "User not found"]);
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $full_name = $_POST['full_name'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';

    // ✅ VALIDATION
    if (empty($full_name) || empty($email) || empty($phone)) {
        echo json_encode(["error" => "All fields are required"]);
        exit;
    }

    $sql = "UPDATE users 
            SET full_name = ?, email = ?, phone = ? 
            WHERE id = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssi", $full_name, $email, $phone, $user_id);

    if ($stmt->execute()) {
        echo json_encode(["success" => "Profile Updated Successfully"]);
    } else {
        echo json_encode(["error" => "Update Failed"]);
    }
}

$conn->close();

?>
