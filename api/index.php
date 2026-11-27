<?php
/**
 * Vercel serverless front-controller router for root PHP pages.
 */
$rootDir = dirname(__DIR__);
chdir($rootDir);

$rawUri = $_SERVER['REQUEST_URI'] ?? '/';
$path = parse_url($rawUri, PHP_URL_PATH) ?: '/';
$path = trim($path, '/');

if ($path === '' || $path === 'api' || $path === 'api/index.php') {
    $candidate = 'index.php';
} else {
    $cleanPath = preg_replace('/\.(php|html)$/i', '', $path);
    if (preg_match('/^[a-z0-9][a-z0-9_-]*$/i', $cleanPath)) {
        $candidate = $cleanPath . '.php';
    } else {
        $candidate = '';
    }
}

$targetFile = $candidate !== '' ? $rootDir . DIRECTORY_SEPARATOR . $candidate : '';

if ($targetFile !== '' && is_file($targetFile)) {
    $_SERVER['SCRIPT_NAME'] = '/' . $candidate;
    $_SERVER['PHP_SELF'] = '/' . $candidate;
    if ($candidate !== 'contact-handler.php' && !headers_sent()) {
        header('Content-Type: text/html; charset=utf-8');
    }
    require $targetFile;
    exit;
}

http_response_code(404);
if (!headers_sent()) {
    header('Content-Type: text/html; charset=utf-8');
}
$notFoundFile = $rootDir . DIRECTORY_SEPARATOR . '404.php';
if (is_file($notFoundFile)) {
    require $notFoundFile;
} else {
    echo '404 Not Found';
}
