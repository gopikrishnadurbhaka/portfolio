/* =====================================================================
   WEBSITE CONTENT FILE  (edit this file to change the text on the site)

   Everything on the website comes from this one file: contact details,
   biography, expertise, articles, publications, patents, speaking,
   media, podcast and advisory text. Full guide: src/content/README-content.md

   - Edit only the text between the quotes. Keep every quote " , comma , [ ] { }.
   - To add an item (a talk, a patent, an article) copy one whole { ... } block
     of the same list, paste it after a comma, and change the text.
   - "url": "" means no link yet. Paste a full address starting with https://
   - Empty text ("") is hidden automatically.
   - Phone number: shown only when "showPhone": true (it is false = hidden by default).
   - "sample": true marks a placeholder that is NOT shown on the site.
     (Only for reviewing: settings.showDraftNote true shows them with a "Sample" tag.)
   - Links starting with # jump to a section of the home page:
     #about #expertise #thought-leadership #research #patents #speaking
     #media #podcast #advisory #contact
   - Pictures: put files in the /public folder and write the path from there,
     e.g. "/images/expertise/aiot.jpg". Your portrait is /public/profile-cutout.webp
     (background removed). The original photo is kept as /public/profile.jpg.
   ===================================================================== */
import type { SiteContent } from "./types";

export const SITE_CONTENT: SiteContent = {
  settings: {
    showDraftNote: false,
    // false hides Schedule a Consultation and all enquiry forms; true enables them.
    scheduleEnabled: false,
    formEndpoint: "",
    downloads: {
      resume: {
        enabled: false,
        url: "/portfolio/assets/downloads/Resume.pdf",
        label: "Download Resume",
        contactLabel: "Download Resume",
      },
      contact: {
        enabled: false,
        url: "/portfolio/assets/downloads/contact.vcf",
        label: "Save Contact",
        contactLabel: "Save Contact",
      },
    },
    disclaimer: {
      enabled: true,
      text: "The views expressed here are personal and do not represent any organisation. Content is provided for general information only.",
    },
  },

  ui: {
    showMore: "Show more",
    showLess: "Show less",
    moreEngagements: "More engagements",
    moreCoverage: "More coverage",
    searchEngagements: "Search engagements",
    searchCoverage: "Search coverage",
    allYears: "All years",
    clearFilters: "Clear filters",
    noResults: "No matching entries.",
    copy: "Copy",
    copied: "Copied",
    copyFailed: "Could not copy. Please select the text to copy it.",
    getInTouch: "Get in Touch",
    speakingTopic: "Speaking Opportunities",
  },
  person: {
    name: "Dr. Gopi Krishna Durbhaka",
    tagline: "Engineering Intelligence for the Physical & Industrial World",
    eyebrow: "Researcher · Innovator · AI Strategist",
    titleLine1: "Engineering",
    titleLine2: "Intelligence",
    subtitle: "for the Physical & Industrial World",
    lead: "Bridging engineering, real-time data and artificial intelligence to build intelligent, connected and sustainable industrial systems.",
    tags: [
      "Industrial AI",
      "AIoT",
      "Predictive Intelligence",
      "Research & Innovation",
      "Engineering Analytics",
      "Technology Advisory",
    ],
    badges: [
      { title: "Senior Member", text: "IEEE" },
      { title: "Fellow", text: "ISECE" },
      { title: "Ph.D.", text: "Predictive Maintenance of Wind Turbines" },
      { title: "5x", text: "LinkedIn Top Voice" },
      { title: "20+", text: "Years of Experience" },
    ],
    primaryButton: { label: "Explore My Work", href: "#research" },
    secondaryButton: { label: "Invite Me to Speak", href: "#contact" },
    photo: "/profile-cutout.webp", // your portrait, shown on top of the background — replace this file or path to change it
    photoWidth: 1290,
    photoHeight: 1913,
    photoAlt: "Portrait of Dr. Gopi Krishna Durbhaka",
    backgroundImage: "/images/hero-engineering-intelligence.jpg", // top background — replace this file or path to change it
    verticalText: "PHM · RELIABILITY · AIoT · PREDICTIVE MAINTENANCE",
  },

  contact: {
    kicker: "Contact",
    title: "Contact & Enquiries",
    text: "Share a few details and a preferred time in India Standard Time (IST, UTC+05:30). I will confirm by email.",
    email: "dr.gopikrishnadurbhaka@gmail.com",
    phone: "+91 90000 00000",
    showPhone: false,
    location: "Hyderabad, India",
    links: [
      {
        label: "LinkedIn",
        text: "linkedin.com/in/gopikrishnadurbhaka",
        url: "https://www.linkedin.com/in/gopikrishnadurbhaka/",
      },
      {
        label: "Google Scholar",
        text: "Google Scholar profile",
        url: "https://scholar.google.com/citations?user=2R7PZH8AAAAJ&hl=en",
      },
      {
        label: "ResearchGate",
        text: "ResearchGate profile",
        url: "https://www.researchgate.net/profile/Gopi-Krishna-Durbhaka",
      },
      {
        label: "ORCID",
        text: "orcid.org/0000-0002-7191-9546",
        url: "https://orcid.org/0000-0002-7191-9546",
      },
    ],
  },

  credibility: [
    { title: "20+ Years", text: "Of Research, Innovation & Industry Experience" },
    { title: "Research Publications", text: "In international journals, IEEE conferences and book chapters" },
    { title: "5+ Patent Grants", text: "Filed at the Indian Patent Office and the USPTO" },
    { title: "Global Impact", text: "Across Industries, Countries and Communities" },
  ],

  about: {
    kicker: "About me",
    title: "A Journey in Engineering, With Real-World Impact",
    paragraphs: [
      "Dr. Gopi Krishna Durbhaka is a Senior Member of IEEE (SM, IEEE) Community and Fellow Member (FISECE) of the Indian Society of Electronics and Communication Engineers and Member of ISTE. He has been working with top ranking IT organizations and prior to this had been working as a Scientist at an R&D organization under the Ministry of Communications and Information Technology, Govt. of India. He has filed multiple patents both in IPO and USPTO and received 5+ Patent Grants too.",
      "He has presented and published multiple technical & management papers in national & international conferences as well as journals. He has been a Review Committee member, Session Chair for multiple IEEE conferences. He has been invited as Patron, for guest lectures, Keynote & Plenary talks, Tutorials both in academic institutions, Universities, IEEE cum ACM conferences and as well to Energy board of engineers too.",
      "He has done his M.E. in Electronics & Control, MBA in Technology Management and PhD in Electronics Engineering. His major areas of research interest are listed below.",
    ],
    memberships: ["Senior Member, IEEE", "Fellow, ISECE", "Member, ISTE"],
    education: [
      "Ph.D. Electronics Engineering",
      "MBA, Technology Management",
      "M.E. Electronics & Control",
      "B.E. Electronics & Communication",
    ],
    interests: [
      "Industrial Automation",
      "Manufacturing",
      "Automotives",
      "Renewable Energy",
      "Reliability",
      "Telemetry",
      "Industrial IoT",
      "Predictive & Prescriptive Analytics",
      "Signal Processing",
      "Pattern Analysis",
      "Machine Learning",
      "NLP",
      "Generative AI",
    ],
    buttonLabel: "Read My Full Story",
    buttonUrl: "https://www.linkedin.com/in/gopikrishnadurbhaka/",
    roles: [
      { title: "Researcher", text: "Solving real-world engineering problems" },
      { title: "Innovator", text: "5+ patent grants in India and the US" },
      { title: "AI Strategist", text: "Bridging AI and engineering" },
      { title: "Speaker", text: "Keynotes, plenary talks and tutorials" },
    ],
  },

  expertise: {
    kicker: "Domain expertise",
    title: "Solving Real-World Problems With Intelligent Systems",
    cards: [
      {
        title: "Industrial AI",
        text: "Machine learning and deep learning for industrial automation.",
        image: "/images/expertise/industrial-ai.jpg",
      },
      {
        title: "AIoT Systems",
        text: "Connected systems for real-time insights and control.",
        image: "/images/expertise/aiot.jpg",
      },
      {
        title: "Predictive Maintenance",
        text: "AI-driven solutions to minimize downtime and extend asset life.",
        image: "/images/expertise/predictive.jpg",
      },
      {
        title: "Edge AI",
        text: "Real-time analytics to enhance decisions at the edge.",
        image: "/images/expertise/edge-ai.jpg",
      },
      {
        title: "Signal & Vibration Analytics",
        text: "Condition monitoring from vibration and electrical signals.",
        image: "/images/expertise/vibration.jpg",
      },
      {
        title: "Smart Sensors",
        text: "Advanced sensing solutions for industrial equipment.",
        image: "/images/expertise/sensors.jpg",
      },
      {
        title: "Cloud & Data Platforms",
        text: "Scalable platforms for data ingestion and visualization.",
        image: "/images/expertise/cloud.jpg",
      },
    ],
  },

  thought: {
    kicker: "Thought leadership",
    title: "Ideas for a Smarter, More Sustainable Industrial Future",
    text: "Explore my perspectives, articles and frameworks on how engineering, data and AI are converging to create the next generation of intelligent industrial systems.",
    buttonLabel: "View All Insights",
    buttonUrl: "https://www.linkedin.com/in/gopikrishnadurbhaka/",
    featured: {
      label: "Featured interview",
      title: "Exclusive Interview: Engineering Intelligence for the Physical World",
      text: "On combining physical engineering with AI: predictive maintenance, a wearable smart-fabric concept, the OT/IT disconnect that holds back industrial AI, and advice for aspiring data scientists.",
      source: "TheCconnects",
      edition: "29 Oct 2026",
      url: "https://thecconnects.com/dr-gopi-krishna-durbhaka-principal-data-scientist-at-happiest-minds-technologies-exclusive-interview/",
      tileTitle: "Industry 5.0",
      tileText: "Human-Centric. Intelligent. Sustainable.",
      sample: false,
    },
    articles: [
      {
        date: "Sep 2026",
        source: "India Prime Times",
        title: "When Machines Learn to Speak: Dr. Gopi Krishna Durbhaka and the Rise of Engineering Intelligence",
        text: "Why industrial equipment rarely signals failure plainly, and how Engineering Intelligence turns data into decisions.",
        url: "https://indiaprimetimes.com/when-machines-learn-to-speak-dr-gopi-krishna-durbhaka-and-the-rise-of-engineering-intelligence/",
        sample: false,
      },
      /*
      ,{ "date": "Add date", "source": "LinkedIn", "title": "Add your next article or LinkedIn post here", "text": "Copy this block, add the title, a one-line summary and the web address.", "url": "", "sample": true }
      */
    ],
  },

  research: {
    kicker: "Research & innovation",
    title: "Turning Ideas Into Real-World Impact",
    text: "My research and innovation focus on developing intelligent systems, algorithms and technologies that solve real industrial problems.",
    profiles: [
      { label: "Google Scholar", url: "https://scholar.google.com/citations?user=2R7PZH8AAAAJ&hl=en" },
      { label: "ResearchGate", url: "https://www.researchgate.net/profile/Gopi-Krishna-Durbhaka" },
    ],
    orcidUrl: "",
    orcidLabel: "More publications on ORCID",
    publications: [
      {
        venue: "IEEE Xplore",
        year: "2026",
        title: "Predictive Maintenance of Brakepad Degradation in Automotives",
        authors: "",
        url: "https://ieeexplore.ieee.org/document/11710575/",
        sample: false,
      },
      {
        venue: "CMC Journal",
        year: "2021",
        title:
          "Swarm-LSTM: Condition Monitoring of Gearbox Fault Diagnosis Based on Hybrid LSTM Deep Neural Network Optimized by Swarm Intelligence Algorithms",
        authors: "",
        url: "https://www.techscience.com/cmc/v66n2/40663",
        sample: false,
      },
      {
        venue: "Springer",
        year: "2019",
        title: "Firefly Swarm: Metaheuristic Swarm Intelligence Technique for Mathematical Optimization",
        authors: "",
        url: "https://link.springer.com/chapter/10.1007/978-981-13-1274-8_34",
        sample: false,
      },
      {
        venue: "IEEE Xplore",
        year: "2017",
        title: "Fault behaviour pattern analysis and recognition",
        authors: "",
        url: "https://ieeexplore.ieee.org/document/7845325",
        sample: false,
      },
      {
        venue: "IEEE ICACCI",
        year: "2016",
        title:
          "Predictive maintenance for wind turbine diagnostics using vibration signal analysis based on collaborative recommendation approach",
        authors: "",
        url: "https://ieeexplore.ieee.org/abstract/document/7732316",
        sample: false,
      },
      {
        venue: "IEEE Xplore",
        year: "2015",
        title: "Automated Regression Test Suite Optimization Based on Heuristics",
        authors: "",
        url: "https://ieeexplore.ieee.org/abstract/document/7351812",
        sample: false,
      },
      {
        venue: "ACM",
        year: "2015",
        title: "Recommendation and Regression Test Suite Optimization Using Heuristic Algorithms",
        authors: "",
        url: "https://dl.acm.org/doi/epdf/10.1145/2723742.2723765",
        sample: false,
      },
      {
        venue: "IEEE Xplore",
        year: "2013",
        title: "Preventive maintenance of wind turbines using Remote Instrument Monitoring System",
        authors: "",
        url: "https://ieeexplore.ieee.org/abstract/document/6479538",
        sample: false,
      },
    ],
    areas: [
      {
        title: "Prognostics & Health Management",
        text: "Condition monitoring, fault diagnosis and remaining useful life estimation for industrial assets.",
      },
      {
        title: "Wind Turbine Drivetrain Reliability",
        text: "Physics-informed and data-driven models for gearbox and generator health.",
      },
      {
        title: "Prescriptive Maintenance",
        text: "Moving from predicting failures to recommending the right maintenance action.",
      },
    ],
    projects: [
      { title: "SCADA Anomaly Detection", text: "Benchmarking early fault detection on wind farm SCADA data." },
      {
        title: "Brake-Pad Condition and RUL Prediction",
        text: "Classification and remaining useful life regression for automotive brake pads.",
      },
      {
        title: "AI-Powered Electrical Stress Analysis",
        text: "Automated derating and stress checks for electronic designs.",
      },
    ],
  },

  patents: {
    kicker: "Patents & innovations",
    title: "Innovations That Drive the Future",
    text: "Multiple patents in AIoT, predictive maintenance, industrial systems, smart sensors and engineering solutions.",
    buttonLabel: "View All Patents",
    buttonUrl: "https://scholar.google.com/citations?user=2R7PZH8AAAAJ&hl=en",
    items: [
      {
        status: "Patent Granted · India",
        title: "Adaptive Wearable Smart Fabric",
        number: "IN 411271  ·  Application 1364/DEL/2015",
        year: "Granted 11 Nov 2022 · HCL Technologies Ltd",
        url: "https://patents.google.com/patent/US20160331320A1",
        sample: false,
      },
      {
        status: "Patent Granted · US",
        title: "Test cycle optimization using contextual association mapping",
        number: "US 11,080,171 B2",
        year: "Granted 3 Aug 2021 · Accenture Global Solutions",
        url: "https://patents.google.com/patent/US11080171B2/en",
        sample: false,
      },
      {
        status: "Patent Granted · US",
        title: "Monitoring and controlling of valves in industrial process control and automation using NFC",
        number: "US 9,523,971 B2",
        year: "Granted 20 Dec 2016 · HCL Technologies Ltd",
        url: "https://patents.google.com/patent/US9523971B2/en",
        sample: false,
      },
      {
        status: "Patent Granted · US",
        title: "Automatically recommending test suite from historical data based on randomized evolutionary techniques",
        number: "US 9,471,470 B2",
        year: "Granted 18 Oct 2016 · HCL Technologies Ltd",
        url: "https://patents.google.com/patent/US9471470B2/en",
        sample: false,
      },
      {
        status: "Patent Filing · India",
        title: "Telescopic Automated Straw (AStraw)",
        number: "IN application 1518/CHE/2014",
        year: "Dated 11 Apr 2014 · Inventors: G. K. Durbhaka, S. Chacko, S. Thangaraju",
        url: "",
        sample: true,
        sampleLabel: "Confirm status",
      },
    ],
  },

  speaking: {
    kicker: "Speaking engagements",
    title: "Sharing Insights. Building a Better Tomorrow.",
    text: "I regularly speak at international conferences, industry forums and corporate events on industrial AI, AIoT, predictive maintenance and the future of intelligent industries.",
    buttonLabel: "Invite Me to Speak",
    buttonUrl: "#contact",
    image: "",
    formats: [
      { title: "Keynotes", text: "Industry conferences" },
      { title: "Tutorials", text: "Hands-on learning" },
      { title: "Panel Discussions", text: "Expert perspectives" },
      { title: "Webinars", text: "Industry and academia" },
    ],
    upcomingTitle: "Upcoming Engagements",
    pastTitle: "Past Engagements",
    past: [
      {
        event: "Industrial Control Systems 2018",
        talk: "Keynote Speaker: Smart Warehousing",
        date: "11–12 Apr 2018",
        year: "2018",
        sortDate: "2018-04-11",
        location: "Doha, Qatar",
        url: "",
      },
      {
        event: "IEEE International Conference on Data Management, Analytics and Innovation (ICDMAI)",
        talk: "Tutorial Speaker",
        date: "24 Feb 2017",
        year: "2017",
        sortDate: "2017-02-24",
        location: "Pune, India",
        url: "",
      },
      {
        event: "IEEE International Workshop on Internet of Things and TV (WIOT) 2017",
        talk: "Keynote Speaker",
        date: "12 Jan 2017",
        year: "2017",
        sortDate: "2017-01-12",
        location: "Pune, India",
        url: "",
      },
      {
        event: "2nd International IEEE Conference on Intelligent Computing and Communication (ICICC) 2017",
        talk: "Keynote Speaker",
        date: "2017",
        year: "2017",
        location: "MIT World Peace University, Pune, India",
        url: "",
      },
      {
        event: "Guest Lectures to Executive Engineers of TNEB",
        talk: "Invited Guest Lecturer: GSM based DT monitoring System; GSM based Remote Online Bushing monitoring System",
        date: "2009",
        year: "2009",
        location: "Tamil Nādu, India",
        url: "",
      },
    ],
    upcoming: [
      {
        event: "ICADS 2027, Singapore",
        talk: "Keynote Speaker: Beyond Predictive Maintenance: Engineering Intelligence for Prescriptive and Self-Adaptive Industrial AI",
        date: "8-11 Apr 2027",
        location: "",
        url: "https://www.linkedin.com/feed/update/urn:li:activity:7523586677081108480/",
        sample: false,
      },
      {
        event: "ICADS 2027, Singapore",
        talk: "Panel Speaker",
        date: "8-11 Apr 2027",
        location: "",
        url: "https://datascience.averconferences.com/Speakers2027.php",
        sample: false,
      },
    ],
  },

  media: {
    kicker: "Media & recognition",
    title: "Featured In",
    groups: [
      { value: "Press", label: "Newspapers & Magazines" },
      { value: "Features", label: "Features & Interviews" },
    ],
    items: [
      {
        group: "Features",
        outlet: "TheCconnects",
        type: "Exclusive Interview",
        date: "Oct 2026",
        text: "An exclusive interview on engineering intelligence and predictive maintenance.",
        url: "https://thecconnects.com/dr-gopi-krishna-durbhaka-principal-data-scientist-at-happiest-minds-technologies-exclusive-interview/",
        sample: false,
      },
      {
        group: "Press",
        outlet: "India Prime Times",
        type: "Feature article",
        date: "Sep 2026",
        text: "When Machines Learn to Speak: Dr. Gopi Krishna Durbhaka and the Rise of Engineering Intelligence.",
        url: "https://indiaprimetimes.com/when-machines-learn-to-speak-dr-gopi-krishna-durbhaka-and-the-rise-of-engineering-intelligence/",
        sample: false,
      },
      {
        group: "Features",
        outlet: "IEEE Innovation Spotlight",
        type: "Feature article",
        date: "Sep 2017",
        text: "Perfect Posture: Smart Fabric to the Rescue. How a daily train commute led to a wearable smart-fabric invention.",
        url: "https://innovate.ieee.org/innovation-spotlight/smart-fabric-posture-ergonomics/",
        sample: false,
      },
      {
        group: "Features",
        outlet: "IEEE Innovation Spotlight",
        type: "Feature article",
        date: "Mar 2017",
        text: "Wind Farms: Preventive to Predictive Maintenance with Remote Monitoring",
        url: "https://innovate.ieee.org/innovation-spotlight/wind-farm-preventive-maintenance-local-control-unit/",
        sample: false,
      },
    ],
  },

  podcast: {
    kicker: "Podcast",
    title: "Listen: Conversations on Engineering Intelligence",
    text: "Conversations on industrial AI, predictive maintenance and engineering intelligence.",
    episodes: [
      {
        title: "Engineering Intelligence for the Physical World: a conversation with Dr. Gopi Krishna Durbhaka",
        date: "Nov 2026",
        duration: "",
        description:
          "Adapted from the TheCconnects interview: predictive maintenance, Swarm-LSTM for wind turbines, smart fabric, and why to fall in love with the domain, not the algorithm.",
        audio: "",
        aiVoiced: true,
        transcriptLabel: "Read the original interview",
        transcriptUrl:
          "https://thecconnects.com/dr-gopi-krishna-durbhaka-principal-data-scientist-at-happiest-minds-technologies-exclusive-interview/",
        links: [
          { label: "Spotify", url: "" },
          { label: "Apple Podcasts", url: "" },
          { label: "YouTube Music", url: "" },
        ],
        sample: false,
      },
    ],
  },

  advisory: {
    kicker: "Advisory & collaboration",
    title: "Let's Build Intelligent Solutions Together",
    text: "I work with organizations to drive innovation, build AI-powered solutions and transform industrial operations with engineering intelligence.",
    buttonLabel: "Schedule",
    bookingUrl: "",
    timezoneNote: "Times are in India Standard Time (IST, UTC+05:30).",
    timeSlots: [
      "09:00 - 11:00 IST",
      "11:00 - 13:00 IST",
      "14:00 - 16:00 IST",
      "16:00 - 18:00 IST",
      "18:00 - 20:00 IST",
    ],
    offers: [
      { title: "Advisory", text: "AI strategy, Technology advisory" },
      { title: "Speaking Opportunities", text: "Keynotes, Tutorials, Panels" },
      { title: "Research Collaboration", text: "Academic and Industry projects" },
      { title: "Media & Interviews", text: "Articles, Expert opinion, Podcasts" },
    ],
  },
};
