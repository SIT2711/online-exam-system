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

if (!$answers) {
    echo json_encode(["status"=>"error","message"=>"Invalid answers"]);
    exit;
}

// ================= CREATE ATTEMPT =================
$attemptQuery = mysqli_query($conn, "
    INSERT INTO exam_attempts (exam_id, student_id, start_time, status)
    VALUES ('$exam_id','$student_id',NOW(),'completed')
");

if (!$attemptQuery) {
    die("Attempt Insert Error: " . mysqli_error($conn));
}

$attempt_id = mysqli_insert_id($conn);

// ================= SCORE =================
$score = 0;

foreach ($answers as $q => $opt) {

    $q = intval($q);
    $opt = intval($opt);

    // ================= FETCH OPTION DATA =================
    $res = mysqli_query($conn, "
        SELECT option_text, is_correct 
        FROM options 
        WHERE option_id = $opt
    ");

    if (!$res) {
        die("Fetch Error: " . mysqli_error($conn));
    }

    $answer_text = "NOT_FOUND";
    $isCorrect = 0;

    if ($row = mysqli_fetch_assoc($res)) {

        // ✅ STORE REAL TEXT
        $answer_text = mysqli_real_escape_string($conn, $row['option_text']);

        // ✅ CHECK CORRECTNESS
        if ($row['is_correct'] == 1) {
            $isCorrect = 1;
            $score++;
        }

    } else {
        // Debug case
        $answer_text = "INVALID_OPTION_ID";
    }

    // ================= INSERT STUDENT ANSWER =================
    $insert = mysqli_query($conn, "
        INSERT INTO student_answers
        (attempt_id, exam_id, student_id, question_id, selected_option_id, answer_text, is_correct)
        VALUES
        ('$attempt_id','$exam_id','$student_id','$q','$opt','$answer_text','$isCorrect')
    ");

    if (!$insert) {
        die("Insert Error: " . mysqli_error($conn));
    }
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

// ================= SAVE RESULT =================
$resultInsert = mysqli_query($conn, "
    INSERT INTO results
    (attempt_id, total_marks, obtained_marks, percentage, created_at)
    VALUES
    ('$attempt_id','$total','$score','$percentage',NOW())
");

if (!$resultInsert) {
    die("Result Insert Error: " . mysqli_error($conn));
}

// ================= RESPONSE =================
echo json_encode([
    "status" => "success",
    "score" => $score,
    "percentage" => $percentage
]);
?>