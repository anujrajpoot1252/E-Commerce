<?php
/**
 * ShopEase - Login Form Processing Handler
 */

require_once __DIR__ . '/../includes/session.php';
require_once __DIR__ . '/../includes/api_helper.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ../login.php');
    exit;
}

$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$password = $_POST['password'] ?? '';

if (!$email || empty($password)) {
    set_flash_message('error', 'Valid email and password are required.');
    header('Location: ../login.php');
    exit;
}

$response = api_request('auth/login', 'POST', [
    'email' => trim($email),
    'password' => $password
]);

if ($response['success'] && !empty($response['data']['token'])) {
    set_session_user($response['data']['user'], $response['data']['token']);
    set_flash_message('success', 'Logged in successfully.');
    header('Location: ../account.php');
    exit;
}

$errorMessage = $response['error'] ?? 'Authentication failed. Please verify your credentials.';
set_flash_message('error', $errorMessage);
header('Location: ../login.php');
exit;
