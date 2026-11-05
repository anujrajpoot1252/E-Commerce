<?php
/**
 * ShopEase - Session Management and Route Protection
 */

$savePath = session_save_path();
if (empty($savePath) || !@is_writable($savePath)) {
    $tempDir = sys_get_temp_dir();
    if (@is_writable($tempDir)) {
        session_save_path($tempDir);
    }
}

if (session_status() === PHP_SESSION_NONE) {
    @session_start();
}

function is_logged_in(): bool {
    return !empty($_SESSION['auth_token']) && !empty($_SESSION['user']);
}

function get_session_user(): ?array {
    return $_SESSION['user'] ?? null;
}

function get_auth_token(): ?string {
    return $_SESSION['auth_token'] ?? null;
}

function set_session_user(array $user, string $token): void {
    $_SESSION['user'] = $user;
    $_SESSION['auth_token'] = $token;
}

function clear_session(): void {
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(
            session_name(),
            '',
            time() - 42000,
            $params['path'],
            $params['domain'],
            $params['secure'],
            $params['httponly']
        );
    }
    session_destroy();
}

function require_login(string $redirect = 'login.php'): void {
    if (!is_logged_in()) {
        set_flash_message('error', 'Please log in to access this page.');
        header('Location: ' . $redirect);
        exit;
    }
}

function require_admin(string $redirect = 'index.php'): void {
    require_login();
    $user = get_session_user();
    if (($user['role'] ?? '') !== 'admin') {
        set_flash_message('error', 'Access denied. Administrator privileges required.');
        header('Location: ' . $redirect);
        exit;
    }
}

function set_flash_message(string $type, string $message): void {
    $_SESSION['flash'] = [
        'type' => $type, // 'success', 'error', 'info'
        'message' => $message
    ];
}

function get_flash_message(): ?array {
    if (!empty($_SESSION['flash'])) {
        $flash = $_SESSION['flash'];
        unset($_SESSION['flash']);
        return $flash;
    }
    return null;
}
