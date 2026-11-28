<?php
$activePage = 'team';
$pageTitle = 'Our Team & Faculty | TRC SVNIT Surat';
$pageDesc = 'Meet the professors, senior engineers, planners, and researchers driving road safety audits and transportation engineering at SVNIT Surat.';
require_once 'includes/site-data.php';
$faculty = getTRCFaculty();
$staff = getTRCStaff();
$roleFilters = [
    'all' => 'ALL',
    'senior' => 'SENIOR ENGINEERS',
    'engineer' => 'PROJECT ENGINEERS',
    'research' => 'RESEARCH ENGINEERS',
    'planning' => 'PLANNING & DRAFTING',
];
include 'includes/meta.php';
include 'includes/header.php';
?>
<main id="main" class="trc-subpage trc-team-rx-page">

  <!-- ========================================================= -->
  <!-- PAGE HERO HEADER (Mirrored from React Team.jsx, Rounded)  -->
  <!-- ========================================================= -->
  <section class="trc-rx-hero">
    <div class="trc-shell trc-rx-hero-inner" data-reveal="fade-in-up">
      <div class="trc-rx-eyebrow-row">
        <span class="trc-rx-diamond" aria-hidden="true"></span>
        <span class="trc-rx-label">OUR PEOPLE &mdash; TEP &bull; SVNIT, SURAT</span>
      </div>

      <h1 class="trc-rx-hero-title">
        PROFESSORS, CONSULTANTS &amp; PROJECT STAFF.
      </h1>

      <p class="trc-rx-hero-lead">
        Transportation engineering faculty and dedicated project engineers delivering research-backed consultancy, planning, and field execution.
      </p>
    </div>
  </section>

  <!-- ========================================================= -->
  <!-- SECTION 1: PROFESSORS & PROJECT CONSULTANTS (CENTERED)    -->
  <!-- ========================================================= -->
  <section id="consultants" class="trc-rx-section">
    <div class="trc-shell">
      <div class="trc-rx-sec-head" data-reveal="fade-in-up">
        <div class="trc-rx-sec-title-wrap">
          <div class="trc-rx-eyebrow-row">
            <span class="trc-rx-diamond" aria-hidden="true"></span>
            <span class="trc-rx-label">OUR PEOPLE</span>
          </div>
          <h2 class="trc-rx-sec-title">PROFESSORS &amp; PROJECT CONSULTANTS</h2>
        </div>
        <span class="trc-rx-label trc-rx-sec-sublabel">FACULTY LEADERSHIP</span>
      </div>

      <div class="trc-rx-faculty-grid">
        <?php foreach ($faculty as $f): ?>
        <article class="trc-rx-faculty-item" data-reveal="fade-in-up">
          <div class="trc-rx-faculty-card">
            <header class="trc-rx-faculty-card-head">
              <span class="trc-rx-card-tag">CONSULTANT</span>
              <span class="trc-rx-card-num"><?php echo htmlspecialchars($f['num']); ?></span>
            </header>

            <!-- Portrait Photo Stage (1:1 Aspect Ratio, natural color, rounded card) -->
            <div class="trc-rx-faculty-media">
              <img
                src="<?php echo htmlspecialchars($f['photo']); ?>"
                alt="<?php echo htmlspecialchars($f['name'] . ', ' . $f['designation']); ?>"
                loading="lazy"
              />
            </div>

            <div class="trc-rx-faculty-card-foot">
              <h3><?php echo htmlspecialchars($f['name']); ?></h3>
              <p><?php echo htmlspecialchars($f['designation']); ?></p>
            </div>
          </div>

          <?php if (!empty($f['profile'])): ?>
          <a
            href="<?php echo htmlspecialchars($f['profile']); ?>"
            target="_blank"
            rel="noopener noreferrer"
            class="trc-rx-profile-btn"
          >
            <span>PROFILE WEBSITE</span>
            <span class="material-symbols-outlined trc-arrow-icon" aria-hidden="true">arrow_forward</span>
          </a>
          <?php endif; ?>
        </article>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <!-- ========================================================= -->
  <!-- SECTION 2: PROJECT STAFF (2-COL MOBILE, 4-COL DESKTOP)    -->
  <!-- ========================================================= -->
  <section id="project-staff" class="trc-rx-section trc-rx-section--staff">
    <div class="trc-shell">
      <div class="trc-rx-sec-head trc-rx-sec-head--staff" data-reveal="fade-in-up">
        <div class="trc-rx-sec-title-wrap">
          <div class="trc-rx-eyebrow-row">
            <span class="trc-rx-diamond" aria-hidden="true"></span>
            <span class="trc-rx-label">OUR PEOPLE</span>
          </div>
          <h2 class="trc-rx-sec-title">PROJECT STAFF</h2>
        </div>

        <!-- Role Filter Bar (rounded pills) -->
        <div class="trc-rx-filter-bar" role="group" aria-label="Filter project staff by role" data-filter-group="staff">
          <?php foreach ($roleFilters as $key => $label): ?>
          <button
            type="button"
            class="trc-filter-tab trc-rx-filter-btn<?php echo $key === 'all' ? ' is-active' : ''; ?>"
            data-filter="<?php echo htmlspecialchars($key); ?>"
            aria-pressed="<?php echo $key === 'all' ? 'true' : 'false'; ?>"
          >
            <?php echo htmlspecialchars($label); ?>
          </button>
          <?php endforeach; ?>
        </div>
      </div>

      <div class="trc-staff-grid trc-rx-staff-grid" id="trcStaffGrid">
        <?php foreach ($staff as $s): ?>
        <article class="trc-staff-card trc-rx-staff-card" data-role="<?php echo htmlspecialchars($s['role']); ?>" data-reveal="fade-in-up">
          <div class="trc-rx-staff-inner">
            <div class="trc-rx-staff-media">
              <img
                src="<?php echo htmlspecialchars($s['photo']); ?>"
                alt="<?php echo htmlspecialchars($s['name'] . ', ' . $s['designation']); ?>"
                loading="lazy"
              />
              <span class="trc-rx-staff-num"><?php echo htmlspecialchars($s['num']); ?></span>
            </div>
            <div class="trc-rx-staff-body">
              <h3><?php echo htmlspecialchars($s['name']); ?></h3>
              <div class="trc-rx-staff-role-row">
                <span class="trc-rx-diamond trc-rx-diamond--sm" aria-hidden="true"></span>
                <span><?php echo htmlspecialchars($s['designation']); ?></span>
              </div>
            </div>
          </div>
        </article>
        <?php endforeach; ?>

        <!-- Collaborative Unit Callout (Rounded dark-emerald card matching React Team.jsx) -->
        <div class="trc-staff-callout trc-rx-staff-callout" id="trcStaffCallout" data-reveal="fade-in-up">
          <div class="trc-rx-callout-copy">
            <div class="trc-rx-eyebrow-row">
              <span class="trc-rx-diamond" aria-hidden="true"></span>
              <span class="trc-rx-label trc-rx-label--muted">TEP &mdash; SVNIT, SURAT</span>
            </div>
            <h3>RESEARCH &amp; CONSULTANCY UNIT</h3>
            <p>
              Combining academic rigor with field-tested civil engineering, traffic modeling, and structural drafting.
            </p>
          </div>
          <a href="contact.php#enquiry-form" class="trc-rx-callout-btn">
            <span>CONNECT WITH US</span>
            <span class="material-symbols-outlined trc-arrow-icon" aria-hidden="true">arrow_forward</span>
          </a>
        </div>
      </div>
    </div>
  </section>

</main>
<?php include 'includes/footer.php'; ?>
