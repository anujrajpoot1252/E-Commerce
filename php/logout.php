<?php

require_once __DIR__ . '/includes/session.php';

clear_session();

session_start();
set_flash_message('info', 'You have been logged out.');
header('Location: login.php');
exit;
