<?php
include "../config/db.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$exam_id = $_POST['exam_id'] ?? null;
$student_id = $_POST['student_id'] ?? null;
$answers_raw = $_POST['answers'] ?? null;

if (!$exam_id || !$student_id || !$answers_raw) {
    echo json_encode(["status"=>"error","message"=>"Missing input"]);
    exit;
}

$answers = json_decode($answers_raw, true);

// ================= CREATE ATTEMPT =================
mysqli_query($conn, "
INSERT INTO exam_attempts (exam_id, student_id, start_time, status)
VALUES ('$exam_id','$student_id',NOW(),'completed')
");

$attempt_id = mysqli_insert_id($conn);

// ================= SCORE =================
$score = 0;

foreach ($answers as $q => $opt) {

    $q = intval($q);
    $opt = intval($opt);

    $res = mysqli_query($conn, "
        SELECT option_id FROM options
        WHERE question_id=$q AND is_correct=1
    ");

    $isCorrect = 0;

    if ($row = mysqli_fetch_assoc($res)) {
        if ($row['option_id'] == $opt) {
            $isCorrect = 1;
            $score++;
        }
    }

    mysqli_query($conn, "
        INSERT INTO student_answers
        (attempt_id, exam_id, student_id, question_id, selected_option_id, answer_text, is_correct)
        VALUES
        ('$attempt_id','$exam_id','$student_id','$q','$opt','','$isCorrect')
    ");
}

// ================= TOTAL =================
$total = mysqli_fetch_assoc(mysqli_query($conn,"
SELECT COUNT(*) as total FROM questions WHERE exam_id='$exam_id'
"))['total'];

$percentage = ($total > 0) ? round(($score/$total)*100) : 0;

// ================= RESULT =================
mysqli_query($conn, "
INSERT INTO results
(attempt_id, total_marks, obtained_marks, percentage, created_at)
VALUES
('$attempt_id','$total','$score','$percentage',NOW())
");

// ================= RESPONSE =================
echo json_encode([
    "status"=>"success",
    "score"=>$score,
    "percentage"=>$percentage
]);
?>