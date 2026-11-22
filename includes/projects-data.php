<?php
/**
 * TRC SVNIT - Master Research & Consultancy Projects Data
 * 10 Completed Projects across Civil & Transportation Engineering Domains
 */

function getTRCProjects() {
    return [
        1 => [
            'id' => 1,
            'title' => 'Surat Outer Ring Road Corridor & High-Speed Expressway Review',
            'sector' => 'highways',
            'sector_label' => 'HIGHWAYS & PAVEMENTS',
            'location' => 'Surat Outer Ring Road, Gujarat',
            'client' => 'Surat Urban Development Authority (SUDA)',
            'year' => '2025',
            'status' => 'completed',
            'status_label' => 'Completed',
            'image' => 'images/Transportation.jpg',
            'summary' => 'Comprehensive alignment safety audit, pavement structural evaluation, and grade-separated interchange feasibility for the 66-km multi-lane ring expressway.',
            'scope' => [
                'Conducted geometric alignment verification and sight distance evaluation along 66 km of expressway corridor.',
                'Carried out Falling Weight Deflectometer (FWD) structural capacity assessments on flexible pavement layers.',
                'Simulated interchange merging and diverging operations using microscopic traffic simulation to eliminate weave conflicts.',
                'Formulated drainage and cross-drainage recommendations meeting IRC:SP:42 and IRC:SP:88 specifications.'
            ],
            'methodologies' => 'IRC:SP:88, IRC:37-2018, Indo-HCM, Vissim Simulation, FWD Deflection Analysis',
            'outcomes' => 'Reduced predicted weaving collision risks by 42% at 4 major expressway interchanges and optimized overlay design thickness, saving significant public material costs.'
        ],
        2 => [
            'id' => 2,
            'title' => 'National Highway 48 Blackspot Rectification & Road Safety Audit',
            'sector' => 'safety',
            'sector_label' => 'ROAD SAFETY',
            'location' => 'NH-48 (Surat – Navsari Section), Gujarat',
            'client' => 'National Highways Authority of India (NHAI)',
            'year' => '2025',
            'status' => 'completed',
            'status_label' => 'Completed',
            'image' => 'images/Road Safety Audit.jpg',
            'summary' => 'IRC:SP:88 compliant operation-stage safety audit, accident blackspot engineering rectification, and collision reduction strategy for high-risk highway sections.',
            'scope' => [
                'Detailed crash frequency and severity indexing across 28 km of six-lane divided carriageway.',
                'Identification of 7 critical accident blackspots and root-cause engineering diagnostics.',
                'Design of retro-reflective signboards, road marking plans, and median opening channelisations.',
                'Work-zone safety protocol reviews during ongoing culvert rehabilitation work.'
            ],
            'methodologies' => 'IRC:SP:88-2019, MoRTH Road Safety Guidelines, Crash Severity Indexing, Radar Speed Profiling',
            'outcomes' => 'Implemented cost-effective physical channelisation and chevron warnings that reduced severe fatal crashes by 58% over a 12-month post-audit evaluation period.'
        ],
        3 => [
            'id' => 3,
            'title' => 'Urban Arterial Junction Signal Phasing & Intelligent Telemetry',
            'sector' => 'traffic',
            'sector_label' => 'TRAFFIC ENGINEERING',
            'location' => 'Ring Road Arterial Corridors, Surat',
            'client' => 'Surat Municipal Corporation (SMC)',
            'year' => '2024',
            'status' => 'completed',
            'status_label' => 'Completed',
            'image' => 'images/Traffic Engineering.jpg',
            'summary' => 'Comprehensive classified volume counts, radar speed surveys, Indo-HCM saturation flow analysis, and adaptive signal synchronisation across 8 high-density junctions.',
            'scope' => [
                'Video-based classified volume count (CVC) surveys capturing over 120,000 passenger car units (PCU) daily.',
                'Empirical saturation flow measurement and queue length dissipation studies under mixed-traffic conditions.',
                'Microscopic simulation and green-wave signal coordination design across 4.2 km corridor.',
                'Pedestrian crossing phase allocation and exclusive non-motorised transit (NMT) protection.'
            ],
            'methodologies' => 'Indo-HCM 2017, IRC:93-1985, Synchro, Vissim Signal Controller Optimization',
            'outcomes' => 'Achieved an average corridor delay reduction of 27% and increased junction level-of-service (LOS) from E to C during peak evening traffic.'
        ],
        4 => [
            'id' => 4,
            'title' => 'Western Dedicated Freight Corridor (DFC) Multimodal Rail Link',
            'sector' => 'rail',
            'sector_label' => 'RAIL SERVICES',
            'location' => 'DFC Western Corridor (Gothangam – Sachin Stretch)',
            'client' => 'Dedicated Freight Corridor Corporation of India (DFCCIL)',
            'year' => '2025',
            'status' => 'completed',
            'status_label' => 'Completed',
            'image' => 'images/Rail Services.jpg',
            'summary' => 'Track geometry clearance, road-over-bridge (ROB) structural approaches, and grade-separated intermodal freight connectivity evaluation.',
            'scope' => [
                'Intermodal freight transfer access planning and heavy truck queue mitigation at freight terminals.',
                'Structural approach road gradient reviews and high-clearance vertical curve checks for ROBs.',
                'Level-crossing elimination feasibility and replacement with twin-cell road underbridges (RUB).',
                'Vibration and settlement monitoring near railway embankment formations.'
            ],
            'methodologies' => 'Indian Railways Engineering Code, IRC:SP:54, Heavy Haul Axle Load Standards',
            'outcomes' => 'Ensured seamless multimodal container evacuation without bottlenecking adjacent state highway traffic and eliminated two hazardous level crossings.'
        ],
        5 => [
            'id' => 5,
            'title' => 'Smart City BRTS Transit Corridor Feasibility & Urban Mobility Plan',
            'sector' => 'smart-mobility',
            'sector_label' => 'SMART MOBILITY',
            'location' => 'Surat Smart City Infrastructure, Gujarat',
            'client' => 'Surat Smart City Development Ltd. (SSCDL)',
            'year' => '2024',
            'status' => 'completed',
            'status_label' => 'Completed',
            'image' => 'images/Smart Mobility.jpg',
            'summary' => 'Origin-destination travel demand modeling, bus rapid transit corridor optimization, and multi-modal integration with Surat Metro Phase-1.',
            'scope' => [
                'Citywide household travel survey and origin-destination trip matrix synthesis.',
                'Dedicated BRTS median lane operational planning and junction queue-jump prioritization.',
                'Feeder route optimization connecting residential neighborhoods to core BRTS and Metro stations.',
                'Accessibility audit for differently-abled and elderly transit commuters.'
            ],
            'methodologies' => 'CUBE Voyager 4-Step Travel Modeling, Indo-HCM Transit Capacity, IRC:106',
            'outcomes' => 'Boosted daily public transit ridership by 19% through optimized feeder routing and improved transfer convenience between BRTS and upcoming metro lines.'
        ],
        6 => [
            'id' => 6,
            'title' => 'Hazira Industrial Mega Logistics Park Access & Drainage Infrastructure',
            'sector' => 'land-development',
            'sector_label' => 'LAND DEVELOPMENT',
            'location' => 'Hazira Industrial Zone, Surat',
            'client' => 'Gujarat Industrial Development Corporation (GIDC)',
            'year' => '2024',
            'status' => 'completed',
            'status_label' => 'Completed',
            'image' => 'images/Land Development.jpg',
            'summary' => 'Traffic impact assessment (TIA), internal heavy-vehicle circulation design, stormwater master drainage network, and pavement life-cycle planning.',
            'scope' => [
                'Comprehensive Traffic Impact Assessment (TIA) for 150-acre multimodal warehousing park.',
                'Multi-axle trailer turning template design (AutoTURN) to avoid off-tracking hazards.',
                'Hydrological catchment modeling and concrete box-drain design for 50-year return storm events.',
                'Perpetual flexible pavement structural design for 100-million standard axles (MSA).'
            ],
            'methodologies' => 'IRC:37-2018, IRC:SP:42, SWMM Hydrology, AutoTURN Maneuver Analysis',
            'outcomes' => 'Prevented wet-season industrial waterlogging and ensured zero congestion spillover onto the Hazira-Surat port highway.'
        ],
        7 => [
            'id' => 7,
            'title' => 'Surat Metro Rail Corridor Geodetic Alignment & High-Precision LIDAR Survey',
            'sector' => 'surveying',
            'sector_label' => 'SURVEYING',
            'location' => 'Surat Metro Corridor (Dream City to Sarthana)',
            'client' => 'Gujarat Metro Rail Corporation (GMRC)',
            'year' => '2024',
            'status' => 'completed',
            'status_label' => 'Completed',
            'image' => 'images/Surveying.jpg',
            'summary' => 'High-density 3D mobile LIDAR corridor scanning, geodetic benchmark network establishment, and sub-centimeter right-of-way GIS mapping.',
            'scope' => [
                'Dual-frequency GNSS static geodetic network baseline observations across 21.6 km metro corridor.',
                'Mobile laser scanning (LIDAR) point cloud extraction capturing above-ground utilities and tree canopies.',
                'Sub-surface utility detection using Ground Penetrating Radar (GPR) at deep station excavation locations.',
                'Generation of high-fidelity digital elevation models (DEM) and Building Information Models (BIM).'
            ],
            'methodologies' => 'Leica Dual-Frequency GNSS, Terrestrial & Mobile LIDAR, GPR Radargram Analysis',
            'outcomes' => 'Delivered sub-10mm horizontal accuracy for viaduct pier placement and averted critical subterranean gas/telecom pipeline collisions.'
        ],
        8 => [
            'id' => 8,
            'title' => 'Heavy Axle Commercial Vehicle Weigh-In-Motion & FWD Pavement Testing',
            'sector' => 'highways',
            'sector_label' => 'HIGHWAYS & PAVEMENTS',
            'location' => 'Golden Corridor Industrial Arterial, Gujarat',
            'client' => 'Roads & Buildings Department (R&B), Govt. of Gujarat',
            'year' => '2024',
            'status' => 'completed',
            'status_label' => 'Completed',
            'image' => 'images/Hero_1.jpg',
            'summary' => 'Falling Weight Deflectometer (FWD) structural capacity assessment, backcalculation of resilient moduli, and mechanistic-empirical overlay design.',
            'scope' => [
                'FWD testing at 100-meter intervals assessing subgrade, sub-base, and bituminous layer deflections.',
                'Vehicle Damage Factor (VDF) spectrum derivation from high-speed Weigh-In-Motion (WIM) sensors.',
                'Non-destructive testing (NDT) of core samples to check fatigue cracking and rutting depths.',
                'Customized Bituminous Concrete (BC) overlay design accounting for extreme summer pavement temperatures.'
            ],
            'methodologies' => 'IRC:115-2014, IITPAVE Mechanistic Analysis, Weigh-In-Motion Telemetry',
            'outcomes' => 'Extended highway pavement service life by 12 years with an optimized 60mm stone mastic asphalt (SMA) overlay recommendation.'
        ],
        9 => [
            'id' => 9,
            'title' => 'Pedestrian Vulnerability & Multimodal Junction Geometry Redesign',
            'sector' => 'safety',
            'sector_label' => 'ROAD SAFETY',
            'location' => 'Ichchhanath & Athwa Junctions, Surat',
            'client' => 'Surat Traffic Police & Municipal Corporation',
            'year' => '2023',
            'status' => 'completed',
            'status_label' => 'Completed',
            'image' => 'images/daniel-mccullough-HtBlQdxfG9k-unsplash.jpg',
            'summary' => 'Vulnerable road user (VRU) conflict analysis, raised pedestrian crossings, pedestrian refuge islands, and sight-distance improvements.',
            'scope' => [
                'Automated video conflict analysis measuring Post-Encroachment Time (PET) and Time-to-Collision (TTC).',
                'Curb radius tightening at free-left turns to enforce safe turning speeds for passenger vehicles.',
                'Raised tabletop pedestrian crossings with tactile paving for visually impaired students and pedestrians.',
                'Reallocation of road space to create continuous 2.5m wide unobstructed sidewalk pathways.'
            ],
            'methodologies' => 'IRC:103-2012 (Pedestrian Facilities), Surrogate Safety Assessment Model (SSAM), Video Conflict Analytics',
            'outcomes' => 'Zero pedestrian fatalities recorded in the 18 months following physical junction remodelling.'
        ],
        10 => [
            'id' => 10,
            'title' => 'AI-Driven Sensor Video Telemetry & Live Traffic Conflict Dashboard',
            'sector' => 'smart-mobility',
            'sector_label' => 'SMART MOBILITY',
            'location' => 'Surat City Command & Control Centre (ICCC)',
            'client' => 'Smart City Mission, Govt. of India',
            'year' => '2025',
            'status' => 'completed',
            'status_label' => 'Completed',
            'image' => 'images/nopparuj-lamaikul-yvTmcnmArgY-unsplash.jpg',
            'summary' => 'Computer-vision edge computing pipelines extracting real-time vehicle trajectories, near-miss conflict indicators, and automated congestion alerts.',
            'scope' => [
                'Deployment of deep-learning object detection models calibrated for Indian mixed traffic heterogeneity.',
                'Real-time trajectory tracking of two-wheelers, auto-rickshaws, buses, and heavy goods vehicles.',
                'Automatic incident detection (AID) for wrong-way driving, stationary vehicle breakdowns, and jaywalking.',
                'Cloud-synced telemetry dashboard providing municipal traffic engineers with live level-of-service indicators.'
            ],
            'methodologies' => 'YOLOv8 Edge Analytics, DeepSORT Tracking, PyTorch, Real-Time CCTV Stream Telemetry',
            'outcomes' => 'Shortened emergency dispatch response times from 14 minutes to under 5 minutes for traffic incident clearing.'
        ]
    ];
}

function getTRCSectors() {
    return [
        'all' => 'ALL',
        'land-development' => 'LAND DEVELOPMENT',
        'highways' => 'HIGHWAYS & PAVEMENTS',
        'safety' => 'ROAD SAFETY',
        'traffic' => 'TRAFFIC ENGINEERING',
        'rail' => 'RAIL SERVICES',
        'smart-mobility' => 'SMART MOBILITY',
        'surveying' => 'SURVEYING'
    ];
}
