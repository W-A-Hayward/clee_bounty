export type { Bilingual, T18n } from '../i18n/LanguageContext'
import type { Bilingual, T18n } from '../i18n/LanguageContext'

export type ProjectMilestone = {
  title: T18n<string>
  dueLabel: T18n<string>
  amount: string
  status: 'pending' | 'in_progress' | 'submitted' | 'approved'
}

export type StudentProject = {
  slug: string
  title: T18n<string>
  company: string
  industry: T18n<string>
  category: T18n<string>
  workMode: T18n<string>
  duration: T18n<string>
  budget: string
  compensationType: T18n<string>
  experienceLevel: T18n<string>
  deadlineLabel: T18n<string>
  postedLabel: T18n<string>
  summary: T18n<string>
  description: T18n<string>
  companySummary: T18n<string>
  fitReason: T18n<string>
  skills: string[]
  applicationChecklist: T18n<string>[]
  matchScore: number
  tone: 'tone-blue' | 'tone-green' | 'tone-orange' | 'tone-red'
  deliverables: T18n<string>[]
  milestones: ProjectMilestone[]
}

export type StudentApplication = {
  id: string
  projectSlug: string
  status: 'submitted' | 'shortlisted' | 'interviewing' | 'accepted'
  appliedLabel: T18n<string>
  note: T18n<string>
}

export type StudentMessage = {
  id: string
  company: string
  projectSlug: string
  preview: T18n<string>
  lastActive: T18n<string>
  unread: number
  thread: T18n<string>[]
}

export const studentProfile = {
  name: 'Amira Khan',
  school: 'Concordia University',
  program: { en: 'BCompSc, Product + Frontend', fr: 'Bacc. en informatique, Produit + Frontend' } as T18n<string>,
  profileCompletion: 84,
  portfolioUrl: 'amira.design',
  availability: { en: '12h/week', fr: '12h/semaine' } as T18n<string>,
  rate: '$28/hr',
}

export const studentProjects: StudentProject[] = [
  {
    slug: 'design-system-sprint',
    title: {
      en: 'Design system sprint for a B2B product relaunch',
      fr: 'Sprint design system pour le relancement d’un produit B2B',
    },
    company: 'Northline Systems',
    industry: { en: 'B2B SaaS', fr: 'SaaS B2B' },
    category: { en: 'Design systems', fr: 'Design systems' },
    workMode: { en: 'Remote', fr: 'À distance' },
    duration: { en: '3 weeks', fr: '3 semaines' },
    budget: '$2.8k - $3.6k',
    compensationType: { en: 'Fixed project budget', fr: 'Budget fixe par projet' },
    experienceLevel: { en: 'Intermediate', fr: 'Intermédiaire' },
    deadlineLabel: { en: 'Apply by Mar 21', fr: 'Postule avant le 21 mars' },
    postedLabel: { en: 'Posted 2 days ago', fr: 'Publié il y a 2 jours' },
    summary: {
      en: 'Audit an existing UI, define reusable patterns, and hand off cleaner frontend direction.',
      fr: 'Audite une interface existante, définis des patterns réutilisables et livre une direction frontend plus propre.',
    },
    description: {
      en: 'Northline is refreshing a mature B2B dashboard and needs a freelancer who can tighten visual consistency, document component patterns, and partner with a product lead through handoff.',
      fr: 'Northline modernise un tableau B2B mature et cherche un freelance capable de resserrer la cohérence visuelle, documenter les patterns de composants et collaborer avec un lead produit jusqu’à la remise.',
    },
    companySummary: {
      en: 'Northline builds operations software for finance and logistics teams, with a lean product and design group shipping iterative improvements every sprint.',
      fr: 'Northline développe des logiciels d’opérations pour équipes finance et logistique, avec un petit groupe produit/design qui livre des améliorations à chaque sprint.',
    },
    fitReason: {
      en: 'This brief fits strong product-minded frontend profiles because the company needs someone who can translate audit findings into a reusable UI language.',
      fr: 'Ce mandat colle aux profils frontend orientés produit : l’entreprise cherche quelqu’un qui transforme les résultats d’audit en un langage UI réutilisable.',
    },
    skills: ['Figma', 'Design systems', 'Product UI'],
    applicationChecklist: [
      { en: 'Portfolio case study showing interface cleanup or systems thinking', fr: 'Étude de cas portfolio montrant un nettoyage d’interface ou de la pensée systémique' },
      { en: 'Short note on how you audit existing product surfaces', fr: 'Courte note sur ta façon d’auditer une surface produit existante' },
      { en: 'Availability for one working session per week with the product lead', fr: 'Disponibilité pour une session par semaine avec le lead produit' },
    ],
    matchScore: 94,
    tone: 'tone-blue',
    deliverables: [
      { en: 'Component inventory and cleanup map', fr: 'Inventaire des composants et carte de nettoyage' },
      { en: 'Token and usage guide', fr: 'Guide des tokens et de leur usage' },
      { en: 'Prioritized redesign recommendations', fr: 'Recommandations de redesign priorisées' },
    ],
    milestones: [
      { title: { en: 'UI audit', fr: 'Audit UI' }, dueLabel: { en: 'Mar 14', fr: '14 mars' }, amount: '$800', status: 'approved' },
      { title: { en: 'System proposal', fr: 'Proposition de système' }, dueLabel: { en: 'Mar 20', fr: '20 mars' }, amount: '$1,200', status: 'in_progress' },
      { title: { en: 'Final handoff', fr: 'Remise finale' }, dueLabel: { en: 'Mar 28', fr: '28 mars' }, amount: '$1,200', status: 'pending' },
    ],
  },
  {
    slug: 'growth-analytics-board',
    title: {
      en: 'Growth analytics board for a student ambassador campaign',
      fr: 'Tableau d’analytique pour une campagne d’ambassadeurs étudiants',
    },
    company: 'Harbor Foods',
    industry: { en: 'Consumer brand', fr: 'Marque grand public' },
    category: { en: 'Analytics', fr: 'Analytique' },
    workMode: { en: 'Hybrid', fr: 'Hybride' },
    duration: { en: '4 weeks', fr: '4 semaines' },
    budget: '$1.6k - $2.4k',
    compensationType: { en: 'Fixed project budget', fr: 'Budget fixe par projet' },
    experienceLevel: { en: 'Intermediate', fr: 'Intermédiaire' },
    deadlineLabel: { en: 'Apply by Mar 18', fr: 'Postule avant le 18 mars' },
    postedLabel: { en: 'Posted 4 days ago', fr: 'Publié il y a 4 jours' },
    summary: {
      en: 'Build an experiment readout that helps the team see what channels are really working.',
      fr: 'Construis un rapport d’expériences qui aide l’équipe à voir quels canaux fonctionnent vraiment.',
    },
    description: {
      en: 'Harbor Foods wants a contributor to organize campaign inputs, define reporting structure, and ship a clear analytics board that leadership can actually use.',
      fr: 'Harbor Foods cherche quelqu’un pour organiser les inputs de campagne, définir la structure de reporting et livrer un tableau d’analytique clair que la direction peut vraiment utiliser.',
    },
    companySummary: {
      en: 'Harbor Foods is running a campus growth push and needs cleaner measurement across ambassador, content, and event channels.',
      fr: 'Harbor Foods mène une poussée de croissance sur les campus et a besoin d’une mesure plus claire entre canaux ambassadeurs, contenu et événements.',
    },
    fitReason: {
      en: 'This project is strong for people who can move between raw data, reporting logic, and narrative presentation without overcomplicating the output.',
      fr: 'Ce projet convient aux personnes qui naviguent entre données brutes, logique de reporting et présentation narrative sans surcomplexifier la sortie.',
    },
    skills: ['SQL', 'Analytics', 'Presentation'],
    applicationChecklist: [
      { en: 'One example of a dashboard, readout, or reporting framework you simplified', fr: 'Un exemple de tableau, rapport ou cadre de reporting que tu as simplifié' },
      { en: 'Comfort with ambiguous source data and campaign metrics', fr: 'Aisance avec des données sources ambiguës et des métriques de campagne' },
      { en: 'Availability for two review checkpoints during the month', fr: 'Disponibilité pour deux points de revue durant le mois' },
    ],
    matchScore: 88,
    tone: 'tone-green',
    deliverables: [
      { en: 'Reporting template', fr: 'Gabarit de reporting' },
      { en: 'Experiment backlog structure', fr: 'Structure de backlog d’expériences' },
      { en: 'Readout deck with recommendations', fr: 'Présentation de résultats avec recommandations' },
    ],
    milestones: [
      { title: { en: 'Data intake', fr: 'Collecte de données' }, dueLabel: { en: 'Mar 12', fr: '12 mars' }, amount: '$500', status: 'submitted' },
      { title: { en: 'Board setup', fr: 'Mise en place du tableau' }, dueLabel: { en: 'Mar 19', fr: '19 mars' }, amount: '$700', status: 'in_progress' },
      { title: { en: 'Final story', fr: 'Récit final' }, dueLabel: { en: 'Mar 27', fr: '27 mars' }, amount: '$800', status: 'pending' },
    ],
  },
  {
    slug: 'accessibility-polish',
    title: {
      en: 'Accessibility polish for a patient education frontend',
      fr: 'Polissage accessibilité pour un frontend d’éducation patient',
    },
    company: 'Luma Health Lab',
    industry: { en: 'Health tech', fr: 'Tech santé' },
    category: { en: 'Frontend', fr: 'Frontend' },
    workMode: { en: 'Remote', fr: 'À distance' },
    duration: { en: '5 weeks', fr: '5 semaines' },
    budget: '$3.4k - $4.8k',
    compensationType: { en: 'Milestone-based budget', fr: 'Budget par étapes' },
    experienceLevel: { en: 'Advanced', fr: 'Avancé' },
    deadlineLabel: { en: 'Apply by Mar 25', fr: 'Postule avant le 25 mars' },
    postedLabel: { en: 'Posted yesterday', fr: 'Publié hier' },
    summary: {
      en: 'Refine onboarding clarity and accessibility across a high-impact public product surface.',
      fr: 'Affine la clarté et l’accessibilité de l’onboarding sur une surface produit publique à fort impact.',
    },
    description: {
      en: 'Luma needs someone who can review interaction patterns, improve accessibility gaps, and collaborate with a designer to improve a patient-facing experience before launch.',
      fr: 'Luma cherche quelqu’un pour revoir les patterns d’interaction, combler les écarts d’accessibilité et collaborer avec un designer pour améliorer l’expérience patient avant le lancement.',
    },
    companySummary: {
      en: 'Luma Health Lab ships patient education tooling for clinics and nonprofits, with strong emphasis on readability and inclusive interaction patterns.',
      fr: 'Luma Health Lab livre des outils d’éducation patient pour cliniques et OBNL, avec un accent fort sur la lisibilité et les patterns d’interaction inclusifs.',
    },
    fitReason: {
      en: 'The role rewards applicants who already think about QA, accessibility, and frontend implementation as one continuous system.',
      fr: 'Ce rôle récompense les candidats qui pensent QA, accessibilité et implémentation frontend comme un seul système continu.',
    },
    skills: ['React', 'Accessibility', 'QA'],
    applicationChecklist: [
      { en: 'Share one project where accessibility influenced implementation choices', fr: 'Partage un projet où l’accessibilité a influencé tes choix d’implémentation' },
      { en: 'Explain how you test interaction quality beyond the happy path', fr: 'Explique comment tu testes la qualité d’interaction au-delà du happy path' },
      { en: 'Confirm availability for a five-week project cadence', fr: 'Confirme ta disponibilité pour une cadence de cinq semaines' },
    ],
    matchScore: 91,
    tone: 'tone-orange',
    deliverables: [
      { en: 'Accessibility review log', fr: 'Journal de revue d’accessibilité' },
      { en: 'Refined onboarding flow recommendations', fr: 'Recommandations affinées pour le flux d’onboarding' },
      { en: 'QA checklist before release', fr: 'Liste QA avant la mise en ligne' },
    ],
    milestones: [
      { title: { en: 'Review current flow', fr: 'Revue du flux actuel' }, dueLabel: { en: 'Mar 16', fr: '16 mars' }, amount: '$900', status: 'in_progress' },
      { title: { en: 'Patch and QA', fr: 'Correctifs et QA' }, dueLabel: { en: 'Mar 24', fr: '24 mars' }, amount: '$1,400', status: 'pending' },
      { title: { en: 'Launch review', fr: 'Revue de lancement' }, dueLabel: { en: 'Apr 1', fr: '1 avril' }, amount: '$1,500', status: 'pending' },
    ],
  },
  {
    slug: 'creator-marketplace-copy',
    title: {
      en: 'Content design sprint for a creator marketplace launch',
      fr: 'Sprint design de contenu pour le lancement d’une vitrine créateurs',
    },
    company: 'East Quarter Studio',
    industry: { en: 'Creator economy', fr: 'Économie des créateurs' },
    category: { en: 'Content design', fr: 'Design de contenu' },
    workMode: { en: 'Remote', fr: 'À distance' },
    duration: { en: '2 weeks', fr: '2 semaines' },
    budget: '$1.2k - $1.9k',
    compensationType: { en: 'Fixed project budget', fr: 'Budget fixe par projet' },
    experienceLevel: { en: 'Early to intermediate', fr: 'Junior à intermédiaire' },
    deadlineLabel: { en: 'Apply by Mar 15', fr: 'Postule avant le 15 mars' },
    postedLabel: { en: 'Posted 5 days ago', fr: 'Publié il y a 5 jours' },
    summary: {
      en: 'Shape launch messaging, conversion flow copy, and onboarding narrative for a new platform.',
      fr: 'Façonne le message de lancement, les copies du flux de conversion et le récit d’onboarding d’une nouvelle plateforme.',
    },
    description: {
      en: 'East Quarter wants a freelancer who can work with product and design to sharpen value proposition, landing copy, and user guidance before launch.',
      fr: 'East Quarter cherche un freelance pour collaborer avec produit et design afin d’affiner la proposition de valeur, les copies de landing et les guides utilisateur avant le lancement.',
    },
    companySummary: {
      en: 'East Quarter Studio supports early-stage creator tools and needs a concise launch narrative before the product opens publicly.',
      fr: 'East Quarter Studio soutient des outils créateurs en démarrage et cherche un récit de lancement concis avant l’ouverture publique du produit.',
    },
    fitReason: {
      en: 'This opportunity fits people who are strong in UX writing, structured messaging, and turning vague concepts into crisp onboarding language.',
      fr: 'Cette opportunité convient aux profils forts en UX writing, messagerie structurée et transformation de concepts flous en langage d’onboarding net.',
    },
    skills: ['Copy', 'UX writing', 'Research'],
    applicationChecklist: [
      { en: 'Writing samples that show product or onboarding clarity', fr: 'Échantillons d’écriture qui montrent une clarté produit ou onboarding' },
      { en: 'Ability to work fast across product, marketing, and design feedback', fr: 'Capacité à travailler vite entre feedbacks produit, marketing et design' },
      { en: 'Interest in short launch sprints with tight review loops', fr: 'Intérêt pour les sprints de lancement courts avec boucles de revue serrées' },
    ],
    matchScore: 79,
    tone: 'tone-red',
    deliverables: [
      { en: 'Revised landing page narrative', fr: 'Récit révisé de la page d’atterrissage' },
      { en: 'Conversion-focused onboarding microcopy', fr: 'Microcopies d’onboarding axées conversion' },
      { en: 'Launch messaging guidelines', fr: 'Guide de messagerie de lancement' },
    ],
    milestones: [
      { title: { en: 'Narrative review', fr: 'Revue narrative' }, dueLabel: { en: 'Mar 10', fr: '10 mars' }, amount: '$400', status: 'approved' },
      { title: { en: 'Copy revision', fr: 'Révision des copies' }, dueLabel: { en: 'Mar 14', fr: '14 mars' }, amount: '$500', status: 'submitted' },
      { title: { en: 'Final launch pass', fr: 'Passe finale de lancement' }, dueLabel: { en: 'Mar 18', fr: '18 mars' }, amount: '$600', status: 'pending' },
    ],
  },
]

export const studentApplications: StudentApplication[] = [
  {
    id: 'app-1',
    projectSlug: 'design-system-sprint',
    status: 'shortlisted',
    appliedLabel: { en: 'Applied Mar 5', fr: 'Postulé le 5 mars' },
    note: { en: 'Shortlisted for a 20-minute product lead chat.', fr: 'Shortlistée pour un échange de 20 minutes avec le lead produit.' },
  },
  {
    id: 'app-2',
    projectSlug: 'growth-analytics-board',
    status: 'interviewing',
    appliedLabel: { en: 'Applied Mar 2', fr: 'Postulé le 2 mars' },
    note: { en: 'Asked to send a sample reporting structure by Friday.', fr: 'On t’a demandé d’envoyer un exemple de structure de reporting d’ici vendredi.' },
  },
  {
    id: 'app-3',
    projectSlug: 'accessibility-polish',
    status: 'submitted',
    appliedLabel: { en: 'Applied Mar 6', fr: 'Postulé le 6 mars' },
    note: { en: 'Waiting on first response from the hiring team.', fr: 'En attente d’une première réponse de l’équipe.' },
  },
]

export const studentMessages: StudentMessage[] = [
  {
    id: 'msg-1',
    company: 'Northline Systems',
    projectSlug: 'design-system-sprint',
    preview: { en: 'We liked your portfolio framing. Are you free Thursday afternoon?', fr: 'On a aimé la mise en cadre de ton portfolio. Es-tu libre jeudi après-midi ?' },
    lastActive: { en: '2h ago', fr: 'il y a 2h' },
    unread: 2,
    thread: [
      { en: 'Hi Amira, thanks for applying. Your UI case studies feel relevant.', fr: 'Salut Amira, merci pour ta candidature. Tes études de cas UI sont pertinentes.' },
      { en: 'Would you be open to a short conversation with our product lead this week?', fr: 'Serais-tu ouverte à un court échange avec notre lead produit cette semaine ?' },
      { en: 'We liked your portfolio framing. Are you free Thursday afternoon?', fr: 'On a aimé la mise en cadre de ton portfolio. Es-tu libre jeudi après-midi ?' },
    ],
  },
  {
    id: 'msg-2',
    company: 'Harbor Foods',
    projectSlug: 'growth-analytics-board',
    preview: { en: 'Can you share an example of a dashboard you have simplified before?', fr: 'Peux-tu partager un exemple de tableau que tu as déjà simplifié ?' },
    lastActive: { en: 'Yesterday', fr: 'Hier' },
    unread: 0,
    thread: [
      { en: 'Thanks for the thoughtful application. We want to understand your storytelling process.', fr: 'Merci pour ta candidature réfléchie. On veut comprendre ton processus narratif.' },
      { en: 'Can you share an example of a dashboard you have simplified before?', fr: 'Peux-tu partager un exemple de tableau que tu as déjà simplifié ?' },
    ],
  },
]

export const studentNotifications: Bilingual<string>[] = [
  { en: 'Northline moved your application to shortlisted.', fr: 'Northline a déplacé ta candidature en shortlist.' },
  { en: 'A new project matches your React and accessibility skills.', fr: 'Un nouveau projet correspond à tes compétences React et accessibilité.' },
  { en: 'Harbor Foods replied to your application.', fr: 'Harbor Foods a répondu à ta candidature.' },
]

export const dashboardActions = [
  {
    title: { en: 'Finish your profile signal', fr: 'Termine le signal de ton profil' },
    body: { en: 'Add your resume link and GitHub so project applications carry stronger proof.', fr: 'Ajoute ton CV et ton GitHub pour que tes candidatures portent plus de preuve.' },
    href: '/dashboard',
  },
  {
    title: { en: 'Review fresh projects', fr: 'Explore les nouveaux projets' },
    body: { en: 'Check remote, hybrid, and accessibility-heavy briefs before the earliest deadline closes.', fr: 'Regarde les mandats à distance, hybrides et axés accessibilité avant que la première échéance ferme.' },
    href: '/projects',
  },
  {
    title: { en: 'Reply to active conversations', fr: 'Réponds aux conversations actives' },
    body: { en: 'Two companies are already waiting on next-step responses in messages.', fr: 'Deux entreprises attendent déjà ta prochaine réponse dans tes messages.' },
    href: '/messages',
  },
]

export const upcomingMilestones = [
  {
    title: { en: 'System proposal deck', fr: 'Présentation de proposition de système' },
    projectSlug: 'design-system-sprint',
    dueLabel: { en: 'Due Mar 20', fr: 'Dû le 20 mars' },
    status: 'in_progress' as const,
  },
  {
    title: { en: 'Campaign board setup', fr: 'Mise en place du tableau de campagne' },
    projectSlug: 'growth-analytics-board',
    dueLabel: { en: 'Due Mar 19', fr: 'Dû le 19 mars' },
    status: 'submitted' as const,
  },
  {
    title: { en: 'Accessibility review pass', fr: 'Passe de revue d’accessibilité' },
    projectSlug: 'accessibility-polish',
    dueLabel: { en: 'Due Mar 16', fr: 'Dû le 16 mars' },
    status: 'pending' as const,
  },
]

export const marketplaceNotes: Bilingual<string>[] = [
  { en: 'Each project card should answer what the work is, how long it lasts, and what the budget looks like.', fr: 'Chaque carte de projet devrait répondre à : c’est quoi le travail, ça dure combien de temps, et c’est quoi le budget.' },
  { en: 'Use the dashboard to keep applications, notifications, and messages moving instead of splitting work across tabs.', fr: 'Utilise le tableau pour garder candidatures, notifications et messages en mouvement plutôt que d’éparpiller ton travail entre onglets.' },
  { en: 'Projects with strong fit scores usually align with your skills, availability, and existing portfolio direction.', fr: 'Les projets avec un fort score d’adéquation s’alignent en général sur tes compétences, ta disponibilité et ta direction portfolio.' },
]

export function getProjectBySlug(slug: string) {
  return studentProjects.find((project) => project.slug === slug)
}

export function getApplicationsWithProjects() {
  return studentApplications.map((application) => ({
    ...application,
    project: getProjectBySlug(application.projectSlug),
  }))
}

export function getMessagesWithProjects() {
  return studentMessages.map((message) => ({
    ...message,
    project: getProjectBySlug(message.projectSlug),
  }))
}
