<?php
/**
 * ShopEase - REST API Client Helper
 * Communicates with Node.js backend using cURL
 */

require_once __DIR__ . '/../config/config.php';

function api_request(string $endpoint, string $method = 'GET', ?array $data = null, ?string $token = null): array {
    $url = rtrim(API_BASE_URL, '/') . '/' . ltrim($endpoint, '/');
    $ch = curl_init();

    $headers = [
        'Content-Type: application/json',
        'Accept: application/json'
    ];

    if ($token) {
        $headers[] = 'Authorization: Bearer ' . $token;
    }

    $options = [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 15,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_CUSTOMREQUEST => strtoupper($method)
    ];

    if ($data !== null && in_array(strtoupper($method), ['POST', 'PUT', 'PATCH'])) {
        $options[CURLOPT_POSTFIELDS] = json_encode($data);
    }

    curl_setopt_array($ch, $options);

    $rawResponse = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    if ($rawResponse === false || !empty($curlError)) {
        return [
            'success' => false,
            'status' => $httpCode ?: 500,
            'data' => null,
            'error' => $curlError ?: 'Unable to connect to backend API server.'
        ];
    }

    $decoded = json_decode($rawResponse, true);

    return [
        'success' => ($httpCode >= 200 && $httpCode < 300),
        'status' => $httpCode,
        'data' => $decoded,
        'error' => ($httpCode >= 400) ? ($decoded['message'] ?? 'API request failed.') : null
    ];
}
