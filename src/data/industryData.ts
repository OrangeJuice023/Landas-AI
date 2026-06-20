export interface Team {
  name: string;
  desc: string;
  typical_employers?: string[];
  work_setup?: string;
  education?: string;
  pathway?: string;
  progression?: string[];
  salary?: {
    entry: string;
    mid: string;
  };
  key_skills?: {
    hard: string[];
    soft: string[];
  };
  market_tags?: {
    in_demand: boolean;
    remote_friendly: boolean;
    fresh_grad_friendly: boolean;
  };
}

export interface Department {
  name: string;
  subtitle: string;
  description: string;
  teams: Team[];
}

export const technologyDepartments: Department[] = [
  {
    name: "Software Development",
    subtitle: "The Builders",
    description: "The Philippine tech sector is one of the fastest-growing in Southeast Asia, anchored by a thriving IT-BPM industry. This department focuses on writing, testing, and debugging code for both local firms and global clients.",
    teams: [
      { 
        name: "Junior Software Developer", 
        desc: "Writes, tests, and debugs code under the guidance of senior developers. Works on web, mobile, or enterprise applications for local startups, MNCs, or BPO-tech companies.",
        typical_employers: ["Accenture", "Exist Global", "Azeus Systems", "Sprout Solutions", "outsource firms"],
        work_setup: "Hybrid / Remote",
        education: "BS Computer Science, BS Information Technology, or equivalent. Bootcamps/Self-taught accepted with strong portfolio.",
        pathway: "Build a GitHub portfolio, complete bootcamps (Zuitt, Kodego), apply on JobStreet/Kalibrr/LinkedIn. Participate in hackathons.",
        progression: ["Junior Developer", "Developer", "Senior Developer", "Tech Lead", "Engineering Manager"],
        salary: { entry: "₱25,000 – ₱40,000", mid: "₱50,000 – ₱90,000" },
        key_skills: {
          hard: ["JavaScript", "Python", "Java", "Git", "REST APIs", "SQL", "React", "Laravel"],
          soft: ["Problem-solving", "Collaboration", "Attention to detail", "Continuous learning"]
        },
        market_tags: { in_demand: true, remote_friendly: true, fresh_grad_friendly: true }
      },
      { 
        name: "Mobile App Developer (iOS/Android)", 
        desc: "Designs and builds mobile applications for Android and/or iOS platforms, serving Philippine consumers, banks, e-commerce firms, and global clients.",
        typical_employers: ["GCash", "Maya", "Grab", "Voyager Innovations", "outsourcing firms"],
        work_setup: "Hybrid / Remote",
        education: "BS Computer Science, IT, or related field. Flutter, React Native, or Swift/Kotlin certifications accepted.",
        pathway: "Build and publish sample apps on Play Store or App Store. Network in communities like Google Developer Groups PH.",
        progression: ["Junior Mobile Dev", "Mobile Dev", "Senior Mobile Dev", "Lead Mobile Engineer"],
        salary: { entry: "₱30,000 – ₱50,000", mid: "₱60,000 – ₱100,000" },
        key_skills: {
          hard: ["Flutter", "React Native", "Swift", "Kotlin", "Android Studio", "Xcode", "REST/GraphQL"],
          soft: ["UX awareness", "Problem-solving", "Adaptability", "Communication"]
        },
        market_tags: { in_demand: true, remote_friendly: true, fresh_grad_friendly: true }
      }
    ]
  },
  {
    name: "Data and Analytics",
    subtitle: "The Brains",
    description: "This department treats data as a strategic asset, providing insights across banking, retail, and healthcare sectors as Philippine enterprises shift to cloud-first strategies.",
    teams: [
      { 
        name: "Data Analyst", 
        desc: "Collects, processes, and interprets large datasets to provide business insights. Works across banking, retail, healthcare, and BPO sectors.",
        typical_employers: ["BDO", "Globe Telecom", "Lazada", "Jollibee Group", "Accenture", "local analytics firms"],
        work_setup: "Hybrid / On-site",
        education: "BS Statistics, Applied Mathematics, CS, or Economics. Google Data Analytics Certificate widely accepted.",
        pathway: "Courses on Coursera/DataCamp, build portfolio on Kaggle, internships at analytics consultancies.",
        progression: ["Junior Analyst", "Data Analyst", "Senior Analyst", "Analytics Manager", "Head of Data"],
        salary: { entry: "₱25,000 – ₱40,000", mid: "₱50,000 – ₱80,000" },
        key_skills: {
          hard: ["Excel", "SQL", "Python", "R", "Tableau", "Power BI", "Google Analytics"],
          soft: ["Critical thinking", "Storytelling", "Communication", "Attention to detail"]
        },
        market_tags: { in_demand: true, remote_friendly: true, fresh_grad_friendly: true }
      },
      { 
        name: "Data Engineer", 
        desc: "Designs and maintains data pipelines and infrastructure that enable analytics and AI projects centered on cloud-first strategies.",
        typical_employers: ["Globe", "PLDT", "UnionBank", "Accenture", "Amazon AWS partners"],
        work_setup: "Hybrid / Remote",
        education: "BS Computer Science, Computer Engineering, or related. Cloud certifications (AWS, GCP, Azure) highly valued.",
        pathway: "Build ETL projects on GitHub, earn cloud certifications. Apply on LinkedIn or Bossjob.",
        progression: ["Junior Data Engineer", "Data Engineer", "Senior Data Engineer", "Data Architect"],
        salary: { entry: "₱35,000 – ₱55,000", mid: "₱65,000 – ₱110,000" },
        key_skills: {
          hard: ["Python", "SQL", "Apache Spark", "Airflow", "AWS/GCP/Azure", "Kafka", "dbt"],
          soft: ["Systems thinking", "Collaboration", "Documentation", "Time management"]
        },
        market_tags: { in_demand: true, remote_friendly: true, fresh_grad_friendly: false }
      }
    ]
  },
  {
    name: "Cybersecurity",
    subtitle: "The Shields",
    description: "With BSP mandating stronger cybersecurity for financial institutions, this department is critically in demand for monitoring and responding to threats.",
    teams: [
      { 
        name: "Information Security Analyst", 
        desc: "Monitors, detects, and responds to cybersecurity threats. Critically in demand due to financial security mandates (Bangko Sentral).",
        typical_employers: ["BDO", "Metrobank", "Banks", "Telcos", "BPOs", "Government"],
        work_setup: "On-site / Hybrid",
        education: "BS Computer Science, IT, Cybersecurity. CEH, CompTIA Security+, or CISSP certifications preferred.",
        pathway: "Earn certifications (Security+, CEH), practice on platforms like TryHackMe.",
        progression: ["SOC Analyst", "Security Analyst", "Senior Security Analyst", "Security Manager", "CISO"],
        salary: { entry: "₱30,000 – ₱50,000", mid: "₱60,000 – ₱100,000" },
        key_skills: {
          hard: ["SIEM tools", "Splunk", "QRadar", "Firewalls", "Penetration testing", "ISO 27001"],
          soft: ["Analytical mindset", "Vigilance", "Communication", "Integrity"]
        },
        market_tags: { in_demand: true, remote_friendly: false, fresh_grad_friendly: false }
      }
    ]
  },
  {
    name: "Cloud and Infrastructure",
    subtitle: "The Architects",
    description: "Designs scalable, secure, and cost-effective cloud infrastructure for enterprises migrating to AWS, Azure, or Google Cloud.",
    teams: [
      { 
        name: "Cloud Solutions Architect", 
        desc: "Heavily sought after by Philippine banks and BPOs to design secure and cost-effective cloud infrastructure.",
        typical_employers: ["PLDT", "Globe", "UnionBank", "Accenture", "IBM Philippines", "Telstra"],
        work_setup: "Hybrid / Remote",
        education: "BS Computer Engineering, CS, or related. AWS, Azure, or GCP Professional certifications are key.",
        pathway: "Earn cloud certifications, gain hands-on experience via labs or internships, build cloud portfolios.",
        progression: ["Cloud Engineer", "Solutions Architect", "Senior Architect", "Principal Architect / CTO"],
        salary: { entry: "₱50,000 – ₱80,000", mid: "₱90,000 – ₱160,000" },
        key_skills: {
          hard: ["AWS", "Azure", "GCP", "Terraform", "Kubernetes", "Docker", "IAM"],
          soft: ["Strategic thinking", "Stakeholder communication", "Leadership", "Documentation"]
        },
        market_tags: { in_demand: true, remote_friendly: true, fresh_grad_friendly: false }
      }
    ]
  }
];

export const governmentDepartments: Department[] = [
  {
    name: "Public Administration and Governance",
    subtitle: "The Civil Service",
    description: "Manages administrative operations, procurement, and budget preparation across national agencies (NGAs) and LGUs.",
    teams: [
      { 
        name: "Government Administrative Officer", 
        desc: "Manages administrative operations, procurement, and budget preparation. Entry point for PH civil service.",
        typical_employers: ["DILG", "DTI", "DOST", "DepEd", "LGUs", "SSS", "GSIS"],
        work_setup: "On-site",
        education: "Any 4-year degree + Civil Service Exam (Professional or Sub-professional level).",
        pathway: "Pass the CSE, register at CSC Job Portal, and monitor PhilJobNet or agency websites.",
        progression: ["Administrative Aide", "Administrative Officer", "Senior Admin Officer", "Division Chief", "Assistant Director"],
        salary: { entry: "₱18,000 – ₱25,000", mid: "₱28,000 – ₱45,000" },
        key_skills: {
          hard: ["RA 9184 (Procurement)", "COA standards", "HRIS", "Budget preparation"],
          soft: ["Integrity", "Public service orientation", "Communication", "Accuracy"]
        },
        market_tags: { in_demand: true, remote_friendly: false, fresh_grad_friendly: true }
      }
    ]
  },
  {
    name: "Education and Public Health",
    subtitle: "Public Service Frontline",
    description: "Delivers K-12 education and social welfare services to Filipino citizens under DepEd and DSWD.",
    teams: [
      { 
        name: "Public School Teacher", 
        desc: "Delivers K-12 curriculum education in public schools. One of the most numerous and vital government roles.",
        typical_employers: ["DepEd", "CHED-supervised SUCs", "TESDA centers"],
        work_setup: "On-site",
        education: "BSEd or BEEd + Licensure Exam for Teachers (LET). PPST certification required.",
        pathway: "Pass the LET, register at DepEd DOSS/HRIS, and apply for Teacher I positions during annual hiring.",
        progression: ["Teacher I", "Teacher II", "Teacher III", "Master Teacher", "Head Teacher", "Principal"],
        salary: { entry: "₱25,439 – ₱28,559", mid: "₱29,000 – ₱40,000" },
        key_skills: {
          hard: ["K-12 MELCs", "Classroom management", "DepEd LIS", "Google Classroom"],
          soft: ["Patience", "Communication", "Empathy", "Creativity", "Dedication"]
        },
        market_tags: { in_demand: true, remote_friendly: false, fresh_grad_friendly: true }
      },
      { 
        name: "Government Social Worker", 
        desc: "Provides social welfare including crisis intervention and 4Ps assessment under DSWD and LGUs.",
        typical_employers: ["DSWD", "LGU Social Welfare (SWDO)", "NCWDP", "RRCY"],
        work_setup: "Field-based / On-site",
        education: "BS Social Work (4 years) + PRC Social Worker Licensure Exam.",
        pathway: "Pass the board exam, apply through DSWD portals or LGU openings on PhilJobNet/CSC.",
        progression: ["Social Welfare Officer I", "II", "III", "Division Chief", "Regional Director"],
        salary: { entry: "₱20,000 – ₱28,000", mid: "₱30,000 – ₱45,000" },
        key_skills: {
          hard: ["Social case management", "4Ps assessment", "DSWD MCs", "Crisis intervention"],
          soft: ["Empathy", "Resilience", "Advocacy", "Ethical practice"]
        },
        market_tags: { in_demand: true, remote_friendly: false, fresh_grad_friendly: true }
      }
    ]
  },
  {
    name: "Revenue, Tax, and Fiscal Services",
    subtitle: "Fiscal Enforcers",
    description: "Conducts tax audits and investigates evasion cases to generate revenue for the Philippine government.",
    teams: [
      { 
        name: "Revenue Officer / Tax Examiner (BIR)", 
        desc: "Conducts tax audits, processes registrations, and enforces BIR regulations in PH's top revenue agency.",
        typical_employers: ["BIR (Regional/District Offices)"],
        work_setup: "On-site",
        education: "BS Accountancy, Finance, or Business. CPA license strongly preferred.",
        pathway: "Pass the CSE (Professional Level), monitor BIR announcements, apply via CSC Job Portal.",
        progression: ["Revenue Officer I", "II", "III", "IV", "Group Supervisor", "Revenue District Officer"],
        salary: { entry: "₱22,000 – ₱30,000", mid: "₱32,000 – ₱55,000" },
        key_skills: {
          hard: ["NIRC Tax Code", "Tax audit procedures", "eFPS/eBIRForms", "Financial analysis"],
          soft: ["Integrity", "Discretion", "Public service orientation", "Communication"]
        },
        market_tags: { in_demand: true, remote_friendly: false, fresh_grad_friendly: true }
      }
    ]
  }
];

export const mediaDepartments: Department[] = [
  {
    name: "Broadcasting and Journalism",
    subtitle: "The Newsroom",
    description: "Gathers, writes, and presents news for TV, radio, and online platforms. Bilingual skills (Filipino/English) are essential in the PH context.",
    teams: [
      { 
        name: "Broadcast Journalist / News Reporter", 
        desc: "Reports news for televison and radio. Requires strong on-camera presence and bilingual writing skills.",
        typical_employers: ["GMA Network", "TV5", "One News", "Regional Stations", "News Websites"],
        work_setup: "Field-based / On-site",
        education: "AB Mass Communication, Journalism, or Broadcasting.",
        pathway: "Intern during college, build a demo reel, apply through GMA/ABS-CBN portals or LinkedIn.",
        progression: ["Reporter", "Senior Reporter", "Anchor", "News Editor", "News Director"],
        salary: { entry: "₱16,000 – ₱25,000", mid: "₱28,000 – ₱55,000" },
        key_skills: {
          hard: ["Scriptwriting", "Video editing (Adobe Premiere)", "Live reporting", "Research"],
          soft: ["Curiosity", "Composure", "Integrity", "Adaptability"]
        },
        market_tags: { in_demand: false, remote_friendly: false, fresh_grad_friendly: true }
      }
    ]
  },
  {
    name: "Content Creation and Digital Media",
    subtitle: "The Digital Storytellers",
    description: "Produces video and graphic content for social media and brand pages. The Philippines has one of the highest social media usage rates globally.",
    teams: [
      { 
        name: "Content Creator / Social Media Manager", 
        desc: "Produces video or graphic content for brand pages and digital campaigns.",
        typical_employers: ["Publicis", "JWT", "BBDO Guerrero", "Startups", "Freelance Clients"],
        work_setup: "Remote / Hybrid",
        education: "AB Mass Comm, Fine Arts, or Multimedia Arts. Portfolio beats degree.",
        pathway: "Build a portfolio on TikTok/Instagram. Earn Meta Blueprint/Canva certs. Apply on Kalibrr or Upwork.",
        progression: ["Content Creator", "Content Strategist", "Social Media Manager", "Digital Content Director"],
        salary: { entry: "₱18,000 – ₱28,000", mid: "₱30,000 – ₱60,000" },
        key_skills: {
          hard: ["Canva", "CapCut", "Adobe Premiere", "Meta Ads", "SEO Content"],
          soft: ["Creativity", "Trend awareness", "Audience empathy", "Consistency"]
        },
        market_tags: { in_demand: true, remote_friendly: true, fresh_grad_friendly: true }
      },
      { 
        name: "Graphic Designer", 
        desc: "Creates visual assets for advertising, packaging, and social media. Filipino designers are in high demand globally.",
        typical_employers: ["Advertising Agencies", "In-house Brand Teams", "BPO Creative Arms"],
        work_setup: "Hybrid / Remote",
        education: "BS Fine Arts, Multimedia Arts, or Architecture. Portfolio is the primary criterion.",
        pathway: "Build Behance portfolio, take Adobe Creative Suite courses, apply on VirtualStaff.ph or Kalibrr.",
        progression: ["Junior Designer", "Designer", "Senior Designer", "Art Director", "Creative Director"],
        salary: { entry: "₱18,000 – ₱28,000", mid: "₱30,000 – ₱60,000" },
        key_skills: {
          hard: ["Adobe Photoshop", "Illustrator", "InDesign", "Figma", "Typography"],
          soft: ["Creativity", "Attention to detail", "Feedback receptiveness", "Time management"]
        },
        market_tags: { in_demand: true, remote_friendly: true, fresh_grad_friendly: true }
      }
    ]
  },
  {
    name: "Animation and Game Development",
    subtitle: "The Animators",
    description: "Creates animation assets for international TV commercials and cartoons, serving US and Japanese studios.",
    teams: [
      { 
        name: "2D/3D Animator", 
        desc: "Creates animation assets for TV commercials, cartoons, and games in Asia's top animation hub.",
        typical_employers: ["Toei Animation PH", "Toon City", "Top Draw Animation", "Synergy88"],
        work_setup: "On-site / Remote",
        education: "BS Multimedia Arts, Fine Arts, or Animation. Portfolio and demo reel are key.",
        pathway: "Build an animation reel. Local studios often hire fresh graduates with strong portfolios.",
        progression: ["Junior Animator", "Animator", "Senior Animator", "Lead Animator", "Animation Director"],
        salary: { entry: "₱18,000 – ₱28,000", mid: "₱32,000 – ₱65,000" },
        key_skills: {
          hard: ["Adobe Animate", "Toon Boom Harmony", "Maya", "Blender", "After Effects"],
          soft: ["Creativity", "Storytelling", "Attention to detail", "Discipline"]
        },
        market_tags: { in_demand: true, remote_friendly: true, fresh_grad_friendly: true }
      }
    ]
  }
];

export const energyDepartments: Department[] = [
  {
    name: "Power Generation",
    subtitle: "The Grid Source",
    description: "Operates and maintains generation facilities for the Philippine grid, following EPIRA and DOE regulations.",
    teams: [
      { 
        name: "Power Plant Engineer", 
        desc: "Operates and maintains power plants (Coal, Geothermal, Solar). Ensures electricity for the Philippine grid.",
        typical_employers: ["SMC Global Power", "ACEN", "SN Aboitiz Power", "EDC", "First Gen Corp"],
        work_setup: "On-site / Field-based",
        education: "BS Mechanical, Electrical, or Chemical Engineering. PRC board license required.",
        pathway: "Apply through company career pages or JobStreet. Plant internship (OJT) is the ideal entry point.",
        progression: ["Plant Engineer", "Senior Engineer", "Chief Engineer", "Plant Manager", "VP Operations"],
        salary: { entry: "₱25,000 – ₱40,000", mid: "₱45,000 – ₱80,000" },
        key_skills: {
          hard: ["DCS/SCADA systems", "Thermodynamics", "Plant operations", "Preventive maintenance", "OSHA safety"],
          soft: ["Safety consciousness", "Analytical thinking", "Composure", "Teamwork"]
        },
        market_tags: { in_demand: true, remote_friendly: false, fresh_grad_friendly: true }
      }
    ]
  },
  {
    name: "Renewable Energy",
    subtitle: "Clean Energy Future",
    description: "Designs and installs solar PV systems as the Philippines pursues 35% renewable energy by 2030.",
    teams: [
      { 
        name: "Solar Energy Engineer", 
        desc: "Designs, installs, and maintains solar PV systems for residential and utility-scale applications.",
        typical_employers: ["SunAsia Energy", "Citicore RE", "AC Energy", "Solar EPC contractors"],
        work_setup: "On-site / Field-based",
        education: "BS Electrical or Electronics Engineering. PRC license required. Solar NABCEP a plus.",
        pathway: "Gain PRC license, earn solar design training through associations, apply to solar EPC firms.",
        progression: ["Solar Technician", "Solar Engineer", "Senior Engineer", "Solar Project Manager"],
        salary: { entry: "₱22,000 – ₱38,000", mid: "₱45,000 – ₱75,000" },
        key_skills: {
          hard: ["Solar PV design (PVsyst)", "AutoCAD", "Inverter programming", "BEMS", "Grid interconnection"],
          soft: ["Technical communication", "Adaptability", "Project coordination", "Safety awareness"]
        },
        market_tags: { in_demand: true, remote_friendly: false, fresh_grad_friendly: true }
      }
    ]
  }
];

export const retailDepartments: Department[] = [
  {
    name: "Store Operations",
    subtitle: "Brick-and-Mortar",
    description: "Assists customers, processes transactions, and maintains stock levels in major Philippine malls and showrooms.",
    teams: [
      { 
        name: "Retail Sales Associate", 
        desc: "Backbone of brick-and-mortar stores. Assists customers and manages store displays.",
        typical_employers: ["SM Retail", "Robinsons Retail", "National Book Store", "ZALORA", "Uniqlo PH"],
        work_setup: "On-site",
        education: "Senior High School graduate or any college degree. Customer service attitude matters most.",
        pathway: "Walk-in applications or apply via Mynimo and JobStreet. many SM/Robinsons stores accept applicants year-round.",
        progression: ["Sales Associate", "Senior Associate", "Team Leader", "Store Supervisor", "Store Manager", "Area Manager"],
        salary: { entry: "₱13,000 – ₱18,000", mid: "₱20,000 – ₱35,000" },
        key_skills: {
          hard: ["POS operation", "Inventory replenishment", "Visual merchandising", "Product knowledge"],
          soft: ["Customer service", "Communication", "Reliability", "Persuasion"]
        },
        market_tags: { in_demand: true, remote_friendly: false, fresh_grad_friendly: true }
      }
    ]
  },
  {
    name: "E-Commerce and Digital Commerce",
    subtitle: "The Online Retailers",
    description: "Manages marketplace performance and online campaigns for Shopee, Lazada, and TikTok Shop across major brands in the Philippines.",
    teams: [
      { 
        name: "E-Commerce Specialist / Online Selling Manager", 
        desc: "Manages product listings, marketplace performance, and fulfillment for Shopee, Lazada, or TikTok Shop stores.",
        typical_employers: ["Official Brands", "FMCG Companies", "ZALORA", "VirtualStaff.ph Clients"],
        work_setup: "Hybrid / Remote",
        education: "Any business or marketing degree. Marketplace experience often outweighs the degree.",
        pathway: "Gain experience managing your own Shopee/Lazada store, then apply on LinkedIn or VirtualStaff.ph.",
        progression: ["E-Commerce Associate", "E-Commerce Specialist", "E-Commerce Manager", "Head of Digital Commerce"],
        salary: { entry: "₱20,000 – ₱30,000", mid: "₱35,000 – ₱65,000" },
        key_skills: {
          hard: ["Shopee/Lazada Seller Center", "Facebook Ads", "Google Shopping", "SEO", "Data Analysis"],
          soft: ["Creativity", "Analytical thinking", "Attention to detail", "Adaptability"]
        },
        market_tags: { in_demand: true, remote_friendly: true, fresh_grad_friendly: true }
      },
      { 
        name: "Digital Marketing Specialist", 
        desc: "Plans and executes campaigns including SEO, social media ads, and influencer partnerships for PH brands.",
        typical_employers: ["Shopee PH", "Lazada", "Globe", "PLDT", "Advertising Agencies"],
        work_setup: "Hybrid / Remote",
        education: "BS Marketing, Communications, or Multimedia Arts. Meta and Google certifications are highly valued.",
        pathway: "Earn Google/Meta certifications (free), build a social media portfolio, then apply via Kalibrr/LinkedIn.",
        progression: ["Digital Marketing Associate", "Specialist", "Senior Specialist", "Digital Marketing Manager", "CMO"],
        salary: { entry: "₱20,000 – ₱32,000", mid: "₱38,000 – ₱70,000" },
        key_skills: {
          hard: ["Google Ads", "Meta Ads Manager", "SEO (Ahrefs)", "Email Marketing", "GA4"],
          soft: ["Creativity", "Data-driven mindset", "Communication", "Adaptability"]
        },
        market_tags: { in_demand: true, remote_friendly: true, fresh_grad_friendly: true }
      }
    ]
  }
];

export const foodBeverageDepartments: Department[] = [
  {
    name: "Food Production and Processing",
    subtitle: "The Formulation Experts",
    description: "Develops new food products, improves existing formulations, and ensures safety compliance (FDA, HACCP) in Philippine food manufacturing giants.",
    teams: [
      { 
        name: "Food Technologist", 
        desc: "Develops new food products, improves formulations, and ensures food safety compliance (FDA Philippines, HACCP).",
        typical_employers: ["Nestlé Philippines", "URC", "Monde Nissin", "RFM Corporation", "San Miguel Foods"],
        work_setup: "On-site",
        education: "BS Food Technology (4 years) + PRC Licensure Exam.",
        pathway: "Internship is critical. Apply to R&D or QA departments of food manufacturers via JobStreet or company portals.",
        progression: ["Food Technologist", "Senior Technologist", "R&D Manager", "VP Innovation"],
        salary: { entry: "₱18,000 – ₱28,000", mid: "₱32,000 – ₱55,000" },
        key_skills: {
          hard: ["HACCP", "GMP", "FDA PH registration", "Food sensory evaluation", "Product formulation", "Food safety audits"],
          soft: ["Creativity", "Attention to detail", "Communication", "Adaptability"]
        },
        market_tags: { in_demand: true, remote_friendly: false, fresh_grad_friendly: true }
      }
    ]
  },
  {
    name: "Restaurant and Food Service Operations",
    subtitle: "Front-of-House & Kitchen",
    description: "Oversees daily restaurant operations or prepares culinary masterpieces in hotel dining and QSR chains across the Philippines.",
    teams: [
      { 
        name: "Restaurant Manager", 
        desc: "Oversees daily operations of a restaurant outlet, managing staff, food safety, customer experience, and financial performance.",
        typical_employers: ["Jollibee", "McDonald's PH", "Chowking", "Mang Inasal", "Hotel F&B departments"],
        work_setup: "On-site",
        education: "BS HRM or BS Tourism. Experience in F&B service is often more valued than the degree.",
        pathway: "Start as crew/service staff, progress through leadership roles. QSR chains have fast-track management programs.",
        progression: ["Crew", "Shift Manager", "Assistant Manager", "Restaurant Manager", "Area Manager", "Operations Director"],
        salary: { entry: "₱18,000 – ₱28,000", mid: "₱30,000 – ₱55,000" },
        key_skills: {
          hard: ["POS systems", "Food cost management", "HACCP", "Inventory control", "Staff scheduling"],
          soft: ["Leadership", "Customer service", "Problem-solving", "Composure"]
        },
        market_tags: { in_demand: true, remote_friendly: false, fresh_grad_friendly: true }
      },
      { 
        name: "Chef / Cook", 
        desc: "Prepares, seasons, and cooks food items in kitchens, hotel dining, and catering settings. Philippine culinary talent is recognized regionally.",
        typical_employers: ["Marriott", "Shangri-La", "Discovery Hospitality", "Nobu", "Fine dining restaurants"],
        work_setup: "On-site",
        education: "TESDA Cookery NC II/III, or BS HRM with culinary specialization, or culinary school (CCA, IACP).",
        pathway: "Earn TESDA Cookery NC II, apply as Kitchen Helper or Commis Chef, progress through kitchen brigade.",
        progression: ["Commis Chef", "Demi Chef", "Chef de Partie", "Sous Chef", "Head Chef / Executive Chef"],
        salary: { entry: "₱14,000 – ₱22,000", mid: "₱25,000 – ₱50,000" },
        key_skills: {
          hard: ["Cooking techniques", "Knife skills", "Portion control", "Kitchen hygiene (HACCP)", "Recipe costing"],
          soft: ["Creativity", "Teamwork", "Composure under pressure", "Time management"]
        },
        market_tags: { in_demand: true, remote_friendly: false, fresh_grad_friendly: true }
      }
    ]
  }
];

export const constructionDepartments: Department[] = [
  {
    name: "Civil and Structural Engineering",
    subtitle: "The Infrastructure",
    description: "Designs, oversees, and manages construction of buildings, roads, and bridges across the Philippines, following government programs like Build Better More.",
    teams: [
      { 
        name: "Civil Engineer", 
        desc: "Designs, oversees, and manages construction projects. PRC-licensed engineers are legally required on all major construction projects.",
        typical_employers: ["DMCI", "D.M. Consunji", "Ayala Land", "SM Engineering", "DPWH", "BCDA"],
        work_setup: "On-site / Field-based",
        education: "BS Civil Engineering (5 years) + PRC Civil Engineer Licensure Exam.",
        pathway: "Pass the board exam, apply through JobStreet or government portals (CSC). Fresh engineers start as junior site engineers.",
        progression: ["Junior Engineer", "Project Engineer", "Senior Engineer", "Project Manager", "VP Engineering"],
        salary: { entry: "₱20,000 – ₱32,000", mid: "₱40,000 – ₱80,000" },
        key_skills: {
          hard: ["AutoCAD", "STAAD.Pro", "Structural analysis", "PERT/CPM", "Quantity estimation", "NSCP/NBC"],
          soft: ["Leadership", "Communication", "Problem-solving", "Attention to detail"]
        },
        market_tags: { in_demand: true, remote_friendly: false, fresh_grad_friendly: true }
      },
      { 
        name: "Quantity Surveyor / Cost Estimator", 
        desc: "Prepares detailed cost estimates and bills of quantities (BOQ) for construction projects. Monitors budgets and variations.",
        typical_employers: ["Megaworld", "Robinsons Land", "Contractors", "Construction management firms"],
        work_setup: "On-site / Hybrid",
        education: "BS Civil Engineering, Architecture, or Quantity Surveying. RICS chartership an advantage.",
        pathway: "Gain OJT experience, build proficiency in estimation software, then apply via JobStreet or LinkedIn.",
        progression: ["Junior Estimator", "Cost Estimator", "Senior QS", "QS Manager", "Head of Commercial"],
        salary: { entry: "₱22,000 – ₱35,000", mid: "₱40,000 – ₱70,000" },
        key_skills: {
          hard: ["BOQ preparation", "AutoCAD takeoff", "MS Project", "CostX", "Value engineering", "FIDIC contracts"],
          soft: ["Numerical aptitude", "Negotiation", "Attention to detail", "Analytical thinking"]
        },
        market_tags: { in_demand: true, remote_friendly: true, fresh_grad_friendly: true }
      }
    ]
  },
  {
    name: "Architecture and Design",
    subtitle: "The Designers",
    description: "Creates design concepts, construction drawings, and specifications for residential, commercial, and heritage projects across the Philippines.",
    teams: [
      { 
        name: "Architect", 
        desc: "Creates design concepts, construction drawings, and specifications. Philippine architects work across residential and heritage projects.",
        typical_employers: ["Recio+Casas", "GF and Partners", "ASYA Design", "Ayala Land", "SM Engineering Design"],
        work_setup: "On-site / Hybrid",
        education: "BS Architecture (5 years) + PRC Architect Licensure Exam. 2 years diversified experience for UAP membership.",
        pathway: "Pass the board exam, build a design portfolio (physical and Behance), then apply via LinkedIn/JobStreet.",
        progression: ["Junior Architect", "Architect", "Senior Architect", "Associate Architect", "Principal / Partner"],
        salary: { entry: "₱18,000 – ₱30,000", mid: "₱35,000 – ₱65,000" },
        key_skills: {
          hard: ["AutoCAD", "Revit (BIM)", "SketchUp", "Lumion", "Adobe Suite", "Building codes (NBC)"],
          soft: ["Creativity", "Communication", "Project management", "Spatial thinking"]
        },
        market_tags: { in_demand: true, remote_friendly: true, fresh_grad_friendly: true }
      }
    ]
  }
];

export const manufacturingDepartments: Department[] = [
  {
    name: "Production and Quality",
    subtitle: "The Makers",
    description: "Oversees large-scale manufacturing operations, managing production workers and enforcing safety/quality standards in PEZA zones.",
    teams: [
      { 
        name: "Production Supervisor", 
        desc: "Oversees manufacturing operations, ensures output targets, and enforces safety/quality standards on the factory floor.",
        typical_employers: ["Texas Instruments", "IMI", "Universal Robina", "San Miguel Corp", "Nestlé", "Monde Nissin"],
        work_setup: "On-site",
        education: "BS Industrial Engineering or any engineering course. TESDA Production NC II can advance with experience.",
        pathway: "Start as production associate or OJT engineer, demonstrate leadership, then apply for internal supervision.",
        progression: ["Production Associate", "Line Leader", "Supervisor", "Production Manager", "Plant Manager"],
        salary: { entry: "₱18,000 – ₱28,000", mid: "₱30,000 – ₱55,000" },
        key_skills: {
          hard: ["Production planning", "Lean Manufacturing", "5S", "GMP", "OEE metrics", "ERP systems"],
          soft: ["Leadership", "Problem-solving", "Discipline", "Decision-making"]
        },
        market_tags: { in_demand: true, remote_friendly: false, fresh_grad_friendly: false }
      },
      { 
        name: "Quality Control / Quality Assurance Engineer", 
        desc: "Inspects products and processes to meet international quality standards (ISO 9001, FDA) common in electronics and food.",
        typical_employers: ["IMI", "ROHM Electronics", "Jollibee Foods Corp", "Unilab", "PEZA plants"],
        work_setup: "On-site",
        education: "BS Industrial Engineering, Electronics Engineering, Chemistry, or Food Technology.",
        pathway: "Apply for QC intern roles in plants, learn ISO standards, then apply as QA Associate via JobStreet.",
        progression: ["QC Inspector", "QA Engineer", "QA Supervisor", "QA Manager", "Quality Director"],
        salary: { entry: "₱18,000 – ₱28,000", mid: "₱30,000 – ₱55,000" },
        key_skills: {
          hard: ["ISO 9001/14001", "SPC", "FMEA", "Root cause analysis", "Inspection tools", "GMP"],
          soft: ["Attention to detail", "Analytical thinking", "Integrity", "Communication"]
        },
        market_tags: { in_demand: true, remote_friendly: false, fresh_grad_friendly: true }
      }
    ]
  },
  {
    name: "Engineering and Maintenance",
    subtitle: "Equipment Care",
    description: "Ensures machinery and equipment are operational through preventive and corrective maintenance to minimize factory downtime.",
    teams: [
      { 
        name: "Maintenance Engineer", 
        desc: "Maintains machinery in semiconductor, food, and automotive plants through preventive and corrective actions.",
        typical_employers: ["Toshiba PH", "Yazaki Torres", "LEAR Corporation", "Food plants"],
        work_setup: "On-site",
        education: "BS Electrical, Mechanical, or Electronics Engineering. PRC board exam required for licensed positions.",
        pathway: "Apply through university career fairs or directly to PEZA-zone manufacturers. OJT experience is critical.",
        progression: ["Maintenance Engineer", "Senior Engineer", "Maintenance Supervisor", "Engineering Manager", "Plant Engineer"],
        salary: { entry: "₱22,000 – ₱35,000", mid: "₱40,000 – ₱70,000" },
        key_skills: {
          hard: ["PLC programming", "Pneumatics/Hydraulics", "Electrical systems", "CMMS (SAP PM)", "Predictive maintenance"],
          soft: ["Problem-solving", "Resourcefulness", "Teamwork", "Safety awareness"]
        },
        market_tags: { in_demand: true, remote_friendly: false, fresh_grad_friendly: true }
      }
    ]
  }
];

export const logisticsDepartments: Department[] = [
  {
    name: "Warehousing and Inventory",
    subtitle: "The Hub",
    description: "Receives, stores, and dispatches goods across fulfillment centers for the Philippine e-commerce network.",
    teams: [
      { 
        name: "Warehouse Associate / Operations Staff", 
        desc: "Backbone of the e-commerce logistics network. Receives, stores, picks, packs, and dispatches goods.",
        typical_employers: ["Lazada Logistics", "Shopee", "2GO", "LBC", "SM Supply Chain", "JAS Logistics"],
        work_setup: "On-site",
        education: "Senior High School graduate or vocational certificate (TESDA NCII in Warehousing).",
        pathway: "Apply directly to warehouse job fairs, Mynimo.com, or walk-ins at logistics parks (Laguna Technopark).",
        progression: ["Warehouse Associate", "Lead Associate", "Warehouse Supervisor", "Warehouse Manager", "Operations Manager"],
        salary: { entry: "₱13,000 – ₱18,000", mid: "₱20,000 – ₱35,000" },
        key_skills: {
          hard: ["SAP WMS", "NetSuite", "Forklift operation", "Barcode scanning", "Cycle counting"],
          soft: ["Physical stamina", "Teamwork", "Accuracy", "Reliability"]
        },
        market_tags: { in_demand: true, remote_friendly: false, fresh_grad_friendly: true }
      },
      { 
        name: "Inventory Analyst", 
        desc: "Monitors and optimizes inventory levels using data to improve supply chain efficiency for Philippine retailers.",
        typical_employers: ["SM Retail", "Robinsons", "Puregold", "Unilever PH", "Nestlé PH"],
        work_setup: "On-site / Hybrid",
        education: "BS Industrial Engineering, Supply Chain Management, or Business Administration.",
        pathway: "Apply for OJT in purchasing departments, take APICS CSCP/CPIM courses, then apply on JobStreet.",
        progression: ["Inventory Analyst", "Senior Analyst", "Demand Planner", "Supply Chain Manager"],
        salary: { entry: "₱20,000 – ₱32,000", mid: "₱35,000 – ₱60,000" },
        key_skills: {
          hard: ["SAP/Oracle ERP", "Excel (Advanced)", "Demand forecasting", "ABC analysis", "MRP"],
          soft: ["Analytical thinking", "Attention to detail", "Communication", "Proactive mindset"]
        },
        market_tags: { in_demand: true, remote_friendly: true, fresh_grad_friendly: true }
      }
    ]
  },
  {
    name: "Transportation and Fleet",
    subtitle: "The Archipelago Link",
    description: "Coordinates freight bookings, trucking, and last-mile delivery across the complex geography of the Philippines.",
    teams: [
      { 
        name: "Logistics Coordinator", 
        desc: "Coordinates freight bookings, trucking, vessel scheduling, and last-mile delivery. Liaises with forwarders and carriers.",
        typical_employers: ["2GO", "Starlite Ferries", "DHL PH", "FedEx", "Kuehne+Nagel"],
        work_setup: "On-site",
        education: "BS Business Administration, Industrial Engineering, or Customs Administration. TESDA Freight Forwarding helpful.",
        pathway: "Apply to freight forwarders or shipping companies via JobStreet. Many hire associates for OJT/training.",
        progression: ["Logistics Coordinator", "Senior Coordinator", "Logistics Supervisor", "Logistics Manager", "VP Logistics"],
        salary: { entry: "₱18,000 – ₱28,000", mid: "₱32,000 – ₱55,000" },
        key_skills: {
          hard: ["TMS", "Customs documentation", "Incoterms", "BOL/AWB", "MS Excel"],
          soft: ["Problem-solving", "Communication", "Adaptability", "Negotiation"]
        },
        market_tags: { in_demand: true, remote_friendly: true, fresh_grad_friendly: true }
      }
    ]
  }
];

export const fallbackDepartments: Department[] = [
  {
    name: "Engineering",
    subtitle: "Core Development",
    description: "Strategic operations and excellence in engineering.",
    teams: [
      { name: "Software Engineer", desc: "Drive innovation and lead teams in the sector." }
    ]
  },
  {
    name: "Data & Analytics",
    subtitle: "Insights",
    description: "Strategic operations and excellence in data & analytics.",
    teams: [
      { name: "Data Analyst", desc: "Drive innovation and lead teams in the sector." }
    ]
  },
  {
    name: "Operations",
    subtitle: "Management",
    description: "Strategic operations and excellence in operations.",
    teams: [
      { name: "Operations Manager", desc: "Drive innovation and lead teams in the sector." }
    ]
  }
];

export const healthcareDepartments: Department[] = [
  {
    name: "Clinical and Patient Care",
    subtitle: "The Frontline",
    description: "These roles require medical licenses and are responsible for direct patient 'hands-on' care within Philippine hospitals, clinics, and community centers.",
    teams: [
      { 
        name: "Registered Nurse", 
        desc: "Provides direct patient care including assessment, medication administration, and health education. Works in hospitals, community health centers, and telemedicine platforms.",
        typical_employers: ["PGH", "St. Luke's", "Cardinal Santos", "Ospital ng Maynila", "OFW agencies"],
        work_setup: "On-site / Field-based",
        education: "BS Nursing (4 years) + PRC Board Exam (NLE). IELTS/NCLEX for international deployment.",
        pathway: "Pass the NLE, apply for hospital residency or volunteer programs, then secure staff nurse positions via JobStreet.",
        progression: ["Staff Nurse", "Senior Nurse", "Charge Nurse", "Head Nurse", "Nursing Supervisor", "Director of Nursing"],
        salary: { entry: "₱18,000 – ₱30,000", mid: "₱35,000 – ₱55,000" },
        key_skills: {
          hard: ["Patient assessment", "IV therapy", "Medication administration", "EMR/EHR systems", "BLS/ACLS"],
          soft: ["Empathy", "Composure under pressure", "Communication", "Attention to detail"]
        },
        market_tags: { in_demand: true, remote_friendly: false, fresh_grad_friendly: true }
      },
      { 
        name: "Medical Technologist", 
        desc: "Performs clinical laboratory tests including hematology, microbiology, and urinalysis to support disease diagnosis in Philippine hospitals and diagnostic centers.",
        typical_employers: ["Hi-Precision", "MedEthix", "Gov Hospitals", "Private Hospitals", "Blood Banks"],
        work_setup: "On-site",
        education: "BS Medical Technology (4 years) + PRC Board Exam.",
        pathway: "Pass the board exam, apply to hospital labs or diagnostic chains via JobStreet/Indeed. Internship often leads to employment.",
        progression: ["Medical Technologist", "Senior MedTech", "Laboratory Supervisor", "Laboratory Manager"],
        salary: { entry: "₱16,000 – ₱25,000", mid: "₱28,000 – ₱45,000" },
        key_skills: {
          hard: ["Hematology", "Microbiology", "Chemistry analyzers", "Quality control", "Phlebotomy"],
          soft: ["Precision", "Analytical thinking", "Time management", "Integrity"]
        },
        market_tags: { in_demand: true, remote_friendly: false, fresh_grad_friendly: true }
      }
    ]
  },
  {
    name: "Pharmacy and Pharmaceutical",
    subtitle: "Medication Experts",
    description: "Responsible for dispensing medications, patient counseling, and managing drug safety and inventory within retail chains and pharmaceutical multinationals.",
    teams: [
      { 
        name: "Pharmacist", 
        desc: "Dispenses prescription medications, counsels patients, ensures drug safety, and manages inventory. Also works in medical information and regulatory roles.",
        typical_employers: ["Mercury Drug", "Watsons", "Rose Pharmacy", "Generika", "Pfizer", "Unilab"],
        work_setup: "On-site",
        education: "BS Pharmacy (4 years) + PRC Licensure Exam.",
        pathway: "Pass the Pharmacist Licensure Exam, apply to retail chains or hospital pharmacies via JobStreet. Clinical specialization is an advantage.",
        progression: ["Staff Pharmacist", "Senior Pharmacist", "Pharmacy Supervisor", "Pharmacy Manager", "VP Clinical Affairs"],
        salary: { entry: "₱18,000 – ₱30,000", mid: "₱35,000 – ₱60,000" },
        key_skills: {
          hard: ["Drug dispensing", "Pharmacovigilance", "Interaction review", "Inventory management", "FDA compliance"],
          soft: ["Communication", "Patient counseling", "Accuracy", "Ethical practice"]
        },
        market_tags: { in_demand: true, remote_friendly: false, fresh_grad_friendly: true }
      }
    ]
  },
  {
    name: "Health Information and Digital Health",
    subtitle: "The Digitizers",
    description: "Manages electronic health records (EHR), medical coding, and clinical data governance as PhilHealth digitization accelerates across the Philippines.",
    teams: [
      { 
        name: "Health Information Manager", 
        desc: "Manages electronic health records (EHR), medical coding, and clinical data governance in Philippine hospitals and health-tech startups.",
        typical_employers: ["Private Hospitals", "DOH", "PhilHealth", "KonsultaMD", "HealthNow"],
        work_setup: "On-site / Hybrid",
        education: "BS HIM or BS Nursing/MedTech with HIM training. ICD-10 and medical coding certifications are an advantage.",
        pathway: "Enroll in HIM certifications, apply to hospital medical records units or health-tech companies via LinkedIn/Kalibrr.",
        progression: ["Medical Records Staff", "HIM Specialist", "HIM Supervisor", "Health Informatics Manager"],
        salary: { entry: "₱18,000 – ₱28,000", mid: "₱30,000 – ₱50,000" },
        key_skills: {
          hard: ["EHR systems", "MedStar", "iClinicSys", "ICD-10 coding", "Data privacy (RA 10173)", "PhilHealth e-claims"],
          soft: ["Confidentiality", "Analytical thinking", "Organization", "Teamwork"]
        },
        market_tags: { in_demand: true, remote_friendly: false, fresh_grad_friendly: true }
      }
    ]
  }
];

export const financeDepartments: Department[] = [
  {
    name: "Retail and Consumer Banking",
    subtitle: "Branch-Level Banking",
    description: "Processes customer transactions, handles deposits, and assesses financial capacity for individuals and businesses across Philippine banks and fintech lenders.",
    teams: [
      { 
        name: "Bank Teller / Customer Service Officer", 
        desc: "Processes customer transactions and handles Deposits/Withdrawals. Entry point for most banking careers in the Philippines.",
        typical_employers: ["BDO", "BPI", "Metrobank", "UnionBank", "PNB", "Landbank"],
        work_setup: "On-site",
        education: "Any 4-year bachelor's degree. Business, accounting, or economics preferred.",
        pathway: "Apply directly to bank career pages or through JobStreet. Trainee programs are available for fresh graduates.",
        progression: ["Teller", "Personal Banker", "Branch Officer", "Branch Manager", "Area Manager"],
        salary: { entry: "₱16,000 – ₱22,000", mid: "₱28,000 – ₱50,000" },
        key_skills: {
          hard: ["Cash handling", "Banking systems (T24, iCore)", "KYC/AML compliance", "Data entry"],
          soft: ["Customer service", "Integrity", "Attention to detail", "Composure"]
        },
        market_tags: { in_demand: true, remote_friendly: false, fresh_grad_friendly: true }
      },
      { 
        name: "Credit Analyst", 
        desc: "Evaluates credit applications from individuals and businesses, assessing financial capacity and risk as Philippine enterprises shift towards fintech.",
        typical_employers: ["BDO", "Security Bank", "RCBC", "Metrobank", "Tonik", "CIMB PH"],
        work_setup: "Hybrid",
        education: "BS Accountancy, Finance, Economics, or Business Management. CPA an advantage.",
        pathway: "Apply to bank management trainee programs or credit units. Internships in credit departments are highly recommended.",
        progression: ["Credit Analyst", "Senior Credit Analyst", "Credit Manager", "VP Credit Risk"],
        salary: { entry: "₱22,000 – ₱35,000", mid: "₱45,000 – ₱80,000" },
        key_skills: {
          hard: ["Financial statement analysis", "Credit scoring models", "Excel", "Risk assessment", "BSP regulations"],
          soft: ["Analytical thinking", "Decision-making", "Risk awareness", "Communication"]
        },
        market_tags: { in_demand: true, remote_friendly: true, fresh_grad_friendly: true }
      }
    ]
  },
  {
    name: "Accounting and Financial Reporting",
    subtitle: "Corporate Accountants",
    description: "Maintains general ledgers and ensures BIR tax compliance for Philippine corporations and listed conglomerates.",
    teams: [
      { 
        name: "Accounting Associate / General Accountant", 
        desc: "Maintains general ledgers, prepares financial statements, processes accounts payable/receivable, and ensures BIR tax compliance.",
        typical_employers: ["SGV & Co.", "PwC Philippines", "KPMG", "Local SMEs", "Listed Corporations"],
        work_setup: "On-site / Hybrid",
        education: "BS Accountancy (4 years) + CPA Board Exam strongly preferred. Non-CPAs also accepted in bookkeeping.",
        pathway: "Pass the CPA board exam, apply to the Big 4 or join corporate accounting departments via JobStreet or Kalibrr.",
        progression: ["Junior Accountant", "Accountant", "Senior Accountant", "Accounting Supervisor", "Controller", "CFO"],
        salary: { entry: "₱18,000 – ₱28,000", mid: "₱35,000 – ₱65,000" },
        key_skills: {
          hard: ["PFRS/IFRS", "QuickBooks/SAP/Oracle", "BIR e-filing", "Payroll", "Financial statement prep"],
          soft: ["Integrity", "Meticulousness", "Time management", "Confidentiality"]
        },
        market_tags: { in_demand: true, remote_friendly: true, fresh_grad_friendly: true }
      }
    ]
  },
  {
    name: "Compliance and Risk",
    subtitle: "The Regulators",
    description: "Ensures the organization adheres to BSP circulars and AMLA regulations, which is critical for all BSP-supervised institutions.",
    teams: [
      { 
        name: "AML / Compliance Officer", 
        desc: "Ensures the organization adheres to BSP circulars, AMLA, and international financial regulations.",
        typical_employers: ["Universal Banks", "Commercial Banks", "Insurance Firms", "Digital Banks", "e-Money Issuers"],
        work_setup: "On-site / Hybrid",
        education: "BS Law, BS Business Administration, or Finance. CAMS certification highly valued.",
        pathway: "Start in bank operations or compliance. Pursue CAMS certification and apply on LinkedIn.",
        progression: ["Compliance Associate", "Compliance Officer", "Senior Compliance Officer", "Compliance Manager", "Chief Compliance Officer"],
        salary: { entry: "₱28,000 – ₱45,000", mid: "₱55,000 – ₱100,000" },
        key_skills: {
          hard: ["AMLA", "BSP regulations", "Transaction monitoring", "KYC/EDD", "Risk assessment"],
          soft: ["Integrity", "Analytical thinking", "Discretion", "Written communication"]
        },
        market_tags: { in_demand: true, remote_friendly: true, fresh_grad_friendly: false }
      }
    ]
  }
];

// ============================================================
// AGRICULTURE, FISHERIES & FORESTRY
// PSA April 2026: ~19% of all PH employment (~8.2M agri + 1.25M fishing)
// ============================================================
export const agricultureDepartments: Department[] = [
  {
    name: "Agribusiness and Farm Management",
    subtitle: "The Cultivators",
    description: "The backbone of the Philippine food supply. This department manages crop production, farm operations, and the business side of agriculture — from smallholder cooperatives to large agribusiness corporations.",
    teams: [
      {
        name: "Farm Operations Manager",
        desc: "Oversees day-to-day farm operations, crop scheduling, labor, and yield optimization for plantations and commercial farms.",
        typical_employers: ["Dole Philippines", "Del Monte Philippines", "Sumifru", "La Frutera", "AgriNurture Inc."],
        work_setup: "On-site / Field-based",
        education: "BS Agriculture, Agribusiness, or Agricultural Engineering. PRC Agriculturist license an advantage.",
        pathway: "Gain OJT on commercial farms or cooperatives, then apply via agribusiness career pages and JobStreet.",
        progression: ["Farm Supervisor", "Farm Operations Manager", "Estate Manager", "Plantation Head", "Operations Director"],
        salary: { entry: "₱18,000 – ₱28,000", mid: "₱35,000 – ₱60,000" },
        key_skills: {
          hard: ["Crop management", "GAP (Good Agricultural Practices)", "Irrigation systems", "Farm record-keeping", "Pest management"],
          soft: ["Leadership", "Problem-solving", "Resourcefulness", "Decision-making"]
        },
        market_tags: { in_demand: true, remote_friendly: false, fresh_grad_friendly: true }
      },
      {
        name: "Agriculturist / Agronomist",
        desc: "Provides technical expertise on soil, crops, and yields. Works with farmers, LGUs, and agribusiness to improve productivity sustainably.",
        typical_employers: ["Department of Agriculture", "East-West Seed", "Yara Philippines", "SL Agritech", "LGU Agriculture Offices"],
        work_setup: "Field-based / On-site",
        education: "BS Agriculture (major in Agronomy/Crop Science) + PRC Agriculturist Licensure Exam.",
        pathway: "Pass the licensure exam, apply to DA programs, seed companies, or LGU agricultural offices.",
        progression: ["Junior Agriculturist", "Agriculturist", "Senior Agriculturist", "Technical Manager", "Agricultural Consultant"],
        salary: { entry: "₱20,000 – ₱30,000", mid: "₱32,000 – ₱55,000" },
        key_skills: {
          hard: ["Soil analysis", "Crop science", "Fertilizer management", "Field trials", "GIS mapping"],
          soft: ["Analytical thinking", "Communication", "Patience", "Community engagement"]
        },
        market_tags: { in_demand: true, remote_friendly: false, fresh_grad_friendly: true }
      }
    ]
  },
  {
    name: "Fisheries and Aquaculture",
    subtitle: "The Blue Economy",
    description: "The Philippines is one of the world's top fish producers. This department covers aquaculture operations, fishery management, and seafood processing across the archipelago.",
    teams: [
      {
        name: "Aquaculture Technician / Fisheries Officer",
        desc: "Manages fish/shrimp pond operations, water quality, feeding, and harvest cycles for commercial aquaculture or government fishery programs.",
        typical_employers: ["BFAR", "Alsons Aquaculture", "Santeh Feeds", "Frabelle Fishing Corp", "Tateh"],
        work_setup: "Field-based / On-site",
        education: "BS Fisheries or BS Marine Biology. PRC Fisheries Professional license for some roles.",
        pathway: "Pass the fisheries licensure exam, apply to BFAR programs or commercial aquaculture firms.",
        progression: ["Aquaculture Technician", "Fisheries Officer", "Hatchery Manager", "Aquaculture Operations Manager"],
        salary: { entry: "₱16,000 – ₱25,000", mid: "₱28,000 – ₱48,000" },
        key_skills: {
          hard: ["Water quality management", "Hatchery operations", "Fish nutrition", "Disease control", "Pond engineering"],
          soft: ["Attention to detail", "Resilience", "Practical problem-solving", "Reliability"]
        },
        market_tags: { in_demand: true, remote_friendly: false, fresh_grad_friendly: true }
      }
    ]
  }
];

// ============================================================
// TOURISM & HOSPITALITY
// PSA April 2026: Accommodation & Food Service = fastest-growing
// sub-sector, +510K jobs year-on-year
// ============================================================
export const tourismDepartments: Department[] = [
  {
    name: "Hotel and Accommodation",
    subtitle: "The Hosts",
    description: "The fastest-growing employment sector in the Philippines. This department runs the hotels, resorts, and accommodations driving the country's tourism rebound across Boracay, Cebu, Palawan, and Metro Manila.",
    teams: [
      {
        name: "Hotel Operations / Front Office Staff",
        desc: "Manages guest check-in/out, reservations, and front-desk service in hotels and resorts. The face of Philippine hospitality.",
        typical_employers: ["Shangri-La", "Okada Manila", "Solaire", "Megaworld Hotels", "Ayala Hotels", "Henann Resorts"],
        work_setup: "On-site",
        education: "BS Hospitality Management, Tourism, or HRM. TESDA NCII certifications accepted.",
        pathway: "Complete OJT/internship at hotels (required in HM courses), then apply via hotel career pages or Kalibrr.",
        progression: ["Front Office Associate", "Front Office Supervisor", "Duty Manager", "Front Office Manager", "Hotel Manager"],
        salary: { entry: "₱14,000 – ₱22,000", mid: "₱28,000 – ₱50,000" },
        key_skills: {
          hard: ["PMS (Opera/Cloudbeds)", "Reservations systems", "Guest relations", "Upselling", "Cash handling"],
          soft: ["Customer service", "Composure", "Communication", "Multitasking"]
        },
        market_tags: { in_demand: true, remote_friendly: false, fresh_grad_friendly: true }
      },
      {
        name: "Travel and Tour Coordinator",
        desc: "Plans and coordinates tour packages, bookings, and itineraries for local and inbound tourists. Strong growth as PH tourism recovers.",
        typical_employers: ["Klook", "Rakso Travel", "Pan Pacific Travel", "DOT-accredited agencies", "Airbnb hosts"],
        work_setup: "Hybrid / On-site",
        education: "BS Tourism or Travel Management. DOT accreditation knowledge an advantage.",
        pathway: "Intern with travel agencies, build knowledge of PH destinations, apply via JobStreet or travel firm pages.",
        progression: ["Tour Coordinator", "Travel Consultant", "Operations Supervisor", "Tourism Manager", "Agency Owner"],
        salary: { entry: "₱15,000 – ₱24,000", mid: "₱28,000 – ₱45,000" },
        key_skills: {
          hard: ["Itinerary planning", "GDS (Amadeus/Sabre)", "Booking systems", "Destination knowledge", "Costing"],
          soft: ["Communication", "Organization", "Sales orientation", "Cultural awareness"]
        },
        market_tags: { in_demand: true, remote_friendly: true, fresh_grad_friendly: true }
      }
    ]
  },
  {
    name: "Food Service and Culinary",
    subtitle: "The Kitchen",
    description: "Restaurants, cafes, and food chains form a massive employment base. This department covers culinary roles and food-service operations across the Philippines' booming dining scene.",
    teams: [
      {
        name: "Chef / Culinary Professional",
        desc: "Prepares dishes, manages kitchen stations, and ensures food quality and safety in restaurants, hotels, and food chains.",
        typical_employers: ["Jollibee Foods Corp", "Max's Group", "Shakey's", "hotel restaurants", "cloud kitchens"],
        work_setup: "On-site",
        education: "BS HRM, Culinary Arts diploma, or TESDA Cookery NCII–NCIII.",
        pathway: "Train in culinary schools (ISCAHM, CCA), build kitchen experience through apprenticeships, then move up stations.",
        progression: ["Commis Cook", "Chef de Partie", "Sous Chef", "Head Chef", "Executive Chef"],
        salary: { entry: "₱14,000 – ₱22,000", mid: "₱30,000 – ₱60,000" },
        key_skills: {
          hard: ["Food preparation", "Menu costing", "Food safety (HACCP)", "Kitchen management", "Plating"],
          soft: ["Creativity", "Stamina", "Teamwork", "Composure under pressure"]
        },
        market_tags: { in_demand: true, remote_friendly: false, fresh_grad_friendly: true }
      }
    ]
  }
];

// ============================================================
// BPO & BUSINESS SERVICES (IT-BPM)
// PSA: Admin & Support Services among top job-adding sub-sectors
// (+572K Feb 2026). The iconic PH white-collar employer.
// ============================================================
export const bpoDepartments: Department[] = [
  {
    name: "Customer Experience and Contact Center",
    subtitle: "The Voice of the World",
    description: "The Philippines is the world's call-center capital. This department covers the customer-facing roles — voice, chat, and email support — that employ over a million Filipinos serving global clients.",
    teams: [
      {
        name: "Customer Service Representative (CSR)",
        desc: "Handles inbound/outbound customer interactions via voice, chat, or email for global accounts (telecom, retail, finance, tech).",
        typical_employers: ["Concentrix", "Teleperformance", "Accenture", "TaskUs", "Alorica", "Sutherland"],
        work_setup: "On-site / Hybrid",
        education: "Senior High School graduate or college level. Strong English communication is the key requirement.",
        pathway: "Apply directly to BPO hiring hubs or walk-in centers. Most offer paid training for fresh hires.",
        progression: ["CSR", "Senior CSR", "Subject Matter Expert", "Team Leader", "Operations Manager"],
        salary: { entry: "₱18,000 – ₱28,000", mid: "₱30,000 – ₱50,000" },
        key_skills: {
          hard: ["CRM tools (Salesforce/Zendesk)", "Ticketing systems", "Typing speed", "Product knowledge", "Call handling"],
          soft: ["English fluency", "Empathy", "Patience", "Active listening"]
        },
        market_tags: { in_demand: true, remote_friendly: true, fresh_grad_friendly: true }
      }
    ]
  },
  {
    name: "Knowledge Process and Back Office",
    subtitle: "The Global Back Office",
    description: "Higher-value BPO work — finance, HR, analytics, and technical support outsourced to PH talent. This is where the industry is moving as it climbs the value chain.",
    teams: [
      {
        name: "Back Office / Shared Services Associate",
        desc: "Handles finance, accounting, HR, or data operations for offshore clients in Global In-House Centers (GICs) and KPOs.",
        typical_employers: ["JPMorgan Chase", "Manulife", "Wells Fargo", "Shell Business Operations", "P&G GBS", "Maersk"],
        work_setup: "Hybrid / On-site",
        education: "Bachelor's degree in Accountancy, Finance, HR, Business, or related field.",
        pathway: "Apply to GICs/shared-services centers via LinkedIn or Kalibrr. Internships in shared services help.",
        progression: ["Process Associate", "Senior Associate", "Subject Matter Expert", "Team Lead", "Process Manager"],
        salary: { entry: "₱22,000 – ₱35,000", mid: "₱40,000 – ₱70,000" },
        key_skills: {
          hard: ["ERP (SAP/Oracle)", "Advanced Excel", "Process documentation", "Data analysis", "Reconciliation"],
          soft: ["Analytical thinking", "Accuracy", "Adaptability", "Cross-cultural communication"]
        },
        market_tags: { in_demand: true, remote_friendly: true, fresh_grad_friendly: true }
      }
    ]
  }
];
