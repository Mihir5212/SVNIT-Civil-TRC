import { Link, useSearchParams } from 'react-router-dom';

const Services = () => {
  const [searchParams] = useSearchParams();
  const activeService = searchParams.get('service');

  const services = [
    {
      id: 'transportation',
      title: 'Highway & Transportation',
      shortDesc: 'Pavement design, corridor safety, traffic impact studies, and DPR review for national and state highways.',
      icon: 'directions_car',
      heroImage: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop',
      features: [
        'Design and rehab of flexible pavements',
        'Vulnerability and safety assessments',
        'Drainage and cross-drainage design',
        'Permit and grant support',
        'Traffic impact studies',
        'Emergency response planning',
        'Bituminous mix design',
        'Construction supervision',
        'Feasibility studies and DPR review',
        'Right-of-way advisory',
      ],
      cards: [
        {
          title: 'Pavement Engineering',
          subtitle: 'Dependable, durable and efficient road infrastructure.',
          paragraphs: [
            'We build long-lasting partnerships with state agencies and municipalities, helping them design, evaluate and rehabilitate road pavements under varied traffic and climate conditions.',
            'From a new alignment to the strengthening of an existing corridor, our team brings laboratory and field experience to cost-effective solutions.',
          ],
        },
        {
          title: 'Traffic Compliance Services',
          paragraphs: [
            'We prepare traffic studies, road safety audits and impact assessments that meet IRC and MoRTH requirements and improve safety for every road user.',
          ],
        },
        {
          title: 'Transport Planning',
          subtitle: 'Safe, efficient mobility for today and future generations.',
          intro: 'Our faculty and research scholars support city and highway planning across many disciplines:',
          checklist: [
            'Traffic surveys and capacity analysis',
            'Urban mobility plans',
            'Junction and corridor design',
            'Public transport studies',
            'Accident black-spot analysis',
            'Long range transport planning',
            'Project planning & appraisal',
            'Pre-construction advisory',
            'Disaster recovery of roads',
            'Intelligent transport systems',
          ],
        },
      ],
      tabs: [
        {
          label: 'Pavement Design',
          title: 'Pavement Design & Rehabilitation',
          items: [
            'Flexible and rigid pavement design',
            'FWD and structural evaluation',
            'Overlay design',
            'Life-cycle cost analysis',
            'Construction supervision',
          ],
          image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop',
          photoLabel: 'Pavement Engineering',
        },
        {
          label: 'Traffic Engineering',
          title: 'Traffic Engineering',
          items: [
            'Classified volume counts',
            'Junction design',
            'Level of service analysis',
            'Parking studies',
            'Simulation modelling',
          ],
          image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=600&h=400&fit=crop',
          photoLabel: 'Traffic Analysis',
        },
        {
          label: 'Materials Testing',
          title: 'Materials Testing',
          items: [
            'Bitumen and modified binders',
            'Aggregate characterisation',
            'Marshall mix design',
            'Soil and subgrade tests',
            'NABL-aligned quality protocols',
          ],
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
          photoLabel: 'Materials Laboratory',
        },
        {
          label: 'Road Safety',
          title: 'Road Safety',
          items: [
            'Road safety audits',
            'Black-spot identification',
            'Countermeasure design',
            'Pedestrian facilities',
            'Speed management schemes',
          ],
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
          photoLabel: 'Corridor Safety',
        },
        {
          label: 'Permitting & Compliance',
          title: 'Permitting & Compliance',
          items: [
            'Permit applications',
            'Environmental clearances',
            'IRC code compliance',
            'DPR technical review',
            'MoRTH standard verifications',
          ],
          image: 'https://images.unsplash.com/photo-1571781926291-c477ef3f819b?w=600&h=400&fit=crop',
          photoLabel: 'Regulatory Review',
        },
      ],
    },
    {
      id: 'road-safety-audit',
      title: 'Road Safety Audit',
      shortDesc: 'IRC:SP:88 multi-stage audits, blackspot rectification, VRU protection, and work-zone safety management.',
      icon: 'security',
      heroImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      features: [
        'Feasibility & alignment safety reviews',
        'Detailed project report (DPR) geometric audit',
        'Construction work-zone traffic control',
        'Pre-opening & operational safety certification',
        'Crash hotspot & blackspot clustering',
        'High-speed spot speed & radar telemetry',
        'Sight triangle & night-time retroreflectivity',
        'Vulnerable road user (VRU) protection',
        'Intersection & roundabout safety redesign',
        'IRC:SP:88 prioritized mitigation matrices',
      ],
      cards: [
        {
          title: 'Multi-Stage Road Safety Audits',
          subtitle: 'Independent, objective evaluation conforming to IRC:SP:88 guidelines.',
          paragraphs: [
            'Our accredited audit team operates completely independent of construction contractors, ensuring every road safety inspection prioritizes user safety over commercial compromises.',
            'From feasibility alignment checks to live post-opening monitoring, we identify potential hazard points before fatal crashes occur.',
          ],
        },
        {
          title: 'Blackspot Rectification',
          paragraphs: [
            'Using empirical FIR crash records, satellite GIS geocoding, and high-precision field inspections, we isolate high-risk sections and formulate cost-effective engineering remedies.',
          ],
        },
        {
          title: 'Vulnerable Road User Safety',
          subtitle: 'Targeted protection for pedestrians, two-wheelers, and non-motorized transit.',
          intro: 'Our faculty and certified auditors apply evidence-based safety engineering across highway and urban networks:',
          checklist: [
            'Pedestrian refuge and grade-separated crossings',
            'Traffic calming and speed abatement geometry',
            'Work-zone barricading and diversion audits',
            'Signage retroreflectivity and markings inspection',
            'Roadside forgiving hazard barrier design',
            'Intersection conflict point minimization',
            'Sight distance clearance evaluations',
            'School and hospital zone speed reduction',
            'Economic benefit-cost crash reduction modeling',
            'Statutory safety compliance certification',
          ],
        },
      ],
      tabs: [
        {
          label: 'Multi-Stage Audits',
          title: 'Multi-Stage Road Safety Auditing (IRC:SP:88)',
          items: [
            'Stage 1: Alignment feasibility & cross-section check',
            'Stage 2: Detailed design & geometric compliance',
            'Stage 3: Construction stage work-zone safety',
            'Stage 4: Pre-opening road inspection & signoff',
            'Stage 5: Operational corridor recurring reviews',
          ],
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
          photoLabel: 'IRC:SP:88 Auditing',
        },
        {
          label: 'Crash Telemetry',
          title: 'Crash Data Telemetry & Hotspot Modeling',
          items: [
            'Accident Severity Index (ASI) geocoding',
            'Collision diagram reconstruction',
            'Speed variance & deceleration diagnostics',
            'Crash prediction modeling for mixed traffic',
            'Ranked corrective engineering measures',
          ],
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
          photoLabel: 'Crash Analytics',
        },
        {
          label: 'Junction Safety',
          title: 'Intersection & Roundabout Channelization',
          items: [
            'Conflict point reduction diagrams',
            'Sight triangle clearance checks',
            'Channelized turning lanes & splitter islands',
            'Pedestrian crosswalk safety schemes',
            'Mini-roundabout and junction retrofits',
          ],
          image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=600&h=400&fit=crop',
          photoLabel: 'Junction Safety',
        },
        {
          label: 'Work-Zone Safety',
          title: 'Construction Work-Zone Management (IRC:SP:55)',
          items: [
            'Traffic diversion plan proof-checking',
            'Retroreflective barricade & signage layout',
            'Taper length & buffer zone calculations',
            'Night-time illumination inspections',
            'Worker protection and lane closure protocols',
          ],
          image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop',
          photoLabel: 'Work-Zone Protocols',
        },
        {
          label: 'Statutory Compliance',
          title: 'Statutory Road Safety Compliance',
          items: [
            'MoRTH road safety audit compliance dossiers',
            'Independent engineer safety validation',
            'Accident reduction economic analysis',
            'Highway concessionaire audit certification',
            'Judicial and inquiry technical reporting',
          ],
          image: 'https://images.unsplash.com/photo-1571781926291-c477ef3f819b?w=600&h=400&fit=crop',
          photoLabel: 'Audit Certification',
        },
      ],
    },
    {
      id: 'traffic-engineering',
      title: 'Traffic Engineering',
      shortDesc: 'Classified volume counts, signal optimization, junction design, parking studies, and micro-simulation.',
      icon: 'traffic',
      heroImage: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&h=600&fit=crop',
      features: [
        'Classified Traffic Volume Counts (CTVC)',
        'Turning Movement Counts (TMC) at junctions',
        'Indo-HCM mixed traffic PCU modeling',
        'Origin-Destination (O-D) survey analysis',
        'Spot speed & speed-flow density telemetry',
        'Coordinated signal phasing & split optimization',
        'Corridor travel time & bottleneck diagnostics',
        'On-street & off-street parking demand surveys',
        'Pedestrian volume & sidewalk LOS analysis',
        'Micro-simulation modeling via VISSIM & Aimsun',
      ],
      cards: [
        {
          title: 'Empirical Field Surveys & Telemetry',
          subtitle: 'High-accuracy volume telemetry and turning movement diagnostics.',
          paragraphs: [
            'TRC deploys high-definition video surveillance, automated sensor counters, and precision radar guns to capture classified vehicle movements, non-lane-based queuing, and spot speeds with high statistical accuracy.',
            'Continuous 24-hour and 7-day volume profiling establishes accurate peak hour factors and directional splits.',
          ],
        },
        {
          title: 'Indo-HCM Capacity Modeling',
          paragraphs: [
            'Standard Western models fail under India\'s unique heterogeneous vehicular mix. TRC applies Indian Highway Capacity Manual methodologies to compute dynamic PCUs, friction factors, and accurate Level-of-Service grades.',
          ],
        },
        {
          title: 'Junction Channelization & Signal Design',
          subtitle: 'Coordinated arterial green waves and geometric island channelization.',
          intro: 'Our faculty and traffic engineers deliver end-to-end intersection redesigns:',
          checklist: [
            'Geometric channelization and turning bay drawings',
            'Webster cycle length calculation and phase splits',
            'Coordinated arterial signal progression (Green Waves)',
            'Actuated and semi-actuated detector strategies',
            'Micro-simulation visualization in VISSIM',
            'Level-of-Service (LOS) computation',
            'Pedestrian clearance intervals and crossing times',
            'Parking demand and turnover telemetry',
            'Weaving section and roundabout capacity analysis',
            'Traffic diversion planning during infrastructure construction',
          ],
        },
      ],
      tabs: [
        {
          label: 'Volume Studies',
          title: 'Classified Traffic Volume Counts (CTVC)',
          items: [
            'Continuous 24-hr & 7-day automated volume profiling',
            'Vehicle axle classification (2W, 3W, Cars, LCV, HCV, Multi-Axle)',
            'Peak hour factor (PHF) and directional splits',
            'Toll plaza throughput and queuing analysis',
            'Commercial vehicle percentage quantification',
          ],
          image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=600&h=400&fit=crop',
          photoLabel: 'Volume Telemetry',
        },
        {
          label: 'Signal Optimization',
          title: 'Signal Timing & Green Wave Coordination',
          items: [
            'Webster method cycle length optimization',
            'Multi-dial morning, midday, and evening timing plans',
            'Arterial coordinated progression time-space diagrams',
            'Pedestrian exclusive phase calculations',
            'Queue dissipation and delay reduction metrics',
          ],
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
          photoLabel: 'Signal Timing',
        },
        {
          label: 'Junction Design',
          title: 'Junction Geometric Redesign & Roundabouts',
          items: [
            'Turning movement count (TMC) matrix modeling',
            'Physical channelization islands & radius expansion',
            'Swept-path simulation for heavy articulated vehicles',
            'Visibility triangle and sightline verification',
            'Before-and-after micro-simulation proofing',
          ],
          image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop',
          photoLabel: 'Junction Redesign',
        },
        {
          label: 'Parking Studies',
          title: 'Parking Demand & Supply Telemetry',
          items: [
            'On-street and off-street parking inventory surveys',
            'Parking accumulation, duration, and turnover analysis',
            'Multi-level car parking (MLCP) ingress/egress review',
            'Commercial delivery bay queue management',
            'Parking pricing policy and demand mitigation',
          ],
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
          photoLabel: 'Parking Telemetry',
        },
        {
          label: 'Micro-Simulation',
          title: 'VISSIM & Aimsun Corridor Micro-Simulation',
          items: [
            'Dynamic traffic assignment in mixed traffic networks',
            'Calibration of Indo-HCM car-following parameters',
            'Bottleneck and spillback visualization',
            'Surrogate safety conflict event extraction',
            'Policy scenario and flyover justification models',
          ],
          image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop',
          photoLabel: 'Micro-Simulation',
        },
      ],
    },
    {
      id: 'rail-services',
      title: 'Rail & Transit Services',
      shortDesc: 'Multi-modal integration, ROB/RUB studies, freight terminal access, and station evacuation modeling.',
      icon: 'train',
      heroImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop',
      features: [
        'Dedicated Freight Corridor (DFC) highway links',
        'Railway station multi-modal integration (MMI)',
        'Level crossing elimination (ROB / RUB studies)',
        'High-speed rail feeder circulation plans',
        'Rail freight yard gate queuing & weigh-in-motion',
        'Passenger concourse evacuation & crowd dynamics',
        'Intermodal logistics park access geometry',
        'Rail-highway conflict diagnostics & safety',
        'Transit-oriented development (TOD) traffic studies',
        'Train Vehicle Unit (TVU) justification surveys',
      ],
      cards: [
        {
          title: 'Station Area Multi-Modal Integration',
          subtitle: 'Segregated pedestrian, paratransit, and feeder bus circulation.',
          paragraphs: [
            'We re-engineer railway and metro station precinct circulation to eliminate vehicle congestion, providing segregated zones for buses, autorickshaws, taxis, private pick-up/drop-off, and barrier-free pedestrian walkways.',
            'Simulated concourse evacuation plans ensure compliance with global mass transit life-safety codes.',
          ],
        },
        {
          title: 'Level Crossing Elimination (ROB / RUB)',
          paragraphs: [
            'High-frequency train corridors with at-grade road crossings create extreme delays and critical collision hazards. TRC conducts TVU surveys and designs Road Over Bridge and Road Under Bridge grade separation alternatives.',
          ],
        },
        {
          title: 'Intermodal Freight Terminals & DFC Links',
          subtitle: 'Heavy-vehicle entry gates, weigh-in-motion, and arterial interchange ramps.',
          intro: 'Our transit engineering team supports regional rail planning and freight logistics:',
          checklist: [
            '7-day 24-hr Train Vehicle Unit (TVU) counts',
            'Approach ramp geometry and sight distance analysis',
            'Diversion route capacity during bridge construction',
            'Heavy truck swept-path modeling at freight gates',
            'Automated gate queue reservoir sizing',
            'Pavement structural design for heavy container loads',
            'Station forecourt pedestrian surge simulation',
            'Feeder bus terminal layout and layover parking',
            'Transit-Oriented Development traffic impact reviews',
            'Independent technical vetting of rail-road projects',
          ],
        },
      ],
      tabs: [
        {
          label: 'MMI Station Design',
          title: 'Multi-Modal Interchange (MMI) Planning',
          items: [
            'Segregated vehicular pick-up/drop-off circulation',
            'Designated paratransit & auto-rickshaw bays',
            'Universal accessibility ramps & tactile wayfinding',
            'Feeder bus terminal integration',
            'Pedestrian walkway capacity & crowd dynamics',
          ],
          image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&h=400&fit=crop',
          photoLabel: 'Station Interchange',
        },
        {
          label: 'ROB / RUB Studies',
          title: 'Level Crossing Grade Separation (ROB/RUB)',
          items: [
            'TVU threshold justification field surveys',
            'Bridge approach ramp geometric design',
            'Cross-drainage and vertical clearance profiling',
            'Service road channelization civil drawings',
            'Construction phase traffic diversion schemes',
          ],
          image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop',
          photoLabel: 'Bridge Grade Separation',
        },
        {
          label: 'Freight Logistics',
          title: 'DFC & ICD Freight Terminal Access',
          items: [
            'Weigh-in-Motion (WIM) entry gate queue sizing',
            'Articulated container truck turning templates',
            'Highway tie-in acceleration/deceleration lanes',
            'Internal yard circulation & safety channelization',
            'Heavy-duty concrete pavement structural design',
          ],
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
          photoLabel: 'Freight Terminal',
        },
        {
          label: 'Crowd Dynamics',
          title: 'Station Evacuation & Pedestrian Modeling',
          items: [
            'Concourse peak crowd surge simulations',
            'Staircase, escalator & turnstile capacity audits',
            'Emergency evacuation bottleneck diagnostics',
            'Platform clearance time verification',
            'Signage and passenger wayfinding plans',
          ],
          image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop',
          photoLabel: 'Crowd Dynamics',
        },
        {
          label: 'Feeder Systems',
          title: 'Metro & High-Speed Rail Feeder Networks',
          items: [
            'Catchment area travel demand modeling',
            'Last-mile feeder route rationalization',
            'Bicycle sharing & e-rickshaw terminal hubs',
            'Integrated ticketing queue analysis',
            'Modal shift and patronage forecasting',
          ],
          image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=600&h=400&fit=crop',
          photoLabel: 'Feeder Networks',
        },
      ],
    },
    {
      id: 'smart-mobility',
      title: 'Smart Mobility & ITS',
      shortDesc: 'AI computer vision, surrogate safety, adaptive signals, drone analytics, and ICCC dashboards.',
      icon: 'smart_toy',
      heroImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
      features: [
        'AI computer vision vehicle detection & tracking',
        'High-resolution vehicle trajectory extraction',
        'Time-to-Collision (TTC) surrogate safety analytics',
        'Automated traffic counter & classifier (ATCC) audits',
        'Adaptive signal control algorithms & edge computing',
        'Real-time speed & bottleneck diagnostics',
        'Connected vehicle (V2X) corridor architecture',
        'Electric vehicle (EV) charging station optimization',
        'Cloud-based urban traffic analytics dashboards',
        'Drone aerial video tracking & turning movement AI',
      ],
      cards: [
        {
          title: 'AI Computer Vision & Video Analytics',
          subtitle: 'Automated vehicle detection trained on Indian mixed traffic.',
          paragraphs: [
            'TRC develops custom deep neural networks trained on Indian traffic conditions to detect, classify, and track non-standard vehicles, pedestrians, and auto-rickshaws from fixed CCTV cameras and aerial drone feeds.',
            'Automated classified counts exceed 95% verification accuracy across diverse lighting and weather states.',
          ],
        },
        {
          title: 'Surrogate Safety Assessment (SSAM)',
          paragraphs: [
            'Traditional road safety relies on crash history after injuries occur. TRC\'s surrogate safety algorithms detect near-misses and compute Time-to-Collision (TTC) and Post-Encroachment Time (PET) from video telemetry.',
          ],
        },
        {
          title: 'Adaptive Signals & Smart City Dashboards',
          subtitle: 'Connected software integrated with Municipal Command Centers (ICCC).',
          intro: 'Our faculty and AI transportation researchers deliver modern smart city solutions:',
          checklist: [
            'Edge AI sensor architectures for smart junctions',
            'Dynamic green wave synchronization from arrival bursts',
            'Cloud-based interactive GIS traffic dashboards',
            'Variable Message Signs (VMS) driver information logic',
            'Corridor emission and fuel consumption telemetry',
            'Drone aerial trajectory extraction algorithms',
            'Automated Incident Detection (wrong-way, stalls)',
            'Electric Vehicle charging network demand modeling',
            'Connected vehicle (V2X) roadside unit layouts',
            'Third-party accuracy benchmarking of commercial ITS',
          ],
        },
      ],
      tabs: [
        {
          label: 'Computer Vision',
          title: 'AI Computer Vision Traffic Telemetry',
          items: [
            'Custom YOLO/DeepSORT models for Indian mixed traffic',
            'Sub-second vehicle classification across 12 categories',
            'High-frequency vehicle position, speed & trajectory tracking',
            'Lane-indiscipline & lateral drift quantification',
            'Automated junction delay & queue length measurement',
          ],
          image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop',
          photoLabel: 'Computer Vision AI',
        },
        {
          label: 'Surrogate Safety',
          title: 'Surrogate Safety Assessment (TTC & PET)',
          items: [
            'Proactive near-miss detection before fatal crashes occur',
            'Time-to-Collision (TTC) histogram profiling',
            'Post-Encroachment Time (PET) conflict mapping',
            'Junction heatmaps highlighting invisible hazards',
            'Before-and-after safety evaluation of geometry redesigns',
          ],
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
          photoLabel: 'Surrogate Safety',
        },
        {
          label: 'Adaptive Signals',
          title: 'Adaptive Signal Control Algorithms',
          items: [
            'Edge-computed real-time cycle adjustment',
            'Arrival platoon progression synchronization',
            'Emergency vehicle priority preemption protocols',
            'Bus Rapid Transit (BRT) signal priority',
            'Degraded mode fail-safe signal logic',
          ],
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
          photoLabel: 'Adaptive Control',
        },
        {
          label: 'Drone Analytics',
          title: 'UAV Drone Video Trajectory AI',
          items: [
            'High-altitude aerial intersection flow tracking',
            'Non-lane-based weaving and merging diagnostics',
            'Origin-destination turning flow matrices from video',
            'Roundabout circulating velocity profiling',
            'Micro-simulation calibration trajectory inputs',
          ],
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
          photoLabel: 'Drone Trajectory AI',
        },
        {
          label: 'Smart City ICCC',
          title: 'Integrated Command Center Dashboards',
          items: [
            'Web-GIS corridor performance dashboards',
            'Real-time congestion severity index alerts',
            'Incident detection telemetry & dispatch feeds',
            'Historical trend analytics and predictive modeling',
            'API integration with Google Maps and municipal databases',
          ],
          image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=600&h=400&fit=crop',
          photoLabel: 'ICCC Integration',
        },
      ],
    },
    {
      id: 'land-development',
      title: 'Land Development & Pavements',
      shortDesc: 'Traffic impact assessment, FWD/BBD testing, axle load surveys, site access, and internal logistics.',
      icon: 'landscape',
      heroImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop',
      features: [
        'Traffic Impact Assessment (TIA) for mega sites',
        'Benkelman Beam Deflection (BBD) structural audits',
        'Falling Weight Deflectometer (FWD) modulus testing',
        'Commercial axle load surveys (VDF & MSA modeling)',
        'Site ingress / egress geometry & deceleration lanes',
        'Swept path simulation for fire tenders & trucks',
        'Multi-Level Car Parking (MLCP) circulation reviews',
        'Pavement life-cycle cost analysis & overlay design',
        'Permeable pavements & green infrastructure design',
        'Statutory clearance dossiers for municipal approval',
      ],
      cards: [
        {
          title: 'Traffic Impact Assessment (TIA)',
          subtitle: 'Statutory site access modeling for commercial and industrial hubs.',
          paragraphs: [
            'For commercial malls, IT campuses, townships, and industrial parks, TRC quantifies trip generation, evaluates surrounding junction impacts, and develops mitigation plans required for statutory development approvals.',
            'Site access throat-length sizing prevents arterial spillback and ensures smooth vehicle queuing.',
          ],
        },
        {
          title: 'Pavement Structural Evaluation',
          paragraphs: [
            'TRC evaluates flexible and rigid pavement structural capacity using non-destructive deflection testing, subgrade soil characterization, and cumulative commercial vehicle axle load projections.',
          ],
        },
        {
          title: 'Internal Circulation & Logistics Design',
          subtitle: 'Loading dock geometry, swept path simulation, and parking layouts.',
          intro: 'Our pavement and site engineering team delivers full-lifecycle development solutions:',
          checklist: [
            'ITE and Indo-HCM trip generation rate modeling',
            'Surrounding intersection capacity & V/C impact analysis',
            'Benkelman Beam Deflection (IRC:81) rebound surveys',
            'Falling Weight Deflectometer (FWD) back-calculation',
            'Axle load spectrum and Vehicle Damage Factor (VDF)',
            'IRC:37 flexible and IRC:58 rigid pavement designs',
            'Deceleration flare and acceleration merge lanes',
            'Swept-path simulation for fire trucks and trailers',
            'Multi-level parking ramp grades and circulation',
            'Permeable pavement stormwater integration',
          ],
        },
      ],
      tabs: [
        {
          label: 'TIA Studies',
          title: 'Traffic Impact Assessment (TIA)',
          items: [
            'Empirical trip generation rates for mixed-use developments',
            'Trip distribution and network assignment modeling',
            'Impact analysis on surrounding signalized intersections',
            'Access throat length sizing to prevent highway spillback',
            'Statutory TIA dossiers for municipal approval defense',
          ],
          image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop',
          photoLabel: 'Traffic Impact Studies',
        },
        {
          label: 'Pavement Evaluation',
          title: 'Non-Destructive Pavement Structural Testing',
          items: [
            'Benkelman Beam Deflection (BBD) surveys under IRC:81',
            'Falling Weight Deflectometer (FWD) elastic modulus testing',
            'Subgrade soil CBR sampling & laboratory characterization',
            'Pavement Condition Index (PCI) distress mapping',
            'Cost-effective structural overlay thickness design',
          ],
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
          photoLabel: 'Pavement Evaluation',
        },
        {
          label: 'Axle Load Surveys',
          title: 'Axle Load Surveys & VDF Projections',
          items: [
            'Portable static & dynamic wheel load weighing',
            'Commercial vehicle axle classification (Single, Tandem, Tridem)',
            'Vehicle Damage Factor (VDF) computation',
            'Million Standard Axle (MSA) cumulative traffic modeling',
            'Overloaded vehicle enforcement advisory',
          ],
          image: 'https://images.unsplash.com/photo-1571781926291-c477ef3f819b?w=600&h=400&fit=crop',
          photoLabel: 'Axle Load Profiling',
        },
        {
          label: 'Site Access',
          title: 'Site Ingress / Egress & Highway Tie-in',
          items: [
            'Deceleration flare and acceleration taper geometry',
            'Sight distance triangle verification at driveway entrances',
            'Turning radii and curb profile civil drawings',
            'Dedicated slip road and auxiliary lane design',
            'Access management compliance with IRC:62 standards',
          ],
          image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop',
          photoLabel: 'Site Ingress / Egress',
        },
        {
          label: 'Internal Logistics',
          title: 'Internal Logistics & Swept-Path Modeling',
          items: [
            'AutoTURN swept-path simulation for multi-axle trailers',
            'Fire tender turning radius and emergency access review',
            'Loading dock maneuvering space and clearance sizing',
            'Internal traffic calming and pedestrian walkways',
            'Parking bay layouts conforming to municipal bylaws',
          ],
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
          photoLabel: 'Internal Logistics',
        },
      ],
    },
    {
      id: 'surveying',
      title: 'Surveying & Drone Analytics',
      shortDesc: 'UAV photogrammetry, RTK GNSS, total station surveys, DEM generation, and Web-GIS asset management.',
      icon: 'satellite',
      heroImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      features: [
        'UAV drone photogrammetry & orthomosaic maps',
        'Digital Total Station topographical highway surveys',
        'RTK dual-frequency GNSS geodetic ground control',
        'Digital Elevation Models (DEM) & DTM contours',
        'Highway cross-sectional & longitudinal profiles',
        'Right-of-Way (ROW) demarcation & boundary staking',
        'Aerial drone video for intersection queues & movements',
        'Pavement distress & crack photogrammetric audits',
        'LiDAR point-cloud clearance & terrain profiling',
        'Enterprise Web-GIS highway asset geodatabases',
      ],
      cards: [
        {
          title: 'High-Precision UAV Drone Photogrammetry',
          subtitle: 'Survey-grade aerial mapping with 1–2 cm per pixel ground resolution.',
          paragraphs: [
            'TRC operates survey-grade unmanned aerial vehicles (UAVs) equipped with RTK positioning to produce orthorectified aerial imagery with high spatial precision across complex terrains.',
            'Automated flight planning and Ground Control Point networks tied to national benchmarks guarantee survey integrity.',
          ],
        },
        {
          title: 'Digital Total Station & RTK GNSS',
          paragraphs: [
            'Our field surveying crews use high-accuracy Electronic Total Stations and multi-constellation GNSS receivers to capture physical features, utility alignments, and cross-drainage invert levels.',
          ],
        },
        {
          title: 'Geospatial Asset Management & GIS',
          subtitle: 'Interactive geodatabases giving road authorities complete visibility.',
          intro: 'Our spatial surveying division delivers end-to-end geospatial intelligence:',
          checklist: [
            'Automated corridor flight planning & georeferencing',
            'Centimeter-accurate horizontal and vertical control networks',
            'Digital Elevation Models (DEM) and contour extraction',
            'Cut-and-fill earthwork volumetric calculations',
            'Highway center-line alignment and chainage marking',
            'Culvert, bridge, and cross-drainage invert level surveys',
            'Right-of-Way boundary demarcation & encroachment checks',
            'AutoCAD Civil 3D surface model & alignment delivery',
            'Photogrammetric crack detection and distress mapping',
            'Interactive cloud-hosted GIS maps with layer query capabilities',
          ],
        },
      ],
      tabs: [
        {
          label: 'Drone Mapping',
          title: 'UAV Drone Photogrammetry & Orthomosaics',
          items: [
            'Centimeter-resolution orthomosaic map generation',
            'Dense 3D point cloud generation for corridor modeling',
            'Earthwork cut-and-fill volumetric verification',
            'Rapid aerial mapping of inaccessible or hazardous terrain',
            'Aerial video surveillance for traffic turning movement surveys',
          ],
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
          photoLabel: 'Drone Photogrammetry',
        },
        {
          label: 'Ground Surveys',
          title: 'Digital Total Station & Topographical Surveys',
          items: [
            'Electronic Total Station topographical cross-sections',
            'Centerline alignment and longitudinal slope profiles',
            'Bridge, culvert, and drainage structure level surveys',
            'Utility alignment identification and CAD integration',
            'Right-of-Way boundary pegging and monumentation',
          ],
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
          photoLabel: 'Ground Topography',
        },
        {
          label: 'GNSS Geodesy',
          title: 'Dual-Frequency RTK GNSS Control Networks',
          items: [
            'Geodetic ground control points (GCP) tied to national datum',
            'Real-Time Kinematic (RTK) sub-centimeter positioning',
            'Base-and-rover multi-constellation satellite tracking',
            'Static GNSS baseline processing for major bridge projects',
            'Geoid undulation modeling and height conversions',
          ],
          image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop',
          photoLabel: 'RTK GNSS Geodesy',
        },
        {
          label: 'Civil 3D Modeling',
          title: 'Digital Elevation Models & CAD Surfaces',
          items: [
            'Digital Terrain Model (DTM) and TIN surface generation',
            'Contour interval maps for highway drainage design',
            'Corridor cut-fill volume mass-haul diagrams',
            'AutoCAD Civil 3D / Bentley OpenRoads native delivery',
            'Geometric alignment proof-checking against field terrain',
          ],
          image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop',
          photoLabel: 'Digital Elevation Modeling',
        },
        {
          label: 'Web-GIS Portals',
          title: 'Enterprise Web-GIS Highway Asset Management',
          items: [
            'Interactive cloud-hosted GIS maps for highway authorities',
            'Asset geodatabases (signs, guardrails, pavement condition)',
            'Photogrammetric crack distress classification',
            'Attribute query, spatial filtering & report generation',
            'Compatible with ArcGIS, QGIS & enterprise spatial databases',
          ],
          image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop',
          photoLabel: 'Enterprise Web-GIS',
        },
      ],
    },
  ];

  const activeServiceData = services.find(s => s.id === activeService) || services[0];

  return (
    <main id="main">
      {/* Page Hero */}
      <section className="page-hero relative">
        <div className="absolute inset-0 bg-brand-green blueprint-grid-dark opacity-20" />
        <div className="relative z-10 page-hero-content max-w-7xl mx-auto px-gutter-lg py-gutter-xl lg:py-gutter-2xl text-center">
          <h1 className="page-hero-title font-display text-display-lg lg:text-display-xl text-on-brand-green mb-gutter-sm" data-reveal="fade-in-up">
            Our Services
          </h1>
          <p className="page-hero-breadcrumb font-body text-body-md text-on-brand-green/80" data-reveal="fade-in-up" style={{ transitionDelay: '100ms' }}>
            <Link to="/" className="hover:underline">Home</Link> <span className="mx-gutter-xs" aria-hidden="true">›</span> Services
          </p>
        </div>
      </section>

      {/* Services Grid - Overview */}
      <section className="section py-gutter-xl lg:py-gutter-2xl" id="services-overview">
        <div className="wrap max-w-7xl mx-auto px-gutter-lg">
          <div className="section-heading text-center mb-gutter-xl" data-reveal="fade-in-up">
            <span className="section-label font-label text-label-md uppercase text-brand-green tracking-wider">Core Specializations</span>
            <h2 className="font-display text-headline-lg lg:text-headline-xl text-on-surface mt-gutter-sm mb-gutter-sm">Engineering Excellence Across Seven Domains</h2>
            <div className="section-accent-line w-16 h-px bg-brand-green mx-auto mb-gutter-md" />
            <p className="section-subtext font-body text-body-md text-on-surface/60 max-w-2xl mx-auto">
              Each service is backed by accredited faculty, certified methodologies, and proven project delivery across India\'s transport infrastructure landscape.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-gutter-lg" role="list">
            {services.map((service, i) => (
              <Link
                key={service.id}
                to={`/services?service=${service.id}`}
                className={`service-overview-card group relative bg-surface border border-outline rounded-2xl p-gutter-lg lg:p-gutter-xl transition-all duration-state-change hover:border-brand-green/50 hover:shadow-lg hover:-translate-y-1 ${activeService === service.id ? 'ring-2 ring-brand-green' : ''}`}
                role="listitem"
                data-reveal="fade-in-up"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className="service-icon w-14 h-14 bg-brand-green/10 rounded-xl flex items-center justify-center text-brand-green mb-gutter-md group-hover:bg-brand-green group-hover:text-on-brand-green transition-colors duration-state-change">
                  <span className="material-symbols-outlined text-display-sm" aria-hidden="true">{service.icon}</span>
                </div>
                <h3 className="font-headline text-headline-sm text-on-surface mb-gutter-xs">{service.title}</h3>
                <p className="font-body text-body-sm text-on-surface/60 mb-gutter-md flex-1">{service.shortDesc}</p>
                <span className="font-label text-label-sm uppercase text-brand-green inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-state-change">
                  View Details
                  <span className="material-symbols-outlined text-body-sm" aria-hidden="true">arrow_forward</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Active Service Detail */}
      {activeService && (
        <section className="section py-gutter-xl lg:py-gutter-2xl bg-surface-dark/30" id="service-detail">
          <div className="wrap max-w-7xl mx-auto px-gutter-lg">
            {/* Back to Services */}
            <Link
              to="/services"
              className="inline-flex items-center gap-gutter-sm font-label text-label-md uppercase text-brand-green hover:underline mb-gutter-lg"
              data-reveal="fade-in-up"
            >
              <span className="material-symbols-outlined text-body-md" aria-hidden="true">arrow_back</span>
              Back to All Services
            </Link>

            {/* Hero Section with Asymmetric Collage */}
            <section className="service-hero mb-gutter-xl lg:mb-gutter-2xl" data-reveal="fade-in-up">
              <div className="grid lg:grid-cols-2 gap-gutter-xl items-start">
                {/* Left: Content */}
                <div className="service-hero-content">
                  <div className="bc font-label text-label-sm text-on-surface/60 mb-gutter-sm">
                    <Link to="/" className="hover:underline">Home</Link> / <Link to="/services" className="hover:underline">Services</Link> / <span>{activeServiceData.title}</span>
                  </div>
                  <h1 className="font-display text-headline-lg lg:text-headline-xl lg:text-display-md text-on-surface mb-gutter-md">{activeServiceData.hero_title || activeServiceData.title}</h1>
                  <p className="font-body text-body-lg text-on-surface/70 mb-gutter-lg max-w-xl">{activeServiceData.hero_lead || activeServiceData.shortDesc}</p>
                  <Link
                    to="#solutions"
                    className="inline-flex items-center gap-gutter-sm bg-brand-green text-on-brand-green px-gutter-md py-gutter-sm font-label text-label-md uppercase tracking-wider hover:bg-brand-green-dark transition-colors duration-state-change"
                  >
                    <span className="material-symbols-outlined text-body-md" aria-hidden="true">arrow_forward</span>
                    <span>EXPLORE OUR SOLUTIONS</span>
                    <span className="material-symbols-outlined text-body-md" aria-hidden="true">arrow_forward</span>
                  </Link>
                </div>

                {/* Right: Asymmetric Collage */}
                <div className="service-hero-collage relative aspect-[4/3] lg:aspect-square">
                  <div className="absolute inset-0 bg-brand-green/10 chamfer-card" aria-hidden="true" />
                  <div className="absolute top-gutter-lg right-gutter-lg bottom-gutter-lg left-gutter-lg bg-brand-green/5 chamfer-br" aria-hidden="true" />
                  <div className="relative z-10 grid grid-cols-2 grid-rows-2 gap-gutter-sm h-full">
                    <div className="col-photo col-photo--tl aspect-square rounded-xl overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${activeServiceData.heroImage})` }} role="img" aria-label="Service hero image" />
                    <div className="col-photo col-photo--bl aspect-square rounded-xl overflow-hidden bg-cover bg-center col-span-1 row-span-1" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1494526585095-c41746248156?w=400&h=400&fit=crop)` }} role="img" aria-label="Service detail image" />
                    <div className="col-photo col-photo--rt aspect-square rounded-xl overflow-hidden bg-cover bg-center col-span-1 row-span-2" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=800&fit=crop)` }} role="img" aria-label="Service detail image" />
                  </div>
                </div>
              </div>
            </section>

            {/* Solutions Section */}
            <section className="sp mb-gutter-xl lg:mb-gutter-2xl" id="solutions" data-reveal="fade-in-up">
              <div className="sp-grid grid lg:grid-cols-2 gap-gutter-xl items-start">
                <div className="sp-visual relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${activeServiceData.heroImage})` }} role="img" aria-label={activeServiceData.solutions_title || 'Solutions'} />
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-green/80 via-brand-green/20 to-transparent" aria-hidden="true" />
                </div>
                <div className="sp-content p-gutter-lg lg:p-gutter-xl">
                  <h2 className="font-display text-headline-lg lg:text-headline-xl text-on-surface mb-gutter-lg">{activeServiceData.solutions_title || 'Solving Challenges with TEP Solutions'}</h2>
                  <ul className="ck grid gap-gutter-sm sm:grid-cols-2">
                    {activeServiceData.features.map((item, i) => (
                      <li key={i} className="flex items-start gap-gutter-sm font-body text-body-md text-on-surface/80">
                        <span className="material-symbols-outlined text-brand-green text-body-lg flex-shrink-0 mt-0.5" aria-hidden="true">check_circle</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* We Work Together */}
            <section className="wt relative mb-gutter-xl lg:mb-gutter-2xl" data-reveal="fade-in-up">
              <div className="c max-w-7xl mx-auto px-gutter-lg">
                <div className="wt-content max-w-2xl">
                  <div className="pre font-label text-label-md uppercase text-brand-green tracking-wider mb-gutter-xs">Navigating Challenges</div>
                  <div className="ghost font-display text-headline-xl text-on-surface/10 mb-gutter-md" dangerouslySetInnerHTML={{ __html: 'WE WORK<br>TOGETHER' }} />
                  <h3 className="font-display text-headline-md text-on-surface mb-gutter-md">Working hand in hand with our partners, we blend our skills to make each project succeed.</h3>
                  <p className="font-body text-body-md text-on-surface/70 mb-gutter-lg">Together, we craft practical solutions and take ownership of every step forward.</p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-gutter-sm bg-brand-green text-on-brand-green px-gutter-md py-gutter-sm font-label text-label-md uppercase tracking-wider hover:bg-brand-green-dark transition-colors duration-state-change"
                  >
                    <span className="material-symbols-outlined text-body-md" aria-hidden="true">arrow_forward</span>
                    <span>Start a Conversation</span>
                    <span className="material-symbols-outlined text-body-md" aria-hidden="true">arrow_forward</span>
                  </Link>
                </div>
              </div>
              <div className="wt-corner-wrap absolute bottom-0 right-0 lg:right-gutter-xl lg:bottom-gutter-xl w-full lg:w-1/2 h-full lg:h-[60%] max-h-[500px] pointer-events-none" aria-hidden="true">
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=600&fit=crop"
                  alt="We Work Together - TEP Research & Consultancy SVNIT Surat"
                  className="wt-corner-img absolute bottom-0 right-0 w-full h-full object-cover opacity-90"
                />
                <div className="wt-bottom-gradient absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-green to-transparent" />
              </div>
            </section>

            {/* Capability Cards */}
            <section className="cards mb-gutter-xl lg:mb-gutter-2xl" data-reveal="fade-in-up">
              <div className="c max-w-7xl mx-auto px-gutter-lg">
                <div className="grid lg:grid-cols-2 gap-gutter-xl">
                  <div className="cards-col-left space-y-gutter-lg">
                    {activeServiceData.cards.map((card, i) => (
                      <div key={i} className="card rv bg-surface border border-outline rounded-2xl p-gutter-xl">
                        <h2 className="font-display text-headline-sm text-on-surface mb-gutter-xs">{card.title}</h2>
                        {card.subtitle && <h3 className="font-headline text-headline-xs text-brand-green mb-gutter-md">{card.subtitle}</h3>}
                        {card.paragraphs && card.paragraphs.map((p, pi) => (
                          <p key={pi} className="font-body text-body-md text-on-surface/70 mb-gutter-sm">{p}</p>
                        ))}
                        {card.intro && <p className="font-body text-body-md text-on-surface/70 mb-gutter-md">{card.intro}</p>}
                        {card.checklist && (
                          <ul className="ck grid gap-gutter-sm">
                            {card.checklist.map((item, ci) => (
                              <li key={ci} className="flex items-start gap-gutter-sm font-body text-body-sm text-on-surface/70">
                                <span className="material-symbols-outlined text-brand-green text-body-md flex-shrink-0 mt-0.5" aria-hidden="true">check_circle</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="cards-col-right">
                    {activeServiceData.cards[2] && (
                      <div className="card rv card--tall bg-surface border border-outline rounded-2xl p-gutter-xl h-full">
                        <h2 className="font-display text-headline-sm text-on-surface mb-gutter-xs">{activeServiceData.cards[2].title}</h2>
                        {activeServiceData.cards[2].subtitle && <h3 className="font-headline text-headline-xs text-brand-green mb-gutter-md">{activeServiceData.cards[2].subtitle}</h3>}
                        {activeServiceData.cards[2].intro && <p className="font-body text-body-md text-on-surface/70 mb-gutter-md">{activeServiceData.cards[2].intro}</p>}
                        {activeServiceData.cards[2].checklist && (
                          <ul className="ck grid gap-gutter-sm">
                            {activeServiceData.cards[2].checklist.map((item, ci) => (
                              <li key={ci} className="flex items-start gap-gutter-sm font-body text-body-sm text-on-surface/70">
                                <span className="material-symbols-outlined text-brand-green text-body-md flex-shrink-0 mt-0.5" aria-hidden="true">check_circle</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Interactive Tabs */}
            <section className="tb mb-gutter-xl lg:mb-gutter-2xl" data-reveal="fade-in-up">
              <div className="c max-w-7xl mx-auto px-gutter-lg">
                <h2 className="font-display text-headline-lg lg:text-headline-xl text-on-surface mb-gutter-xl">{activeServiceData.tabs_title || 'Services for TEP Clients'}</h2>

                {/* Tab Navigation */}
                <div className="tn flex flex-wrap gap-gutter-sm mb-gutter-lg" role="tablist" id="service-tabs">
                  {activeServiceData.tabs.map((tab, i) => (
                    <button
                      key={i}
                      role="tab"
                      aria-selected={i === 0}
                      aria-controls={`tabpanel-${i}`}
                      id={`tab-${i}`}
                      className={`tn-btn px-gutter-md py-gutter-sm font-label text-label-md uppercase rounded-lg transition-all duration-state-change ${i === 0 ? 'bg-brand-green text-on-brand-green' : 'bg-surface border border-outline text-on-surface hover:border-brand-green/50'}`}
                      onClick={() => document.getElementById(`tabpanel-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab Panels */}
                <div id="tps" className="space-y-gutter-xl">
                  {activeServiceData.tabs.map((tab, i) => (
                    <div
                      key={i}
                      id={`tabpanel-${i}`}
                      role="tabpanel"
                      aria-labelledby={`tab-${i}`}
                      className={`tp grid lg:grid-cols-2 gap-gutter-xl items-start ${i === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none absolute -z-10'}`}
                    >
                      <div className="tp-content">
                        <h3 className="font-display text-headline-md text-on-surface mb-gutter-md">{tab.title}</h3>
                        <ul className="ck grid gap-gutter-sm">
                          {tab.items.map((item, ii) => (
                            <li key={ii} className="flex items-start gap-gutter-sm font-body text-body-md text-on-surface/70">
                              <span className="material-symbols-outlined text-brand-green text-body-md flex-shrink-0 mt-0.5" aria-hidden="true">check_circle</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="tp-photo relative aspect-[4/3] rounded-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${tab.image})` }} role="img" aria-label={tab.photo_label} />
                        <div className="absolute bottom-0 left-0 right-0 p-gutter-md bg-gradient-to-t from-brand-green/90 to-transparent text-on-brand-green font-label text-label-sm">{tab.photo_label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Featured Projects */}
            <section className="pj" data-reveal="fade-in-up">
              <div className="c max-w-7xl mx-auto px-gutter-lg">
                <div className="hd flex flex-col lg:flex-row lg:items-end lg:justify-between gap-gutter-md mb-gutter-xl">
                  <div>
                    <small className="font-label text-label-md uppercase text-brand-green">Our Impact</small>
                    <h2 className="font-display text-headline-lg lg:text-headline-xl text-on-surface mt-gutter-xs">Projects</h2>
                  </div>
                  <Link
                    to="/projects"
                    className="inline-flex items-center gap-gutter-sm bg-brand-green text-on-brand-green px-gutter-md py-gutter-sm font-label text-label-md uppercase tracking-wider hover:bg-brand-green-dark transition-colors duration-state-change"
                  >
                    <span className="material-symbols-outlined text-body-md" aria-hidden="true">arrow_forward</span>
                    <span>VIEW ALL PROJECTS</span>
                    <span className="material-symbols-outlined text-body-md" aria-hidden="true">arrow_forward</span>
                  </Link>
                </div>

                <div className="g2 grid md:grid-cols-2 gap-gutter-lg">
                  {[
                    {
                      title: 'State Highway Strengthening',
                      tag: 'Highways',
                      desc: 'Structural evaluation and overlay design for a heavily trafficked corridor.',
                      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop',
                    },
                    {
                      title: 'Urban Junction Improvement',
                      tag: 'Transportation',
                      desc: 'Traffic counts, simulation and geometric redesign for a city junction.',
                      image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=600&h=400&fit=crop',
                    },
                  ].map((project, i) => (
                    <Link
                      key={i}
                      to="/projects"
                      className="pc rv bg-surface border border-outline rounded-2xl overflow-hidden hover:border-brand-green/50 hover:shadow-lg transition-all duration-state-change"
                    >
                      <div className="ph aspect-[16/9] bg-cover bg-center" style={{ backgroundImage: `url(${project.image})` }} />
                      <div className="bd p-gutter-lg">
                        <h3 className="font-headline text-headline-sm text-on-surface mb-gutter-xs">{project.title}</h3>
                        <em className="font-label text-label-sm text-brand-green block mb-gutter-sm">{project.tag}</em>
                        <p className="font-body text-body-sm text-on-surface/70 mb-gutter-md">{project.desc}</p>
                        <span className="font-label text-label-sm uppercase text-brand-green inline-flex items-center gap-1">Explore Project <span className="material-symbols-outlined text-body-sm" aria-hidden="true">arrow_forward</span></span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </section>
      )}
    </main>
  );
};

export default Services;