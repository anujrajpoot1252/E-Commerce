<?php

// Define application root and URL constants
define('APP_NAME', 'ShopEase');
define('API_BASE_URL', getenv('API_BASE_URL') ?: 'http://localhost:5000/api');

// Timezone and error reporting
date_default_timezone_set('Asia/Kolkata');
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
