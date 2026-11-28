<?php
/**
 * TRC SVNIT - Central Content & Entity Data Store for PHP Pages
 * Mirrors all authentic faculty, staff, publications, news, gallery, certificates,
 * capabilities, principles, and partner data cleanly in PHP.
 */

function getTRCSiteInfo(): array {
    return [
        'name' => 'TEP Research & Consultancy Cell',
        'short' => 'TRC',
        'dept' => 'Department of Civil Engineering',
        'institute' => 'Sardar Vallabhbhai National Institute of Technology (SVNIT), Surat',
        'email' => 'trc@svnit.ac.in',
        'phone' => '+91 261 2259571',
        'ext' => 'Ext: 1500',
        'address' => [
            'Department of Civil Engineering,',
            'Sardar Vallabhbhai National Institute of Technology (SVNIT),',
            'Ichchhanath, Surat - 395007, Gujarat, India',
        ],
        'hours' => 'Monday - Friday: 9:30 AM - 5:30 PM',
    ];
}

function getTRCPrinciples(): array {
    return [
        [
            'id' => 'safety',
            'num' => '01',
            'title' => 'Safety First',
            'description' => 'Unwavering commitment to workplace safety, vulnerable road-user protection, and IRC:SP:88 regulatory compliance on every corridor and site, every day.',
            'image' => 'images/SAFETY FIRST.jpg',
            'alt' => 'Civil engineers wearing hard hats and high-visibility vests reviewing site safety plans',
        ],
        [
            'id' => 'quality',
            'num' => '02',
            'title' => 'Quality Execution',
            'description' => 'Rigorous empirical field verification, material traceability, calibrated traffic instrumentation, and independent peer-reviewed audits at every engineering milestone.',
            'image' => 'images/QUALITY EXECUTION.jpg',
            'alt' => 'Organized civil infrastructure construction yard and precision materials staging',
        ],
        [
            'id' => 'delivery',
            'num' => '03',
            'title' => 'Reliable Delivery',
            'description' => 'Integrated survey scheduling, rapid data-to-insight modeling, and transparent milestone reporting ensure statutory approvals and DPR deliveries stay on time.',
            'image' => 'images/RELIABLE DELIVERY.jpg',
            'alt' => 'Project stakeholders shaking hands on timely infrastructure delivery',
        ],
        [
            'id' => 'partnerships',
            'num' => '04',
            'title' => 'Long-Term Partnerships',
            'description' => 'Dedicated full-lifecycle advisory, capacity-building workshops, and multi-phase technical collaboration with national highways and urban infrastructure bodies.',
            'image' => 'images/LONG-TERM PARTNERSHIPS.jpg',
            'alt' => 'Collaborative hands joining four interlocking puzzle pieces representing institutional partnership',
        ],
    ];
}

function getTRCAssociations(): array {
    return [
        ['code' => 'NHAI', 'name' => 'National Highways Authority of India', 'sector' => 'Expressways & NH Corridors'],
        ['code' => 'MoRTH', 'name' => 'Ministry of Road Transport & Highways', 'sector' => 'National Policy & Standards'],
        ['code' => 'GSRDC', 'name' => 'Gujarat State Road Dev. Corp.', 'sector' => 'State Highways & BOTs'],
        ['code' => 'SMC', 'name' => 'Surat Municipal Corporation', 'sector' => 'Urban Arterial & Signals'],
        ['code' => 'GIDC', 'name' => 'Gujarat Industrial Dev. Corp.', 'sector' => 'Industrial Logistics Zones'],
        ['code' => 'SSCDL', 'name' => 'Surat Smart City Development Ltd.', 'sector' => 'BRTS & Intelligent Transit'],
        ['code' => 'DFCCIL', 'name' => 'Dedicated Freight Corridor Corp.', 'sector' => 'Multimodal Rail & ROBs'],
        ['code' => 'GMRC', 'name' => 'Gujarat Metro Rail Corporation', 'sector' => 'Geodetic & Transit Access'],
    ];
}

function getTRCCertificates(): array {
    return [
        [
            'id' => '01',
            'title' => 'IRC Road Safety Audit Empanelment',
            'issuer' => 'Indian Roads Congress (IRC:SP:88)',
            'image' => 'images/fake-certi-1.jpg',
        ],
        [
            'id' => '02',
            'title' => 'MoRTH & NHAI Technical Standing',
            'issuer' => 'Ministry of Road Transport & Highways',
            'image' => 'images/fake-certi-2.jpg',
        ],
        [
            'id' => '03',
            'title' => 'Govt. of Gujarat R&B Registration',
            'issuer' => 'Roads & Buildings Department (R&B)',
            'image' => 'images/fake-certi-3.jpg',
        ],
    ];
}

function getTRCCapabilities(): array {
    return [
        [
            'id' => 'traffic-studies',
            'num' => '01',
            'title' => 'Traffic Surveys & Field Studies',
            'image' => 'images/Traffic Engineering.jpg',
            'service_url' => 'service-traffic-engineering.php',
            'summary' => 'We plan and execute classified volume, speed, turning-movement, origin-destination, and pedestrian surveys using automated counters and radar telemetry under Indo-HCM & IRC standards.',
            'outputs' => [
                'Classified traffic volume and turning-movement counts',
                'Spot speed, radar telemetry, travel time & delay studies',
                'Origin-destination matrices and parking accumulation surveys',
                'Capacity and Level-of-Service (LOS) evaluation per Indo-HCM',
            ],
        ],
        [
            'id' => 'road-safety',
            'num' => '02',
            'title' => 'Road Safety Audits & Crash Analysis',
            'image' => 'images/Road Safety Audit.jpg',
            'service_url' => 'service-road-safety.php',
            'summary' => 'Stage-wise IRC:SP:88 audits across DPR, construction, and O&M stages coupled with crash blackspot diagnostics and ranked countermeasures.',
            'outputs' => [
                'IRC:SP:88 Road Safety Audit reports with ranked recommendations',
                'Blackspot identification and sight-distance field diagnostics',
                'Crash frequency modeling and surrogate conflict (TTC/PET) analysis',
                'Before-and-after safety intervention effectiveness audits',
            ],
        ],
        [
            'id' => 'traffic-impact',
            'num' => '03',
            'title' => 'Traffic Impact Assessment (TIA)',
            'image' => 'images/Land Development.jpg',
            'service_url' => 'service-land-development.php',
            'summary' => 'Comprehensive TIA for townships, industrial parks, commercial hubs, and freight terminals evaluating horizon-year congestion and site access.',
            'outputs' => [
                'Trip generation, distribution, and modal split forecasts',
                'Adjacent corridor and junction horizon-year performance tests',
                'Swept-path geometry, internal circulation, and parking audits',
                'Authority-ready mitigation & signalization submissions',
            ],
        ],
        [
            'id' => 'junction-design',
            'num' => '04',
            'title' => 'Junction Improvement & Signal Design',
            'image' => 'images/Transportation.jpg',
            'service_url' => 'service-transportation.php',
            'summary' => 'Geometric channelization, roundabout optimization, and calibrated microsimulation-verified signal phasing for congested urban intersections.',
            'outputs' => [
                'Topographic & saturation flow existing-condition audit',
                'Geometric channelization and pedestrian refuge island drawings',
                'Actuated and green-wave coordinated signal timing plans',
                'VISSIM microscopic simulation validation before civil works',
            ],
        ],
        [
            'id' => 'transport-planning',
            'num' => '05',
            'title' => 'Corridor & Multimodal Transport Planning',
            'image' => 'images/Rail Services.jpg',
            'service_url' => 'service-rail-services.php',
            'summary' => 'Citywide Comprehensive Mobility Plans, BRTS/Metro feeder integration, and freight corridor connectivity studies.',
            'outputs' => [
                'Corridor and area-wide traffic management master plans',
                'BRTS & Metro station catchment accessibility benchmarks',
                'Four-stage regional travel demand modeling and forecasting',
                'Statutory planning monographs and investment policy briefs',
            ],
        ],
        [
            'id' => 'independent-review',
            'num' => '06',
            'title' => 'Independent DPR Review & Proof-Checking',
            'image' => 'images/Hero_1.jpg',
            'service_url' => 'service-road-safety.php',
            'summary' => 'Impartial third-party scrutiny of Detailed Project Reports, geometric alignments, FWD pavement designs, and traffic forecasts for public agencies.',
            'outputs' => [
                'Independent DPR verification against MoRTH & IRC specifications',
                'Third-party proof-checking of pavement and interchange designs',
                'Resilient moduli backcalculation and overlay life appraisals',
                'Technical clarification reviews with concessionaire engineering teams',
            ],
        ],
        [
            'id' => 'its-analytics',
            'num' => '07',
            'title' => 'UAV Trajectory & AI ITS Analytics',
            'image' => 'images/Smart Mobility.jpg',
            'service_url' => 'service-smart-mobility.php',
            'summary' => 'High-altitude drone video analytics, automated vehicle detection, and surrogate safety conflict extraction in heterogeneous mixed traffic.',
            'outputs' => [
                'Multi-class vehicle detection and continuous trajectory datasets',
                'Automated speed, headway, and PET/TTC near-miss analytics',
                'Interactive corridor safety and congestion monitoring dashboards',
                'Edge-ready ICCC telemetry integration workflows',
            ],
        ],
        [
            'id' => 'training',
            'num' => '08',
            'title' => 'Training & Capacity Building',
            'image' => 'images/tep-about-photo.jpg',
            'service_url' => 'service-surveying.php',
            'summary' => 'Intensive certification clinics and field workshops on IRC:SP:88 road safety audits, Indo-HCM calibration, and microsimulation.',
            'outputs' => [
                'IRC:SP:88 Road Safety Auditor certification workshops',
                'Hands-on Indo-HCM & VISSIM modeling clinics for PWD/NHAI staff',
                'Field instrumentation & RTK-GNSS surveying training modules',
            ],
        ],
    ];
}

function getTRCFaculty(): array {
    return [
        [
            'num' => '001',
            'name' => 'Dr. Gaurang J. Joshi',
            'designation' => 'Professor, SVNIT Surat',
            'expertise' => 'Traffic Flow Theory, Urban Public Transport Planning, Intelligent Transportation Systems',
            'photo' => 'images/team/gaurang-joshi.jpg',
            'profile' => 'https://gjjoshisvnit.com/',
        ],
        [
            'num' => '002',
            'name' => 'Dr. Shriniwas S. Arkatkar',
            'designation' => 'Professor, SVNIT Surat',
            'expertise' => 'Highway Capacity (Indo-HCM), Road Safety Audits (IRC:SP:88), Microscopic Simulation',
            'photo' => 'images/team/shriniwas-arkatkar.jpg',
            'profile' => 'https://shriniwasprofile.wordpress.com/',
        ],
        [
            'num' => '003',
            'name' => 'Dr. Ashish Dhamaniya',
            'designation' => 'Professor, SVNIT Surat',
            'expertise' => 'Mixed Traffic Operations, Intersection Diagnostics, Highway Geometrics & Pavement Audits',
            'photo' => 'images/team/ashish-dhamaniya.jpg',
            'profile' => 'https://sites.google.com/view/drashishdhamaniya',
        ],
    ];
}

function getTRCStaff(): array {
    return [
        ['num' => '001', 'name' => 'Maitrik Bhadresa', 'designation' => 'Senior Project Engineer', 'role' => 'senior', 'photo' => 'images/team/maitrik-bhadresa.jpg'],
        ['num' => '002', 'name' => 'Krushnaraj Chaudhari', 'designation' => 'Senior Project Engineer', 'role' => 'senior', 'photo' => 'images/team/krushnaraj-chaudhari.jpg'],
        ['num' => '003', 'name' => 'Siddharth Umrigar', 'designation' => 'Project Engineer', 'role' => 'engineer', 'photo' => 'images/team/siddharth-umrigar.jpg'],
        ['num' => '004', 'name' => 'Ayush Patel', 'designation' => 'Project Planner', 'role' => 'planning', 'photo' => 'images/team/ayush-patel.jpg'],
        ['num' => '005', 'name' => 'Meshvi Patel', 'designation' => 'Project Engineer', 'role' => 'engineer', 'photo' => 'images/team/meshvi-patel.jpg'],
        ['num' => '006', 'name' => 'Darshit Lad', 'designation' => 'Project Engineer', 'role' => 'engineer', 'photo' => 'images/team/darshit-lad.jpg'],
        ['num' => '007', 'name' => 'Sunil Kumar', 'designation' => 'Draftsman', 'role' => 'planning', 'photo' => 'images/team/sunil-kumar.jpg'],
        ['num' => '008', 'name' => 'Mihir Koladiya', 'designation' => 'Research Project Engineer', 'role' => 'research', 'photo' => 'images/team/Mihir Koladiya.jpg'],
        ['num' => '009', 'name' => 'Harsh Kakkad', 'designation' => 'Research Project Engineer', 'role' => 'research', 'photo' => 'images/team/Harsh Kakkad.jpg'],
    ];
}

function getTRCPublications(): array {
    return [
        [
            'id' => 'pub-01',
            'category' => 'journal',
            'category_label' => 'Journal Article',
            'year' => '2024',
            'badge' => 'JOURNAL / 2024',
            'title' => 'Expressway Capacity & Heterogeneous Flow',
            'authors' => 'Dr. Shriniwas S. Arkatkar, Dr. Gaurang J. Joshi, Siddharth Umrigar',
            'venue' => 'Journal of Transportation Engineering, Part A: Systems (ASCE) • Vol. 150(4)',
            'identifier' => 'DOI: 10.1061/JTEPBS.0001842 • SCI Indexed',
            'scope' => 'Indo-HCM Calibration • Dynamic PCU Modeling',
            'image' => 'images/Traffic Engineering.jpg',
            'alt' => 'Multi-lane expressway traffic flow analysis',
            'summary' => 'Empirical speed-flow relationships and dynamic Passenger Car Unit (PCU) estimations calibrated across six-lane intercity corridors under mixed traffic conditions in Western India.',
        ],
        [
            'id' => 'pub-02',
            'category' => 'journal',
            'category_label' => 'Journal Article',
            'year' => '2024',
            'badge' => 'JOURNAL / 2024',
            'title' => 'Proactive Corridor Crash Risk Modeling',
            'authors' => 'Dr. Ashish Dhamaniya, Dr. Shriniwas S. Arkatkar, Maitrik Bhadresa',
            'venue' => 'Accident Analysis & Prevention (Elsevier) • Vol. 196',
            'identifier' => 'DOI: 10.1016/j.aap.2024.107428 • Q1 Journal',
            'scope' => 'Surrogate Safety • Blackspot Diagnostics',
            'image' => 'images/Road Safety Audit.jpg',
            'alt' => 'Highway corridor safety geometry and signage assessment',
            'summary' => 'Integrates Unmanned Aerial Vehicle (UAV) trajectory extraction with Time-to-Collision (TTC) conflict thresholds to identify high-risk weaving and merge zones prior to crash occurrence.',
        ],
        [
            'id' => 'pub-03',
            'category' => 'conference',
            'category_label' => 'Conference Paper',
            'year' => '2023',
            'badge' => 'CONFERENCE / 2023',
            'title' => 'Connected Corridor Signal Optimization',
            'authors' => 'Dr. Gaurang J. Joshi, Krushnaraj Chaudhari, Dr. Ashish Dhamaniya',
            'venue' => 'Transportation Research Board (TRB) Annual Meeting • Washington, D.C.',
            'identifier' => 'TRB Paper No. 23-03194 • Compendium of Papers',
            'scope' => 'ATCS Timing • Queue Spillback Mitigation',
            'image' => 'images/Smart Mobility.jpg',
            'alt' => 'Adaptive urban intersection control and detector network',
            'summary' => 'Evaluates platoon-responsive adaptive signal plans along high-density BRT and mixed-traffic arterials in Surat, demonstrating measurable reductions in intersection control delay.',
        ],
        [
            'id' => 'pub-04',
            'category' => 'report',
            'category_label' => 'Technical Report',
            'year' => '2023',
            'badge' => 'REPORT / 2023',
            'title' => 'Comprehensive Mobility Plan Methodology',
            'authors' => 'Dr. Gaurang J. Joshi, TEP Consultancy Cell, SVNIT Surat',
            'venue' => 'SVNIT-MOUD Statutory Consultancy Monograph • Gujarat Urban Nodes',
            'identifier' => 'TEP-TR-2023-11 • Statutory Planning Guideline',
            'scope' => 'Four-Stage Modeling • Transit Oriented Nodes',
            'image' => 'images/Transportation.jpg',
            'alt' => 'Regional multi-modal urban transit interchange corridor',
            'summary' => 'Standardized household travel survey sampling, mode-choice utility calibration, and multimodal network assignment protocols prepared for municipal corporations and Smart City SPVs.',
        ],
        [
            'id' => 'pub-05',
            'category' => 'conference',
            'category_label' => 'Conference Paper',
            'year' => '2023',
            'badge' => 'CONFERENCE / 2023',
            'title' => 'Multimodal Rail Terminal Accessibility',
            'authors' => 'Siddharth Umrigar, Dr. Gaurang J. Joshi, Maitrik Bhadresa',
            'venue' => 'World Conference on Transport Research (WCTR) • Montreal',
            'identifier' => 'WCTR-2023-814 • Track B2 Passenger Transport',
            'scope' => 'Pedestrian LOS • Station Catchment Integration',
            'image' => 'images/Rail Services.jpg',
            'alt' => 'High-capacity urban rail transit platform and concourse',
            'summary' => 'Quantifies first- and last-mile feeder transfer penalties around high-speed and suburban railway stations, establishing Station Accessibility Index benchmarks for Indian cities.',
        ],
        [
            'id' => 'pub-06',
            'category' => 'chapter',
            'category_label' => 'Book Chapter',
            'year' => '2022',
            'badge' => 'CHAPTER / 2022',
            'title' => 'BIM & UAV Surveying in Geometric Audits',
            'authors' => 'Dr. Ashish Dhamaniya, Krushnaraj Chaudhari, TEP Geomatics Group',
            'venue' => 'Springer Lecture Notes in Civil Engineering • Advances in Geomatics',
            'identifier' => 'ISBN 978-981-19-4210-5 • Ch. 14',
            'scope' => 'Point Cloud Alignment • IRC Geometric Checks',
            'image' => 'images/Surveying.jpg',
            'alt' => 'Precision topographic and corridor alignment surveying',
            'summary' => 'Documents workflow automation from RTK-drone orthomosaics to Civil 3D stopping sight distance verification and IRC:SP:84/SP:88 compliance reporting on brownfield highways.',
        ],
    ];
}

function getTRCPublicationTracks(): array {
    return [
        [
            'index' => '01',
            'title' => 'Highway Capacity & Level of Service',
            'scope' => 'Indo-HCM Calibration / Mixed-Traffic PCU',
            'description' => 'Peer-reviewed formulations for multilane highways, signalized intersections, and urban mid-block segments across Gujarat and national expressways.',
            'tags' => 'ASCE • TRR • INDO-HCM',
        ],
        [
            'index' => '02',
            'title' => 'Road Safety & Surrogate Conflict Analytics',
            'scope' => 'Blackspot Remediation / Proactive Risk Models',
            'description' => 'Empirical crash-modification models, pedestrian crossing risk indices, and IRC:SP:88 stage-wise audit frameworks validated on NHAI corridors.',
            'tags' => 'ELSEVIER AAP • IRC:SP:88',
        ],
        [
            'index' => '03',
            'title' => 'Urban Public Transit & Accessibility',
            'scope' => 'BRTS Operations / Multimodal Integration',
            'description' => 'Service reliability metrics, headways under mixed bus-bay interference, and feeder catchment demand forecasting for Metro and BRTS networks.',
            'tags' => 'WCTR • TRANSPORT POLICY',
        ],
        [
            'index' => '04',
            'title' => 'Statutory Codes & Consultancy Monographs',
            'scope' => 'Technical Reports / Policy Briefs',
            'description' => 'Peer-reviewed technical reports, corridor DPR methodologies, and municipal mobility guidelines submitted to State PWD, NHAI, and MoRTH.',
            'tags' => 'MORTH • NHAI • SVNIT TEP',
        ],
    ];
}

function getTRCNewsLead(): array {
    return [
        'id' => 'uav-observatory',
        'category' => 'research',
        'badge' => 'RESEARCH GRANT · 24 NOV 2026',
        'cat_label' => 'Research & Grants',
        'date' => '24 NOV 2026',
        'sponsor' => 'NHAI & DST SPONSORED',
        'read_time' => '4 MIN READ',
        'title' => 'SVNIT Launches Gujarat\'s First UAV Surrogate Safety & Traffic Conflict Observatory',
        'summary' => 'Led by Dr. Gaurang J. Joshi and Dr. Shriniwas S. Arkatkar, the new observatory integrates high-altitude drone trajectory extraction with real-time blackspot diagnostics across 180 km of NH-48.',
        'body' => 'The Transportation Engineering & Planning division at SVNIT Surat has commissioned a dedicated UAV trajectory and surrogate safety observatory. By pairing high-altitude 4K drone feeds with automated computer-vision tracking, researchers can quantify post-encroachment time (PET) and time-to-collision (TTC) without waiting for multi-year crash histories.',
        'bullets' => [
            'Covers 180 km of high-volume NH-48 freight and commuter corridors',
            'Calibrates mixed-traffic conflict thresholds for 2-wheelers, LCVs, and multi-axle trucks',
            'Direct data pipeline for NHAI and Gujarat R&B blackspot remediation',
        ],
        'image' => 'images/Smart Mobility.jpg',
        'alt' => 'SVNIT Transportation Engineering AI traffic trajectory command lab',
    ];
}

function getTRCNewsItems(): array {
    return [
        [
            'id' => 'safety-audit-320',
            'category' => 'field',
            'cat_label' => 'Field Milestone',
            'date' => '12 NOV 2026',
            'read_time' => '3 MIN READ',
            'title' => '320 km Stage-III Safety Audit Completed on Gujarat State Highways',
            'summary' => 'Prioritized 42 high-risk blackspots with ranked low-cost geometric and signage countermeasures.',
            'body' => 'Our field audit engineers completed comprehensive daytime and night-time inspections across 320 km of state highway corridors, identifying 42 priority blackspots and recommending ranked, cost-effective geometric and signage interventions.',
            'bullets' => [
                'IRC:SP:88 compliance verification across 64 at-grade junctions',
                'Retro-reflectivity and edge-drop diagnostics along paved shoulders',
                'Immediate low-cost chevron, rumble strip, and guard-rail terminal upgrades',
            ],
            'image' => 'images/Road Safety Audit.jpg',
            'alt' => 'Road safety audit inspection on state highway',
        ],
        [
            'id' => 'irc-pcu-adoption',
            'category' => 'events',
            'cat_label' => 'Events & IRC',
            'date' => '28 OCT 2026',
            'read_time' => '5 MIN READ',
            'title' => 'IRC:SP-106 Expressway PCU Calibration Adopted in Draft Revision',
            'summary' => 'SVNIT\'s empirical multi-lane dynamic PCU tables accepted by the IRC Highway Specifications committee.',
            'body' => 'Empirical dynamic Passenger Car Unit (PCU) curves developed by Dr. S. S. Arkatkar, Dr. G. J. Joshi, and Dr. A. Dhamaniya have been accepted into the draft revision of the Indian Roads Congress multi-lane expressway capacity guidelines.',
            'bullets' => [
                'Derived from multi-day ATCC and radar speed-flow datasets',
                'Accounts for heavy-vehicle share and grade resistance on 6-lane corridors',
                'Improves level-of-service (LOS) accuracy for DPR proof checking',
            ],
            'image' => 'images/Transportation.jpg',
            'alt' => 'Indian Roads Congress technical committee review',
        ],
        [
            'id' => 'brts-pedestrian',
            'category' => 'research',
            'cat_label' => 'Research & Grants',
            'date' => '15 OCT 2026',
            'read_time' => '4 MIN READ',
            'title' => 'First-Mile BRTS Pedestrian Audit Rolls Out Across 18 Stations',
            'summary' => 'Joint study with Surat Sitilink evaluates curb ramps, tactile paving, and signalized crossing compliance.',
            'body' => 'Working alongside Surat Sitilink, the TEP research group is evaluating 500-meter pedestrian catchments around 18 high-ridership BRTS stations to benchmark sidewalk continuity, curb ramps, and signalized crossing times.',
            'bullets' => [
                'Audits 1:12 accessible ramp slopes and tactile warning strips',
                'Measures pedestrian delay at median-station signalized crosswalks',
                'Produces station-by-station accessibility scorecards',
            ],
            'image' => 'images/Rail Services.jpg',
            'alt' => 'Surat BRTS multimodal transit corridor',
        ],
        [
            'id' => 'hazira-axle-load',
            'category' => 'field',
            'cat_label' => 'Field Milestone',
            'date' => '02 OCT 2026',
            'read_time' => '3 MIN READ',
            'title' => 'Hazira Port Freight Axle-Load Survey Delivers Pavement Brief',
            'summary' => '7-day continuous ATCC and weigh-in-motion dataset calibrated rigid overlay thickness for heavy trailers.',
            'body' => 'A 7-day continuous classified volume and axle-load spectrum study along the Hazira industrial corridor quantified overloaded container-trailer shares to calibrate rigid pavement overlay thickness.',
            'bullets' => [
                'Over 42,000 commercial axle passes logged via ATCC sensors',
                'Updated Vehicle Damage Factor (VDF) inputs for IRC:37 / IRC:58',
                'Recommendations for dedicated heavy-freight turning lanes',
            ],
            'image' => 'images/Traffic Engineering.jpg',
            'alt' => 'Automated traffic counter survey on industrial corridor',
        ],
        [
            'id' => 'rsa-certification',
            'category' => 'events',
            'cat_label' => 'Events & IRC',
            'date' => '19 SEP 2026',
            'read_time' => '2 MIN READ',
            'title' => '5-Day IRC:SP:88 Road Safety Auditor Certification at SVNIT',
            'summary' => '45 highway engineers from R&B Gujarat and NHAI completed practical blackspot audit field training.',
            'body' => 'Forty-five practicing highway engineers from Gujarat R&B, NHAI, and municipal corporations completed intensive classroom and field blackspot audit training at the SVNIT Surat campus.',
            'bullets' => [
                'Live field audit exercises on urban arterial junctions in Surat',
                'Crash collision diagramming and speed-study workshops',
                'Stage-wise DPR, construction, and O&M audit checklists',
            ],
            'image' => 'images/tep-about-photo.jpg',
            'alt' => 'Work-zone traffic safety workshop',
        ],
        [
            'id' => 'vissim-benchmark',
            'category' => 'research',
            'cat_label' => 'Research & Grants',
            'date' => '04 SEP 2026',
            'read_time' => '4 MIN READ',
            'title' => 'Microsimulation Benchmark for Actuated Arterial Signal Corridors',
            'summary' => 'VISSIM calibration reduced peak-hour queue spillback by 28% across five Surat Ring Road junctions.',
            'body' => 'Using calibrated VISSIM models for heterogeneous Indian traffic, the team demonstrated a 28% reduction in peak-hour queue spillback across five consecutive signalized intersections along Surat Ring Road.',
            'bullets' => [
                'Coordinated green-wave offsets tuned for mixed 2-wheeler & bus platoons',
                'Eliminates upstream intersection gridlock during evening peak',
                'Ready for deployment on adaptive traffic control systems (ATCS)',
            ],
            'image' => 'images/Hero_1.jpg',
            'alt' => 'Grade-separated highway interchange',
        ],
    ];
}

function getTRCNewsEvents(): array {
    return [
        [
            'date' => '18 DEC 2026',
            'venue' => 'SVNIT AUDITORIUM',
            'title' => 'National Workshop on Indo-HCM & Urban Junction Design',
            'description' => 'Hands-on calibration clinic covering saturation flow, roundabout capacity, and signal phasing.',
            'highlight' => true,
        ],
        [
            'date' => '14 JAN 2027',
            'venue' => 'GANDHINAGAR',
            'title' => 'Gujarat Highway Safety Audit & Blackspot Review Summit',
            'description' => 'Joint technical review with R&B Department engineers on crash prediction and work-zone safety.',
            'highlight' => false,
        ],
        [
            'date' => '06 FEB 2027',
            'venue' => 'TEP LAB · SVNIT',
            'title' => 'Bituminous Mix & Aggregate QA/QC Testing Clinic',
            'description' => 'Live laboratory demonstration of Marshall stability, TSR, and VG-40 binder characterization.',
            'highlight' => false,
        ],
    ];
}

function getTRCAllStoriesMap(): array {
    $map = [];
    $lead = getTRCNewsLead();
    $map[$lead['id']] = $lead;
    foreach (getTRCNewsItems() as $item) {
        $map[$item['id']] = $item;
    }
    return $map;
}

function getTRCGalleryPlates(): array {
    return [
        [
            'id' => 'plate-01',
            'category' => 'structures',
            'cat_label' => 'Structures & Lab',
            'badge_label' => 'STRUCTURES',
            'aspect' => 'aspect-3-4',
            'dark_card' => false,
            'title' => 'Civil Engineering & Research Block',
            'meta' => 'SVNIT Campus, Surat · 2026',
            'src' => 'images/SVNIT Building.jpg',
            'description' => 'Transportation Engineering & Planning (TEP) research facility housing the traffic flow laboratory, pavement instrumentation, and structural testing units at SVNIT Surat.',
        ],
        [
            'id' => 'plate-02',
            'category' => 'surveys',
            'cat_label' => 'Field Surveys',
            'badge_label' => 'FIELD SURVEYS',
            'aspect' => 'aspect-4-3',
            'dark_card' => true,
            'title' => 'UAV Trajectory & ITS Command Lab',
            'meta' => 'SVNIT Traffic Lab · 2026',
            'src' => 'images/Smart Mobility.jpg',
            'description' => 'Multi-camera traffic conflict extraction, adaptive signal detector calibration, and automated vehicle classification using high-altitude drone video telemetry.',
        ],
        [
            'id' => 'plate-03',
            'category' => 'corridors',
            'cat_label' => 'Highway Corridors',
            'badge_label' => 'CORRIDORS',
            'aspect' => 'aspect-16-10',
            'dark_card' => false,
            'title' => 'Six-Lane Interurban Expressway',
            'meta' => 'NH-48 Bharuch-Surat · 2025',
            'src' => 'images/Transportation.jpg',
            'description' => 'Paved shoulder continuity, longitudinal drainage evaluation, and high-speed lane-marking retro-reflectivity verification along NH-48.',
        ],
        [
            'id' => 'plate-04',
            'category' => 'safety',
            'cat_label' => 'Safety Audits',
            'badge_label' => 'SAFETY AUDIT',
            'aspect' => 'aspect-square',
            'dark_card' => false,
            'title' => 'IRC:SP:88 Stage-III Road Safety Audit',
            'meta' => 'Ahmedabad-Vadodara · 2025',
            'src' => 'images/Road Safety Audit.jpg',
            'description' => 'On-site crash barrier terminal inspection, stopping sight distance measurement, and blackspot remediation logging.',
        ],
        [
            'id' => 'plate-05',
            'category' => 'structures',
            'cat_label' => 'Structures & Lab',
            'badge_label' => 'STRUCTURES',
            'aspect' => 'aspect-4-5',
            'dark_card' => true,
            'title' => 'Modular Steel & Viaduct Frame',
            'meta' => 'GIFT City Corridor · 2025',
            'src' => 'images/daniel-mccullough-HtBlQdxfG9k-unsplash.jpg',
            'description' => 'Elevated interchange structural framing, bearing seat inspection, and geometric alignment tolerance checks.',
        ],
        [
            'id' => 'plate-06',
            'category' => 'surveys',
            'cat_label' => 'Field Surveys',
            'badge_label' => 'FIELD SURVEYS',
            'aspect' => 'aspect-4-3',
            'dark_card' => false,
            'title' => 'Classified Traffic Volume & ATCC',
            'meta' => 'Hazira Industrial Corridor · 2025',
            'src' => 'images/Traffic Engineering.jpg',
            'description' => '24-hour classified axle-load and intersection turning-movement count campaign for heavy freight capacity modeling.',
        ],
        [
            'id' => 'plate-07',
            'category' => 'corridors',
            'cat_label' => 'Highway Corridors',
            'badge_label' => 'CORRIDORS',
            'aspect' => 'aspect-square',
            'dark_card' => false,
            'title' => 'Grade-Separated Interchange Ramp',
            'meta' => 'Surat-Navsari · 2024',
            'src' => 'images/Hero_1.jpg',
            'description' => 'Merge/diverge acceleration lane geometry and superelevation runoff verification on arterial flyover approaches.',
        ],
        [
            'id' => 'plate-08',
            'category' => 'safety',
            'cat_label' => 'Safety Audits',
            'badge_label' => 'SAFETY AUDIT',
            'aspect' => 'aspect-3-4',
            'dark_card' => true,
            'title' => 'Work-Zone Traffic Management',
            'meta' => 'NH-48 Widening · 2025',
            'src' => 'images/tep-about-photo.jpg',
            'description' => 'Field inspection team auditing temporary channelizer tapers, PPE compliance, and night-time reflective signage during active lane closures.',
        ],
        [
            'id' => 'plate-09',
            'category' => 'corridors',
            'cat_label' => 'Highway Corridors',
            'badge_label' => 'CORRIDORS',
            'aspect' => 'aspect-16-10',
            'dark_card' => false,
            'title' => 'BRTS & Multimodal Transit Corridor',
            'meta' => 'Surat BRTS · 2024',
            'src' => 'images/Rail Services.jpg',
            'description' => 'Dedicated median transit alignment, station catchment pedestrian crossings, and feeder terminal accessibility assessment.',
        ],
        [
            'id' => 'plate-10',
            'category' => 'structures',
            'cat_label' => 'Structures & Lab',
            'badge_label' => 'STRUCTURES',
            'aspect' => 'aspect-4-3',
            'dark_card' => false,
            'title' => 'Urban Arterial Pavement & Drainage',
            'meta' => 'Hazira Port Node · 2024',
            'src' => 'images/Land Development.jpg',
            'description' => 'Heavy-duty rigid and interlocking concrete pavement evaluation tailored for multi-axle container gantry traffic.',
        ],
        [
            'id' => 'plate-11',
            'category' => 'surveys',
            'cat_label' => 'Field Surveys',
            'badge_label' => 'FIELD SURVEYS',
            'aspect' => 'aspect-4-5',
            'dark_card' => false,
            'title' => 'RTK-GNSS & Corridor Topography',
            'meta' => 'Dahej PCPIR · 2024',
            'src' => 'images/Surveying.jpg',
            'description' => 'Precision ground control point acquisition and total-station corridor alignment surveying for industrial logistics links.',
        ],
        [
            'id' => 'plate-12',
            'category' => 'corridors',
            'cat_label' => 'Highway Corridors',
            'badge_label' => 'CORRIDORS',
            'aspect' => 'aspect-4-3',
            'dark_card' => true,
            'title' => 'Coastal Logistics Link Road',
            'meta' => 'South Gujarat Port Link · 2024',
            'src' => 'images/Hero_5.jpg',
            'description' => 'Bituminous concrete overlay evaluation, skid resistance checks, and freight corridor geometric upgrade inspection.',
        ],
    ];
}
