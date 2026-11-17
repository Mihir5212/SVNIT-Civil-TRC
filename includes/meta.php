<?php
/**
 * TRC SVNIT - Meta Head Include
 * @var string $pageTitle
 * @var string $pageDesc
 * @var string $activePage
 */
$pageTitle = isset($pageTitle) ? $pageTitle : 'TEP Research & Consultancy Cell | SVNIT Surat';
$pageDesc = isset($pageDesc) ? $pageDesc : 'Traffic studies, road safety audits and transport planning by the TEP Research & Consultancy Cell, Department of Civil Engineering, SVNIT Surat.';
$activePage = isset($activePage) ? $activePage : 'home';
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title><?php echo htmlspecialchars($pageTitle); ?></title>
<meta name="description" content="<?php echo htmlspecialchars($pageDesc); ?>">
<meta name="theme-color" content="#0B5D45">
<link rel="icon" href="assets/img/logo-mark.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;800;900&family=Oswald:wght@300;400;500;600;700&family=Overpass:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css">
</head>
<body data-page="<?php echo htmlspecialchars($activePage); ?>">
<a class="skip-link" href="#main">Skip to content</a>
