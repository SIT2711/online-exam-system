<?php
// Always return JSON even on fatal errors
register_shutdown_function(function() {
    $error = error_get_last();
    if ($error !== null && ($error['type'] === E_ERROR || $error['type'] === E_PARSE)) {
        header('Content-Type: application/json');
        echo json_encode([
            "status" => "error",
            "message" => "Server error: " . $error['message']
        ]);
    }
});

error_reporting(E_ALL);
ini_set('display_errors', 0);

// CORS headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

try {
    include("../config/db.php");
    
    if (!$conn) {
        throw new Exception("Database connection failed");
    }
    
    // get JSON input
    $input = file_get_contents("php://input");
    $data = json_decode($input, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("Invalid JSON input: " . json_last_error_msg());
    }
    
    if (!isset($data['id']) || empty($data['id'])) {
        throw new Exception("Missing question ID");
    }
    
    $id = intval($data['id']);
    
    // STEP 1: delete student_answers first (foreign key to options)
    $deleteStudentAnswers = mysqli_query($conn, "
        DELETE sa FROM student_answers sa 
        JOIN options o ON sa.selected_option_id = o.option_id 
        WHERE o.question_id = $id
    ");
    if (!$deleteStudentAnswers) {
        error_log("Failed to delete student_answers: " . mysqli_error($conn));
    }
    
    // STEP 2: delete options 
    $deleteOptions = mysqli_query($conn, "DELETE FROM options WHERE question_id = $id");
    if (!$deleteOptions) {
        throw new Exception("Failed to delete options: " . mysqli_error($conn));
    }
    
    // STEP 3: delete question
    $deleteQuestion = mysqli_query($conn, "DELETE FROM questions WHERE question_id = $id");
    
    if (!$deleteQuestion) {
        throw new Exception("Failed to delete question: " . mysqli_error($conn));
    }
    
    if (mysqli_affected_rows($conn) === 0) {
        throw new Exception("Question not found or already deleted");
    }
    
    echo json_encode([
        "status" => "success",
        "message" => "Question deleted successfully"
    ]);
    
} catch (Exception $e) {
    error_log("[delete_question] Error: " . $e->getMessage());
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
?>