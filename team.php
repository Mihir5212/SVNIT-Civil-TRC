<?php
$activePage = 'team';
$pageTitle = 'Our Team & Faculty | TRC SVNIT Surat';
$pageDesc = 'Meet the professors, senior engineers, planners, and researchers driving road safety audits and transportation engineering at SVNIT Surat.';
require_once 'includes/site-data.php';
$faculty = getTRCFaculty();
$staff = getTRCStaff();
$roleFilters = [
    'all' => 'ALL (' . count($staff) . ')',
    'senior' => 'SENIOR ENGINEERS',
    'engineer' => 'PROJECT ENGINEERS',
    'planning' => 'PLANNING & CAD',
    'research' => 'RESEARCH ENGINEERS',
];
include 'includes/meta.php';
include 'includes/header.php';
?>
<main id="main" class="trc-subpage">

  <!-- Page Hero Banner -->
  <div class="page-hero">
    <div class="page-hero-content">
      <h1 class="page-hero-title">Our Team &amp; Faculty</h1>
      <p class="page-hero-breadcrumb"><a href="index.php">Home</a> &rsaquo; Team</p>
    </div>
  </div>

  <!-- Section 1: Faculty & Project Consultants -->
  <section class="section trc-team-section" id="consultants">
    <div class="trc-shell">
      <div class="trc-section-head-split" data-reveal="fade-in-up">
        <div>
          <span class="trc-eyebrow">ACADEMIC LEADERSHIP</span>
          <h2 class="trc-h2">Professors &amp; Project Consultants</h2>
        </div>
        <p class="trc-head-sub">
          Faculty coordinators leading statutory IRC:SP:88 safety audits, Indo-HCM modeling, and sponsored research across national highway agencies.
        </p>
      </div>

      <div class="trc-faculty-grid">
        <?php foreach ($faculty as $f): ?>
        <article class="trc-faculty-card" data-reveal="fade-in-up">
          <div class="trc-faculty-media">
            <img src="<?php echo htmlspecialchars($f['photo']); ?>" alt="<?php echo htmlspecialchars($f['name']); ?>" loading="lazy" />
            <span class="trc-num-pill"><?php echo htmlspecialchars($f['num']); ?></span>
          </div>
          <div class="trc-faculty-body">
            <h3><?php echo htmlspecialchars($f['name']); ?></h3>
            <p class="trc-faculty-role"><?php echo htmlspecialchars($f['designation']); ?></p>
            <p class="trc-faculty-exp"><?php echo htmlspecialchars($f['expertise']); ?></p>
            <?php if (!empty($f['profile'])): ?>
            <a href="<?php echo htmlspecialchars($f['profile']); ?>" target="_blank" rel="noopener noreferrer" class="trc-pill-green-btn trc-pill-green-btn--full">
              <span>PROFILE WEBSITE</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
            <?php endif; ?>
          </div>
        </article>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <!-- Section 2: Project Staff with Interactive Role Filters & 2-Column Mobile Photo Grid -->
  <section class="section trc-staff-section" id="project-staff">
    <div class="trc-shell">
      <div class="trc-section-head-split" data-reveal="fade-in-up">
        <div>
          <span class="trc-eyebrow">OUR PEOPLE</span>
          <h2 class="trc-h2">Project Engineers &amp; Research Staff</h2>
        </div>

        <div class="trc-filter-bar" role="group" aria-label="Filter project staff by role" data-filter-group="staff">
          <?php foreach ($roleFilters as $key => $label): ?>
          <button type="button" class="trc-filter-tab<?php echo $key === 'all' ? ' is-active' : ''; ?>" data-filter="<?php echo htmlspecialchars($key); ?>" aria-pressed="<?php echo $key === 'all' ? 'true' : 'false'; ?>">
            <?php echo htmlspecialchars($label); ?>
          </button>
          <?php endforeach; ?>
        </div>
      </div>

      <div class="trc-staff-grid" id="trcStaffGrid">
        <?php foreach ($staff as $s): ?>
        <article class="trc-staff-card" data-role="<?php echo htmlspecialchars($s['role']); ?>" data-reveal="fade-in-up">
          <div class="trc-staff-media">
            <img src="<?php echo htmlspecialchars($s['photo']); ?>" alt="<?php echo htmlspecialchars($s['name'] . ' — ' . $s['designation']); ?>" loading="lazy" />
            <span class="trc-num-pill"><?php echo htmlspecialchars($s['num']); ?></span>
          </div>
          <div class="trc-staff-body">
            <h3><?php echo htmlspecialchars($s['name']); ?></h3>
            <p class="trc-staff-role"><?php echo htmlspecialchars($s['designation']); ?></p>
          </div>
        </article>
        <?php endforeach; ?>

        <!-- Callout Unit Card filling the grid cleanly when ALL is active -->
        <div class="trc-staff-callout" id="trcStaffCallout" data-reveal="fade-in-up">
          <div>
            <span class="trc-eyebrow trc-eyebrow--light">TEP &bull; SVNIT SURAT</span>
            <h3>Research &amp; Consultancy Unit</h3>
            <p>Combining academic rigor with field-tested civil engineering, traffic microsimulation, and highway safety audits.</p>
          </div>
          <a href="contact.php#enquiry-form" class="trc-pill-white-btn">
            <span>CONNECT WITH US</span>
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  </section>

</main>
<?php include 'includes/footer.php'; ?>
