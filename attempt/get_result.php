<?php
include "../config/db.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$user_id = $_GET['user_id'];

$query = "
SELECT 
  ea.exam_id,
  e.exam_name,
  u.name AS student_name,
  t.name AS teacher_name,
  ea.score,
  ea.end_time AS created_at,
  (SELECT COUNT(*) FROM questions WHERE exam_id = ea.exam_id) AS total_questions,
  ROUND((ea.score / 
        (SELECT COUNT(*) FROM questions WHERE exam_id = ea.exam_id)
       ) * 100, 2) AS percentage
FROM exam_attempts ea
JOIN exams e ON e.exam_id = ea.exam_id
JOIN users u ON u.user_id = ea.student_id
LEFT JOIN users t ON t.user_id = e.teacher_id
WHERE ea.student_id = '$user_id'
AND ea.status = 'completed'
ORDER BY ea.end_time DESC
";

$result = mysqli_query($conn, $query);

$data = [];
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

echo json_encode([
    "status" => "success",
    "data" => $data
]);
?>