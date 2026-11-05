<?php

require_once __DIR__ . '/../includes/session.php';
require_once __DIR__ . '/../includes/api_helper.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ../create-account.php');
    exit;
}

$name = trim($_POST['name'] ?? '');
$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$password = $_POST['password'] ?? '';
$confirmPassword = $_POST['confirm_password'] ?? '';

if (empty($name) || !$email || empty($password)) {
    set_flash_message('error', 'All fields are required.');
    header('Location: ../create-account.php');
    exit;
}

if (strlen($password) < 6) {
    set_flash_message('error', 'Password must be at least 6 characters long.');
    header('Location: ../create-account.php');
    exit;
}

if ($password !== $confirmPassword) {
    set_flash_message('error', 'Passwords do not match.');
    header('Location: ../create-account.php');
    exit;
}

$response = api_request('auth/signup', 'POST', [
    'name' => $name,
    'email' => trim($email),
    'password' => $password
]);

if ($response['success']) {
    set_flash_message('success', 'Account created successfully. Please sign in.');
    header('Location: ../login.php');
    exit;
}

$errorMessage = $response['error'] ?? 'Account creation failed. Please try again.';
set_flash_message('error', $errorMessage);
header('Location: ../create-account.php');
exit;
