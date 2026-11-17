<?php
/**
 * TRC SVNIT - Header Navbar Include
 * @var string $activePage
 */
$activePage = isset($activePage) ? $activePage : 'home';
$navItems = [
    'home' => ['url' => 'index.php', 'label' => 'Home'],
    'about' => ['url' => 'about.php', 'label' => 'About Us'],
    'projects' => ['url' => 'projects.php', 'label' => 'Research & Projects'],
    'publications' => ['url' => 'publications.php', 'label' => 'Publications'],
    'news' => ['url' => 'news.php', 'label' => 'News'],
    'team' => ['url' => 'team.php', 'label' => 'Team'],
    'gallery' => ['url' => 'gallery.php', 'label' => 'Gallery'],
    'contact' => ['url' => 'contact.php', 'label' => 'Contact Us'],
];
?>
<header id="site-header" class="site-header">
    <div class="wrap header-inner">
        <a class="brand" href="index.php" aria-label="TEP Research &amp; Consultancy Cell, Department of Civil Engineering, SVNIT Surat">
            <span class="brand-logo-wrap">
                <img class="brand-logo-svnit" src="assets/img/svnit-logo.png" alt="SVNIT Surat" width="38" height="36">
                <img class="brand-logo-trc" src="assets/img/logo-mark.svg" alt="TRC" width="34" height="34">
            </span>
            <span class="brand-text">
                <strong class="brand-title">TEP Research &amp; Consultancy Cell</strong>
                <span class="brand-sub">Department of Civil Engineering &bull; SVNIT Surat</span>
            </span>
        </a>

        <button type="button" class="nav-toggle" aria-controls="site-nav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="nav-toggle-bar"></span>
            <span class="nav-toggle-bar"></span>
            <span class="nav-toggle-bar"></span>
        </button>

        <nav id="site-nav" class="nav" aria-label="Main navigation">
            <ul class="nav-list">
                <?php foreach ($navItems as $key => $item): 
                    $isActive = ($activePage === $key || ($key === 'projects' && $activePage === 'project') || ($key === 'news' && $activePage === 'news-item'));
                ?>
                    <li class="nav-item">
                        <a href="<?php echo htmlspecialchars($item['url']); ?>" class="nav-link<?php echo $isActive ? ' is-active' : ''; ?>">
                            <?php echo $item['label']; ?>
                        </a>
                    </li>
                <?php endforeach; ?>
            </ul>
        </nav>
    </div>
</header>
