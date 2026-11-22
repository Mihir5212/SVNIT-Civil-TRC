import re

# Read data.js
with open('assets/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Define the 10 projects in JS format
js_projects = """    projects: [
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
            description: `Geometric alignment verification and sight distance evaluation along 66 km of expressway corridor.\\n\\n- Falling Weight Deflectometer (FWD) structural capacity assessments.\\n- Microscopic traffic simulation for interchange merging operations.\\n- Drainage and cross-drainage recommendations meeting IRC:SP:42 and IRC:SP:88.`,
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
            description: `Detailed crash frequency and severity indexing across 28 km of six-lane divided carriageway.\\n\\n- Identification of 7 critical accident blackspots and root-cause engineering diagnostics.\\n- Design of retro-reflective signboards and median channelisations.\\n- Reduced severe fatal crashes by 58% over post-audit evaluation.`,
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
            description: `Video-based classified volume counts capturing over 120,000 PCU daily.\\n\\n- Empirical saturation flow measurement and queue length dissipation studies.\\n- Green-wave signal coordination design across 4.2 km corridor.\\n- Achieved an average corridor delay reduction of 27%.`,
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
            description: `Intermodal freight transfer access planning and heavy truck queue mitigation.\\n\\n- Structural approach road gradient reviews and high-clearance vertical curve checks for ROBs.\\n- Level-crossing elimination and replacement with twin-cell RUBs.`,
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
            description: `Citywide travel demand modeling and origin-destination trip matrix synthesis.\\n\\n- Dedicated BRTS median lane operational planning and junction queue jumps.\\n- Feeder route optimization connecting residential neighborhoods to transit hubs.`,
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
            description: `Comprehensive TIA for 150-acre multimodal warehousing park.\\n\\n- Multi-axle trailer turning template design (AutoTURN).\\n- Stormwater master drainage network and perpetual pavement design for 100 MSA.`,
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
            description: `Dual-frequency GNSS static geodetic network baseline observations.\\n\\n- Mobile laser scanning (LIDAR) capturing utilities and road topography.\\n- Ground Penetrating Radar (GPR) utility mapping at station excavation pits.`,
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
            description: `FWD deflection testing and resilient moduli backcalculation.\\n\\n- Vehicle Damage Factor (VDF) spectrum derivation from WIM sensors.\\n- Extended pavement service life by 12 years with optimized SMA overlay.`,
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
            description: `Automated video conflict analysis measuring Post-Encroachment Time (PET).\\n\\n- Curb radius tightening at free-left turns.\\n- Raised tabletop pedestrian crossings with tactile paving.`,
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
            description: `Edge computing deep learning pipelines for Indian mixed-traffic streams.\\n\\n- Trajectory extraction and surrogate safety conflict analytics.\\n- Automated incident detection and real-time dashboard telemetry.`,
        },
    ],"""

# Find bounds of projects array in data.js
start_marker = "    // featured: true shows it under \"Selected research & projects\" on the Home page (first one is shown large).\n    projects: ["
end_marker = "    /* ---------- Publications ---------- */"

start_idx = text.find("    projects: [")
end_idx = text.find(end_marker)

if start_idx != -1 and end_idx != -1:
    new_text = text[:start_idx] + js_projects + "\n\n" + text[end_idx:]
    with open('assets/js/data.js', 'w', encoding='utf-8') as f:
        f.write(new_text)
    print('Synchronized data.js projects successfully!')
else:
    print('Failed to locate markers in data.js', start_idx, end_idx)
