<?php
include "../config/db.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// ================= INPUT =================
$exam_id = $_POST['exam_id'] ?? null;
$student_id = $_POST['student_id'] ?? null;
$answers_raw = $_POST['answers'] ?? null;

if (!$exam_id || !$student_id || !$answers_raw) {
    echo json_encode(["status"=>"error","message"=>"Missing input"]);
    exit;
}

$answers = json_decode($answers_raw, true);

if (!$answers || count($answers) == 0) {
    echo json_encode(["status"=>"error","message"=>"No answers received"]);
    exit;
}

// ================= CREATE / GET ATTEMPT =================
$check = mysqli_query($conn, "
    SELECT attempt_id 
    FROM exam_attempts 
    WHERE exam_id = '$exam_id' 
    AND student_id = '$student_id'
    AND status = 'in_progress'
    LIMIT 1
");

if ($row = mysqli_fetch_assoc($check)) {
    $attempt_id = $row['attempt_id'];
} else {
    $insertAttempt = mysqli_query($conn, "
        INSERT INTO exam_attempts (exam_id, student_id, start_time, status)
        VALUES ('$exam_id','$student_id',NOW(),'in_progress')
    ");

    if (!$insertAttempt) {
        die("Attempt Insert Error: " . mysqli_error($conn));
    }

    $attempt_id = mysqli_insert_id($conn);
}

// ================= CLEAN OLD ANSWERS =================
mysqli_query($conn, "
    DELETE FROM student_answers 
    WHERE attempt_id = '$attempt_id'
");

// ================= SCORE CALCULATION =================
$score = 0;

foreach ($answers as $question_id => $option_id) {

    $question_id = intval($question_id);
    $option_id = intval($option_id);

    $res = mysqli_query($conn, "
        SELECT option_text, is_correct
        FROM options
        WHERE option_id = $option_id 
        AND question_id = $question_id
    ");

    $answer_text = "INVALID";
    $isCorrect = 0;

    if ($row = mysqli_fetch_assoc($res)) {

        $answer_text = mysqli_real_escape_string($conn, $row['option_text']);

        if ($row['is_correct'] == 1) {
            $isCorrect = 1;
            $score++;
        }
    }

    // INSERT INTO student_answers
    mysqli_query($conn, "
        INSERT INTO student_answers
        (attempt_id, exam_id, student_id, question_id, selected_option_id, answer_text, is_correct)
        VALUES
        ('$attempt_id','$exam_id','$student_id','$question_id','$option_id','$answer_text','$isCorrect')
    ");
}

// ================= TOTAL QUESTIONS =================
$totalQuery = mysqli_query($conn, "
    SELECT COUNT(*) as total 
    FROM questions 
    WHERE exam_id = '$exam_id'
");

$totalRow = mysqli_fetch_assoc($totalQuery);
$total = $totalRow['total'] ?? 0;

// ================= PERCENTAGE =================
$percentage = ($total > 0) ? round(($score / $total) * 100) : 0;

// ================= INSERT RESULT =================
mysqli_query($conn, "
    INSERT INTO results
    (attempt_id, total_marks, obtained_marks, percentage, created_at)
    VALUES
    ('$attempt_id','$total','$score','$percentage',NOW())
");

// ================= FINAL UPDATE (MOST IMPORTANT) =================
$update = mysqli_query($conn, "
    UPDATE exam_attempts 
    SET 
        score = '$score',
        end_time = NOW(),
        status = 'completed'
    WHERE attempt_id = '$attempt_id'
");

if (!$update) {
    die("Update Error: " . mysqli_error($conn));
}

// ================= RESPONSE =================
echo json_encode([
    "status" => "success",
    "score" => $score,
    "percentage" => $percentage,
    "attempt_id" => $attempt_id
]);

?>