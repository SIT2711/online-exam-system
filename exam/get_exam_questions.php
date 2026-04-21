<?php
<<<<<<< HEAD

include "../config/db.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 🔥 GET exam_id safely
$exam_id = isset($_GET['exam_id']) ? (int)$_GET['exam_id'] : 0;

if ($exam_id <= 0) {
    echo json_encode([
        "status" => "error",
        "message" => "exam_id is required"
    ]);
    exit();
}

// 🔥 MAIN QUERY
$sql = "SELECT * FROM questions WHERE exam_id = $exam_id";
$result = mysqli_query($conn, $sql);

// ❌ DB ERROR HANDLING (IMPORTANT FIX)
if (!$result) {
    echo json_encode([
        "status" => "error",
        "message" => mysqli_error($conn)
    ]);
    exit();
}

=======
header("Content-Type: application/json");
include "../config/db.php";

$exam_id = $_GET['exam_id'];

// ✅ GET EXAM (FOR TIMER)
$examQuery = "SELECT * FROM exams WHERE exam_id = '$exam_id'";
$examResult = mysqli_query($conn, $examQuery);
$exam = mysqli_fetch_assoc($examResult);

// ✅ GET QUESTIONS
>>>>>>> 7b1d635c3d657bc83e226564400a0acd1eedee12
$questions = [];

$qQuery = "SELECT * FROM questions WHERE exam_id = '$exam_id'";
$qResult = mysqli_query($conn, $qQuery);

<<<<<<< HEAD
    $question_id = (int)$q['question_id'];

    // 🔥 FIX: check option query failure
    $opt_sql = "SELECT option_text, is_correct 
                FROM options 
                WHERE question_id = $question_id";

    $opt_result = mysqli_query($conn, $opt_sql);

    $options = [];

    if ($opt_result) {
        while ($opt = mysqli_fetch_assoc($opt_result)) {
            $options[] = $opt;
        }
=======
while ($q = mysqli_fetch_assoc($qResult)) {

    $qid = $q['question_id'];

    // ✅ GET OPTIONS FOR EACH QUESTION
    $optQuery = "SELECT * FROM options WHERE question_id = '$qid'";
    $optResult = mysqli_query($conn, $optQuery);

    $options = [];

    while ($opt = mysqli_fetch_assoc($optResult)) {
        $options[] = $opt;
>>>>>>> 7b1d635c3d657bc83e226564400a0acd1eedee12
    }

    $q['options'] = $options;
    $questions[] = $q;
}

<<<<<<< HEAD
// 🔥 SAFE OUTPUT
=======
// ✅ FINAL RESPONSE
>>>>>>> 7b1d635c3d657bc83e226564400a0acd1eedee12
echo json_encode([
    "status" => "success",
    "duration" => $exam['duration'],
    "questions" => $questions
]);
?>