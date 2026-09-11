export const career = [
 {id:'drdo',name:'DRDO',mark:'DRDO',color:'#65d9b4',years:'2018 — 2020',chapter:'01',title:'Making the invisible visible.',role:'Software Development Trainee → SDE Intern',location:'Jodhpur, India',period:'May–Jun 2018 · Dec 2019–May 2020',summary:'From offline maps to computer vision: my first experience turning research into working software.',metric:'30%',metricLabel:'lower operating costs for teams',groups:[{title:'Software Development Trainee · 2018',points:['Designed an offline ArcGIS desktop application that reduced overall operating costs for teams by 30%.','Enabled multiple map layers and feature inspection through simple queries.','Added coordinate formats, map rotation, region capture and zoom controls.']},{title:'SDE Intern · 2019–2020',points:['Developed an eigenvalue-based dominant color extraction technique as an improvement over KNN.','Trained a RetinaNet-based computer-vision model on the Google Open Images dataset.','Built a model to detect armored vehicles with a high degree of confidence.']}],skills:['Python','Java','ArcGIS','Computer vision']},
 {id:'akamai',name:'Akamai',mark:'a',color:'#68baff',years:'2020 — 2021',chapter:'02',title:'Keeping the internet moving.',role:'Technical Solutions Engineer Associate',location:'Bengaluru, India',period:'Jul 2020 – Aug 2021',summary:'Working at the edge of the internet taught me to trace customer problems through complex, mission-critical systems.',metric:'Global',metricLabel:'content delivery & customer support',groups:[{title:'Reliability at the edge',points:['Designed a log-analysis script that reduced the effort engineers spent investigating rebuffering issues.','Built an in-depth technical understanding of DNS and HTTP protocols.','Handled highly technical, mission-critical client issues worldwide, including widespread multimedia content-delivery problems.']}],skills:['DNS','HTTP','Log analysis','Content delivery']},
 {id:'mettl',name:'Mercer | mettl',mark:'m',color:'#c1a1ff',years:'2021 — 2024',chapter:'03',title:'One gateway. Fewer barriers.',role:'Software Developer → Senior Software Engineer',location:'Gurugram, India',period:'Sep 2021 – Mar 2023 · Mar 2023 – Mar 2024',summary:'Building the infrastructure, onboarding and reporting behind a proctoring platform used by hundreds of clients.',metric:'87.5%',metricLabel:'developer hours saved in debugging',groups:[{title:'Platform & architecture',points:['Designed Mpaas Gateway as a single entry point for the proctoring microservices stack, with Spring reactive features, multiple authentication mechanisms and rate limiting. Improved debugging saved 87.5% of developer hours.','Built a proof of concept for moving message queues from ActiveMQ to Amazon SQS, with a potential ₹14.5 million benefit from reduced infrastructure costs. This was a projected benefit, not a realized saving.','Partnered with an intern to migrate a proctoring UI service from Spring to Spring Boot, reducing development time for new functionality by up to 33%.','Performed a time-sensitive Aurora PostgreSQL major-version upgrade and optimized affected queries.']},{title:'Customers & product workflows',points:['Created an Mpaas demo page used by 200+ clients and internal sales and marketing teams, including Accenture, Barclays, Airtel and IIM-B.','Improved test-taker reports with camera failures, connectivity events and candidate retries; interactions per visit increased 18% and average session time rose 20%.','Built Qmark single sign-on, client and IP allowlisting, and automated bulk sub-user creation through a single API, bringing the reported operation to approximately 3–4 seconds.','Developed an Excel analytics dashboard for proctoring usage across 300+ clients and internal finance teams, working with stakeholders on data accuracy and delivery.']}],skills:['Spring Boot','Microservices','AWS','PostgreSQL']},
 {id:'oracle',name:'Oracle',mark:'O',color:'#ff826d',years:'2024 — 2026',chapter:'04',title:'Trust, at a million requests a day.',role:'Senior Member of Technical Staff',location:'Bengaluru, India',period:'Apr 2024 – Apr 2026',summary:'Secure healthcare infrastructure where reliability has a direct relationship with the people who depend on it.',metric:'1M+',metricLabel:'daily requests through the OAuth proxy',groups:[{title:'Healthcare, identity & scale',points:['Architected an external OAuth proxy microservice for secure communication between healthcare providers, including the UK NHS, and Oracle services. It processed over one million requests daily and impacted millions of medical professionals.','Implemented operating-room board-device tracking and management for 50+ hospitals, reducing operational overhead by 15%.','Patched critical vulnerabilities and upgraded outdated libraries across cloud identity and access-management assets.','Resolved complex defects, addressed Corrective and Preventive Actions (CAPA), and deployed highly scalable services.']}],skills:['OAuth','Cloud IAM','Healthcare','Microservices']},
 {id:'isb',name:'Indian School of Business',mark:'ISB',color:'#efcf7b',years:'2026 — 2027',chapter:'05',title:'From building systems to shaping products.',role:'Postgraduate student · Class of 2027',location:'Indian School of Business',period:'Apr 2026 – Mar 2027 · Expected',summary:'Bringing a software-engineering foundation into business, product and strategy.',metric:'Next',metricLabel:'chapter: product & strategy',groups:[{title:'Business education',points:['Pursuing a postgraduate degree in Business Administration and Management at the Indian School of Business.','Building on a B.Tech in Computer Science from Vellore Institute of Technology (2016–2020).']}],skills:['Product','Strategy','Business','Technical fluency']}
];
export const community=[['Jul 2023','Kherwadi Social Welfare Association','Volunteer staff, Delhi.'],['Apr–May 2022','Shiksha Bharti School','Worked with faculty to create engaging Class IV summer homework and ease teachers’ workload.'],['Apr 2022','iVolunteer','Taught Word, PowerPoint and Excel to social workers supporting underprivileged women, tailoring workbook and presentation guidance to their needs.']];

// Consolidated from the supplied VMock master resume and company story notes.
// Alternative phrasings are deduplicated; estimates remain explicitly qualified.
Object.assign(career[1],{metric:'50%',metricLabel:'less manual investigation effort'});
career[1].groups[0].points[0]='Built log-analysis automation for rebuffering investigations, reducing manual engineering effort by 50%.';
career[1].groups[0].points.push('Supported global CDN and cloud-security services for premium APAC and EMEA media clients, resolving live-streaming and network-delivery incidents.');
Object.assign(career[3],{metric:'64%',metricLabel:'lower authorization response time',summary:'Building secure, usable healthcare infrastructure: easier clinician login, self-serve hospital onboarding and data retrieval for clinical AI.'});
career[3].groups=[
 {title:'Clinician workflows & enterprise AI',points:[
 'Led the 0-to-1 build of an external OAuth proxy for UK NHS clinicians. Chose modular authentication over patching the legacy login stack, enabling single sign-on to Oracle Health’s electronic health record platform.',
 'Built a clinical-data pipeline supporting Oracle Health Clinical AI Agent, migrating relational data into vectorized retrieval infrastructure and reducing manual update/fetch effort by 27%.',
 'Productized self-serve identity-policy onboarding for hospital IT teams. A 7+ hospital pilot revealed that smaller teams needed defaults; the revised workflow reached 17+ hospitals and reduced support change requests by 23%.',
 'Used telemetry to identify a permissions bottleneck, then parallelized authorization checks to reduce response time by 64% on a platform processing 4M+ daily checks.',
 'Redesigned the internal portal connecting clinicians and admins to 12+ EHR apps, owning wireframes, layout and rollout indicators while coordinating 4+ downstream teams.',
 'Expanded Device Access with staff/device onboarding, demographic filtering, tenant rules and access audits. Shipped 10+ features and improved new-hospital onboarding speed by 40%.',
 'Delivered operating-room board-device tracking for 50+ hospitals, reducing operational overhead by 15%.'
 ]},
 {title:'Discovery, architecture & delivery',points:[
 'Gathered requirements from 8+ client success managers across the US and Europe, turning workflow feedback and support patterns into a backlog of 35+ user stories delivered across 22 sprints with near-zero spillover.',
 'Owned identity and access services within a platform serving 100+ hospital clients and 4M+ daily IAM transactions. The external OAuth proxy specifically processed 1M+ daily requests.',
 'Delivered a high-security authentication mode that enabled deployment for four US federal customers.',
 'Redesigned primary-key and identity flows, and shipped multi-tenant access logic to isolate permissions and data across hospital networks.',
 'Introduced token caching and cache-control standards to reduce redundant downstream requests.',
 'Defined dashboards for login success, latency, incident frequency, MTTR and adoption to monitor service health and inform prioritization.',
 'Set up the SSO product’s OCI delivery pipeline, including environments, certificates and automated release gates; reduced mean time to deployment by 33%.',
 'Built a WireMock integration-testing proof of concept reused across 8+ subsequent features; expanded automated coverage to 1,200+ tests and retired a legacy login flow without regressions.',
 'Created a reusable annotation framework that reduced boilerplate by 40% and accelerated future API development.',
 'Owned release coordination and safety-risk documentation for two services, aligning downstream teams on changes and release dependencies.'
 ]},
 {title:'Reliability, mentorship & recognition',points:[
 'Resolved critical login incidents, including an outage caused by a development-environment network misconfiguration, restoring service within four hours.',
 'Introduced structured root-cause analysis that improved issue-resolution turnaround by 30%; tighter pre-release gates reduced post-release defects by 25%.',
 'Patched critical vulnerabilities, upgraded outdated IAM libraries and addressed Corrective and Preventive Actions.',
 'Mentored two new joiners, performed 80+ code reviews and built training plans and knowledge-transfer videos that reduced new-employee onboarding time by 30%.',
 'Established standard operating procedures that improved on-call resolution time by 40%, and mentored an intern who received a pre-placement offer.',
 'Improved coverage to 80% for mission-critical authorization-library modules.',
 'Rated Outstanding in FY25 for delivery and ownership across two transitioned products; selected to lead the SSO build during the first year on the team.'
 ]}
];
career[2].groups.push(
 {title:'Better assessment experiences',points:[
 'Improved image capture resolution by 33%, reducing false-positive candidate flags by 15%. An ArcFace-based approach reached 99.8% face-detection accuracy on an internal dataset derived from production data.',
 'Built an AI support assistant for natural-language assessment configuration and contextual FAQ retrieval, increasing self-service adoption by 14%.',
 'Turned a school client’s configuration problem into a reusable per-exam settings module with six proctor actions: pause, message, mute, flag, terminate and screen-lock. Added role-based controls for candidate allocation.',
 'Introduced JWT authentication for deeper integrations, replacing complex hash-signing workflows and supporting onboarding for 200+ enterprise clients.',
 'Built Qmark SSO for a UK aggregator, replacing a reported 14 seconds per user in manual provisioning with a bulk API workflow.'
 ]},
 {title:'Scale, reliability & commercial judgment',points:[
 'Redesigned the proctoring gateway so 99.4% of requests completed under 200 ms, reducing production-issue resolution time by 43% and error rates by 12%. These measures are distinct from the debugging-hour reduction above.',
 'Added rate limiting and circuit breakers to reduce cascading failures; the source estimates ₹10 lakh in revenue at risk during high-volume assessment windows.',
 'Moved inter-service communication to private networks to reduce exposure of candidate personal data and support privacy compliance readiness.',
 'Built the SQS FIFO business case and a complete proof of concept in 1.5 months, presenting cost and scale tradeoffs to engineering and finance leadership. Evaluated growth from 200 to 1,000 messages per second; ₹14.5M annual savings remained a projection.',
 'Rearchitected a WebRTC video-streaming server for 40,000 concurrent video requests.',
 'Led an EBS-to-EFS migration that reduced infrastructure costs by 43%, approximately ₹30 lakh.',
 'Modernized three backend services spanning 50,000+ lines of code, reducing new-feature development time by 33%.',
 'Built an ELK monitoring dashboard to give engineers, PMs and leadership self-serve access to production logs.',
 'Mentored interns and engineers and performed 100+ code reviews. Promoted to Senior Software Engineer in March 2023; received Spotlight Awards for messaging infrastructure work in 2023 and a KPI dashboard in 2024.'
 ]}
);
career[0].groups.push({title:'Additional research & teamwork',points:[
 'The master resume reports 97% accuracy for the detection model and a 50% reduction in threat-analysis effort using eigenvalue-based color extraction; dataset and evaluation details are not included in the supplied documents.',
 'Coordinated and mentored 3+ interns, contributing to documentation and release readiness for two internal products.'
]});
