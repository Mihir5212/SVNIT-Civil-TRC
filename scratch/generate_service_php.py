# Python generator for service.php
import os

services_code = r'''<?php
/**
 * TRC SVNIT - Dedicated Service Detail Subpage Template
 * Inspired by LJA Engineering layout, Highway & Transport prototype & SVNIT Theme
 */

$servicesData = [
    'transportation' => [
        'id' => 'transportation',
        'title' => 'Highway & Transportation',
        'breadcrumb' => 'Highway & Transportation',
        'hero_title' => 'Highway & Transport Expertise',
        'hero_lead' => 'Our research cell is devoted to creating, sustaining and revitalizing the road networks that form the backbone of our communities.',
        'hero_collage' => [
            'a' => ['title' => 'Pavement laboratory', 'image' => 'images/Hero_1.jpg'],
            'b' => ['title' => 'Traffic survey', 'image' => 'images/Traffic Engineering.jpg'],
            'd' => ['title' => 'Highway corridor', 'image' => 'images/Transportation.jpg'],
        ],
        'solutions_title' => 'Solving Challenges with TEP Solutions',
        'solution_image' => 'images/Transportation.jpg',
        'solutions_list' => [
            'Design and rehab of flexible pavements',
            'Vulnerability and safety assessments',
            'Drainage and cross-drainage design',
            'Permit and grant support',
            'Traffic impact studies',
            'Emergency response planning',
            'Bituminous mix design',
            'Construction supervision',
            'Feasibility studies and DPR review',
            'Right-of-way advisory'
        ],
        'we_work' => [
            'pre' => 'Navigating Challenges',
            'ghost' => 'We work<br>together',
            'title' => 'Working hand in hand with our highway agency partners, we blend our skills to make each project succeed.',
            'desc' => 'Together, we craft practical solutions and take ownership of every step forward.',
            'btn_text' => 'Start a Conversation',
            'btn_link' => 'contact.php',
            'img' => 'images/We Work Together.png'
        ],
        'cards' => [
            'card1' => [
                'title' => 'Pavement Engineering',
                'subtitle' => 'Dependable, durable and efficient road infrastructure.',
                'paragraphs' => [
                    'We build long-lasting partnerships with state agencies and municipalities, helping them design, evaluate and rehabilitate road pavements under varied traffic and climate conditions.',
                    'From a new alignment to the strengthening of an existing corridor, our team brings laboratory and field experience to cost-effective solutions.'
                ]
            ],
            'card2' => [
                'title' => 'Traffic Compliance Services',
                'paragraphs' => [
                    'We prepare traffic studies, road safety audits and impact assessments that meet IRC and MoRTH requirements and improve safety for every road user.'
                ]
            ],
            'card3' => [
                'title' => 'Transport Planning',
                'subtitle' => 'Safe, efficient mobility for today and future generations.',
                'intro' => 'Our faculty and research scholars support city and highway planning across many disciplines:',
                'checklist' => [
                    'Traffic surveys and capacity analysis',
                    'Urban mobility plans',
                    'Junction and corridor design',
                    'Public transport studies',
                    'Accident black-spot analysis',
                    'Long range transport planning',
                    'Project planning & appraisal',
                    'Pre-construction advisory',
                    'Disaster recovery of roads',
                    'Intelligent transport systems'
                ]
            ]
        ],
        'tabs_title' => 'Highway Services for TEP Solutions',
        'tabs' => [
            [
                'label' => 'Pavement Design',
                'title' => 'Pavement Design & Rehabilitation',
                'items' => [
                    'Flexible and rigid pavement design',
                    'FWD and structural evaluation',
                    'Overlay design',
                    'Life-cycle cost analysis',
                    'Construction supervision'
                ],
                'image' => 'images/highway-footer-bg.jpg',
                'photo_label' => 'Pavement Engineering'
            ],
            [
                'label' => 'Traffic Engineering',
                'title' => 'Traffic Engineering',
                'items' => [
                    'Classified volume counts',
                    'Junction design',
                    'Level of service analysis',
                    'Parking studies',
                    'Simulation modelling'
                ],
                'image' => 'images/Traffic Engineering.jpg',
                'photo_label' => 'Traffic Analysis'
            ],
            [
                'label' => 'Materials Testing',
                'title' => 'Materials Testing',
                'items' => [
                    'Bitumen and modified binders',
                    'Aggregate characterisation',
                    'Marshall mix design',
                    'Soil and subgrade tests',
                    'NABL-aligned quality protocols'
                ],
                'image' => 'images/Hero_2.jpg',
                'photo_label' => 'Materials Laboratory'
            ],
            [
                'label' => 'Road Safety',
                'title' => 'Road Safety',
                'items' => [
                    'Road safety audits',
                    'Black-spot identification',
                    'Countermeasure design',
                    'Pedestrian facilities',
                    'Speed management schemes'
                ],
                'image' => 'images/Road Safety Audit.jpg',
                'photo_label' => 'Corridor Safety'
            ],
            [
                'label' => 'Permitting & Compliance',
                'title' => 'Permitting & Compliance',
                'items' => [
                    'Permit applications',
                    'Environmental clearances',
                    'IRC code compliance',
                    'DPR technical review',
                    'MoRTH standard verifications'
                ],
                'image' => 'images/Hero_5.jpg',
                'photo_label' => 'Regulatory Review'
            ]
        ],
        'resources' => [
            'tag' => 'More about our work',
            'title' => 'Highway Resources',
            'desc' => 'From initial planning to sustainable implementation, see how our services come together to create impactful solutions.',
            'btn_text' => 'Explore Our Services',
            'image' => 'images/Book Meeting.jpg',
            'photo_label' => 'Consultancy & Technical Dossiers'
        ],
        'slider' => [
            'title' => 'Our Work in Highways',
            'slides' => [
                ['title' => 'Bypass Corridor', 'image' => 'images/Transportation.jpg'],
                ['title' => 'Overlay Works', 'image' => 'images/highway-footer-bg.jpg'],
                ['title' => 'Junction Redesign', 'image' => 'images/Traffic Engineering.jpg'],
                ['title' => 'Lab Testing', 'image' => 'images/Hero_1.jpg'],
                ['title' => 'Field Survey', 'image' => 'images/Surveying.jpg'],
                ['title' => 'Bridge Approach', 'image' => 'images/Rail Services.jpg'],
            ]
        ],
        'projects' => [
            'tag' => 'Our impact in highways',
            'title' => 'Projects',
            'items' => [
                [
                    'title' => 'State Highway Strengthening',
                    'tag' => 'Highways',
                    'desc' => 'Structural evaluation and overlay design for a heavily trafficked corridor.',
                    'image' => 'images/highway-footer-bg.jpg',
                    'link' => 'projects.php'
                ],
                [
                    'title' => 'Urban Junction Improvement',
                    'tag' => 'Transportation',
                    'desc' => 'Traffic counts, simulation and geometric redesign for a city junction.',
                    'image' => 'images/Traffic Engineering.jpg',
                    'link' => 'projects.php'
                ]
            ]
        ],
        'cta_banner' => [
            'title' => 'Do You Have a Highway Project?',
            'lead' => 'Start your journey with us and experience the TEP difference.',
            'btn_text' => 'Get Started',
            'btn_link' => 'contact.php'
        ]
    ],

    'road-safety-audit' => [
        'id' => 'road-safety-audit',
        'title' => 'Road Safety Audit',
        'breadcrumb' => 'Road Safety Audit',
        'hero_title' => 'Road Safety Audit Expertise',
        'hero_lead' => 'Our certified Road Safety Audit team is devoted to inspecting, evaluating, and safeguarding highway assets that form the bedrock of zero-fatality transit corridors across India.',
        'hero_collage' => [
            'a' => ['title' => 'Corridor Inspection', 'image' => 'images/Road Safety Audit.jpg'],
            'b' => ['title' => 'Field Crash Telemetry', 'image' => 'images/Hero_2.jpg'],
            'd' => ['title' => 'Expressway Safety', 'image' => 'images/highway-footer-bg.jpg'],
        ],
        'solutions_title' => 'Solving Safety Challenges with TEP Solutions',
        'solution_image' => 'images/Road Safety Audit.jpg',
        'solutions_list' => [
            'Feasibility & alignment safety reviews',
            'Detailed project report (DPR) geometric audit',
            'Construction work-zone traffic control',
            'Pre-opening & operational safety certification',
            'Crash hotspot & blackspot clustering',
            'High-speed spot speed & radar telemetry',
            'Sight triangle & night-time retroreflectivity',
            'Vulnerable road user (VRU) protection',
            'Intersection & roundabout safety redesign',
            'IRC:SP:88 prioritized mitigation matrices'
        ],
        'we_work' => [
            'pre' => 'Vision Zero Corridors',
            'ghost' => 'We work<br>together',
            'title' => 'Collaborating with NHAI, MoRTH, and state police authorities to engineer collision-free highway infrastructure.',
            'desc' => 'We combine empirical crash telemetry, certified IRC:SP:88 auditor methodologies, and advanced road safety analytics.',
            'btn_text' => 'Initiate Safety Audit',
            'btn_link' => 'contact.php',
            'img' => 'images/We Work Together.png'
        ],
        'cards' => [
            'card1' => [
                'title' => 'Multi-Stage Road Safety Audits',
                'subtitle' => 'Independent, objective evaluation conforming to IRC:SP:88 guidelines.',
                'paragraphs' => [
                    'Our accredited audit team operates completely independent of construction contractors, ensuring every road safety inspection prioritizes user safety over commercial compromises.',
                    'From feasibility alignment checks to live post-opening monitoring, we identify potential hazard points before fatal crashes occur.'
                ]
            ],
            'card2' => [
                'title' => 'Blackspot Rectification',
                'paragraphs' => [
                    'Using empirical FIR crash records, satellite GIS geocoding, and high-precision field inspections, we isolate high-risk sections and formulate cost-effective engineering remedies.'
                ]
            ],
            'card3' => [
                'title' => 'Vulnerable Road User Safety',
                'subtitle' => 'Targeted protection for pedestrians, two-wheelers, and non-motorized transit.',
                'intro' => 'Our faculty and certified auditors apply evidence-based safety engineering across highway and urban networks:',
                'checklist' => [
                    'Pedestrian refuge and grade-separated crossings',
                    'Traffic calming and speed abatement geometry',
                    'Work-zone barricading and diversion audits',
                    'Signage retroreflectivity and markings inspection',
                    'Roadside forgiving hazard barrier design',
                    'Intersection conflict point minimization',
                    'Sight distance clearance evaluations',
                    'School and hospital zone speed reduction',
                    'Economic benefit-cost crash reduction modeling',
                    'Statutory safety compliance certification'
                ]
            ]
        ],
        'tabs_title' => 'Road Safety Solutions for TEP Clients',
        'tabs' => [
            [
                'label' => 'Multi-Stage Audits',
                'title' => 'Multi-Stage Road Safety Auditing (IRC:SP:88)',
                'items' => [
                    'Stage 1: Alignment feasibility & cross-section check',
                    'Stage 2: Detailed design & geometric compliance',
                    'Stage 3: Construction stage work-zone safety',
                    'Stage 4: Pre-opening road inspection & signoff',
                    'Stage 5: Operational corridor recurring reviews'
                ],
                'image' => 'images/Road Safety Audit.jpg',
                'photo_label' => 'IRC:SP:88 Auditing'
            ],
            [
                'label' => 'Crash Telemetry',
                'title' => 'Crash Data Telemetry & Hotspot Modeling',
                'items' => [
                    'Accident Severity Index (ASI) geocoding',
                    'Collision diagram reconstruction',
                    'Speed variance & deceleration diagnostics',
                    'Crash prediction modeling for mixed traffic',
                    'Ranked corrective engineering measures'
                ],
                'image' => 'images/Hero_2.jpg',
                'photo_label' => 'Crash Analytics'
            ],
            [
                'label' => 'Junction Safety',
                'title' => 'Intersection & Roundabout Channelization',
                'items' => [
                    'Conflict point reduction diagrams',
                    'Sight triangle clearance checks',
                    'Channelized turning lanes & splitter islands',
                    'Pedestrian crosswalk safety schemes',
                    'Mini-roundabout and junction retrofits'
                ],
                'image' => 'images/Traffic Engineering.jpg',
                'photo_label' => 'Junction Safety'
            ],
            [
                'label' => 'Work-Zone Safety',
                'title' => 'Construction Work-Zone Management (IRC:SP:55)',
                'items' => [
                    'Traffic diversion plan proof-checking',
                    'Retroreflective barricade & signage layout',
                    'Taper length & buffer zone calculations',
                    'Night-time illumination inspections',
                    'Worker protection and lane closure protocols'
                ],
                'image' => 'images/highway-footer-bg.jpg',
                'photo_label' => 'Work-Zone Protocols'
            ],
            [
                'label' => 'Statutory Compliance',
                'title' => 'Statutory Road Safety Compliance',
                'items' => [
                    'MoRTH road safety audit compliance dossiers',
                    'Independent engineer safety validation',
                    'Accident reduction economic analysis',
                    'Highway concessionaire audit certification',
                    'Judicial and inquiry technical reporting'
                ],
                'image' => 'images/Hero_5.jpg',
                'photo_label' => 'Audit Certification'
            ]
        ],
        'resources' => [
            'tag' => 'Safety Publications & Codes',
            'title' => 'Road Safety Resources',
            'desc' => 'Explore our empirical safety audit guidelines, crash reduction models, and IRC standard references.',
            'btn_text' => 'Explore Our Services',
            'image' => 'images/Book Meeting.jpg',
            'photo_label' => 'Audit Standards & Protocols'
        ],
        'slider' => [
            'title' => 'Safety Audits Across Corridors',
            'slides' => [
                ['title' => 'Expressway Audit', 'image' => 'images/highway-footer-bg.jpg'],
                ['title' => 'Blackspot Rectification', 'image' => 'images/Road Safety Audit.jpg'],
                ['title' => 'Work-Zone Inspection', 'image' => 'images/Hero_2.jpg'],
                ['title' => 'Night Retroreflectivity', 'image' => 'images/Hero_1.jpg'],
                ['title' => 'Urban Roundabout', 'image' => 'images/Traffic Engineering.jpg'],
                ['title' => 'Pedestrian Corridor', 'image' => 'images/Transportation.jpg'],
            ]
        ],
        'projects' => [
            'tag' => 'Our impact in safety',
            'title' => 'Projects',
            'items' => [
                [
                    'title' => 'National Highway 48 Safety Audit',
                    'tag' => 'Road Safety',
                    'desc' => 'Comprehensive multi-stage safety audit identifying 18 blackspots with engineered rectification designs.',
                    'image' => 'images/Road Safety Audit.jpg',
                    'link' => 'projects.php'
                ],
                [
                    'title' => 'Surat BRTS Corridor Safety Review',
                    'tag' => 'Urban Transit',
                    'desc' => 'Pedestrian crossing safety overhaul and junction channelization reducing collision risks by 42%.',
                    'image' => 'images/Traffic Engineering.jpg',
                    'link' => 'projects.php'
                ]
            ]
        ],
        'cta_banner' => [
            'title' => 'Need a Certified Road Safety Audit?',
            'lead' => 'Connect with SVNIT faculty consultants for IRC:SP:88 certified safety audits and DPR reviews.',
            'btn_text' => 'Get Started',
            'btn_link' => 'contact.php'
        ]
    ],

    'traffic-engineering' => [
        'id' => 'traffic-engineering',
        'title' => 'Traffic Engineering',
        'breadcrumb' => 'Traffic Engineering',
        'hero_title' => 'Traffic Engineering Expertise',
        'hero_lead' => 'Our Traffic Engineering team delivers empirical traffic volume telemetry, corridor capacity modeling, and signal timing designs that form the foundation of efficient urban and highway mobility.',
        'hero_collage' => [
            'a' => ['title' => 'Volume Counts', 'image' => 'images/Traffic Engineering.jpg'],
            'b' => ['title' => 'Signal Phasing', 'image' => 'images/Hero_1.jpg'],
            'd' => ['title' => 'Corridor Telemetry', 'image' => 'images/Hero_5.jpg'],
        ],
        'solutions_title' => 'Solving Congestion with TEP Solutions',
        'solution_image' => 'images/Traffic Engineering.jpg',
        'solutions_list' => [
            'Classified Traffic Volume Counts (CTVC)',
            'Turning Movement Counts (TMC) at junctions',
            'Indo-HCM mixed traffic PCU modeling',
            'Origin-Destination (O-D) survey analysis',
            'Spot speed & speed-flow density telemetry',
            'Coordinated signal phasing & split optimization',
            'Corridor travel time & bottleneck diagnostics',
            'On-street & off-street parking demand surveys',
            'Pedestrian volume & sidewalk LOS analysis',
            'Micro-simulation modeling via VISSIM & Aimsun'
        ],
        'we_work' => [
            'pre' => 'Empirical Traffic Science',
            'ghost' => 'We work<br>together',
            'title' => 'Engineering smarter signal networks, smooth junction flows, and data-backed corridor mobility.',
            'desc' => 'We transform raw vehicular flow telemetry into actionable junction layouts, coordinated green waves, and level-of-service enhancements.',
            'btn_text' => 'Start Traffic Study',
            'btn_link' => 'contact.php',
            'img' => 'images/We Work Together.png'
        ],
        'cards' => [
            'card1' => [
                'title' => 'Empirical Field Surveys & Telemetry',
                'subtitle' => 'High-accuracy volume telemetry and turning movement diagnostics.',
                'paragraphs' => [
                    'TRC deploys high-definition video surveillance, automated sensor counters, and precision radar guns to capture classified vehicle movements, non-lane-based queuing, and spot speeds with high statistical accuracy.',
                    'Continuous 24-hour and 7-day volume profiling establishes accurate peak hour factors and directional splits.'
                ]
            ],
            'card2' => [
                'title' => 'Indo-HCM Capacity Modeling',
                'paragraphs' => [
                    'Standard Western models fail under India’s unique heterogeneous vehicular mix. TRC applies Indian Highway Capacity Manual methodologies to compute dynamic PCUs, friction factors, and accurate Level-of-Service grades.'
                ]
            ],
            'card3' => [
                'title' => 'Junction Channelization & Signal Design',
                'subtitle' => 'Coordinated arterial green waves and geometric island channelization.',
                'intro' => 'Our faculty and traffic engineers deliver end-to-end intersection redesigns:',
                'checklist' => [
                    'Geometric channelization and turning bay drawings',
                    'Webster cycle length calculation and phase splits',
                    'Coordinated arterial signal progression (Green Waves)',
                    'Actuated and semi-actuated detector strategies',
                    'Micro-simulation visualization in VISSIM',
                    'Level-of-Service (LOS) computation',
                    'Pedestrian clearance intervals and crossing times',
                    'Parking demand and turnover telemetry',
                    'Weaving section and roundabout capacity analysis',
                    'Traffic diversion planning during infrastructure construction'
                ]
            ]
        ],
        'tabs_title' => 'Traffic Engineering Services for TEP Clients',
        'tabs' => [
            [
                'label' => 'Volume Studies',
                'title' => 'Classified Traffic Volume Counts (CTVC)',
                'items' => [
                    'Continuous 24-hr & 7-day automated volume profiling',
                    'Vehicle axle classification (2W, 3W, Cars, LCV, HCV, Multi-Axle)',
                    'Peak hour factor (PHF) and directional splits',
                    'Toll plaza throughput and queuing analysis',
                    'Commercial vehicle percentage quantification'
                ],
                'image' => 'images/Traffic Engineering.jpg',
                'photo_label' => 'Volume Telemetry'
            ],
            [
                'label' => 'Signal Optimization',
                'title' => 'Signal Timing & Green Wave Coordination',
                'items' => [
                    'Webster method cycle length optimization',
                    'Multi-dial morning, midday, and evening timing plans',
                    'Arterial coordinated progression time-space diagrams',
                    'Pedestrian exclusive phase calculations',
                    'Queue dissipation and delay reduction metrics'
                ],
                'image' => 'images/Hero_1.jpg',
                'photo_label' => 'Signal Timing'
            ],
            [
                'label' => 'Junction Design',
                'title' => 'Junction Geometric Redesign & Roundabouts',
                'items' => [
                    'Turning movement count (TMC) matrix modeling',
                    'Physical channelization islands & radius expansion',
                    'Swept-path simulation for heavy articulated vehicles',
                    'Visibility triangle and sightline verification',
                    'Before-and-after micro-simulation proofing'
                ],
                'image' => 'images/Transportation.jpg',
                'photo_label' => 'Junction Redesign'
            ],
            [
                'label' => 'Parking Studies',
                'title' => 'Parking Demand & Supply Telemetry',
                'items' => [
                    'On-street and off-street parking inventory surveys',
                    'Parking accumulation, duration, and turnover analysis',
                    'Multi-level car parking (MLCP) ingress/egress review',
                    'Commercial delivery bay queue management',
                    'Parking pricing policy and demand mitigation'
                ],
                'image' => 'images/Land Development.jpg',
                'photo_label' => 'Parking Telemetry'
            ],
            [
                'label' => 'Micro-Simulation',
                'title' => 'VISSIM & Aimsun Corridor Micro-Simulation',
                'items' => [
                    'Dynamic traffic assignment in mixed traffic networks',
                    'Calibration of Indo-HCM car-following parameters',
                    'Bottleneck and spillback visualization',
                    'Surrogate safety conflict event extraction',
                    'Policy scenario and flyover justification models'
                ],
                'image' => 'images/Smart Mobility.jpg',
                'photo_label' => 'Micro-Simulation'
            ]
        ],
        'resources' => [
            'tag' => 'Traffic Research & Publications',
            'title' => 'Traffic Engineering Resources',
            'desc' => 'Access our peer-reviewed research on Indo-HCM PCU equivalencies, signal coordination, and traffic telemetry.',
            'btn_text' => 'Explore Our Services',
            'image' => 'images/Book Meeting.jpg',
            'photo_label' => 'Traffic Manuals & Guidelines'
        ],
        'slider' => [
            'title' => 'Traffic Studies in Action',
            'slides' => [
                ['title' => 'Arterial Synchronization', 'image' => 'images/Traffic Engineering.jpg'],
                ['title' => 'Junction Counts', 'image' => 'images/Hero_1.jpg'],
                ['title' => 'VISSIM Simulation', 'image' => 'images/Smart Mobility.jpg'],
                ['title' => 'Parking Telemetry', 'image' => 'images/Land Development.jpg'],
                ['title' => 'Speed Distribution', 'image' => 'images/Hero_5.jpg'],
                ['title' => 'Roundabout Flow', 'image' => 'images/Transportation.jpg'],
            ]
        ],
        'projects' => [
            'tag' => 'Our impact in traffic',
            'title' => 'Projects',
            'items' => [
                [
                    'title' => 'Ring Road Arterial Green Wave Coordination',
                    'tag' => 'Signal Systems',
                    'desc' => 'Synchronized 14 consecutive intersections reducing corridor travel time by 28% and queue delays by 35%.',
                    'image' => 'images/Traffic Engineering.jpg',
                    'link' => 'projects.php'
                ],
                [
                    'title' => 'Central Bus Terminal Traffic Impact Study',
                    'tag' => 'Junction Design',
                    'desc' => 'Comprehensive ingress/egress redesign eliminating bus-car conflict points on surrounding arterial roads.',
                    'image' => 'images/Transportation.jpg',
                    'link' => 'projects.php'
                ]
            ]
        ],
        'cta_banner' => [
            'title' => 'Have a Traffic Congestion Challenge?',
            'lead' => 'Partner with SVNIT traffic engineering specialists for empirical surveys, signal design, and simulation.',
            'btn_text' => 'Get Started',
            'btn_link' => 'contact.php'
        ]
    ],

    'rail-services' => [
        'id' => 'rail-services',
        'title' => 'Rail & Transit Services',
        'breadcrumb' => 'Rail & Transit Services',
        'hero_title' => 'Rail & Mass Transit Expertise',
        'hero_lead' => 'Our Rail & Mass Transit engineering division is focused on advancing high-capacity corridors, intermodal rail freight terminals, and passenger interchange logistics with uncompromising safety.',
        'hero_collage' => [
            'a' => ['title' => 'Rail Corridor', 'image' => 'images/Rail Services.jpg'],
            'b' => ['title' => 'Terminal Logistics', 'image' => 'images/daniel-mccullough-HtBlQdxfG9k-unsplash.jpg'],
            'd' => ['title' => 'Intermodal Transfer', 'image' => 'images/Hero_4.jpg'],
        ],
        'solutions_title' => 'Solving Rail & Transit Challenges with TEP Solutions',
        'solution_image' => 'images/Rail Services.jpg',
        'solutions_list' => [
            'Dedicated Freight Corridor (DFC) highway links',
            'Railway station multi-modal integration (MMI)',
            'Level crossing elimination (ROB / RUB studies)',
            'High-speed rail feeder circulation plans',
            'Rail freight yard gate queuing & weigh-in-motion',
            'Passenger concourse evacuation & crowd dynamics',
            'Intermodal logistics park access geometry',
            'Rail-highway conflict diagnostics & safety',
            'Transit-oriented development (TOD) traffic studies',
            'Train Vehicle Unit (TVU) justification surveys'
        ],
        'we_work' => [
            'pre' => 'Intermodal Transit Corridors',
            'ghost' => 'We work<br>together',
            'title' => 'Uniting railways, metro networks, and arterial roads into seamless, high-throughput passenger and freight ecosystems.',
            'desc' => 'We resolve complex rail-road interfaces, streamline freight terminal truck circulation, and design multi-modal station forecourts.',
            'btn_text' => 'Consult on Rail Projects',
            'btn_link' => 'contact.php',
            'img' => 'images/We Work Together.png'
        ],
        'cards' => [
            'card1' => [
                'title' => 'Station Area Multi-Modal Integration',
                'subtitle' => 'Segregated pedestrian, paratransit, and feeder bus circulation.',
                'paragraphs' => [
                    'We re-engineer railway and metro station precinct circulation to eliminate vehicle congestion, providing segregated zones for buses, autorickshaws, taxis, private pick-up/drop-off, and barrier-free pedestrian walkways.',
                    'Simulated concourse evacuation plans ensure compliance with global mass transit life-safety codes.'
                ]
            ],
            'card2' => [
                'title' => 'Level Crossing Elimination (ROB / RUB)',
                'paragraphs' => [
                    'High-frequency train corridors with at-grade road crossings create extreme delays and critical collision hazards. TRC conducts TVU surveys and designs Road Over Bridge and Road Under Bridge grade separation alternatives.'
                ]
            ],
            'card3' => [
                'title' => 'Intermodal Freight Terminals & DFC Links',
                'subtitle' => 'Heavy-vehicle entry gates, weigh-in-motion, and arterial interchange ramps.',
                'intro' => 'Our transit engineering team supports regional rail planning and freight logistics:',
                'checklist' => [
                    '7-day 24-hr Train Vehicle Unit (TVU) counts',
                    'Approach ramp geometry and sight distance analysis',
                    'Diversion route capacity during bridge construction',
                    'Heavy truck swept-path modeling at freight gates',
                    'Automated gate queue reservoir sizing',
                    'Pavement structural design for heavy container loads',
                    'Station forecourt pedestrian surge simulation',
                    'Feeder bus terminal layout and layover parking',
                    'Transit-Oriented Development traffic impact reviews',
                    'Independent technical vetting of rail-road projects'
                ]
            ]
        ],
        'tabs_title' => 'Rail & Transit Services for TEP Clients',
        'tabs' => [
            [
                'label' => 'MMI Station Design',
                'title' => 'Multi-Modal Interchange (MMI) Planning',
                'items' => [
                    'Segregated vehicular pick-up/drop-off circulation',
                    'Designated paratransit & auto-rickshaw bays',
                    'Universal accessibility ramps & tactile wayfinding',
                    'Feeder bus terminal integration',
                    'Pedestrian walkway capacity & crowd dynamics'
                ],
                'image' => 'images/Rail Services.jpg',
                'photo_label' => 'Station Interchange'
            ],
            [
                'label' => 'ROB / RUB Studies',
                'title' => 'Level Crossing Grade Separation (ROB/RUB)',
                'items' => [
                    'TVU threshold justification field surveys',
                    'Bridge approach ramp geometric design',
                    'Cross-drainage and vertical clearance profiling',
                    'Service road channelization civil drawings',
                    'Construction phase traffic diversion schemes'
                ],
                'image' => 'images/Transportation.jpg',
                'photo_label' => 'Bridge Grade Separation'
            ],
            [
                'label' => 'Freight Logistics',
                'title' => 'DFC & ICD Freight Terminal Access',
                'items' => [
                    'Weigh-in-Motion (WIM) entry gate queue sizing',
                    'Articulated container truck turning templates',
                    'Highway tie-in acceleration/deceleration lanes',
                    'Internal yard circulation & safety channelization',
                    'Heavy-duty concrete pavement structural design'
                ],
                'image' => 'images/Hero_4.jpg',
                'photo_label' => 'Freight Terminal'
            ],
            [
                'label' => 'Crowd Dynamics',
                'title' => 'Station Evacuation & Pedestrian Modeling',
                'items' => [
                    'Concourse peak crowd surge simulations',
                    'Staircase, escalator & turnstile capacity audits',
                    'Emergency evacuation bottleneck diagnostics',
                    'Platform clearance time verification',
                    'Signage and passenger wayfinding plans'
                ],
                'image' => 'images/daniel-mccullough-HtBlQdxfG9k-unsplash.jpg',
                'photo_label' => 'Crowd Dynamics'
            ],
            [
                'label' => 'Feeder Systems',
                'title' => 'Metro & High-Speed Rail Feeder Networks',
                'items' => [
                    'Catchment area travel demand modeling',
                    'Last-mile feeder route rationalization',
                    'Bicycle sharing & e-rickshaw terminal hubs',
                    'Integrated ticketing queue analysis',
                    'Modal shift and patronage forecasting'
                ],
                'image' => 'images/Traffic Engineering.jpg',
                'photo_label' => 'Feeder Networks'
            ]
        ],
        'resources' => [
            'tag' => 'Mass Transit Guidelines',
            'title' => 'Rail & Transit Resources',
            'desc' => 'Technical reports on multi-modal integration, grade separation criteria, and freight terminal logistics.',
            'btn_text' => 'Explore Our Services',
            'image' => 'images/Book Meeting.jpg',
            'photo_label' => 'Transit Standards & Case Studies'
        ],
        'slider' => [
            'title' => 'Our Work in Rail & Transit',
            'slides' => [
                ['title' => 'Station Forecourt', 'image' => 'images/Rail Services.jpg'],
                ['title' => 'ROB Grade Separation', 'image' => 'images/Transportation.jpg'],
                ['title' => 'Freight Logistics', 'image' => 'images/Hero_4.jpg'],
                ['title' => 'Metro Concourse', 'image' => 'images/daniel-mccullough-HtBlQdxfG9k-unsplash.jpg'],
                ['title' => 'Feeder Hub', 'image' => 'images/Traffic Engineering.jpg'],
                ['title' => 'Track Alignment', 'image' => 'images/Hero_1.jpg'],
            ]
        ],
        'projects' => [
            'tag' => 'Our impact in rail transit',
            'title' => 'Projects',
            'items' => [
                [
                    'title' => 'Surat Railway Station Multi-Modal Hub',
                    'tag' => 'Transit Hub',
                    'desc' => 'Circulation redesign separating 60,000 daily commuters from arterial city traffic with designated paratransit bays.',
                    'image' => 'images/Rail Services.jpg',
                    'link' => 'projects.php'
                ],
                [
                    'title' => 'Western DFC Highway Interchange',
                    'tag' => 'Freight Logistics',
                    'desc' => 'Geometric access design and heavy-duty pavement evaluation for an inland container depot connection.',
                    'image' => 'images/Hero_4.jpg',
                    'link' => 'projects.php'
                ]
            ]
        ],
        'cta_banner' => [
            'title' => 'Planning a Rail or Mass Transit Corridor?',
            'lead' => 'Partner with SVNIT transit engineering faculty for multi-modal interchange design and feasibility studies.',
            'btn_text' => 'Get Started',
            'btn_link' => 'contact.php'
        ]
    ],

    'smart-mobility' => [
        'id' => 'smart-mobility',
        'title' => 'Smart Mobility & ITS',
        'breadcrumb' => 'Smart Mobility & ITS',
        'hero_title' => 'Smart Mobility & ITS Expertise',
        'hero_lead' => 'Our Smart Mobility & Intelligent Transportation Systems (ITS) division deploys computer vision, AI traffic telemetry, and connected sensor infrastructure to optimize real-time corridor operations.',
        'hero_collage' => [
            'a' => ['title' => 'AI Vision Telemetry', 'image' => 'images/Smart Mobility.jpg'],
            'b' => ['title' => 'Connected Sensors', 'image' => 'images/Hero_1.jpg'],
            'd' => ['title' => 'Smart Junctions', 'image' => 'images/Traffic Engineering.jpg'],
        ],
        'solutions_title' => 'Solving Urban Mobility Challenges with AI Solutions',
        'solution_image' => 'images/Smart Mobility.jpg',
        'solutions_list' => [
            'AI computer vision vehicle detection & tracking',
            'High-resolution vehicle trajectory extraction',
            'Time-to-Collision (TTC) surrogate safety analytics',
            'Automated traffic counter & classifier (ATCC) audits',
            'Adaptive signal control algorithms & edge computing',
            'Real-time speed & bottleneck diagnostics',
            'Connected vehicle (V2X) corridor architecture',
            'Electric vehicle (EV) charging station optimization',
            'Cloud-based urban traffic analytics dashboards',
            'Drone aerial video tracking & turning movement AI'
        ],
        'we_work' => [
            'pre' => 'Next-Gen Intelligent Mobility',
            'ghost' => 'We work<br>together',
            'title' => 'Connecting smart sensors, edge AI algorithms, and municipal command centers for zero-congestion cities.',
            'desc' => 'We combine cutting-edge machine learning with transportation engineering principles to automate traffic data collection and deliver actionable operational intelligence.',
            'btn_text' => 'Deploy Smart ITS',
            'btn_link' => 'contact.php',
            'img' => 'images/We Work Together.png'
        ],
        'cards' => [
            'card1' => [
                'title' => 'AI Computer Vision & Video Analytics',
                'subtitle' => 'Automated vehicle detection trained on Indian mixed traffic.',
                'paragraphs' => [
                    'TRC develops custom deep neural networks trained on Indian traffic conditions to detect, classify, and track non-standard vehicles, pedestrians, and auto-rickshaws from fixed CCTV cameras and aerial drone feeds.',
                    'Automated classified counts exceed 95% verification accuracy across diverse lighting and weather states.'
                ]
            ],
            'card2' => [
                'title' => 'Surrogate Safety Assessment (SSAM)',
                'paragraphs' => [
                    'Traditional road safety relies on crash history after injuries occur. TRC’s surrogate safety algorithms detect near-misses and compute Time-to-Collision (TTC) and Post-Encroachment Time (PET) from video telemetry.'
                ]
            ],
            'card3' => [
                'title' => 'Adaptive Signals & Smart City Dashboards',
                'subtitle' => 'Connected software integrated with Municipal Command Centers (ICCC).',
                'intro' => 'Our faculty and AI transportation researchers deliver modern smart city solutions:',
                'checklist' => [
                    'Edge AI sensor architectures for smart junctions',
                    'Dynamic green wave synchronization from arrival bursts',
                    'Cloud-based interactive GIS traffic dashboards',
                    'Variable Message Signs (VMS) driver information logic',
                    'Corridor emission and fuel consumption telemetry',
                    'Drone aerial trajectory extraction algorithms',
                    'Automated Incident Detection (wrong-way, stalls)',
                    'Electric Vehicle charging network demand modeling',
                    'Connected vehicle (V2X) roadside unit layouts',
                    'Third-party accuracy benchmarking of commercial ITS'
                ]
            ]
        ],
        'tabs_title' => 'Smart Mobility Solutions for TEP Clients',
        'tabs' => [
            [
                'label' => 'Computer Vision',
                'title' => 'AI Computer Vision Traffic Telemetry',
                'items' => [
                    'Custom YOLO/DeepSORT models for Indian mixed traffic',
                    'Sub-second vehicle classification across 12 categories',
                    'High-frequency vehicle position, speed & trajectory tracking',
                    'Lane-indiscipline & lateral drift quantification',
                    'Automated junction delay & queue length measurement'
                ],
                'image' => 'images/Smart Mobility.jpg',
                'photo_label' => 'Computer Vision AI'
            ],
            [
                'label' => 'Surrogate Safety',
                'title' => 'Surrogate Safety Assessment (TTC & PET)',
                'items' => [
                    'Proactive near-miss detection before fatal crashes occur',
                    'Time-to-Collision (TTC) histogram profiling',
                    'Post-Encroachment Time (PET) conflict mapping',
                    'Junction heatmaps highlighting invisible hazards',
                    'Before-and-after safety evaluation of geometry redesigns'
                ],
                'image' => 'images/Road Safety Audit.jpg',
                'photo_label' => 'Surrogate Safety'
            ],
            [
                'label' => 'Adaptive Signals',
                'title' => 'Adaptive Signal Control Algorithms',
                'items' => [
                    'Edge-computed real-time cycle adjustment',
                    'Arrival platoon progression synchronization',
                    'Emergency vehicle priority preemption protocols',
                    'Bus Rapid Transit (BRT) signal priority',
                    'Degraded mode fail-safe signal logic'
                ],
                'image' => 'images/Hero_1.jpg',
                'photo_label' => 'Adaptive Control'
            ],
            [
                'label' => 'Drone Analytics',
                'title' => 'UAV Drone Video Trajectory AI',
                'items' => [
                    'High-altitude aerial intersection flow tracking',
                    'Non-lane-based weaving and merging diagnostics',
                    'Origin-destination turning flow matrices from video',
                    'Roundabout circulating velocity profiling',
                    'Micro-simulation calibration trajectory inputs'
                ],
                'image' => 'images/Surveying.jpg',
                'photo_label' => 'Drone Trajectory AI'
            ],
            [
                'label' => 'Smart City ICCC',
                'title' => 'Integrated Command Center Dashboards',
                'items' => [
                    'Web-GIS corridor performance dashboards',
                    'Real-time congestion severity index alerts',
                    'Incident detection telemetry & dispatch feeds',
                    'Historical trend analytics and predictive modeling',
                    'API integration with Google Maps and municipal databases'
                ],
                'image' => 'images/Traffic Engineering.jpg',
                'photo_label' => 'ICCC Integration'
            ]
        ],
        'resources' => [
            'tag' => 'Smart City Research Papers',
            'title' => 'Smart Mobility Resources',
            'desc' => 'Explore our latest publications on deep learning for heterogeneous traffic, surrogate safety, and adaptive signals.',
            'btn_text' => 'Explore Our Services',
            'image' => 'images/Book Meeting.jpg',
            'photo_label' => 'AI Research & Technical Whitepapers'
        ],
        'slider' => [
            'title' => 'Smart Mobility Deployments',
            'slides' => [
                ['title' => 'Computer Vision AI', 'image' => 'images/Smart Mobility.jpg'],
                ['title' => 'Adaptive Signals', 'image' => 'images/Hero_1.jpg'],
                ['title' => 'Drone Video AI', 'image' => 'images/Surveying.jpg'],
                ['title' => 'Conflict Mapping', 'image' => 'images/Road Safety Audit.jpg'],
                ['title' => 'ICCC Integration', 'image' => 'images/Traffic Engineering.jpg'],
                ['title' => 'Connected Corridors', 'image' => 'images/Transportation.jpg'],
            ]
        ],
        'projects' => [
            'tag' => 'Our impact in smart mobility',
            'title' => 'Projects',
            'items' => [
                [
                    'title' => 'Smart City Surveillance & AI Traffic Telemetry',
                    'tag' => 'Computer Vision',
                    'desc' => 'Trained neural network video analytics across 50 intersection cameras delivering real-time vehicle classification.',
                    'image' => 'images/Smart Mobility.jpg',
                    'link' => 'projects.php'
                ],
                [
                    'title' => 'Surrogate Safety Audit for Major Urban Corridors',
                    'tag' => 'Surrogate Safety',
                    'desc' => 'Computer vision TTC conflict analytics identifying critical near-miss hotspots prior to intersection redesign.',
                    'image' => 'images/Road Safety Audit.jpg',
                    'link' => 'projects.php'
                ]
            ]
        ],
        'cta_banner' => [
            'title' => 'Modernize Your Corridors with Smart ITS?',
            'lead' => 'Partner with SVNIT AI and mobility faculty to deploy edge intelligence and connected corridor systems.',
            'btn_text' => 'Get Started',
            'btn_link' => 'contact.php'
        ]
    ],

    'land-development' => [
        'id' => 'land-development',
        'title' => 'Land Development & Pavements',
        'breadcrumb' => 'Land Development & Pavements',
        'hero_title' => 'Land Development & Pavement Expertise',
        'hero_lead' => 'Our Land Development and Pavement Engineering team delivers comprehensive site access engineering, pavement structural evaluation, and traffic impact assessments for commercial and industrial hubs.',
        'hero_collage' => [
            'a' => ['title' => 'Site Development', 'image' => 'images/Land Development.jpg'],
            'b' => ['title' => 'Pavement Testing', 'image' => 'images/thisisengineering-xYCBw1uIP_M-unsplash.jpg'],
            'd' => ['title' => 'Deflection Audits', 'image' => 'images/Surveying.jpg'],
        ],
        'solutions_title' => 'Solving Development & Pavement Challenges with TEP Solutions',
        'solution_image' => 'images/Land Development.jpg',
        'solutions_list' => [
            'Traffic Impact Assessment (TIA) for mega sites',
            'Benkelman Beam Deflection (BBD) structural audits',
            'Falling Weight Deflectometer (FWD) modulus testing',
            'Commercial axle load surveys (VDF & MSA modeling)',
            'Site ingress / egress geometry & deceleration lanes',
            'Swept path simulation for fire tenders & trucks',
            'Multi-Level Car Parking (MLCP) circulation reviews',
            'Pavement life-cycle cost analysis & overlay design',
            'Permeable pavements & green infrastructure design',
            'Statutory clearance dossiers for municipal approval'
        ],
        'we_work' => [
            'pre' => 'Durable Foundations & Access',
            'ghost' => 'We work<br>together',
            'title' => 'Bridging commercial real estate development with public arterial network capacity and durable pavement lifecycles.',
            'desc' => 'We evaluate flexible and rigid pavement structural capacity using non-destructive deflection testing and comprehensive traffic impact assessments.',
            'btn_text' => 'Consult on Development',
            'btn_link' => 'contact.php',
            'img' => 'images/We Work Together.png'
        ],
        'cards' => [
            'card1' => [
                'title' => 'Traffic Impact Assessment (TIA)',
                'subtitle' => 'Statutory site access modeling for commercial and industrial hubs.',
                'paragraphs' => [
                    'For commercial malls, IT campuses, townships, and industrial parks, TRC quantifies trip generation, evaluates surrounding junction impacts, and develops mitigation plans required for statutory development approvals.',
                    'Site access throat-length sizing prevents arterial spillback and ensures smooth vehicle queuing.'
                ]
            ],
            'card2' => [
                'title' => 'Pavement Structural Evaluation',
                'paragraphs' => [
                    'TRC evaluates flexible and rigid pavement structural capacity using non-destructive deflection testing, subgrade soil characterization, and cumulative commercial vehicle axle load projections.'
                ]
            ],
            'card3' => [
                'title' => 'Internal Circulation & Logistics Design',
                'subtitle' => 'Loading dock geometry, swept path simulation, and parking layouts.',
                'intro' => 'Our pavement and site engineering team delivers full-lifecycle development solutions:',
                'checklist' => [
                    'ITE and Indo-HCM trip generation rate modeling',
                    'Surrounding intersection capacity & V/C impact analysis',
                    'Benkelman Beam Deflection (IRC:81) rebound surveys',
                    'Falling Weight Deflectometer (FWD) back-calculation',
                    'Axle load spectrum and Vehicle Damage Factor (VDF)',
                    'IRC:37 flexible and IRC:58 rigid pavement designs',
                    'Deceleration flare and acceleration merge lanes',
                    'Swept-path simulation for fire trucks and trailers',
                    'Multi-level parking ramp grades and circulation',
                    'Permeable pavement stormwater integration'
                ]
            ]
        ],
        'tabs_title' => 'Land Development Services for TEP Clients',
        'tabs' => [
            [
                'label' => 'TIA Studies',
                'title' => 'Traffic Impact Assessment (TIA)',
                'items' => [
                    'Empirical trip generation rates for mixed-use developments',
                    'Trip distribution and network assignment modeling',
                    'Impact analysis on surrounding signalized intersections',
                    'Access throat length sizing to prevent highway spillback',
                    'Statutory TIA dossiers for municipal approval defense'
                ],
                'image' => 'images/Land Development.jpg',
                'photo_label' => 'Traffic Impact Studies'
            ],
            [
                'label' => 'Pavement Evaluation',
                'title' => 'Non-Destructive Pavement Structural Testing',
                'items' => [
                    'Benkelman Beam Deflection (BBD) surveys under IRC:81',
                    'Falling Weight Deflectometer (FWD) elastic modulus testing',
                    'Subgrade soil CBR sampling & laboratory characterization',
                    'Pavement Condition Index (PCI) distress mapping',
                    'Cost-effective structural overlay thickness design'
                ],
                'image' => 'images/thisisengineering-xYCBw1uIP_M-unsplash.jpg',
                'photo_label' => 'Pavement Evaluation'
            ],
            [
                'label' => 'Axle Load Surveys',
                'title' => 'Axle Load Surveys & VDF Projections',
                'items' => [
                    'Portable static & dynamic wheel load weighing',
                    'Commercial vehicle axle classification (Single, Tandem, Tridem)',
                    'Vehicle Damage Factor (VDF) computation',
                    'Million Standard Axle (MSA) cumulative traffic modeling',
                    'Overloaded vehicle enforcement advisory'
                ],
                'image' => 'images/Hero_5.jpg',
                'photo_label' => 'Axle Load Profiling'
            ],
            [
                'label' => 'Site Access',
                'title' => 'Site Ingress / Egress & Highway Tie-in',
                'items' => [
                    'Deceleration flare and acceleration taper geometry',
                    'Sight distance triangle verification at driveway entrances',
                    'Turning radii and curb profile civil drawings',
                    'Dedicated slip road and auxiliary lane design',
                    'Access management compliance with IRC:62 standards'
                ],
                'image' => 'images/Transportation.jpg',
                'photo_label' => 'Site Ingress / Egress'
            ],
            [
                'label' => 'Internal Logistics',
                'title' => 'Internal Logistics & Swept-Path Modeling',
                'items' => [
                    'AutoTURN swept-path simulation for multi-axle trailers',
                    'Fire tender turning radius and emergency access review',
                    'Loading dock maneuvering space and clearance sizing',
                    'Internal traffic calming and pedestrian walkways',
                    'Parking bay layouts conforming to municipal bylaws'
                ],
                'image' => 'images/Surveying.jpg',
                'photo_label' => 'Internal Logistics'
            ]
        ],
        'resources' => [
            'tag' => 'Pavement & Site Manuals',
            'title' => 'Development Resources',
            'desc' => 'Technical specifications on IRC:37/58 pavement design, TIA best practices, and commercial site access guidelines.',
            'btn_text' => 'Explore Our Services',
            'image' => 'images/Book Meeting.jpg',
            'photo_label' => 'Engineering Manuals & Guides'
        ],
        'slider' => [
            'title' => 'Our Work in Development & Pavements',
            'slides' => [
                ['title' => 'Commercial TIA', 'image' => 'images/Land Development.jpg'],
                ['title' => 'Deflection Testing', 'image' => 'images/thisisengineering-xYCBw1uIP_M-unsplash.jpg'],
                ['title' => 'Heavy Logistics Access', 'image' => 'images/Transportation.jpg'],
                ['title' => 'Axle Weighing', 'image' => 'images/Hero_5.jpg'],
                ['title' => 'Pavement Coring', 'image' => 'images/Hero_1.jpg'],
                ['title' => 'Site Circulation', 'image' => 'images/Surveying.jpg'],
            ]
        ],
        'projects' => [
            'tag' => 'Our impact in development',
            'title' => 'Projects',
            'items' => [
                [
                    'title' => 'Mega Industrial Park Traffic Impact Assessment',
                    'tag' => 'Land Development',
                    'desc' => 'Comprehensive TIA and highway access junction design handling 3,200 heavy commercial trucks daily.',
                    'image' => 'images/Land Development.jpg',
                    'link' => 'projects.php'
                ],
                [
                    'title' => 'Expressway Corridor Pavement Structural Audit',
                    'tag' => 'Pavement Engineering',
                    'desc' => 'Falling Weight Deflectometer testing and overlay design extending pavement design life by 15 years.',
                    'image' => 'images/highway-footer-bg.jpg',
                    'link' => 'projects.php'
                ]
            ]
        ],
        'cta_banner' => [
            'title' => 'Developing a Commercial or Industrial Site?',
            'lead' => 'Partner with SVNIT pavement and transportation specialists for statutory TIA approvals and resilient pavement design.',
            'btn_text' => 'Get Started',
            'btn_link' => 'contact.php'
        ]
    ],

    'surveying' => [
        'id' => 'surveying',
        'title' => 'Surveying & Drone Analytics',
        'breadcrumb' => 'Surveying & Drone Analytics',
        'hero_title' => 'Surveying & Drone Analytics Expertise',
        'hero_lead' => 'Our Surveying and Spatial Analytics team leverages high-precision RTK GPS, digital Total Stations, and UAV drone photogrammetry to provide centimeter-grade terrain intelligence for infrastructure.',
        'hero_collage' => [
            'a' => ['title' => 'Drone Photogrammetry', 'image' => 'images/Surveying.jpg'],
            'b' => ['title' => 'GNSS Control', 'image' => 'images/Hero_5.jpg'],
            'd' => ['title' => 'Corridor Mapping', 'image' => 'images/Road Safety Audit.jpg'],
        ],
        'solutions_title' => 'Solving Spatial & Terrain Challenges with TEP Solutions',
        'solution_image' => 'images/Surveying.jpg',
        'solutions_list' => [
            'UAV drone photogrammetry & orthomosaic maps',
            'Digital Total Station topographical highway surveys',
            'RTK dual-frequency GNSS geodetic ground control',
            'Digital Elevation Models (DEM) & DTM contours',
            'Highway cross-sectional & longitudinal profiles',
            'Right-of-Way (ROW) demarcation & boundary staking',
            'Aerial drone video for intersection queues & movements',
            'Pavement distress & crack photogrammetric audits',
            'LiDAR point-cloud clearance & terrain profiling',
            'Enterprise Web-GIS highway asset geodatabases'
        ],
        'we_work' => [
            'pre' => 'Centimeter-Grade Spatial Precision',
            'ghost' => 'We work<br>together',
            'title' => 'Fusing geodetic ground surveys, UAV photogrammetry, and enterprise GIS for resilient infrastructure planning.',
            'desc' => 'We deliver survey-grade topographical maps, Digital Elevation Models, and high-resolution orthophotos that accelerate highway engineering and asset management.',
            'btn_text' => 'Commission a Survey',
            'btn_link' => 'contact.php',
            'img' => 'images/We Work Together.png'
        ],
        'cards' => [
            'card1' => [
                'title' => 'High-Precision UAV Drone Photogrammetry',
                'subtitle' => 'Survey-grade aerial mapping with 1–2 cm per pixel ground resolution.',
                'paragraphs' => [
                    'TRC operates survey-grade unmanned aerial vehicles (UAVs) equipped with RTK positioning to produce orthorectified aerial imagery with high spatial precision across complex terrains.',
                    'Automated flight planning and Ground Control Point networks tied to national benchmarks guarantee survey integrity.'
                ]
            ],
            'card2' => [
                'title' => 'Digital Total Station & RTK GNSS',
                'paragraphs' => [
                    'Our field surveying crews use high-accuracy Electronic Total Stations and multi-constellation GNSS receivers to capture physical features, utility alignments, and cross-drainage invert levels.'
                ]
            ],
            'card3' => [
                'title' => 'Geospatial Asset Management & GIS',
                'subtitle' => 'Interactive geodatabases giving road authorities complete visibility.',
                'intro' => 'Our spatial surveying division delivers end-to-end geospatial intelligence:',
                'checklist' => [
                    'Automated corridor flight planning & georeferencing',
                    'Centimeter-accurate horizontal and vertical control networks',
                    'Digital Elevation Models (DEM) and contour extraction',
                    'Cut-and-fill earthwork volumetric calculations',
                    'Highway center-line alignment and chainage marking',
                    'Culvert, bridge, and cross-drainage invert level surveys',
                    'Right-of-Way boundary demarcation & encroachment checks',
                    'AutoCAD Civil 3D surface model & alignment delivery',
                    'Photogrammetric crack detection and distress mapping',
                    'Interactive cloud-hosted GIS maps with layer query capabilities'
                ]
            ]
        ],
        'tabs_title' => 'Surveying & Geospatial Services for TEP Clients',
        'tabs' => [
            [
                'label' => 'Drone Mapping',
                'title' => 'UAV Drone Photogrammetry & Orthomosaics',
                'items' => [
                    'Centimeter-resolution orthomosaic map generation',
                    'Dense 3D point cloud generation for corridor modeling',
                    'Earthwork cut-and-fill volumetric verification',
                    'Rapid aerial mapping of inaccessible or hazardous terrain',
                    'Aerial video surveillance for traffic turning movement surveys'
                ],
                'image' => 'images/Surveying.jpg',
                'photo_label' => 'Drone Photogrammetry'
            ],
            [
                'label' => 'Ground Surveys',
                'title' => 'Digital Total Station & Topographical Surveys',
                'items' => [
                    'Electronic Total Station topographical cross-sections',
                    'Centerline alignment and longitudinal slope profiles',
                    'Bridge, culvert, and drainage structure level surveys',
                    'Utility alignment identification and CAD integration',
                    'Right-of-Way boundary pegging and monumentation'
                ],
                'image' => 'images/Hero_5.jpg',
                'photo_label' => 'Ground Topography'
            ],
            [
                'label' => 'GNSS Geodesy',
                'title' => 'Dual-Frequency RTK GNSS Control Networks',
                'items' => [
                    'Geodetic ground control points (GCP) tied to national datum',
                    'Real-Time Kinematic (RTK) sub-centimeter positioning',
                    'Base-and-rover multi-constellation satellite tracking',
                    'Static GNSS baseline processing for major bridge projects',
                    'Geoid undulation modeling and height conversions'
                ],
                'image' => 'images/Hero_1.jpg',
                'photo_label' => 'RTK GNSS Geodesy'
            ],
            [
                'label' => 'Civil 3D Modeling',
                'title' => 'Digital Elevation Models & CAD Surfaces',
                'items' => [
                    'Digital Terrain Model (DTM) and TIN surface generation',
                    'Contour interval maps for highway drainage design',
                    'Corridor cut-fill volume mass-haul diagrams',
                    'AutoCAD Civil 3D / Bentley OpenRoads native delivery',
                    'Geometric alignment proof-checking against field terrain'
                ],
                'image' => 'images/Transportation.jpg',
                'photo_label' => 'Digital Elevation Modeling'
            ],
            [
                'label' => 'Web-GIS Portals',
                'title' => 'Enterprise Web-GIS Highway Asset Management',
                'items' => [
                    'Interactive cloud-hosted GIS maps for highway authorities',
                    'Asset geodatabases (signs, guardrails, pavement condition)',
                    'Photogrammetric crack distress classification',
                    'Attribute query, spatial filtering & report generation',
                    'Compatible with ArcGIS, QGIS & enterprise spatial databases'
                ],
                'image' => 'images/Land Development.jpg',
                'photo_label' => 'Enterprise Web-GIS'
            ]
        ],
        'resources' => [
            'tag' => 'Spatial Intelligence Whitepapers',
            'title' => 'Surveying Resources',
            'desc' => 'Technical guidelines on UAV photogrammetry accuracies, RTK GNSS field workflows, and geospatial asset registers.',
            'btn_text' => 'Explore Our Services',
            'image' => 'images/Book Meeting.jpg',
            'photo_label' => 'Surveying Manuals & Standards'
        ],
        'slider' => [
            'title' => 'Our Work in Surveying & Drones',
            'slides' => [
                ['title' => 'Drone Photogrammetry', 'image' => 'images/Surveying.jpg'],
                ['title' => 'RTK GPS Control', 'image' => 'images/Hero_5.jpg'],
                ['title' => 'Corridor Alignment', 'image' => 'images/Transportation.jpg'],
                ['title' => 'Total Station Survey', 'image' => 'images/Hero_1.jpg'],
                ['title' => 'Earthwork Volume', 'image' => 'images/Land Development.jpg'],
                ['title' => 'Highway Orthomosaic', 'image' => 'images/highway-footer-bg.jpg'],
            ]
        ],
        'projects' => [
            'tag' => 'Our impact in surveying',
            'title' => 'Projects',
            'items' => [
                [
                    'title' => 'Expressway Corridor 60 km Drone Mapping',
                    'tag' => 'UAV Surveying',
                    'desc' => 'High-resolution drone orthophoto and Digital Elevation Model for a Greenfield 6-lane expressway alignment.',
                    'image' => 'images/Surveying.jpg',
                    'link' => 'projects.php'
                ],
                [
                    'title' => 'Smart City Geodatabase & Asset Audit',
                    'tag' => 'Web-GIS',
                    'desc' => 'Complete spatial inventory of 12,000 traffic signs, signals, and road furniture integrated into municipal Web-GIS.',
                    'image' => 'images/Land Development.jpg',
                    'link' => 'projects.php'
                ]
            ]
        ],
        'cta_banner' => [
            'title' => 'Need Centimeter-Precision Terrain Intelligence?',
            'lead' => 'Partner with SVNIT surveying and drone photogrammetry experts for topographical mapping and GIS assets.',
            'btn_text' => 'Get Started',
            'btn_link' => 'contact.php'
        ]
    ]
];

// Determine current service key
$currentKey = isset($serviceId) ? $serviceId : (isset($_GET['service']) ? trim($_GET['service']) : (isset($_GET['id']) ? trim($_GET['id']) : 'transportation'));

if (!isset($servicesData[$currentKey])) {
    $currentKey = 'transportation';
}

$srv = $servicesData[$currentKey];

$activePage = 'services';
$pageTitle = $srv['hero_title'] . ' | TEP Research & Consultancy Cell';
$pageDesc = htmlspecialchars($srv['hero_lead']);

include 'includes/meta.php';
include 'includes/header.php';
?>

<main id="main" class="service-subpage">

  <!-- =========================================================================
       1. HERO SECTION (LJA Layout with Collage & Arrow Split Button)
       ========================================================================= -->
  <section class="hero">
    <div class="c">
      <div>
        <div class="bc">
          <a href="index.php">Home</a> / <a href="index.php#capabilities-section">Services</a> / <span><?php echo htmlspecialchars($srv['breadcrumb']); ?></span>
        </div>
        <h1><?php echo htmlspecialchars($srv['hero_title']); ?></h1>
        <p><?php echo htmlspecialchars($srv['hero_lead']); ?></p>
        <a class="btn" href="#solutions">
          <b>Explore Our Solutions</b>
          <s>&rarr;</s>
        </a>
      </div>

      <div class="col">
        <div class="a" style="background-image: url('<?php echo htmlspecialchars($srv['hero_collage']['a']['image']); ?>');">
          <span><?php echo htmlspecialchars($srv['hero_collage']['a']['title']); ?></span>
        </div>
        <div class="b" style="background-image: url('<?php echo htmlspecialchars($srv['hero_collage']['b']['image']); ?>');">
          <span><?php echo htmlspecialchars($srv['hero_collage']['b']['title']); ?></span>
        </div>
        <div class="d" style="background-image: url('<?php echo htmlspecialchars($srv['hero_collage']['d']['image']); ?>');">
          <span><?php echo htmlspecialchars($srv['hero_collage']['d']['title']); ?></span>
        </div>
      </div>
    </div>
  </section>


  <!-- =========================================================================
       2. SOLVING CHALLENGES (Photo with Accent Tab + 2-Column Checklist)
       ========================================================================= -->
  <section class="sp" id="solutions">
    <div class="c">
      <div class="im rv" style="background-image: url('<?php echo htmlspecialchars($srv['solution_image']); ?>');" role="img" aria-label="<?php echo htmlspecialchars($srv['solutions_title']); ?>"></div>
      <div class="rv">
        <h2><?php echo htmlspecialchars($srv['solutions_title']); ?></h2>
        <ul class="ck">
          <?php foreach ($srv['solutions_list'] as $item): ?>
            <li><?php echo htmlspecialchars($item); ?></li>
          <?php endforeach; ?>
        </ul>
      </div>
    </div>
  </section>


  <!-- =========================================================================
       3. WE WORK TOGETHER (Watermark + Cutout Corner Image with Bottom Gradient Shadow)
       ========================================================================= -->
  <section class="wt" id="wt">
    <div class="c">
      <div class="wt-content">
        <div class="pre"><?php echo htmlspecialchars($srv['we_work']['pre']); ?></div>
        <div class="ghost"><?php echo $srv['we_work']['ghost']; ?></div>
        <h3><?php echo htmlspecialchars($srv['we_work']['title']); ?></h3>
        <p><?php echo htmlspecialchars($srv['we_work']['desc']); ?></p>
        <a class="btn" href="<?php echo htmlspecialchars($srv['we_work']['btn_link']); ?>">
          <b><?php echo htmlspecialchars($srv['we_work']['btn_text']); ?></b>
          <s>&rarr;</s>
        </a>
      </div>
    </div>

    <!-- Cutout Image anchored at bottom corner with realistic bottom gradient shadow blend -->
    <div class="wt-corner-wrap" aria-hidden="true">
      <img src="images/We Work Together.png" alt="We Work Together - TEP Research & Consultancy SVNIT Surat" class="wt-corner-img" />
      <div class="wt-bottom-gradient"></div>
      <div class="wt-ground-shadow"></div>
    </div>
  </section>


  <!-- =========================================================================
       4. SPECIALIZED CAPABILITY CARDS (2-Column White Cards)
       ========================================================================= -->
  <section class="cards">
    <div class="c">
      <div>
        <div class="card rv">
          <h2><?php echo htmlspecialchars($srv['cards']['card1']['title']); ?></h2>
          <?php if (!empty($srv['cards']['card1']['subtitle'])): ?>
            <h3><?php echo htmlspecialchars($srv['cards']['card1']['subtitle']); ?></h3>
          <?php endif; ?>
          <?php foreach ($srv['cards']['card1']['paragraphs'] as $p): ?>
            <p><?php echo htmlspecialchars($p); ?></p>
          <?php endforeach; ?>
        </div>

        <div class="card rv">
          <h2><?php echo htmlspecialchars($srv['cards']['card2']['title']); ?></h2>
          <?php foreach ($srv['cards']['card2']['paragraphs'] as $p): ?>
            <p><?php echo htmlspecialchars($p); ?></p>
          <?php endforeach; ?>
        </div>
      </div>

      <div>
        <div class="card rv">
          <h2><?php echo htmlspecialchars($srv['cards']['card3']['title']); ?></h2>
          <?php if (!empty($srv['cards']['card3']['subtitle'])): ?>
            <h3><?php echo htmlspecialchars($srv['cards']['card3']['subtitle']); ?></h3>
          <?php endif; ?>
          <?php if (!empty($srv['cards']['card3']['intro'])): ?>
            <p><?php echo htmlspecialchars($srv['cards']['card3']['intro']); ?></p>
          <?php endif; ?>
          <ul class="ck">
            <?php foreach ($srv['cards']['card3']['checklist'] as $item): ?>
              <li><?php echo htmlspecialchars($item); ?></li>
            <?php endforeach; ?>
          </ul>
        </div>
      </div>
    </div>
  </section>


  <!-- =========================================================================
       5. INTERACTIVE TABS (Interactive Switcher with Preview Photo)
       ========================================================================= -->
  <section class="tb">
    <div class="c">
      <h2><?php echo htmlspecialchars($srv['tabs_title']); ?></h2>
      
      <div class="tn" id="tn" role="tablist">
        <?php foreach ($srv['tabs'] as $i => $tab): ?>
          <button class="<?php echo $i === 0 ? 'on' : ''; ?>" role="tab" aria-selected="<?php echo $i === 0 ? 'true' : 'false'; ?>">
            <?php echo htmlspecialchars($tab['label']); ?>
          </button>
        <?php endforeach; ?>
      </div>

      <div id="tps">
        <?php foreach ($srv['tabs'] as $i => $tab): ?>
          <div class="tp <?php echo $i === 0 ? 'on' : ''; ?>" role="tabpanel">
            <div>
              <h3><?php echo htmlspecialchars($tab['title']); ?></h3>
              <ul class="ck" style="grid-template-columns:1fr">
                <?php foreach ($tab['items'] as $item): ?>
                  <li><?php echo htmlspecialchars($item); ?></li>
                <?php endforeach; ?>
              </ul>
            </div>
            <div class="ph" style="background-image: url('<?php echo htmlspecialchars($tab['image']); ?>');">
              <span><?php echo htmlspecialchars($tab['photo_label']); ?></span>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
    </div>
  </section>


  <!-- =========================================================================
       6. RESOURCES SECTION (Deep Forest Green Background)
       ========================================================================= -->
  <section class="res">
    <div class="c">
      <div>
        <small><?php echo htmlspecialchars($srv['resources']['tag']); ?></small>
        <h2><?php echo htmlspecialchars($srv['resources']['title']); ?></h2>
        <p><?php echo htmlspecialchars($srv['resources']['desc']); ?></p>
        <a class="btn" href="index.php#capabilities-section">
          <b><?php echo htmlspecialchars($srv['resources']['btn_text']); ?></b>
          <s>&rarr;</s>
        </a>
      </div>
      <div class="ph" style="background-image: url('<?php echo htmlspecialchars($srv['resources']['image']); ?>');">
        <span><?php echo htmlspecialchars($srv['resources']['photo_label']); ?></span>
      </div>
    </div>
  </section>


  <!-- =========================================================================
       7. WORK SLIDER (Horizontal Track with Snap Scroll & Arrows)
       ========================================================================= -->
  <section class="sl">
    <h2><?php echo htmlspecialchars($srv['slider']['title']); ?></h2>
    <div class="trk" id="trk">
      <?php foreach ($srv['slider']['slides'] as $slide): ?>
        <div class="s" style="background-image: url('<?php echo htmlspecialchars($slide['image']); ?>');">
          <span><?php echo htmlspecialchars($slide['title']); ?></span>
        </div>
      <?php endforeach; ?>
    </div>
    <div class="ar">
      <button id="pv" aria-label="Previous Slide">&larr;</button>
      <button id="nx" aria-label="Next Slide">&rarr;</button>
    </div>
  </section>


  <!-- =========================================================================
       8. FEATURED PROJECTS (Header + 2-Card Grid)
       ========================================================================= -->
  <section class="pj">
    <div class="c">
      <div class="hd">
        <div>
          <small><?php echo htmlspecialchars($srv['projects']['tag']); ?></small>
          <h2><?php echo htmlspecialchars($srv['projects']['title']); ?></h2>
        </div>
        <a class="btn" href="projects.php">
          <b>View All Projects</b>
          <s>&rarr;</s>
        </a>
      </div>

      <div class="g2">
        <?php foreach ($srv['projects']['items'] as $project): ?>
          <div class="pc rv">
            <div class="ph" style="background-image: url('<?php echo htmlspecialchars($project['image']); ?>');"></div>
            <div class="bd">
              <h3><?php echo htmlspecialchars($project['title']); ?></h3>
              <em><?php echo htmlspecialchars($project['tag']); ?></em>
              <p><?php echo htmlspecialchars($project['desc']); ?></p>
              <a class="l" href="<?php echo htmlspecialchars($project['link']); ?>">Explore Project &rarr;</a>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
    </div>
  </section>


  <!-- =========================================================================
       9. CALL-TO-ACTION BANNER
       ========================================================================= -->
  <section class="ban rv">
    <h2><?php echo htmlspecialchars($srv['cta_banner']['title']); ?></h2>
    <p><?php echo htmlspecialchars($srv['cta_banner']['lead']); ?></p>
    <a class="btn" href="<?php echo htmlspecialchars($srv['cta_banner']['btn_link']); ?>">
      <b><?php echo htmlspecialchars($srv['cta_banner']['btn_text']); ?></b>
      <s>&rarr;</s>
    </a>
  </section>


  <!-- =========================================================================
       10. OTHER SERVICES QUICK NAVIGATOR
       ========================================================================= -->
  <section class="srv-nav-pills-section">
    <div class="c">
      <div class="srv-nav-pills-bar">
        <span class="srv-nav-pills-title">Explore Other Capabilities:</span>
        <div class="srv-nav-pills-group">
          <?php
          $subpageLinks = [
              'transportation' => 'service-transportation.php',
              'road-safety-audit' => 'service-road-safety.php',
              'traffic-engineering' => 'service-traffic-engineering.php',
              'rail-services' => 'service-rail-services.php',
              'smart-mobility' => 'service-smart-mobility.php',
              'land-development' => 'service-land-development.php',
              'surveying' => 'service-surveying.php',
          ];
          foreach ($servicesData as $key => $item):
              $isActive = ($key === $currentKey);
              $linkUrl = isset($subpageLinks[$key]) ? $subpageLinks[$key] : '#';
          ?>
            <a href="<?php echo $linkUrl; ?>" class="srv-nav-chip <?php echo $isActive ? 'is-active' : ''; ?>">
              <?php echo htmlspecialchars($item['title']); ?>
            </a>
          <?php endforeach; ?>
        </div>
      </div>
    </div>
  </section>

</main>

<!-- Interactive Subpage Scripts: Tab Switcher, Smooth Slider Scroll & Reveal Observer -->
<script>
document.addEventListener('DOMContentLoaded', function() {
  // 1. Tab Switcher
  const tabs = document.querySelectorAll('#tn button');
  const ps = document.querySelectorAll('.tp');
  if (tabs.length && ps.length) {
    tabs.forEach((b, i) => {
      b.addEventListener('click', () => {
        tabs.forEach(x => {
          x.classList.remove('on');
          x.setAttribute('aria-selected', 'false');
        });
        ps.forEach(x => x.classList.remove('on'));
        b.classList.add('on');
        b.setAttribute('aria-selected', 'true');
        if (ps[i]) ps[i].classList.add('on');
      });
    });
  }

  // 2. Horizontal Work Track Slider
  const t = document.getElementById('trk');
  if (t) {
    const getStep = () => {
      const first = t.querySelector('.s');
      return first ? first.offsetWidth + 24 : 320;
    };
    const nx = document.getElementById('nx');
    const pv = document.getElementById('pv');
    if (nx) nx.addEventListener('click', () => t.scrollBy({ left: getStep(), behavior: 'smooth' }));
    if (pv) pv.addEventListener('click', () => t.scrollBy({ left: -getStep(), behavior: 'smooth' }));
  }

  // 3. Reveal on Scroll Observer
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.rv').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.rv').forEach(el => el.classList.add('in'));
  }
});
</script>

<?php include 'includes/footer.php'; ?>
'''

with open('service.php', 'w', encoding='utf-8') as f:
    f.write(services_code)

print('service.php generated successfully! Size:', os.path.getsize('service.php'))
