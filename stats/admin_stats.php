<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../config/db.php";

// TOTAL USERS
$res1 = mysqli_query($conn, "SELECT COUNT(*) as total FROM users");
$users = $res1 ? (int)mysqli_fetch_assoc($res1)['total'] : 0;
error_log("[admin_stats] total_users query result: " . $users);

// TOTAL EXAMS
$res2 = mysqli_query($conn, "SELECT COUNT(*) as total FROM exams");
$exams = $res2 ? (int)mysqli_fetch_assoc($res2)['total'] : 0;
error_log("[admin_stats] total_exams query result: " . $exams);

// COMPLETED
$res3 = mysqli_query($conn, "SELECT COUNT(*) as total FROM exam_attempts WHERE TRIM(status)='completed'");
$completed = $res3 ? (int)mysqli_fetch_assoc($res3)['total'] : 0;
error_log("[admin_stats] completed_exams query result: " . $completed);

$result = [
    "status" => "success",
    "total_users" => $users,
    "total_exams" => $exams,
    "completed_exams" => $completed
];
error_log("[admin_stats] Response: " . json_encode($result));
echo json_encode($result);
?>