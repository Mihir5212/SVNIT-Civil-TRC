<?php
/**
 * TRC SVNIT - Header Navbar Include (Stitch Card Navbar in SVNIT Green & White Theme)
 * @var string $activePage
 */
$activePage = isset($activePage) ? $activePage : 'home';
$navItems = [
    'home' => ['url' => 'index.php', 'label' => 'Home'],
    'about' => ['url' => 'about.php', 'label' => 'About Us'],
    'projects' => ['url' => 'projects.php', 'label' => 'Projects'],
    'publications' => ['url' => 'publications.php', 'label' => 'Publications'],
    'team' => ['url' => 'team.php', 'label' => 'Team'],
    'gallery' => ['url' => 'gallery.php', 'label' => 'Gallery'],
    'news' => ['url' => 'news.php', 'label' => 'News'],
];
?>
<header id="site-header" class="site-header tep-header">
    <div class="tep-nav-card">
        <!-- Main White Navigation Bar with Dual Logos (SVNIT + TEP) -->
        <div class="tep-nav-main header-inner">
            <a class="tep-brand" href="index.php" aria-label="TEP Research &amp; Consultancy Cell, Department of Civil Engineering, SVNIT Surat">
                <span class="tep-logo-pair">
                    <img src="assets/img/svnit-logo.png" alt="SVNIT Surat" class="tep-logo-svnit" width="38" height="38">
                    <img src="assets/img/tep-logo.jpeg" alt="TEP Research &amp; Consultancy Cell Logo" class="tep-logo-tep" width="38" height="38">
                </span>
                <span class="tep-brand-text">
                    <strong class="tep-brand-title">TEP Research &amp; Consultancy Cell</strong>
                    <span class="tep-brand-sub">
                        <span class="brand-dept-full">Transportation Engineering &amp; Planning &bull; SVNIT</span>
                        <span class="brand-dept-short">Civil Engg. &bull; SVNIT Surat</span>
                    </span>
                </span>
            </a>

            <!-- Center Desktop Links -->
            <nav id="site-nav" class="tep-nav-links" aria-label="Primary Navigation">
                <?php foreach ($navItems as $key => $item):
                    $isActive = ($activePage === $key || ($key === 'projects' && $activePage === 'project') || ($key === 'news' && $activePage === 'news-item'));
                ?>
                    <a href="<?php echo htmlspecialchars($item['url']); ?>" class="tep-nav-link<?php echo $isActive ? ' is-active' : ''; ?>">
                        <?php echo htmlspecialchars($item['label']); ?>
                    </a>
                <?php endforeach; ?>
            </nav>

            <!-- Right Actions -->
            <div class="tep-nav-actions">
                <a href="contact.php#enquiry-form" class="tep-nav-cta<?php echo $activePage === 'contact' ? ' is-active' : ''; ?>">
                    <span>Book Consultation</span>
                    <span class="material-symbols-outlined tep-nav-cta-arrow" aria-hidden="true">arrow_forward</span>
                </a>
                <button
                    id="mobile-nav-toggle"
                    type="button"
                    class="tep-mobile-toggle"
                    aria-controls="mobile-nav-menu"
                    aria-expanded="false"
                    aria-label="Toggle Menu"
                >
                    <span class="tep-hamburger" aria-hidden="true">
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </button>
            </div>
        </div>

        <!-- Mobile Dropdown Drawer (Slides cleanly down from navbar on mobile/tablet) -->
        <div id="mobile-nav-menu" class="tep-mobile-drawer" data-lenis-prevent hidden>
            <nav aria-label="Mobile Navigation" class="tep-mobile-links">
                <?php foreach ($navItems as $key => $item):
                    $isActive = ($activePage === $key || ($key === 'projects' && $activePage === 'project') || ($key === 'news' && $activePage === 'news-item'));
                ?>
                    <a href="<?php echo htmlspecialchars($item['url']); ?>" class="tep-mobile-link<?php echo $isActive ? ' is-active' : ''; ?>">
                        <?php echo htmlspecialchars($item['label']); ?>
                    </a>
                <?php endforeach; ?>
                <a href="contact.php#enquiry-form" class="tep-mobile-cta">
                    <span>Book Consultation</span>
                    <span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
                </a>
            </nav>
        </div>
    </div>
</header>
