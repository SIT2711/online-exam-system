<?php
include "../config/db.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// ===== FORCE CLEAN JSON (NO HTML ERRORS) =====
mysqli_report(MYSQLI_REPORT_OFF);

// ===== INPUT =====
$exam_id = $_POST['exam_id'] ?? null;
$student_id = $_POST['student_id'] ?? null;
$answers_raw = $_POST['answers'] ?? null;

if (!$exam_id || !$student_id || !$answers_raw) {
    echo json_encode(["status" => "error", "message" => "Missing input"]);
    exit;
}

$answers = json_decode($answers_raw, true);
if (!is_array($answers)) {
    echo json_encode(["status" => "error", "message" => "Invalid answers"]);
    exit;
}

// ===== GET OR CREATE ATTEMPT =====
$attempt_id = null;

$check = mysqli_query($conn, "
    SELECT attempt_id 
    FROM exam_attempts 
    WHERE exam_id='$exam_id' AND student_id='$student_id'
    ORDER BY attempt_id DESC
    LIMIT 1
");

if ($check && mysqli_num_rows($check) > 0) {
    $row = mysqli_fetch_assoc($check);
    $attempt_id = $row['attempt_id'];
} else {
    mysqli_query($conn, "
        INSERT INTO exam_attempts (exam_id, student_id, start_time, status)
        VALUES ('$exam_id','$student_id', NOW(), 'in_progress')
    ");
    $attempt_id = mysqli_insert_id($conn);
}

// ===== SCORE =====
$score = 0;

foreach ($answers as $question_id => $selected_option_id) {

    $question_id = intval($question_id);
    $selected_option_id = intval($selected_option_id);

    // get correct option
    $res = mysqli_query($conn, "
        SELECT option_id 
        FROM options 
        WHERE question_id = $question_id AND is_correct = 1
        LIMIT 1
    ");

    $isCorrect = 0;

    if ($res && $row = mysqli_fetch_assoc($res)) {
        if (intval($row['option_id']) == $selected_option_id) {
            $score++;
            $isCorrect = 1;
        }
    }

    // save answer (MATCH YOUR DB)
    mysqli_query($conn, "
        INSERT INTO student_answers 
        (attempt_id, exam_id, student_id, question_id, selected_option_id, is_correct)
        VALUES (
            '$attempt_id',
            '$exam_id',
            '$student_id',
            '$question_id',
            '$selected_option_id',
            '$isCorrect'
        )
    ");
}

// ===== CALCULATE TOTAL QUESTIONS FROM DB =====
$resTotal = mysqli_query($conn, "
    SELECT COUNT(*) as total 
    FROM questions 
    WHERE exam_id = '$exam_id'
");

$rowTotal = mysqli_fetch_assoc($resTotal);
$totalQuestions = intval($rowTotal['total']);

// ===== CALCULATE PERCENTAGE =====
$percentage = $totalQuestions > 0
    ? round(($score / $totalQuestions) * 100)
    : 0;

// ===== UPDATE RESULT =====
$update_sql = "UPDATE exam_attempts SET end_time = NOW(), status='completed', score='$percentage' WHERE attempt_id='$attempt_id'";
error_log("[submit_exam] Update SQL: " . $update_sql);
$update_res = mysqli_query($conn, $update_sql);
error_log("[submit_exam] Update result: " . ($update_res ? "success" : "failed: " . mysqli_error($conn)));
error_log("[submit_exam] Affected rows: " . mysqli_affected_rows($conn));

// ===== FINAL RESPONSE =====
echo json_encode([
    "status" => "success",
    "score" => intval($score),
    "percentage" => $percentage
]);
exit;