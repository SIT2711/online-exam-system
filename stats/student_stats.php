<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);
$student_id = $data['user_id'] ?? '';

error_log("[student_stats] Received user_id: " . $student_id);

if (!$student_id) {
    echo json_encode(["status" => "error", "message" => "Missing user_id"]);
    exit;
}

// TOTAL ATTEMPT (ALL rows)
$res1 = mysqli_query($conn, "SELECT COUNT(*) as total FROM exam_attempts WHERE student_id='$student_id'");
$total = $res1 ? (int)mysqli_fetch_assoc($res1)['total'] : 0;
error_log("[student_stats] total_attempted query result: " . $total);

// COMPLETED
$res2 = mysqli_query($conn, "SELECT COUNT(*) as completed FROM exam_attempts WHERE student_id='$student_id' AND TRIM(status)='completed'");
$completed = $res2 ? (int)mysqli_fetch_assoc($res2)['completed'] : 0;
error_log("[student_stats] completed query result: " . $completed);

// LAST SCORE
$res3 = mysqli_query($conn, "SELECT score FROM exam_attempts WHERE student_id='$student_id' AND TRIM(status)='completed' ORDER BY end_time DESC LIMIT 1");
$last_score = 0;
if ($res3 && mysqli_num_rows($res3) > 0) {
    $row = mysqli_fetch_assoc($res3);
    $last_score = $row['score'] !== null ? (int)$row['score'] : 0;
}
error_log("[student_stats] last_score query result: " . $last_score);

$result = [
    "status" => "success",
    "total_attempted" => $total,
    "completed" => $completed,
    "last_score" => $last_score
];
error_log("[student_stats] Response: " . json_encode($result));
echo json_encode($result);
?>