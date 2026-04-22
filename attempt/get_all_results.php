<?php
// CORS must be first - before any output
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include "../config/db.php";

// Get teacher_id from request (for teacher role filter)
$input = json_decode(file_get_contents("php://input"), true);
$teacher_id = isset($input['teacher_id']) ? intval($input['teacher_id']) : 0;

// Debug log
error_log("[get_all_results] teacher_id received: " . $teacher_id);

// First check - verify attempts exist for this teacher
if ($teacher_id > 0) {
    $check = mysqli_query($conn, "SELECT COUNT(*) as cnt FROM exam_attempts ea JOIN exams e ON e.exam_id = ea.exam_id WHERE e.teacher_id = $teacher_id AND ea.status = 'completed'");
    $checkRow = mysqli_fetch_assoc($check);
    error_log("[get_all_results] Attempts found for teacher $teacher_id: " . $checkRow['cnt']);
}

// Build query - if teacher_id provided, filter by that teacher's exams
$teacher_filter = $teacher_id > 0 ? "AND e.teacher_id = $teacher_id" : "";

// Calculate percentage from actual data: (correct_answers / total_questions) * 100
$query = "
SELECT 
  e.exam_title AS exam_name,
  u.full_name AS student_name,
  t.full_name AS teacher_name,
  IFNULL(sa.correct_count, 0) AS obtained_marks,
  IFNULL(q.total_questions, 0) AS total_questions,
  IF(IFNULL(q.total_questions, 0) > 0, ROUND((IFNULL(sa.correct_count, 0) / q.total_questions) * 100, 2), 0) AS percentage,
  ea.end_time AS created_at
FROM exam_attempts ea
JOIN exams e ON e.exam_id = ea.exam_id
JOIN users u ON u.user_id = ea.student_id
LEFT JOIN users t ON t.user_id = e.teacher_id
LEFT JOIN (
  SELECT exam_id, COUNT(*) AS total_questions 
  FROM questions 
  GROUP BY exam_id
) q ON q.exam_id = ea.exam_id
LEFT JOIN (
  SELECT attempt_id, COUNT(*) AS correct_count
  FROM student_answers
  WHERE is_correct = 1
  GROUP BY attempt_id
) sa ON sa.attempt_id = ea.attempt_id
WHERE ea.status = 'completed' $teacher_filter
ORDER BY ea.end_time DESC
";

error_log("[get_all_results] SQL: " . $query);

$result = mysqli_query($conn, $query);

if (!$result) {
    $error = mysqli_error($conn);
    error_log("[get_all_results] SQL Error: " . $error);
    echo json_encode(["status" => "error", "message" => $error]);
    exit;
}

$data = [];
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

error_log("[get_all_results] Rows returned: " . count($data));

echo json_encode([
    "status" => "success",
    "data" => $data
]);
?>
