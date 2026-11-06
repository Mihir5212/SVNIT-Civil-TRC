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
        email: 'trc@example.com',
        phone: '+91 00000 00000',
        address: ['Department of Civil Engineering', 'SVNIT, Ichchhanath', 'Surat 395007, Gujarat, India'],
        hours: 'Monday to Friday, 9:30 am to 5:30 pm',
        mapEmbed: 'https://www.google.com/maps?q=SVNIT+Surat+Civil+Engineering+Department&output=embed',

        // Thin bar at the top of every page. Set to '' to hide it.
        previewNotice: '',

        // Contact form: leave '' to open the visitor's email app with the enquiry filled in.
        // To receive enquiries without the email app, paste a form link here
        // (for example a Formspree form endpoint like 'https://formspree.io/f/xxxxxxx').
        formEndpoint: '',
    },

    /* ---------- Our capabilities (Home page, About page, contact form) ---------- */
    // All of them appear on the Our Expertise board on the Home page.
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
    // featured: true marks a project to feature. The first one marked appears on the Featured Project board on the Home page.
    projects: [
        {
            id: 3,
            title: 'Independent traffic assessment review for four cities',
            associatedWith: 'State agency (sample)',
            location: 'Gujarat',
            sector: 'review',
            status: 'ongoing',
            startYear: 2026, endYear: null,
            featured: true,
            image: '',
            summary: 'Third-party review of traffic assessments prepared for several cities, checking survey methods, data quality and recommendations.',
            description: `This is sample text. Replace it with the scope of work, methods used and key outcomes of the project.

- Scope of work
- Methods and data used
- Key findings and outcomes`,
        },
        {
            id: 2,
            title: 'Road safety audit of a national highway stretch',
            associatedWith: 'Highway authority (sample)',
            location: 'Gujarat',
            sector: 'safety',
            status: 'completed',
            startYear: 2025, endYear: 2025,
            featured: true,
            image: '',
            summary: 'Operation-stage safety audit of a high-crash stretch, combining crash records with site inspections to rank treatments by expected benefit.',
            description: `This is sample text. Replace it with the scope of work, methods used and key outcomes of the project.

- Scope of work
- Methods and data used
- Key findings and outcomes`,
        },
        {
            id: 1,
            title: 'Comprehensive traffic study for an urban arterial corridor',
            associatedWith: 'Municipal corporation (sample)',
            location: 'Surat, Gujarat',
            sector: 'traffic',
            status: 'completed',
            startYear: 2024, endYear: 2025,
            featured: true,
            image: '',
            summary: 'Classified volume, speed and delay surveys along a 6 km corridor, with a phased improvement plan for its eight major junctions.',
            description: `This is sample text. Replace it with the scope of work, methods used and key outcomes of the project.

- Scope of work
- Methods and data used
- Key findings and outcomes`,
        },
        {
            id: 4,
            title: 'Video-based vehicle tracking and safety dashboard',
            associatedWith: 'Traffic police (sample)',
            location: 'Gujarat',
            sector: 'analytics',
            status: 'ongoing',
            startYear: 2026, endYear: null,
            featured: false,
            image: '',
            summary: 'Computer-vision workflow that extracts vehicle trajectories from traffic video, feeding a dashboard of speeds, volumes and conflicts.',
            description: `This is sample text. Replace it with the scope of work, methods used and key outcomes of the project.`,
        },
        {
            id: 5,
            title: 'Traffic impact assessment for a commercial development',
            associatedWith: 'Private developer (sample)',
            location: 'Surat, Gujarat',
            sector: 'traffic',
            status: 'completed',
            startYear: 2024, endYear: 2024,
            featured: false,
            image: '',
            summary: 'Trip generation and junction analysis for a mixed-use development, with access and parking changes accepted by the approving authority.',
            description: `This is sample text. Replace it with the scope of work, methods used and key outcomes of the project.`,
        },
        {
            id: 6,
            title: 'Signal timing and channelisation for a city intersection',
            associatedWith: 'Urban local body (sample)',
            location: 'Gujarat',
            sector: 'traffic',
            status: 'completed',
            startYear: 2023, endYear: 2023,
            featured: false,
            image: '',
            summary: 'Redesign of a five-arm signalised junction with new phasing, channelisation islands and pedestrian crossings, tested in simulation.',
            description: `This is sample text. Replace it with the scope of work, methods used and key outcomes of the project.`,
        },
    ],

    /* ---------- News ---------- */
    // date: 'YYYY-MM-DD'. Newest items appear first automatically.
    // featured: true chooses the story for the Featured News board on the Home page. If none is marked, the newest is shown.
    news: [
        {
            id: 1,
            date: '2026-11-05',
            title: 'TRC website preview shared for feedback',
            summary: 'A first version of the TEP Research & Consultancy Cell website is ready for review by faculty and students.',
            body: `Send comments on the layout, wording and content to the website team.`,
            image: '',
        },
        {
            id: 2,
            featured: true,
            date: '2026-10-16',
            title: 'Workshop on road safety audits for agency engineers (sample)',
            summary: 'A two-day hands-on workshop covering audit stages, site inspection and reporting. Replace this sample item with real news.',
            body: `Add the full story here.`,
            image: '',
        },
        {
            id: 3,
            date: '2026-09-21',
            title: 'Research papers accepted at international conferences (sample)',
            summary: 'Papers on crash frequency modelling and blackspot identification were accepted for presentation. Replace this sample item with real news.',
            body: `Add the full story here.`,
            image: '',
        },
    ],

    /* ---------- Publications ---------- */
    // type: 'journal', 'conference', 'report' or 'chapter'. link: DOI or paper page, or ''.
    publications: [
        { authors: 'Author, A., Author, B.', title: 'Sample journal article title on crash frequency modelling', venue: 'Journal name, Vol. X, pp. 1–20', type: 'journal', year: 2026, link: '' },
        { authors: 'Author, A., Author, C.', title: 'Sample conference paper title on blackspot identification', venue: 'Conference name, City', type: 'conference', year: 2026, link: '' },
        { authors: 'Author, B., Author, D.', title: 'Sample paper title on mixed-traffic vehicle trajectories', venue: 'Journal name', type: 'journal', year: 2025, link: '' },
        { authors: 'Author, A.', title: 'Sample technical report title on corridor traffic study', venue: 'Report for a partner agency (sample)', type: 'report', year: 2025, link: '' },
        { authors: 'Author, C., Author, A.', title: 'Sample paper title on pedestrian safety at urban intersections', venue: 'Conference name, City', type: 'conference', year: 2024, link: '' },
    ],

    /* ---------- Our Associations & Collaboration (board on the Home page; the first six are shown) ---------- */
    // name: the organisation's name. logo: path to the logo, e.g. 'images/associations/organisation-name.png'.
    // Leave logo as '' to show the name as text. With an empty list (associations: []) the board keeps only its title and button.
    associations: [
        { name: 'Municipal corporation (sample)', logo: '' },
        { name: 'Highway authority (sample)', logo: '' },
        { name: 'State agency (sample)', logo: '' },
        { name: 'Traffic police (sample)', logo: '' },
        { name: 'Urban local body (sample)', logo: '' },
        { name: 'Private developer (sample)', logo: '' },
    ],

    /* ---------- Gallery ---------- */
    // Photos appear in the order listed here, so put your best ones first.
    // image: path to the photo, e.g. 'images/gallery/ring-road-survey.jpg'.
    // title: a short caption. category: one of the keys in galleryCategories.
    // place and year are optional: leave '' if not needed.
    galleryCategories: {
        field: 'Field surveys',
        site: 'Site inspections',
        workshop: 'Workshops and training',
        events: 'Events and visits',
    },
    gallery: [
        { image: 'images/gallery/sample-1.svg', title: 'Video survey at a city junction (sample)', category: 'field', place: 'Surat, Gujarat', year: 2026 },
        { image: 'images/gallery/sample-4.svg', title: 'Road safety audit on a highway stretch (sample)', category: 'site', place: 'Gujarat', year: 2025 },
        { image: 'images/gallery/sample-6.svg', title: 'Workshop on road safety audits (sample)', category: 'workshop', place: 'SVNIT Surat', year: 2026 },
        { image: 'images/gallery/sample-2.svg', title: 'Classified traffic count beside an arterial road (sample)', category: 'field', place: 'Surat, Gujarat', year: 2025 },
        { image: 'images/gallery/sample-5.svg', title: 'Junction layout review for signal design (sample)', category: 'site', place: 'Gujarat', year: 2024 },
        { image: 'images/gallery/sample-8.svg', title: 'Group visit to the institute (sample)', category: 'events', place: 'SVNIT Surat', year: 2026 },
        { image: 'images/gallery/sample-3.svg', title: 'Spot speed survey (sample)', category: 'field', place: 'Gujarat', year: 2024 },
        { image: 'images/gallery/sample-7.svg', title: 'Hands-on traffic data session (sample)', category: 'workshop', place: 'SVNIT Surat', year: 2025 },
    ],

    /* ---------- Team ---------- */
    // group: 'professors' or 'staff'. order: lower numbers appear first.
    // profile: the person's own website, shown as a "Website" link. Leave '' to hide it.
    team: [
        { name: 'Dr. Gaurang J. Joshi', designation: 'Professor, SVNIT, Surat', group: 'professors', expertise: '', email: '', profile: 'https://gjjoshisvnit.com/', photo: 'images/team/gaurang-joshi.jpg', order: 10 },
        { name: 'Dr. Shriniwas S. Arkatkar', designation: 'Professor, SVNIT, Surat', group: 'professors', expertise: '', email: '', profile: 'https://shriniwasprofile.wordpress.com/', photo: 'images/team/shriniwas-arkatkar.jpg', order: 20 },
        { name: 'Dr. Ashish Dhamaniya', designation: 'Professor, SVNIT, Surat', group: 'professors', expertise: '', email: '', profile: 'https://sites.google.com/view/drashishdhamaniya', photo: 'images/team/ashish-dhamaniya.jpg', order: 30 },
        { name: 'Maitrik Bhadresa', designation: 'Senior Project Engineer', group: 'staff', expertise: '', email: '', profile: '', photo: 'images/team/maitrik-bhadresa.jpg', order: 60 },
        { name: 'Krushnaraj Chaudhari', designation: 'Senior Project Engineer', group: 'staff', expertise: '', email: '', profile: '', photo: 'images/team/krushnaraj-chaudhari.jpg', order: 70 },
        { name: 'Siddharth Umrigar', designation: 'Project Engineer', group: 'staff', expertise: '', email: '', profile: '', photo: 'images/team/siddharth-umrigar.jpg', order: 80 },
        { name: 'Ayush Patel', designation: 'Project Planner', group: 'staff', expertise: '', email: '', profile: '', photo: 'images/team/ayush-patel.jpg', order: 90 },
        { name: 'Meshvi Patel', designation: 'Project Engineer', group: 'staff', expertise: '', email: '', profile: '', photo: 'images/team/meshvi-patel.jpg', order: 100 },
        { name: 'Darshit Lad', designation: 'Project Engineer', group: 'staff', expertise: '', email: '', profile: '', photo: 'images/team/darshit-lad.jpg', order: 110 },
        { name: 'Sunil Kumar', designation: 'Draftsman', group: 'staff', expertise: '', email: '', profile: '', photo: 'images/team/sunil-kumar.jpg', order: 120 },
    ],
};
