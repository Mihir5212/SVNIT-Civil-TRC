/*
 * ==========================================================================
 *  TRC WEBSITE CONTENT
 *  Almost everything shown on the website comes from this one file.
 * ==========================================================================
 *
 *  How to edit safely:
 *  - Change only the text between quotes '...' or backticks `...`.
 *  - Keep the commas at the end of lines and the { } [ ] brackets.
 *  - For long text with several paragraphs, use backticks `...`,
 *    leave a blank line between paragraphs, and start a line with "- "
 *    for a bullet point.
 *  - If you write an apostrophe inside '...', type it as \' (e.g. 'SVNIT\'s')
 *    or use backticks instead.
 *  - Photos: put the image in the images/ folder and write its path,
 *    e.g. image: 'images/projects/ring-road.jpg'. Leave '' for no photo.
 *  - After saving, reload the page in the browser to see the change.
 *    If a page goes blank, a comma or quote is probably missing.
 */

window.TRC = {

    /* ---------- Site details ---------- */
    site: {
        name: 'TEP Research & Consultancy Cell',
        short: 'TRC',
        dept: 'Department of Civil Engineering',
        institute: 'Sardar Vallabhbhai National Institute of Technology, Surat',
        instituteShort: 'SVNIT Surat',
        email: 'trc@svnit.ac.in',
        phone: '+91 261 2259571',
        address: ['Department of Civil Engineering', 'SVNIT, Ichchhanath', 'Surat 395007, Gujarat, India'],
        hours: 'Monday – Friday: 9:30 AM – 5:30 PM',
        mapEmbed: 'https://www.google.com/maps?q=SVNIT+Surat+Civil+Engineering+Department&output=embed',

        // Thin bar at the top of every page. Set to '' to hide it.
        previewNotice: '',

        // Contact form: leave '' to open the visitor's email app with the enquiry filled in.
        // To receive enquiries without the email app, paste a form link here
        // (for example a Formspree form endpoint like 'https://formspree.io/f/xxxxxxx').
        formEndpoint: '',
    },

    /* ---------- Our capabilities (Home page, About page, contact form) ---------- */
    // The first four appear on the green sign at the top of the Home page.
    capabilities: [
        {
            id: 'traffic-studies',
            title: 'Traffic surveys and studies',
            short: 'Volume, speed, turning-movement, parking and pedestrian surveys with analysis.',
            text: 'We plan and run field surveys on urban roads, intersections and highways, then turn the data into clear findings. Surveys use manual counts, video recording and automated counters, and the analysis follows IRC guidelines and Indo-HCM.',
            outputs: [
                'Classified traffic volume and turning-movement counts',
                'Spot speed, travel time and delay studies',
                'Origin–destination and parking surveys',
                'Capacity and level-of-service analysis',
            ],
        },
        {
            id: 'road-safety',
            title: 'Road safety audits and crash analysis',
            short: 'Safety audits at every project stage, blackspot identification and crash data analysis.',
            text: 'We audit road projects at design, construction and operation stages, and analyse crash records to find where and why crashes happen. Recommendations are ranked so agencies can act on the most effective measures first.',
            outputs: [
                'Road safety audit reports with ranked recommendations',
                'Blackspot identification and site investigation',
                'Crash data analysis and crash prediction models',
                'Before-and-after evaluation of safety measures',
            ],
        },
        {
            id: 'traffic-impact',
            title: 'Traffic impact assessment',
            short: 'Impact of new developments on surrounding roads, with mitigation measures.',
            text: 'For commercial, residential and institutional developments, we estimate the traffic a project will generate, test its effect on nearby roads and junctions, and propose access, parking and mitigation measures for approval authorities.',
            outputs: [
                'Trip generation and distribution estimates',
                'Junction and corridor performance for future years',
                'Site access, circulation and parking review',
                'Mitigation plan suitable for submission',
            ],
        },
        {
            id: 'junction-design',
            title: 'Junction improvement and signal design',
            short: 'Intersection geometry, channelisation and traffic signal timing.',
            text: 'We redesign congested and unsafe intersections, from geometric changes and channelisation to signal phasing and timing. Proposals can be tested in traffic simulation before they are built.',
            outputs: [
                'Existing-condition assessment of the junction',
                'Improvement drawings and channelisation layouts',
                'Signal phasing and timing plans',
                'Simulation of proposed options',
            ],
        },
        {
            id: 'transport-planning',
            title: 'Transport planning',
            short: 'Corridor studies, mobility plans, public transport and demand modelling.',
            text: 'We support cities and agencies with corridor and area-level planning, public transport studies and travel demand models, giving decision makers evidence for long-term investments.',
            outputs: [
                'Corridor and area traffic management plans',
                'Public transport route and stop studies',
                'Travel demand modelling and forecasting',
                'Policy notes and technical reports',
            ],
        },
        {
            id: 'independent-review',
            title: 'Independent review and proof-checking',
            short: 'Third-party review of traffic studies, project reports and designs.',
            text: 'As an academic institution, we provide impartial third-party review of traffic studies, detailed project reports and designs prepared by others, checking methods, data and conclusions against standards.',
            outputs: [
                'Review of traffic studies and project reports',
                'Proof-checking of designs against IRC standards',
                'Third-party assessment reports',
                'Clarification meetings with project teams',
            ],
        },
        {
            id: 'its-analytics',
            title: 'Traffic data analytics and ITS',
            short: 'Video-based vehicle tracking, trajectory analysis and safety dashboards.',
            text: 'We extract detailed vehicle movements from video using computer vision, and build analysis tools and dashboards that help agencies monitor traffic and safety over time.',
            outputs: [
                'Vehicle detection, tracking and trajectory data',
                'Speed, gap and conflict analysis from video',
                'Interactive traffic and safety dashboards',
                'Data processing workflows handed over to partner agencies',
            ],
        },
        {
            id: 'training',
            title: 'Training and capacity building',
            short: 'Workshops for engineers, police and agency staff.',
            text: 'We run short courses and workshops on traffic engineering, road safety and data analysis for engineers, traffic police and staff of government agencies, tailored to the needs of each group.',
            outputs: [
                'Short courses and hands-on workshops',
                'Training material and case studies',
                'Internship and field training programmes',
            ],
        },
    ],

    /* ---------- Option lists ---------- */
    sectors: {
        traffic: 'Traffic engineering',
        safety: 'Road safety',
        planning: 'Transport planning',
        public: 'Public transport',
        highways: 'Highways and pavements',
        analytics: 'Data analytics and ITS',
        review: 'Independent review',
        training: 'Training',
    },
    statuses: { ongoing: 'Ongoing', completed: 'Completed' },
    pubTypes: { journal: 'Journal article', conference: 'Conference paper', report: 'Technical report', chapter: 'Book chapter' },
    teamGroups: { professors: 'Professors & Project Consultants', staff: 'Project staff' },

    /* ---------- Projects ---------- */
    // id: a unique number (used in the page link).
    // sector: one of the keys in "sectors" above. status: 'ongoing' or 'completed'.
    // featured: true shows it under "Selected research & projects" on the Home page (first one is shown large).
    projects: [
        {
            id: 1,
            title: 'Surat Outer Ring Road Corridor & High-Speed Expressway Review',
            associatedWith: 'Surat Urban Development Authority (SUDA)',
            location: 'Surat, Gujarat',
            sector: 'highways',
            status: 'completed',
            startYear: 2024, endYear: 2025,
            featured: true,
            image: 'images/Transportation.jpg',
            summary: 'Comprehensive alignment safety audit, pavement structural evaluation, and grade-separated interchange feasibility for the 66-km multi-lane ring expressway.',
            description: `Geometric alignment verification and sight distance evaluation along 66 km of expressway corridor.\n\n- Falling Weight Deflectometer (FWD) structural capacity assessments.\n- Microscopic traffic simulation for interchange merging operations.\n- Drainage and cross-drainage recommendations meeting IRC:SP:42 and IRC:SP:88.`,
        },
        {
            id: 2,
            title: 'National Highway 48 Blackspot Rectification & Road Safety Audit',
            associatedWith: 'National Highways Authority of India (NHAI)',
            location: 'Surat – Navsari Section, Gujarat',
            sector: 'safety',
            status: 'completed',
            startYear: 2024, endYear: 2025,
            featured: true,
            image: 'images/Road Safety Audit.jpg',
            summary: 'IRC:SP:88 compliant operation-stage safety audit, accident blackspot engineering rectification, and collision reduction strategy for high-risk highway sections.',
            description: `Detailed crash frequency and severity indexing across 28 km of six-lane divided carriageway.\n\n- Identification of 7 critical accident blackspots and root-cause engineering diagnostics.\n- Design of retro-reflective signboards and median channelisations.\n- Reduced severe fatal crashes by 58% over post-audit evaluation.`,
        },
        {
            id: 3,
            title: 'Urban Arterial Junction Signal Phasing & Intelligent Telemetry',
            associatedWith: 'Surat Municipal Corporation (SMC)',
            location: 'Ring Road Arterial Corridors, Surat',
            sector: 'traffic',
            status: 'completed',
            startYear: 2023, endYear: 2024,
            featured: true,
            image: 'images/Traffic Engineering.jpg',
            summary: 'Comprehensive classified volume counts, radar speed surveys, Indo-HCM saturation flow analysis, and adaptive signal synchronisation across 8 high-density junctions.',
            description: `Video-based classified volume counts capturing over 120,000 PCU daily.\n\n- Empirical saturation flow measurement and queue length dissipation studies.\n- Green-wave signal coordination design across 4.2 km corridor.\n- Achieved an average corridor delay reduction of 27%.`,
        },
        {
            id: 4,
            title: 'Western Dedicated Freight Corridor (DFC) Multimodal Rail Link',
            associatedWith: 'Dedicated Freight Corridor Corporation of India (DFCCIL)',
            location: 'DFC Western Corridor (Gothangam – Sachin)',
            sector: 'rail',
            status: 'completed',
            startYear: 2024, endYear: 2025,
            featured: false,
            image: 'images/Rail Services.jpg',
            summary: 'Track geometry clearance, road-over-bridge (ROB) structural approaches, and grade-separated intermodal freight connectivity evaluation.',
            description: `Intermodal freight transfer access planning and heavy truck queue mitigation.\n\n- Structural approach road gradient reviews and high-clearance vertical curve checks for ROBs.\n- Level-crossing elimination and replacement with twin-cell RUBs.`,
        },
        {
            id: 5,
            title: 'Smart City BRTS Transit Corridor Feasibility & Urban Mobility Plan',
            associatedWith: 'Surat Smart City Development Ltd. (SSCDL)',
            location: 'Surat, Gujarat',
            sector: 'smart-mobility',
            status: 'completed',
            startYear: 2023, endYear: 2024,
            featured: false,
            image: 'images/Smart Mobility.jpg',
            summary: 'Origin-destination travel demand modeling, bus rapid transit corridor optimization, and multi-modal integration with Surat Metro Phase-1.',
            description: `Citywide travel demand modeling and origin-destination trip matrix synthesis.\n\n- Dedicated BRTS median lane operational planning and junction queue jumps.\n- Feeder route optimization connecting residential neighborhoods to transit hubs.`,
        },
        {
            id: 6,
            title: 'Hazira Industrial Mega Logistics Park Access & Drainage Infrastructure',
            associatedWith: 'Gujarat Industrial Development Corporation (GIDC)',
            location: 'Hazira Industrial Zone, Surat',
            sector: 'land-development',
            status: 'completed',
            startYear: 2023, endYear: 2024,
            featured: false,
            image: 'images/Land Development.jpg',
            summary: 'Traffic impact assessment (TIA), internal heavy-vehicle circulation design, stormwater master drainage network, and pavement life-cycle planning.',
            description: `Comprehensive TIA for 150-acre multimodal warehousing park.\n\n- Multi-axle trailer turning template design (AutoTURN).\n- Stormwater master drainage network and perpetual pavement design for 100 MSA.`,
        },
        {
            id: 7,
            title: 'Surat Metro Rail Corridor Geodetic Alignment & High-Precision LIDAR Survey',
            associatedWith: 'Gujarat Metro Rail Corporation (GMRC)',
            location: 'Surat Metro Corridor, Gujarat',
            sector: 'surveying',
            status: 'completed',
            startYear: 2023, endYear: 2024,
            featured: false,
            image: 'images/Surveying.jpg',
            summary: 'High-density 3D mobile LIDAR corridor scanning, geodetic benchmark network establishment, and sub-centimeter right-of-way GIS mapping.',
            description: `Dual-frequency GNSS static geodetic network baseline observations.\n\n- Mobile laser scanning (LIDAR) capturing utilities and road topography.\n- Ground Penetrating Radar (GPR) utility mapping at station excavation pits.`,
        },
        {
            id: 8,
            title: 'Heavy Axle Commercial Vehicle Weigh-In-Motion & FWD Pavement Testing',
            associatedWith: 'Roads & Buildings Department (R&B), Govt. of Gujarat',
            location: 'Golden Corridor, Gujarat',
            sector: 'highways',
            status: 'completed',
            startYear: 2023, endYear: 2024,
            featured: false,
            image: 'images/Hero_1.jpg',
            summary: 'Falling Weight Deflectometer (FWD) structural capacity assessment, backcalculation of resilient moduli, and mechanistic-empirical overlay design.',
            description: `FWD deflection testing and resilient moduli backcalculation.\n\n- Vehicle Damage Factor (VDF) spectrum derivation from WIM sensors.\n- Extended pavement service life by 12 years with optimized SMA overlay.`,
        },
        {
            id: 9,
            title: 'Pedestrian Vulnerability & Multimodal Junction Geometry Redesign',
            associatedWith: 'Surat Traffic Police & Municipal Corporation',
            location: 'Ichchhanath & Athwa, Surat',
            sector: 'safety',
            status: 'completed',
            startYear: 2022, endYear: 2023,
            featured: false,
            image: 'images/daniel-mccullough-HtBlQdxfG9k-unsplash.jpg',
            summary: 'Vulnerable road user (VRU) conflict analysis, raised pedestrian crossings, pedestrian refuge islands, and sight-distance improvements.',
            description: `Automated video conflict analysis measuring Post-Encroachment Time (PET).\n\n- Curb radius tightening at free-left turns.\n- Raised tabletop pedestrian crossings with tactile paving.`,
        },
        {
            id: 10,
            title: 'AI-Driven Sensor Video Telemetry & Live Traffic Conflict Dashboard',
            associatedWith: 'Smart City Mission, Govt. of India',
            location: 'Surat City ICCC, Gujarat',
            sector: 'smart-mobility',
            status: 'completed',
            startYear: 2024, endYear: 2025,
            featured: false,
            image: 'images/nopparuj-lamaikul-yvTmcnmArgY-unsplash.jpg',
            summary: 'Computer-vision edge computing pipelines extracting real-time vehicle trajectories, near-miss conflict indicators, and automated congestion alerts.',
            description: `Edge computing deep learning pipelines for Indian mixed-traffic streams.\n\n- Trajectory extraction and surrogate safety conflict analytics.\n- Automated incident detection and real-time dashboard telemetry.`,
        },
    ],

    /* ---------- Publications ---------- */
    // type: 'journal', 'conference', 'report' or 'chapter'. link: DOI or paper page, or ''.
    publications: [
        { authors: 'Dr. Shriniwas S. Arkatkar, Dr. Gaurang J. Joshi, Siddharth Umrigar', title: 'Expressway Capacity & Heterogeneous Flow', venue: 'Journal of Transportation Engineering, Part A: Systems (ASCE) • Vol. 150(4)', type: 'journal', year: 2024, link: '' },
        { authors: 'Dr. Ashish Dhamaniya, Dr. Shriniwas S. Arkatkar, Maitrik Bhadresa', title: 'Proactive Corridor Crash Risk Modeling', venue: 'Accident Analysis & Prevention (Elsevier) • Vol. 196', type: 'journal', year: 2024, link: '' },
        { authors: 'Dr. Gaurang J. Joshi, Krushnaraj Chaudhari, Dr. Ashish Dhamaniya', title: 'Connected Corridor Signal Optimization', venue: 'Transportation Research Board (TRB) Annual Meeting • Washington, D.C.', type: 'conference', year: 2023, link: '' },
        { authors: 'Dr. Gaurang J. Joshi, TEP Consultancy Cell, SVNIT Surat', title: 'Comprehensive Mobility Plan Methodology', venue: 'SVNIT–MOUD Statutory Consultancy Monograph • Gujarat Urban Nodes', type: 'report', year: 2023, link: '' },
        { authors: 'Siddharth Umrigar, Dr. Gaurang J. Joshi, Maitrik Bhadresa', title: 'Multimodal Rail Terminal Accessibility', venue: 'World Conference on Transport Research (WCTR) • Montreal', type: 'conference', year: 2023, link: '' },
        { authors: 'Dr. Ashish Dhamaniya, Krushnaraj Chaudhari, TEP Geomatics Group', title: 'BIM & UAV Surveying in Geometric Audits', venue: 'Springer Lecture Notes in Civil Engineering • Advances in Geomatics', type: 'chapter', year: 2022, link: '' },
    ],

    /* ---------- Our Associations (moving strip on the Home page) ---------- */
    associations: [
        { name: 'NHAI (National Highways Authority of India)', logo: '' },
        { name: 'MoRTH (Ministry of Road Transport & Highways)', logo: '' },
        { name: 'GSRDC (Gujarat State Road Dev. Corp.)', logo: '' },
        { name: 'SMC (Surat Municipal Corporation)', logo: '' },
        { name: 'GIDC (Gujarat Industrial Dev. Corp.)', logo: '' },
        { name: 'SSCDL (Surat Smart City Dev. Ltd.)', logo: '' },
    ],

    /* ---------- Gallery ---------- */
    galleryCategories: {
        corridors: 'Highway Corridors',
        surveys: 'Field Surveys',
        safety: 'Safety Audits',
        structures: 'Structures & Lab',
    },
    gallery: [
        { image: 'images/SVNIT Building.jpg', title: 'Civil Engineering & Research Block', category: 'structures', place: 'SVNIT Campus, Surat', year: 2026 },
        { image: 'images/Smart Mobility.jpg', title: 'UAV Trajectory & ITS Command Lab', category: 'surveys', place: 'SVNIT Traffic Lab', year: 2026 },
        { image: 'images/Transportation.jpg', title: 'Six-Lane Interurban Expressway', category: 'corridors', place: 'NH-48 Bharuch–Surat', year: 2025 },
        { image: 'images/Road Safety Audit.jpg', title: 'IRC:SP:88 Stage-III Road Safety Audit', category: 'safety', place: 'Ahmedabad–Vadodara', year: 2025 },
        { image: 'images/daniel-mccullough-HtBlQdxfG9k-unsplash.jpg', title: 'Modular Steel & Viaduct Frame', category: 'structures', place: 'GIFT City Corridor', year: 2025 },
        { image: 'images/Traffic Engineering.jpg', title: 'Classified Traffic Volume & ATCC', category: 'surveys', place: 'Hazira Industrial Corridor', year: 2025 },
        { image: 'images/Hero_1.jpg', title: 'Grade-Separated Interchange Ramp', category: 'corridors', place: 'Surat–Navsari', year: 2024 },
        { image: 'images/tep-about-photo.jpg', title: 'Work-Zone Traffic Management', category: 'safety', place: 'NH-48 Widening', year: 2025 },
        { image: 'images/Rail Services.jpg', title: 'BRTS & Multimodal Transit Corridor', category: 'corridors', place: 'Surat BRTS', year: 2024 },
        { image: 'images/Land Development.jpg', title: 'Urban Arterial Pavement & Drainage', category: 'structures', place: 'Hazira Port Node', year: 2024 },
        { image: 'images/Surveying.jpg', title: 'RTK-GNSS & Corridor Topography', category: 'surveys', place: 'Dahej PCPIR', year: 2024 },
        { image: 'images/Hero_5.jpg', title: 'Coastal Logistics Link Road', category: 'corridors', place: 'South Gujarat Port Link', year: 2024 },
    ],

    /* ---------- Team ---------- */
    team: [
        { name: 'Dr. Gaurang J. Joshi', designation: 'Professor, SVNIT, Surat', group: 'professors', expertise: 'Traffic Flow Theory, Urban Public Transport Planning, ITS', email: '', profile: 'https://gjjoshisvnit.com/', photo: 'images/team/gaurang-joshi.jpg', order: 10 },
        { name: 'Dr. Shriniwas S. Arkatkar', designation: 'Professor, SVNIT, Surat', group: 'professors', expertise: 'Highway Capacity (Indo-HCM), Road Safety Audits (IRC:SP:88), Simulation', email: '', profile: 'https://shriniwasprofile.wordpress.com/', photo: 'images/team/shriniwas-arkatkar.jpg', order: 20 },
        { name: 'Dr. Ashish Dhamaniya', designation: 'Professor, SVNIT, Surat', group: 'professors', expertise: 'Mixed Traffic Operations, Intersection Diagnostics, Highway Audits', email: '', profile: 'https://sites.google.com/view/drashishdhamaniya', photo: 'images/team/ashish-dhamaniya.jpg', order: 30 },
        { name: 'Maitrik Bhadresa', designation: 'Senior Project Engineer', group: 'staff', expertise: '', email: '', profile: '', photo: 'images/team/maitrik-bhadresa.jpg', order: 60 },
        { name: 'Krushnaraj Chaudhari', designation: 'Senior Project Engineer', group: 'staff', expertise: '', email: '', profile: '', photo: 'images/team/krushnaraj-chaudhari.jpg', order: 70 },
        { name: 'Siddharth Umrigar', designation: 'Project Engineer', group: 'staff', expertise: '', email: '', profile: '', photo: 'images/team/siddharth-umrigar.jpg', order: 80 },
        { name: 'Ayush Patel', designation: 'Project Planner', group: 'staff', expertise: '', email: '', profile: '', photo: 'images/team/ayush-patel.jpg', order: 90 },
        { name: 'Meshvi Patel', designation: 'Project Engineer', group: 'staff', expertise: '', email: '', profile: '', photo: 'images/team/meshvi-patel.jpg', order: 100 },
        { name: 'Darshit Lad', designation: 'Project Engineer', group: 'staff', expertise: '', email: '', profile: '', photo: 'images/team/darshit-lad.jpg', order: 110 },
        { name: 'Sunil Kumar', designation: 'Draftsman', group: 'staff', expertise: '', email: '', profile: '', photo: 'images/team/sunil-kumar.jpg', order: 120 },
        { name: 'Mihir Koladiya', designation: 'Research Project Engineer', group: 'staff', expertise: '', email: '', profile: '', photo: 'images/team/Mihir Koladiya.jpg', order: 130 },
        { name: 'Harsh Kakkad', designation: 'Research Project Engineer', group: 'staff', expertise: '', email: '', profile: '', photo: 'images/team/Harsh Kakkad.jpg', order: 140 },
    ],
};
