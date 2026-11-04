import React, { useState, useEffect } from 'react';
import {
  Code2, Server, Database, Cpu, ExternalLink, Mail, Download,
  CheckCircle2, X, ChevronRight, Globe, Layers, Send, Terminal,
  User, Sparkles, Copy, Check, Briefcase, Eye, FileText, ArrowRight,
  Smartphone, ShieldCheck, Zap, Menu, Sun, Moon, Languages
} from 'lucide-react';
import { Github, Linkedin } from './components/BrandIcons';

// ==========================================
// TRANSLATIONS
// ==========================================
const translations: Record<string, { fr: string; en: string }> = {
  available: { fr: 'Disponible pour de nouveaux projets', en: 'Available for new projects' },
  about: { fr: 'À propos', en: 'About' },
  skills: { fr: 'Compétences', en: 'Skills' },
  projects: { fr: 'Projets', en: 'Projects' },
  contact: { fr: 'Contact', en: 'Contact' },
  viewCV: { fr: 'Voir CV', en: 'View CV' },
  hireAziz: { fr: 'Recruter Aziz', en: 'Hire Aziz' },
  consultCV: { fr: 'Consulter mon CV', en: 'View my CV' },
  devBadge: { fr: 'Développeur Full-Stack Web & Mobile', en: 'Full-Stack Web & Mobile Developer' },
  heroTitle1: { fr: "Conception d'applications", en: 'Building' },
  heroTitle2: { fr: 'performantes, scalables & sur-mesure.', en: 'performant, scalable & tailor-made applications.' },
  heroIntro: {
    fr: "Bonjour, je suis Aziz. Spécialisé dans l'écosystème AdonisJS, React / Inertia.js, PostgreSQL et Docker. Je transforme des problématiques métier complexes en solutions logicielles fluides et robustes.",
    en: "Hi, I'm Aziz. Specialized in the AdonisJS, React / Inertia.js, PostgreSQL and Docker ecosystem. I turn complex business challenges into smooth and robust software solutions."
  },
  exploreProjects: { fr: 'Explorer mes projets', en: 'Explore my projects' },
  contactMe: { fr: 'Me contacter', en: 'Contact me' },
  downloadCV: { fr: 'Télécharger CV', en: 'Download CV' },
  cleanCode: { fr: 'Clean Code & Architecture', en: 'Clean Code & Architecture' },
  fullStack: { fr: 'Full-Stack', en: 'Full-Stack' },
  dbToFrontend: { fr: 'Du Schema DB au Frontend', en: 'From DB Schema to Frontend' },
  dockerized: { fr: 'Dockerized', en: 'Dockerized' },
  readyProd: { fr: 'Prêt pour la Production', en: 'Production Ready' },
  stackTitle: { fr: 'Stack Technique & Compétences', en: 'Technical Stack & Skills' },
  stackSubtitle: { fr: "Une maîtrise complète, du modèle de données jusqu'à l'interface utilisateur.", en: 'Complete mastery, from the data model to the user interface.' },
  stackDesc: { fr: 'Chaque technologie est choisie pour sa fiabilité, ses performances et sa maintenabilité en environnement de production.', en: 'Each technology is chosen for its reliability, performance and maintainability in production environments.' },
  allSkills: { fr: 'Toutes les compétences', en: 'All skills' },
  frontendMobile: { fr: 'Frontend & Mobile', en: 'Frontend & Mobile' },
  backendApis: { fr: 'Backend & APIs', en: 'Backend & APIs' },
  dbDevops: { fr: 'Bases de données & DevOps', en: 'Databases & DevOps' },
  mastery: { fr: 'Maîtrise', en: 'Mastery' },
  realizationsLabel: { fr: 'Réalisations & Démonstrations', en: 'Showcase & Demonstrations' },
  recentProjects: { fr: 'Projets récents & Études de cas', en: 'Recent Projects & Case Studies' },
  projectsDesc: { fr: "Des applications complètes conçues avec une attention particulière portée sur la qualité du code, la sécurité et l'expérience utilisateur.", en: 'Complete applications designed with particular attention to code quality, security and user experience.' },
  all: { fr: 'Tous', en: 'All' },
  desktopSoftware: { fr: 'Logiciel / Desktop', en: 'Software / Desktop' },
  detailsArch: { fr: 'Détails & Architecture Système', en: 'Details & System Architecture' },
  aboutAziz: { fr: "À Propos d'Aziz", en: 'About Aziz' },
  aboutTitle: { fr: "Rigueur d'ingénierie, passion du Clean Code et obsession du produit.", en: 'Engineering rigor, Clean Code passion and product obsession.' },
  aboutP1: { fr: "Développeur passionné par l'architecture logicielle, je ne me contente pas d'écrire des lignes de code : je conçois des systèmes viables, sécurisés et pérennes.", en: "Passionate about software architecture, I don't just write lines of code: I design viable, secure and sustainable systems." },
  aboutP2: { fr: "Mon approche privilégie le design de bases de données solides (PostgreSQL, SQLite), le développement backend structuré (AdonisJS, Node.js) et la création d'interfaces fluides et réactives (React, Inertia.js, Tailwind CSS).", en: 'My approach favors solid database design (PostgreSQL, SQLite), structured backend development (AdonisJS, Node.js) and the creation of fluid and reactive interfaces (React, Inertia.js, Tailwind CSS).' },
  aboutP3: { fr: "Grâce à l'utilisation systématique de Docker et de flux de travail modernes avec Git, je garantis des environnements de développement homogènes et des déploiements sans accrocs.", en: 'Through the systematic use of Docker and modern workflows with Git, I guarantee homogeneous development environments and smooth deployments.' },
  dbFirst: { fr: 'Database First', en: 'Database First' },
  dbFirstDesc: { fr: 'Modélisation précise des relations et indexation pour des requêtes ultra-rapides.', en: 'Precise relationship modeling and indexing for ultra-fast queries.' },
  securedByDesign: { fr: 'Secured By Design', en: 'Secured By Design' },
  securedDesc: { fr: 'Authentification robuste (JWT/Sessions), validation stricte des entrées (VineJS/Zod).', en: 'Robust authentication (JWT/Sessions), strict input validation (VineJS/Zod).' },
  contactTitle: { fr: 'Me Contacter', en: 'Contact Me' },
  collaborate: { fr: 'Démarrons une collaboration.', en: "Let's start a collaboration." },
  contactDesc: { fr: "Vous recherchez un développeur Full-Stack autonome pour renforcer votre équipe ou réaliser votre projet web/mobile ? Envoyez-moi un message direct !", en: 'Looking for an autonomous Full-Stack developer to strengthen your team or build your web/mobile project? Send me a direct message!' },
  directEmail: { fr: 'Email Direct', en: 'Direct Email' },
  githubProfile: { fr: 'Profil GitHub', en: 'GitHub Profile' },
  linkedinNetwork: { fr: 'Réseau LinkedIn', en: 'LinkedIn Network' },
  sendMessage: { fr: 'Envoyer un message', en: 'Send a message' },
  yourName: { fr: 'Votre Nom *', en: 'Your Name *' },
  emailAddress: { fr: 'Adresse Email *', en: 'Email Address *' },
  subjectProject: { fr: 'Sujet / Projet', en: 'Subject / Project' },
  message: { fr: 'Message *', en: 'Message *' },
  namePlaceholder: { fr: 'Ex: Thomas Laurent', en: 'e.g. Thomas Laurent' },
  emailPlaceholder: { fr: 'Ex: thomas@entreprise.com', en: 'e.g. thomas@company.com' },
  subjectPlaceholder: { fr: 'Ex: Recrutement CDI / Mission Full-Stack AdonisJS', en: 'e.g. Full-time / Freelance Full-Stack AdonisJS' },
  messagePlaceholder: { fr: 'Décrivez brièvement votre projet ou vos besoins...', en: 'Briefly describe your project or needs...' },
  sending: { fr: 'Envoi en cours...', en: 'Sending...' },
  sendBtn: { fr: 'Envoyer le Message', en: 'Send Message' },
  successMsg: { fr: 'Merci pour votre message ! Aziz vous répondra dans les plus brefs délais.', en: 'Thank you for your message! Aziz will get back to you shortly.' },
  errorMsg: { fr: 'Veuillez remplir tous les champs obligatoires.', en: 'Please fill in all required fields.' },
  footerCopy: { fr: 'Tous droits réservés.', en: 'All rights reserved.' },
  footerMade: { fr: 'Conçu avec React, Tailwind CSS & AdonisJS Mindset', en: 'Built with React, Tailwind CSS & AdonisJS Mindset' },
  overview: { fr: 'Présentation Générale', en: 'General Overview' },
  techArch: { fr: 'Architecture Technique', en: 'Technical Architecture' },
  keyPoints: { fr: 'Points Clés & Fonctionnalités', en: 'Key Points & Features' },
  codeSnippet: { fr: 'Extrait de Code Significatif', en: 'Significant Code Snippet' },
  close: { fr: 'Fermer', en: 'Close' },
  cvTitle: { fr: 'Curriculum Vitae — Aziz', en: 'Resume — Aziz' },
  cvRole: { fr: 'Développeur Full-Stack Web & Mobile', en: 'Full-Stack Web & Mobile Developer' },
  cvSpec: { fr: 'Spécialiste AdonisJS, React / Inertia.js, PostgreSQL & Docker', en: 'AdonisJS, React / Inertia.js, PostgreSQL & Docker Specialist' },
  mainExpertise: { fr: 'Expertise Principale', en: 'Main Expertise' },
  backendDev: { fr: 'Développement Backend & APIs :', en: 'Backend Development & APIs:' },
  backendDevDesc: { fr: "Conception d'APIs REST, architecture MVC sous AdonisJS v5/v6, ORM Lucid, authentification JWT/Session, requêtes PostGIS.", en: 'REST API design, MVC architecture with AdonisJS v5/v6, Lucid ORM, JWT/Session authentication, PostGIS queries.' },
  frontendDev: { fr: 'Développement Frontend & Mobile :', en: 'Frontend & Mobile Development:' },
  frontendDevDesc: { fr: "Création d'interfaces utilisateur réactives en React.js, intégration Inertia.js, applications mobiles React Native, styling Tailwind CSS.", en: 'Creating reactive user interfaces in React.js, Inertia.js integration, React Native mobile apps, Tailwind CSS styling.' },
  dbInfra: { fr: 'Bases de données & Infrastructure :', en: 'Databases & Infrastructure:' },
  dbInfraDesc: { fr: 'PostgreSQL, PostGIS, SQLite, conteneurisation Docker & Docker Compose, gestion de versions avec Git/GitHub.', en: 'PostgreSQL, PostGIS, SQLite, Docker & Docker Compose containerization, version control with Git/GitHub.' },
  recentProjectsCV: { fr: 'Projets Récents', en: 'Recent Projects' },
  downloadPDF: { fr: 'Télécharger en PDF', en: 'Download as PDF' },
  frontendLabel: { fr: 'Frontend / Mobile', en: 'Frontend / Mobile' },
  backendLabel: { fr: 'Backend / API', en: 'Backend / API' },
  dbInfraLabel: { fr: 'DB & Infrastructure', en: 'DB & Infrastructure' },
  database: { fr: 'Base de Données:', en: 'Database:' },
  devopsInfra: { fr: 'DevOps & Infra:', en: 'DevOps & Infra:' },
};

// ==========================================
// DATA: Tech Stack
// ==========================================
const TECH_STACK = [
  { id: 'react', name: 'React.js', category: 'frontend', icon: Code2, level: 95, description: { fr: 'Architecture SPA / SSR, React Hooks, Context API, Redux Toolkit, optimisations de rendu.', en: 'SPA / SSR Architecture, React Hooks, Context API, Redux Toolkit, render optimizations.' }, tags: ['Web', 'UI/UX', 'Hooks', 'Vite'] },
  { id: 'inertia', name: 'Inertia.js', category: 'frontend', icon: Layers, level: 90, description: { fr: 'Passerelle parfaite entre le backend AdonisJS/Laravel et les composants React sans API REST complexe.', en: 'Perfect bridge between AdonisJS/Laravel backend and React components without complex REST API.' }, tags: ['Monolith Modern', 'Routing', 'Props'] },
  { id: 'react-native', name: 'React Native', category: 'frontend', icon: Smartphone, level: 85, description: { fr: "Développement d'applications mobiles cross-platform iOS & Android avec performances natives.", en: 'Cross-platform iOS & Android mobile app development with native performance.' }, tags: ['Mobile', 'iOS', 'Android', 'Expo'] },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', icon: Sparkles, level: 95, description: { fr: "Conception d'interfaces modernes, réactives et accessibles en mode Utility-First.", en: 'Designing modern, responsive and accessible interfaces in Utility-First mode.' }, tags: ['CSS', 'Design System', 'Responsive'] },
  { id: 'typescript', name: 'TypeScript', category: 'frontend', icon: Code2, level: 88, description: { fr: 'Typage statique strict, autocomplétion robuste et prévention des erreurs au build time.', en: 'Strict static typing, robust autocompletion and build-time error prevention.' }, tags: ['Types', 'OOP', 'Code Quality'] },
  { id: 'adonisjs', name: 'AdonisJS (v5/v6)', category: 'backend', icon: Server, level: 95, description: { fr: 'Framework Node.js complet orienté entreprise. Routage, ORM Lucid, Auth, Middleware & CLI.', en: 'Complete enterprise-grade Node.js framework. Routing, Lucid ORM, Auth, Middleware & CLI.' }, tags: ['Node.js', 'Lucid ORM', 'MVC', 'Security'] },
  { id: 'nodejs', name: 'Node.js / Express', category: 'backend', icon: Cpu, level: 90, description: { fr: "Environnement d'exécution asynchrone guidé par les événements pour microservices et APIs REST.", en: 'Event-driven asynchronous runtime for microservices and REST APIs.' }, tags: ['Async', 'Event Loop', 'REST API'] },
  { id: 'rest-auth', name: 'APIs REST & Auth', category: 'backend', icon: ShieldCheck, level: 92, description: { fr: 'Authentification JWT, OAuth2, gestion des sessions, rate-limiting et validation de données avec Zod/VineJS.', en: 'JWT authentication, OAuth2, session management, rate-limiting and data validation with Zod/VineJS.' }, tags: ['Security', 'JWT', 'VineJS', 'Tokens'] },
  { id: 'postgres-postgis', name: 'PostgreSQL & PostGIS', category: 'database_devops', icon: Database, level: 90, description: { fr: 'SGDB relationnel robuste, requêtes géospatiales complexes, indexation GiST et procédures stockées.', en: 'Robust relational DBMS, complex geospatial queries, GiST indexing and stored procedures.' }, tags: ['Relational', 'Geospatial', 'SQL', 'Indexes'] },
  { id: 'sqlite', name: 'SQLite', category: 'database_devops', icon: Database, level: 88, description: { fr: 'Base de données embarquée légère idéale pour applications locales, desktop ou prototypes rapides.', en: 'Lightweight embedded database ideal for local apps, desktop or rapid prototypes.' }, tags: ['Embedded', 'Zero-Conf', 'Lightweight'] },
  { id: 'docker', name: 'Docker & Compose', category: 'database_devops', icon: Zap, level: 85, description: { fr: 'Conteneurisation des services (Web, DB, Redis), reproductibilité des environnements dev et prod.', en: 'Service containerization (Web, DB, Redis), dev and prod environment reproducibility.' }, tags: ['Containers', 'DevOps', 'Deployment'] },
  { id: 'git', name: 'Git & GitHub', category: 'database_devops', icon: Globe, level: 92, description: { fr: 'Versionnage de code, stratégies de branching Git Flow, Pull Requests et intégration continue.', en: 'Code versioning, Git Flow branching strategies, Pull Requests and continuous integration.' }, tags: ['Version Control', 'GitFlow', 'CI/CD'] },
];

// ==========================================
// DATA: Projects
// ==========================================
const PROJECTS = [
  {
    id: 'talantys', title: 'Talantys',
    subtitle: { fr: 'Plateforme de recrutement intelligent & géolocalisation de talents', en: 'Intelligent recruitment platform & talent geolocation' },
    category: 'fullstack', featured: true,
    badge: { fr: 'Projet Phare', en: 'Flagship' },
    githubUrl: 'https://github.com/votre-pseudo/talantys', liveUrl: 'https://talantys.example.com',
    summary: { fr: "Solution d'intermédiation RH avec recherche géospatiale des candidatures basée sur PostgreSQL/PostGIS et AdonisJS.", en: 'HR intermediation solution with geospatial candidate search based on PostgreSQL/PostGIS and AdonisJS.' },
    technologies: ['AdonisJS v6', 'Inertia.js', 'React', 'PostgreSQL', 'PostGIS', 'Docker Compose', 'Tailwind CSS'],
    architecture: {
      frontend: { fr: 'React avec Inertia.js pour un monolith moderne ultra-fluide sans requêtes API manuelles.', en: 'React with Inertia.js for an ultra-smooth modern monolith without manual API requests.' },
      backend: { fr: 'AdonisJS v6 avec ORM Lucid, validation VineJS et authentification RBAC (Recruteur / Candidat).', en: 'AdonisJS v6 with Lucid ORM, VineJS validation and RBAC authentication (Recruiter / Candidate).' },
      database: { fr: "PostgreSQL enrichi avec l'extension PostGIS pour calculer les distances en temps réel.", en: 'PostgreSQL enriched with PostGIS extension to calculate distances in real time.' },
      devops: { fr: "Docker Compose orchestrant l'application Web, la base de données PostgreSQL et un serveur Redis.", en: 'Docker Compose orchestrating the Web app, PostgreSQL database and Redis server.' },
    },
    highlights: {
      fr: ['Recherche géospatiale par rayon kilométrique pour connecter candidats et entreprises à proximité.', 'Tableau de bord recruteur interactif avec suivi du pipeline de candidatures.', 'Système complet de dépôts de CV avec parsing et notification en temps réel.', 'Déploiement conteneurisé avec scripts de migration et seeding automatisés.'],
      en: ['Geospatial search by kilometer radius to connect nearby candidates and companies.', 'Interactive recruiter dashboard with candidate pipeline tracking.', 'Complete CV submission system with parsing and real-time notifications.', 'Containerized deployment with automated migration and seeding scripts.'],
    },
    codeSnippet: `// PostGIS query with AdonisJS Lucid ORM
public async findNearbyTalents({ request, response }: HttpContext) {
  const { latitude, longitude, radiusInKm = 25 } = request.qs()
  const talents = await Candidate.query()
    .whereRaw(\`ST_DWithin(location, ST_MakePoint(?, ?)::geography, ?)\`,
      [longitude, latitude, radiusInKm * 1000])
    .preload('skills').orderBy('updatedAt', 'desc')
  return response.ok(talents)
}`
  },
  {
    id: 'gestion-electricite', title: 'Gestion Électricité Bâtiment',
    subtitle: { fr: 'Logiciel de gestion de devis, facturation A4 & suivi de chantier', en: 'Quote management, A4 invoicing & site tracking software' },
    category: 'desktop_app', featured: true,
    badge: { fr: 'SaaS Métier', en: 'Business SaaS' },
    githubUrl: 'https://github.com/votre-pseudo/gestion-electricite', liveUrl: '#',
    summary: { fr: "Logiciel métier spécialisé pour entrepreneurs en électricité. Génération de devis/factures A4 normalisés avec calcul automatique des marges.", en: 'Specialized business software for electrical contractors. Generation of standardized A4 quotes/invoices with automatic margin calculation.' },
    technologies: ['AdonisJS', 'Inertia.js', 'React', 'SQLite', 'Lucid ORM', 'PDF Engine', 'Tailwind CSS'],
    architecture: {
      frontend: { fr: 'Interfaces haute densité avec calcul instantané des montants HT/TVA et aperçu PDF dynamique.', en: 'High-density interfaces with instant HT/VAT amount calculation and dynamic PDF preview.' },
      backend: { fr: 'AdonisJS léger exécutant la logique métier (calcul de rentabilité, numérotation légale séquentielle).', en: 'Lightweight AdonisJS executing business logic (profitability calculation, sequential legal numbering).' },
      database: { fr: "Base SQLite zéro-configuration garantissant l'intégrité des transactions financières.", en: 'Zero-configuration SQLite database ensuring financial transaction integrity.' },
      devops: { fr: "Package embarqué prêt à l'emploi pour déploiement local ou serveur privé.", en: 'Ready-to-use embedded package for local or private server deployment.' },
    },
    highlights: {
      fr: ["Générateur de factures au format A4 normalisé avec mise en page au pixel près pour impression.", "Bibliothèque d'équipements électriques et main-d'œuvre préconfigurée.", "Calcul automatique du reste à payer, des acomptes et récapitulatif annuel de chiffre d'affaires.", 'Export PDF instantané et gestion du statut des chantiers (En cours, En attente, Payé).'],
      en: ['Standardized A4 invoice generator with pixel-perfect layout for printing.', 'Pre-configured electrical equipment and labor library.', 'Automatic balance due, deposit and annual revenue summary calculation.', 'Instant PDF export and site status management (In progress, Pending, Paid).'],
    },
    codeSnippet: `// Invoice calculation engine with VAT & Deposits
export function calculateInvoiceTotals(items = [], vatRate = 20, depositPaid = 0) {
  const subtotalHT = items.reduce((acc, item) => {
    return acc + (item.quantity * item.unitPriceHT);
  }, 0);
  const vatAmount = subtotalHT * (vatRate / 100);
  const totalTTC = subtotalHT + vatAmount;
  const balanceDue = Math.max(0, totalTTC - depositPaid);
  return { subtotalHT, vatAmount, totalTTC, balanceDue };
}`
  },
  {
    id: 'univibes', title: 'Univibes',
    subtitle: { fr: 'Application sociale & évènementielle pour communautés étudiantes', en: 'Social & event app for student communities' },
    category: 'fullstack', featured: false,
    badge: { fr: 'Mobile & Web', en: 'Mobile & Web' },
    githubUrl: 'https://github.com/votre-pseudo/univibes', liveUrl: 'https://univibes.example.com',
    summary: { fr: "Plateforme mobile & web temps réel facilitant l'organisation d'événements universitaires, le partage de cours et les discussions de groupe.", en: 'Real-time mobile & web platform facilitating university event organization, course sharing and group discussions.' },
    technologies: ['React Native', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'JWT Auth'],
    architecture: {
      frontend: { fr: "Application React Native fluide avec gestion d'état globale Redux Toolkit.", en: 'Smooth React Native application with Redux Toolkit global state management.' },
      backend: { fr: 'API REST Node.js / Express intégrant Socket.io pour la messagerie instantanée.', en: 'Node.js / Express REST API integrating Socket.io for instant messaging.' },
      database: { fr: 'MongoDB pour une modélisation flexible des posts, messages et événements étudiants.', en: 'MongoDB for flexible modeling of posts, messages and student events.' },
      devops: { fr: "Serveur Node.js hébergé avec intégration de services Push Notifications.", en: 'Hosted Node.js server with Push Notification service integration.' },
    },
    highlights: {
      fr: ['Messagerie instantanée par salons de cours et groupes de projets.', "Fil d'actualité des événements étudiants avec géolocalisation du campus et billetterie interne.", 'Espace de partage de documents et supports de cours structuré par filière.', "Système d'authentification sécurisé avec vérification des emails académiques."],
      en: ['Instant messaging by course rooms and project groups.', 'Student event news feed with campus geolocation and internal ticketing.', 'Document and course material sharing space structured by department.', 'Secure authentication system with academic email verification.'],
    },
    codeSnippet: `// Socket.io Real-time Event Handler
io.on('connection', (socket) => {
  socket.on('join_campus_room', ({ campusId, userId }) => {
    socket.join(\`campus_\${campusId}\`);
    console.log(\`User \${userId} joined campus \${campusId}\`);
  });
  socket.on('send_message', async (data) => {
    const savedMsg = await Message.create(data);
    io.to(\`campus_\${data.campusId}\`).emit('receive_message', savedMsg);
  });
});`
  }
];

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function App() {
  const [lang, setLang] = useState<'fr' | 'en'>(() => {
    try {
      const saved = localStorage.getItem('lang');
      if (saved === 'fr' || saved === 'en') return saved;
    } catch (e) {}
    return 'fr';
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
    } catch (e) {}
    return true; // Mode sombre par défaut
  });

  const [techFilter, setTechFilter] = useState('all');
  const [projectFilter, setProjectFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTerminalTab, setActiveTerminalTab] = useState('philosophy');
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '', status: 'idle', errorMessage: '' });

  const t = (key: string) => translations[key]?.[lang] ?? key;
  const toggleLang = () => setLang(prev => (prev === 'fr' ? 'en' : 'fr'));
  const toggleTheme = () => setDarkMode(prev => !prev);

  // Synchronisation du thème avec <html>, <body> et localStorage
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (darkMode) {
      root.classList.add('dark');
      body.classList.add('dark');
      try { localStorage.setItem('theme', 'dark'); } catch (e) {}
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
      try { localStorage.setItem('theme', 'light'); } catch (e) {}
    }
  }, [darkMode]);

  useEffect(() => {
    try { localStorage.setItem('lang', lang); } catch (e) {}
  }, [lang]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('aziz.developer@example.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      setContactForm(prev => ({ ...prev, status: 'error', errorMessage: t('errorMsg') }));
      return;
    }
    setContactForm(prev => ({ ...prev, status: 'sending', errorMessage: '' }));
    setTimeout(() => {
      setContactForm({ name: '', email: '', subject: '', message: '', status: 'success', errorMessage: '' });
      setTimeout(() => setContactForm(prev => ({ ...prev, status: 'idle' })), 5000);
    }, 1200);
  };

  const filteredTech = TECH_STACK.filter(tech => techFilter === 'all' || tech.category === techFilter);
  const filteredProjects = PROJECTS.filter(p => projectFilter === 'all' || p.category === projectFilter);

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? 'dark' : ''} bg-slate-50 dark:bg-[#0b0f17] text-slate-800 dark:text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200`}>

      {/* BACKGROUND NEON GLOW (uniquement en mode sombre) */}
      <div className={`fixed inset-0 pointer-events-none overflow-hidden z-0 transition-opacity duration-500 ${darkMode ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-[130px]" />
      </div>

      {/* ========== HEADER / NAVBAR ========== */}
      <header className="sticky top-0 z-40 backdrop-blur-md transition-all duration-300 bg-white/90 dark:bg-[#0b0f17]/80 border-b border-slate-200 dark:border-slate-800/80 shadow-sm dark:shadow-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

          {/* Logo & Badge Disponibilité */}
          <div className="flex items-center gap-4">
            <a href="#hero" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
                <div className="w-full h-full rounded-[11px] flex items-center justify-center bg-white dark:bg-[#0b0f17]">
                  <Terminal className="w-5 h-5 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                Aziz<span className="text-cyan-600 dark:text-cyan-400">.dev</span>
              </span>
            </a>

            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{t('available')}</span>
            </div>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a href="#about" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">{t('about')}</a>
            <a href="#skills" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">{t('skills')}</a>
            <a href="#projects" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">{t('projects')}</a>
            <a href="#contact" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">{t('contact')}</a>
          </nav>

          {/* Boutons d'action (Langue, Mode Clair/Sombre, CV, Recruter) */}
          <div className="hidden md:flex items-center gap-3">
            {/* Bascule de Langue */}
            <button
              type="button"
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700/60 shadow-sm"
              title={lang === 'fr' ? 'Switch to English' : 'Passer en Français'}
            >
              <Languages className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>{lang === 'fr' ? 'EN' : 'FR'}</span>
            </button>

            {/* Bascule Thème Sombre / Clair (Lune & Soleil uniquement) */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2.5 rounded-xl transition-all bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700/60 shadow-sm"
              title={darkMode ? (lang === 'fr' ? 'Activer le mode clair' : 'Switch to light mode') : (lang === 'fr' ? 'Activer le mode sombre' : 'Switch to dark mode')}
              aria-label="Basculer thème"
            >
              {darkMode ? (
                <Moon className="w-4 h-4 text-cyan-400" />
              ) : (
                <Sun className="w-4 h-4 text-amber-500" />
              )}
            </button>

            {/* Voir CV */}
            <button
              type="button"
              onClick={() => setIsCvModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700/60 hover:border-cyan-500/40 shadow-sm"
            >
              <FileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>{t('viewCV')}</span>
            </button>

            {/* CTA Recruter */}
            <a
              href="#contact"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white dark:text-slate-950 text-xs font-bold transition-all shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/40"
            >
              <span>{t('hireAziz')}</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Contrôles Mobiles */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={toggleLang}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-300 dark:border-slate-700"
            >
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700"
              aria-label="Basculer thème"
            >
              {darkMode ? <Moon className="w-5 h-5 text-cyan-400" /> : <Sun className="w-5 h-5 text-amber-500" />}
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Dropdown Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 py-6 space-y-4 bg-white dark:bg-[#0e1420] border-b border-slate-200 dark:border-slate-800 shadow-xl">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-medium w-fit mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{t('available')}</span>
            </div>
            {['about', 'skills', 'projects', 'contact'].map(s => (
              <a
                key={s}
                href={`#${s}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400"
              >
                {t(s)}
              </a>
            ))}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => { setMobileMenuOpen(false); setIsCvModalOpen(true); }}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-sm font-semibold"
              >
                <FileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>{t('consultCV')}</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ========== HERO SECTION ========== */}
      <section id="hero" className="relative pt-12 pb-20 md:pt-24 md:pb-32 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Colonne gauche Hero */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/90 border border-cyan-400/40 text-cyan-700 dark:text-cyan-400 text-xs font-semibold tracking-wide uppercase shadow-inner">
                <Sparkles className="w-3.5 h-3.5 animate-pulse text-cyan-500" />
                <span>{t('devBadge')}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-slate-900 dark:text-white">
                <span>{t('heroTitle1')}</span><br />
                <span className="bg-gradient-to-r from-cyan-600 via-teal-500 to-indigo-600 dark:from-cyan-400 dark:via-teal-300 dark:to-indigo-400 bg-clip-text text-transparent">
                  {t('heroTitle2')}
                </span>
              </h1>

              <p className="text-base sm:text-lg max-w-2xl leading-relaxed text-slate-600 dark:text-slate-400">
                {lang === 'fr' ? (
                  <>
                    Bonjour, je suis <span className="text-slate-900 dark:text-slate-100 font-semibold">Aziz</span>. Spécialisé dans l'écosystème <strong className="text-cyan-700 dark:text-cyan-300 font-medium">AdonisJS</strong>, <strong className="text-cyan-700 dark:text-cyan-300 font-medium">React / Inertia.js</strong>, <strong className="text-cyan-700 dark:text-cyan-300 font-medium">PostgreSQL</strong> et <strong className="text-cyan-700 dark:text-cyan-300 font-medium">Docker</strong>. Je transforme des problématiques métier complexes en solutions logicielles fluides et robustes.
                  </>
                ) : (
                  <>
                    Hi, I'm <span className="text-slate-900 dark:text-slate-100 font-semibold">Aziz</span>. Specialized in the <strong className="text-cyan-700 dark:text-cyan-300 font-medium">AdonisJS</strong>, <strong className="text-cyan-700 dark:text-cyan-300 font-medium">React / Inertia.js</strong>, <strong className="text-cyan-700 dark:text-cyan-300 font-medium">PostgreSQL</strong> and <strong className="text-cyan-700 dark:text-cyan-300 font-medium">Docker</strong> ecosystem. I turn complex business challenges into smooth and robust software solutions.
                  </>
                )}
              </p>

              {/* Boutons d'appel à l'action */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#projects"
                  className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white dark:text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5"
                >
                  <span>{t('exploreProjects')}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#contact"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700/80 hover:border-cyan-500/50 shadow-sm"
                >
                  <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span>{t('contactMe')}</span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsCvModalOpen(true)}
                  className="flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-medium transition-all bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/60 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-800 shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>{t('downloadCV')}</span>
                </button>
              </div>

              {/* Métriques */}
              <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-3 gap-4">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">100%</div>
                  <div className="text-xs font-medium mt-0.5 text-slate-500 dark:text-slate-400">{t('cleanCode')}</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-cyan-600 dark:text-cyan-400">{t('fullStack')}</div>
                  <div className="text-xs font-medium mt-0.5 text-slate-500 dark:text-slate-400">{t('dbToFrontend')}</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">{t('dockerized')}</div>
                  <div className="text-xs font-medium mt-0.5 text-slate-500 dark:text-slate-400">{t('readyProd')}</div>
                </div>
              </div>
            </div>

            {/* Colonne droite Hero : Carte Terminal */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl shadow-xl shadow-slate-200 dark:shadow-cyan-950/50 overflow-hidden bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800">
                <div className="px-4 py-3 border-b flex items-center justify-between bg-slate-100 dark:bg-slate-950/80 border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> aziz-profile.ts
                  </span>
                  <div className="w-12" />
                </div>

                <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto text-slate-700 dark:text-slate-300">
                  <div><span className="text-purple-600 dark:text-purple-400">interface</span> <span className="text-amber-600 dark:text-amber-300">SoftwareEngineer</span> {'{'}</div>
                  <div className="pl-4"><span className="text-cyan-700 dark:text-cyan-300">name</span>: <span className="text-emerald-700 dark:text-emerald-300">'Aziz'</span>;</div>
                  <div className="pl-4"><span className="text-cyan-700 dark:text-cyan-300">role</span>: <span className="text-emerald-700 dark:text-emerald-300">'Full-Stack Web & Mobile Engineer'</span>;</div>
                  <div className="pl-4"><span className="text-cyan-700 dark:text-cyan-300">primaryBackend</span>: [<span className="text-emerald-700 dark:text-emerald-300">'AdonisJS'</span>, <span className="text-emerald-700 dark:text-emerald-300">'Node.js'</span>];</div>
                  <div className="pl-4"><span className="text-cyan-700 dark:text-cyan-300">primaryFrontend</span>: [<span className="text-emerald-700 dark:text-emerald-300">'React'</span>, <span className="text-emerald-700 dark:text-emerald-300">'Inertia.js'</span>, <span className="text-emerald-700 dark:text-emerald-300">'Tailwind'</span>];</div>
                  <div className="pl-4"><span className="text-cyan-700 dark:text-cyan-300">databases</span>: [<span className="text-emerald-700 dark:text-emerald-300">'PostgreSQL / PostGIS'</span>, <span className="text-emerald-700 dark:text-emerald-300">'SQLite'</span>];</div>
                  <div className="pl-4"><span className="text-cyan-700 dark:text-cyan-300">devops</span>: [<span className="text-emerald-700 dark:text-emerald-300">'Docker'</span>, <span className="text-emerald-700 dark:text-emerald-300">'Git'</span>];</div>
                  <div className="pl-4"><span className="text-cyan-700 dark:text-cyan-300">mindset</span>: [<span className="text-emerald-700 dark:text-emerald-300">'Clean Architecture'</span>, <span className="text-emerald-700 dark:text-emerald-300">'User Experience'</span>];</div>
                  <div>{'}'}</div>

                  <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 text-slate-500">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span> 0 Error, 0 Warning. Ready for production.
                  </div>
                </div>

                <div className="p-4 border-t flex flex-wrap gap-2 bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800/60">
                  <span className="px-2.5 py-1 rounded-md bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-500/30 text-cyan-800 dark:text-cyan-300 text-xs font-mono font-medium">AdonisJS v6</span>
                  <span className="px-2.5 py-1 rounded-md bg-indigo-100 dark:bg-indigo-950/60 border border-indigo-300 dark:border-indigo-500/30 text-indigo-800 dark:text-indigo-300 text-xs font-mono font-medium">React + Inertia</span>
                  <span className="px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-950/60 border border-blue-300 dark:border-blue-500/30 text-blue-800 dark:text-blue-300 text-xs font-mono font-medium">PostgreSQL</span>
                  <span className="px-2.5 py-1 rounded-md bg-teal-100 dark:bg-teal-950/60 border border-teal-300 dark:border-teal-500/30 text-teal-800 dark:text-teal-300 text-xs font-mono font-medium">Docker</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========== COMPÉTENCES SECTION ========== */}
      <section id="skills" className="py-20 border-y transition-colors duration-300 bg-slate-100/70 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-2 flex items-center justify-center gap-2">
              <Cpu className="w-4 h-4" /> {t('stackTitle')}
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              {t('stackSubtitle')}
            </p>
            <p className="text-sm mt-3 text-slate-500 dark:text-slate-400">
              {t('stackDesc')}
            </p>
          </div>

          {/* Filtres de compétences */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {[
              { key: 'all', label: t('allSkills') },
              { key: 'frontend', label: t('frontendMobile') },
              { key: 'backend', label: t('backendApis') },
              { key: 'database_devops', label: t('dbDevops') }
            ].map(f => (
              <button
                key={f.key}
                type="button"
                onClick={() => setTechFilter(f.key)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  techFilter === f.key
                    ? 'bg-cyan-500 text-white font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-300 dark:border-slate-800 shadow-sm'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Grille de compétences */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTech.map(tech => {
              const Icon = tech.icon;
              return (
                <div
                  key={tech.id}
                  className="p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800/80 hover:border-cyan-500/40 shadow-sm dark:shadow-none hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-all bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 group-hover:bg-cyan-50 dark:group-hover:bg-cyan-950/50">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                          {tech.name}
                        </h3>
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500">
                          {tech.category === 'frontend' && t('frontendLabel')}
                          {tech.category === 'backend' && t('backendLabel')}
                          {tech.category === 'database_devops' && t('dbInfraLabel')}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs leading-relaxed mb-4 text-slate-600 dark:text-slate-400">
                      {tech.description[lang]}
                    </p>
                  </div>

                  <div>
                    <div className="mb-4">
                      <div className="flex justify-between items-center text-xs mb-1 font-mono">
                        <span className="text-slate-500 dark:text-slate-400">{t('mastery')}</span>
                        <span className="text-cyan-600 dark:text-cyan-400 font-bold">{tech.level}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"
                          style={{ width: `${tech.level}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {tech.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[10px] font-mono border bg-slate-100 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========== PROJETS SECTION ========== */}
      <section id="projects" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-2 flex items-center gap-2">
                <Briefcase className="w-4 h-4" /> {t('realizationsLabel')}
              </h2>
              <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                {t('recentProjects')}
              </p>
              <p className="text-sm mt-2 max-w-xl text-slate-500 dark:text-slate-400">
                {t('projectsDesc')}
              </p>
            </div>

            <div className="flex items-center gap-2 p-1.5 rounded-xl border self-start md:self-auto bg-slate-200/60 dark:bg-slate-900/90 border-slate-300 dark:border-slate-800">
              {[
                { key: 'all', label: t('all') },
                { key: 'fullstack', label: 'Full-Stack' },
                { key: 'desktop_app', label: t('desktopSoftware') }
              ].map(f => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setProjectFilter(f.key)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    projectFilter === f.key
                      ? 'bg-cyan-500 text-white shadow-sm font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grille de projets */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <div
                key={project.id}
                className="rounded-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:shadow-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 shadow-sm"
              >
                <div className="p-6 border-b transition-colors bg-gradient-to-br from-slate-100 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-[#0e1422] border-slate-200 dark:border-slate-800/80 relative">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-2.5 py-1 rounded-md bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-400/40 text-cyan-800 dark:text-cyan-300 text-[11px] font-bold tracking-wide uppercase">
                      {project.badge[lang]}
                    </span>
                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg transition-colors bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveUrl && project.liveUrl !== '#' && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg transition-colors bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs mt-1 leading-snug font-medium text-slate-500 dark:text-slate-400">
                    {project.subtitle[lang]}
                  </p>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    {project.summary[lang]}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    {project.highlights[lang].slice(0, 2).map((item: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap gap-1.5">
                    {project.technologies.map(tech => (
                      <span
                        key={tech}
                        className="px-2 py-1 rounded text-[10px] font-mono border bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700/40"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="w-full mt-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border bg-slate-100 hover:bg-cyan-500 hover:text-white dark:bg-slate-800/90 dark:hover:bg-cyan-500 dark:hover:text-slate-950 text-cyan-700 dark:text-cyan-400 border-slate-300 dark:border-slate-700/60 shadow-sm"
                  >
                    <Eye className="w-4 h-4" />
                    <span>{t('detailsArch')}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========== À PROPOS SECTION ========== */}
      <section id="about" className="py-20 border-t transition-colors duration-300 bg-slate-100/70 dark:bg-slate-950/80 border-slate-200 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 flex items-center gap-2">
                <User className="w-4 h-4" /> {t('aboutAziz')}
              </h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                {t('aboutTitle')}
              </h3>
              
              <div className="space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                <p>{t('aboutP1')}</p>
                <p>{t('aboutP2')}</p>
                <p>{t('aboutP3')}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400 flex items-center justify-center font-bold mb-2">
                    01
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{t('dbFirst')}</h4>
                  <p className="text-xs mt-1 text-slate-500 dark:text-slate-400">{t('dbFirstDesc')}</p>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 flex items-center justify-center font-bold mb-2">
                    02
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{t('securedByDesign')}</h4>
                  <p className="text-xs mt-1 text-slate-500 dark:text-slate-400">{t('securedDesc')}</p>
                </div>
              </div>
            </div>

            {/* Terminal à onglets */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden shadow-xl bg-white dark:bg-[#080c14] border border-slate-200 dark:border-slate-800">
                <div className="px-4 py-3 border-b flex items-center justify-between bg-slate-100 dark:bg-slate-950 border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    {['philosophy', 'workflow'].map(tab => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTerminalTab(tab)}
                        className={`px-3 py-1 rounded-md text-xs font-mono font-semibold transition-all ${
                          activeTerminalTab === tab
                            ? 'bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/30'
                            : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                        }`}
                      >
                        {tab === 'philosophy' ? '/philosophie.md' : '/workflow.sh'}
                      </button>
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">bash v5.2</span>
                </div>

                <div className="p-6 font-mono text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  {activeTerminalTab === 'philosophy' && (
                    <div className="space-y-3">
                      <p className="text-slate-400 dark:text-slate-500">
                        # {lang === 'fr' ? "Philosophie de développement d'Aziz" : "Aziz's development philosophy"}
                      </p>
                      <div>
                        <span className="text-cyan-600 dark:text-cyan-400">$ cat philosophy.txt</span>
                      </div>
                      <div className="pl-4 border-l-2 border-cyan-500 space-y-2">
                        <p>
                          1. <strong className="text-slate-900 dark:text-white">{lang === 'fr' ? 'Lisibilité du code > Astuces complexes:' : 'Code readability > Complex tricks:'}</strong>{' '}
                          {lang === 'fr' ? "Le code est lu 10x plus souvent qu'il n'est écrit." : 'Code is read 10x more often than it is written.'}
                        </p>
                        <p>
                          2. <strong className="text-slate-900 dark:text-white">{lang === 'fr' ? 'AdonisJS + Inertia = Productivité Maximale:' : 'AdonisJS + Inertia = Maximum Productivity:'}</strong>{' '}
                          {lang === 'fr' ? "Supprime la surcharge d'une API REST quand le besoin est un monolithe moderne réactif." : 'Removes the overhead of a REST API when the need is a reactive modern monolith.'}
                        </p>
                        <p>
                          3. <strong className="text-slate-900 dark:text-white">{lang === 'fr' ? 'Conteneurisation systématique:' : 'Systematic containerization:'}</strong>{' '}
                          {lang === 'fr' ? "Tout projet possède son Docker Compose pour tourner à l'identique partout." : 'Every project has its Docker Compose to run identically everywhere.'}
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTerminalTab === 'workflow' && (
                    <div className="space-y-3">
                      <p className="text-slate-400 dark:text-slate-500">
                        # {lang === 'fr' ? 'Routine de travail quotidienne' : 'Daily work routine'}
                      </p>
                      <div>
                        <span className="text-cyan-600 dark:text-cyan-400">$ ./run-daily-workflow.sh</span>
                      </div>
                      <div className="space-y-1.5 text-emerald-700 dark:text-emerald-400">
                        <p>[1/4] git checkout -b feature/new-feature</p>
                        <p>[2/4] node ace migration:run && node ace db:seed</p>
                        <p>[3/4] npm run build && docker compose up -d</p>
                        <p>[4/4] {lang === 'fr' ? "Tests d'intégration & Audit de sécurité OK." : 'Integration tests & Security audit OK.'}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========== CONTACT SECTION ========== */}
      <section id="contact" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Infos Contact */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" /> {t('contactTitle')}
                </h2>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                  {t('collaborate')}
                </h3>
                <p className="text-sm mt-3 leading-relaxed text-slate-600 dark:text-slate-400">
                  {t('contactDesc')}
                </p>
              </div>

              {/* Boîte Email Direct */}
              <div className="p-4 rounded-2xl flex items-center justify-between bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400 flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase font-semibold text-slate-400">{t('directEmail')}</div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">aziz.developer@example.com</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-xl transition-all bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                  title="Copier l'email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Réseaux sociaux */}
              <div className="space-y-3">
                <a
                  href="https://github.com/votre-pseudo"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl transition-all bg-white hover:bg-slate-50 dark:bg-slate-900/60 dark:hover:bg-slate-800/60 border border-slate-200 dark:border-slate-800 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <Github className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">{t('githubProfile')}</div>
                      <div className="text-xs text-slate-400">@votre-pseudo</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>

                <a
                  href="https://linkedin.com/in/votre-pseudo"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl transition-all bg-white hover:bg-slate-50 dark:bg-slate-900/60 dark:hover:bg-slate-800/60 border border-slate-200 dark:border-slate-800 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">{t('linkedinNetwork')}</div>
                      <div className="text-xs text-slate-400">Aziz Full-Stack Engineer</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
              </div>
            </div>

            {/* Formulaire de Contact */}
            <div className="lg:col-span-7">
              <form
                onSubmit={handleFormSubmit}
                className="p-8 rounded-2xl shadow-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-5"
              >
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{t('sendMessage')}</h4>

                {contactForm.status === 'success' && (
                  <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{t('successMsg')}</span>
                  </div>
                )}

                {contactForm.status === 'error' && (
                  <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-500/40 text-rose-800 dark:text-rose-300 text-xs">
                    {contactForm.errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">{t('yourName')}</label>
                    <input
                      type="text"
                      placeholder={t('namePlaceholder')}
                      value={contactForm.name}
                      onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-cyan-500 transition-colors bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">{t('emailAddress')}</label>
                    <input
                      type="email"
                      placeholder={t('emailPlaceholder')}
                      value={contactForm.email}
                      onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-cyan-500 transition-colors bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">{t('subjectProject')}</label>
                  <input
                    type="text"
                    placeholder={t('subjectPlaceholder')}
                    value={contactForm.subject}
                    onChange={e => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-cyan-500 transition-colors bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">{t('message')}</label>
                  <textarea
                    rows={4}
                    placeholder={t('messagePlaceholder')}
                    value={contactForm.message}
                    onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-cyan-500 transition-colors resize-none bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={contactForm.status === 'sending'}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white dark:text-slate-950 font-bold text-sm transition-all shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {contactForm.status === 'sending' ? (
                    <span>{t('sending')}</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{t('sendBtn')}</span>
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="py-8 border-t text-xs bg-slate-100 dark:bg-slate-950 border-slate-200 dark:border-slate-800/80 text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} Aziz.dev — {t('footerCopy')}
          </div>
          <span className="text-slate-500 dark:text-slate-400">
            {t('footerMade')}
          </span>
        </div>
      </footer>

      {/* ========== MODALE : DÉTAIL PROJET ========== */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 dark:bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            
            <div className="px-6 py-4 flex items-center justify-between bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950 border border-cyan-300 dark:border-cyan-400/40 text-cyan-800 dark:text-cyan-300 text-[10px] font-bold uppercase">
                  {selectedProject.badge[lang]}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{selectedProject.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="p-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-sm">
              <div>
                <h4 className="text-xs font-bold uppercase text-cyan-600 dark:text-cyan-400 tracking-wider mb-1">{t('overview')}</h4>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">{selectedProject.summary[lang]}</p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase text-cyan-600 dark:text-cyan-400 tracking-wider">{t('techArch')}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {[
                    { label: 'Frontend:', color: 'text-cyan-600 dark:text-cyan-400', key: 'frontend' },
                    { label: 'Backend:', color: 'text-indigo-600 dark:text-indigo-400', key: 'backend' },
                    { label: t('database'), color: 'text-teal-600 dark:text-teal-400', key: 'database' },
                    { label: t('devopsInfra'), color: 'text-amber-600 dark:text-amber-400', key: 'devops' }
                  ].map(a => (
                    <div key={a.key} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                      <span className={`${a.color} font-bold block mb-1`}>{a.label}</span>
                      <p className="text-slate-600 dark:text-slate-300">{selectedProject.architecture[a.key][lang]}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase text-cyan-600 dark:text-cyan-400 tracking-wider mb-2">{t('keyPoints')}</h4>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  {selectedProject.highlights[lang].map((h: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedProject.codeSnippet && (
                <div>
                  <h4 className="text-xs font-bold uppercase text-cyan-600 dark:text-cyan-400 tracking-wider mb-2">{t('codeSnippet')}</h4>
                  <pre className="p-4 rounded-xl font-mono text-xs overflow-x-auto bg-slate-100 dark:bg-[#080c14] border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-300">
                    <code>{selectedProject.codeSnippet}</code>
                  </pre>
                </div>
              )}
            </div>

            <div className="px-6 py-4 flex items-center justify-between bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
              <div>
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub Repository</span>
                  </a>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-white dark:text-slate-950 text-xs font-bold"
              >
                {t('close')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========== MODALE : CV PREVIEW ========== */}
      {isCvModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 dark:bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            
            <div className="px-6 py-4 flex items-center justify-between bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{t('cvTitle')}</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCvModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">AZIZ</h2>
                <p className="text-cyan-600 dark:text-cyan-400 font-semibold text-sm">{t('cvRole')}</p>
                <p className="text-xs mt-1 text-slate-500 dark:text-slate-400">{t('cvSpec')}</p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">{t('mainExpertise')}</h4>
                <div className="space-y-2">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">{t('backendDev')}</span>
                    <p className="text-slate-500 dark:text-slate-400">{t('backendDevDesc')}</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">{t('frontendDev')}</span>
                    <p className="text-slate-500 dark:text-slate-400">{t('frontendDevDesc')}</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">{t('dbInfra')}</span>
                    <p className="text-slate-500 dark:text-slate-400">{t('dbInfraDesc')}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">{t('recentProjectsCV')}</h4>
                <div className="space-y-2">
                  <p><strong className="text-slate-900 dark:text-white">Talantys :</strong> {lang === 'fr' ? 'Plateforme de recrutement avec géolocalisation PostGIS (AdonisJS, React, Docker).' : 'Recruitment platform with PostGIS geolocation (AdonisJS, React, Docker).'}</p>
                  <p><strong className="text-slate-900 dark:text-white">Gestion Électricité Bâtiment :</strong> {lang === 'fr' ? 'Logiciel métier de devis/facturation A4 (AdonisJS, SQLite, Inertia.js).' : 'Business quoting/invoicing A4 software (AdonisJS, SQLite, Inertia.js).'}</p>
                  <p><strong className="text-slate-900 dark:text-white">Univibes :</strong> {lang === 'fr' ? 'Application communautaire étudiante temps réel (React Native, Node.js, Socket.io).' : 'Real-time student community app (React Native, Node.js, Socket.io).'}</p>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 flex items-center justify-between bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => alert(lang === 'fr' ? "Téléchargement du CV simulé avec succès." : "CV download simulated successfully.")}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white dark:text-slate-950 text-xs font-bold flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>{t('downloadPDF')}</span>
              </button>
              <button
                type="button"
                onClick={() => setIsCvModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700"
              >
                {t('close')}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
