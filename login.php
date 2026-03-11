<?php
session_start();
include "connect.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Prepare statement to prevent SQL Injection
    $stmt = $conn->prepare("SELECT id, password FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($user = $result->fetch_assoc()) {
        // Use password_verify if you stored hashes, or a direct comparison for testing
        // Note: For production, always use password_hash() and password_verify()
        if (password_verify($password, $user['password']) || $password === $user['password']) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $username;
            
            // Log the login action (matches your user_logs table)
            $logStmt = $conn->prepare("INSERT INTO user_logs (user_id, action) VALUES (?, 'Logged In')");
            $logStmt->bind_param("i", $user['id']);
            $logStmt->execute();

            header("Location: dashboard.php");
            exit;
        } else {
            echo "Invalid password.";
        }
    } else {
        echo "User not found.";
    }
}
?>