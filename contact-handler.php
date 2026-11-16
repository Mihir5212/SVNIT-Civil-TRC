<?php
/**
 * TRC SVNIT - Contact Form Handler
 * Processes AJAX and standard form submissions with server-side validation.
 */
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

// Honeypot check for bots
if (!empty($_POST['website_hp']) || !empty($_POST['_gotcha'])) {
    echo json_encode(['success' => true, 'message' => 'Your message has been dispatched successfully.']);
    exit;
}

$name = isset($_POST['name']) ? trim(htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8')) : '';
$email = isset($_POST['email']) ? trim(filter_var($_POST['email'], FILTER_SANITIZE_EMAIL)) : '';
$phone = isset($_POST['phone']) ? trim(htmlspecialchars($_POST['phone'], ENT_QUOTES, 'UTF-8')) : '';
$organisation = isset($_POST['organisation']) ? trim(htmlspecialchars($_POST['organisation'], ENT_QUOTES, 'UTF-8')) : '';
$subject = isset($_POST['subject']) && !empty($_POST['subject']) ? trim(htmlspecialchars($_POST['subject'], ENT_QUOTES, 'UTF-8')) : 'General Research / Consultancy Enquiry';
$message = isset($_POST['message']) ? trim(htmlspecialchars($_POST['message'], ENT_QUOTES, 'UTF-8')) : '';
$department = isset($_POST['department']) ? trim(htmlspecialchars($_POST['department'], ENT_QUOTES, 'UTF-8')) : '';
if (empty($department) && isset($_POST['work'])) {
    $department = trim(htmlspecialchars($_POST['work'], ENT_QUOTES, 'UTF-8'));
}

$errors = [];

if (empty($name) || strlen($name) < 2) {
    $errors[] = 'Please provide a valid full name.';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Please provide a valid official email address.';
}

if (empty($message) || strlen($message) < 10) {
    $errors[] = 'Please provide details of your enquiry or project scope (minimum 10 characters).';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'errors' => $errors, 'message' => implode(' ', $errors)]);
    exit;
}

// Log or prepare email
$recipient = 'trc@svnit.ac.in';
$emailSubject = "[TRC SVNIT Enquiry] " . ($subject ? $subject : "New enquiry from $name");

$emailBody = "New enquiry submitted to TRC SVNIT Portal:\n\n";
$emailBody .= "Name: " . $name . "\n";
$emailBody .= "Organisation: " . ($organisation ?: 'Not provided') . "\n";
$emailBody .= "Email: " . $email . "\n";
$emailBody .= "Phone: " . ($phone ?: 'Not provided') . "\n";
$emailBody .= "Target Domain / Dept: " . ($department ?: 'General') . "\n";
$emailBody .= "Subject: " . $subject . "\n\n";
$emailBody .= "Project Details / Message:\n" . $message . "\n\n";
$emailBody .= "Submitted: " . date('Y-m-d H:i:s T') . "\n";
$emailBody .= "IP Address: " . ($_SERVER['REMOTE_ADDR'] ?? 'Unknown') . "\n";

$headers = "From: webmaster@svnit.ac.in\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Attempt send if mail() is enabled on host
$mailSent = false;
if (function_exists('mail')) {
    // Suppress warning if local smtp not configured
    $mailSent = @mail($recipient, $emailSubject, $emailBody, $headers);
}

// Return success response to front-end
echo json_encode([
    'success' => true,
    'message' => 'Thank you! Your enquiry has been forwarded to the TRC SVNIT coordinating faculty. We will get back to you shortly.',
    'mailDispatched' => $mailSent
]);
exit;
