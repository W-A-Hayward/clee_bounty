export type Bilingual<T> = { en: T; fr: T }

export const publicHighlights = [
  {
    value: '3',
    label: { en: 'core audiences', fr: 'audiences principales' },
    detail: {
      en: 'Members, companies, and admins each get a clear path.',
      fr: 'Étudiants, entreprises et admins ont chacun leur parcours.',
    },
    tone: 'tone-blue' as const,
  },
  {
    value: '8',
    label: { en: 'workflow stages', fr: 'étapes du flux' },
    detail: {
      en: 'Projects move from draft to matched, in-progress, and completed.',
      fr: 'Les projets passent du brouillon au matché, en cours, puis complété.',
    },
    tone: 'tone-orange' as const,
  },
  {
    value: '1',
    label: { en: 'shared platform', fr: 'plateforme partagée' },
    detail: {
      en: 'Discovery, applications, messaging, milestones, and trust stay unified.',
      fr: 'Découverte, candidatures, messages, étapes et confiance restent unifiés.',
    },
    tone: 'tone-green' as const,
  },
]

export const homeEntryPoints = [
  {
    kicker: { en: 'Main access', fr: 'Accès principal' },
    title: { en: 'Sign in and open your dashboard', fr: 'Connecte-toi et ouvre ton tableau' },
    body: {
      en: 'Enter the main workspace to browse projects, apply, and keep everything moving in one place.',
      fr: 'Entre dans l’atelier principal pour explorer, postuler, et tout garder en mouvement au même endroit.',
    },
    ctaLabel: { en: 'Member sign in', fr: 'Connexion étudiant' },
    href: '/students/sign-in',
    tone: 'tone-green' as const,
  },
  {
    kicker: { en: 'Companies', fr: 'Entreprises' },
    title: { en: 'Create a company account', fr: 'Créer un compte entreprise' },
    body: {
      en: 'Set up your company profile, then move into the dashboard and project posting flow.',
      fr: 'Configurez le profil de votre entreprise, puis accédez au tableau et à la publication de mandats.',
    },
    ctaLabel: { en: 'Create company account', fr: 'Créer un compte entreprise' },
    href: '/companies/create-account',
    tone: 'tone-blue' as const,
  },
  {
    kicker: { en: 'Returning company', fr: 'Entreprise déjà inscrite' },
    title: { en: 'Log in and manage live projects', fr: 'Connectez-vous et gérez vos projets actifs' },
    body: {
      en: 'Go straight to the company dashboard to review applicants and post new work.',
      fr: 'Accédez directement à votre espace pour examiner les candidats et publier de nouveaux mandats.',
    },
    ctaLabel: { en: 'Company login', fr: 'Connexion entreprise' },
    href: '/companies/sign-in',
    tone: 'tone-orange' as const,
  },
]

export const websitePillars = [
  {
    kicker: { en: 'Discovery', fr: 'Découverte' },
    title: {
      en: 'A public marketplace that feels curated, not chaotic.',
      fr: 'Une vitrine publique qui semble curée, pas chaotique.',
    },
    body: {
      en: 'Featured projects, verified companies, clear scopes, and the right amount of detail turn browsing into a stronger first impression.',
      fr: 'Projets en vedette, entreprises vérifiées, scopes clairs et le bon niveau de détail : explorer devient une vraie première impression.',
    },
    tone: 'tone-blue' as const,
  },
  {
    kicker: { en: 'Collaboration', fr: 'Collaboration' },
    title: {
      en: 'The platform carries the work after matching.',
      fr: 'La plateforme porte le travail après le match.',
    },
    body: {
      en: 'Applications, messages, milestones, deliverables, and project status live inside one coherent system instead of disconnected tools.',
      fr: 'Candidatures, messages, étapes, livrables et statuts vivent dans un seul système cohérent — pas dans des outils éparpillés.',
    },
    tone: 'tone-green' as const,
  },
  {
    kicker: { en: 'Trust', fr: 'Confiance' },
    title: {
      en: 'Moderation, role logic, and verification are visible product choices.',
      fr: 'Modération, rôles et vérification sont des choix produits visibles.',
    },
    body: {
      en: 'Members use school identity, companies use work-email-based onboarding, and admins have an explicit governance surface.',
      fr: 'Les étudiants utilisent leur identité scolaire, les entreprises s’inscrivent par courriel pro, et les admins ont une surface de gouvernance explicite.',
    },
    tone: 'tone-red' as const,
  },
]

export const publicWorkflow = [
  {
    step: '01',
    title: {
      en: 'Members verify with school or work identity',
      fr: 'Les étudiants se vérifient avec leur identité scolaire ou pro',
    },
    body: {
      en: 'The main workspace starts from stronger identity so profiles carry more credibility.',
      fr: 'L’atelier démarre avec une identité forte pour que les profils portent plus de crédibilité.',
    },
    tone: 'tone-blue' as const,
  },
  {
    step: '02',
    title: {
      en: 'Companies publish scoped freelance projects',
      fr: 'Les entreprises publient des projets freelance bien définis',
    },
    body: {
      en: 'Project cards surface budget, timeline, work mode, required skills, and deadlines.',
      fr: 'Chaque carte montre budget, échéance, mode de travail, compétences requises et dates limites.',
    },
    tone: 'tone-orange' as const,
  },
  {
    step: '03',
    title: {
      en: 'Applications become shortlists and matches',
      fr: 'Les candidatures deviennent des shortlists et des matchs',
    },
    body: {
      en: 'Members apply with context and companies progress applicants without losing signal.',
      fr: 'Les étudiants postulent avec contexte et les entreprises font avancer les candidats sans perdre le signal.',
    },
    tone: 'tone-green' as const,
  },
  {
    step: '04',
    title: {
      en: 'Milestones and deliverables structure the work',
      fr: 'Étapes et livrables structurent le travail',
    },
    body: {
      en: 'Messages, reviews, and milestone states keep project execution legible.',
      fr: 'Messages, revues et états d’étape gardent l’exécution lisible.',
    },
    tone: 'tone-blue' as const,
  },
  {
    step: '05',
    title: {
      en: 'Admins protect the marketplace',
      fr: 'Les admins protègent la plateforme',
    },
    body: {
      en: 'Verification, moderation, disputes, and audit logs stay part of the platform story.',
      fr: 'Vérification, modération, litiges et journaux d’audit font partie de l’histoire produit.',
    },
    tone: 'tone-red' as const,
  },
]

export const studentBenefits: Bilingual<string>[] = [
  { en: 'Build real portfolio pieces with verified companies', fr: 'Construis ton portfolio avec des entreprises vérifiées' },
  { en: 'Track applications, unread messages, and next actions in one place', fr: 'Suis tes candidatures, messages et prochaines actions au même endroit' },
  { en: 'Use school identity to create more trust at the first click', fr: 'Utilise ton identité scolaire pour créer la confiance dès le premier clic' },
  { en: 'Submit deliverables and receive ratings tied to actual work', fr: 'Remets tes livrables et reçois des notes liées à du vrai travail' },
]

export const companyBenefits: Bilingual<string>[] = [
  { en: 'Post short-term work with structure instead of hiring informally', fr: 'Publiez du travail à court terme structuré, pas du recrutement informel' },
  { en: 'Review applicants against skills, availability, and portfolio', fr: 'Évaluez les candidats sur leurs compétences, disponibilité et portfolio' },
  { en: 'Manage milestones and deliverables without duct-taping separate tools', fr: 'Gérez étapes et livrables sans bricoler plusieurs outils' },
  { en: 'Invite teammates and control visibility through company roles later', fr: 'Invitez votre équipe et contrôlez la visibilité par rôle plus tard' },
]

export const memberJourney = [
  {
    title: { en: 'Set up a credible profile', fr: 'Construis un profil crédible' },
    body: {
      en: 'School identity, portfolio, availability, and skills summary are visible before companies review the application.',
      fr: 'Identité scolaire, portfolio, disponibilité et compétences visibles avant que l’entreprise lise ta candidature.',
    },
    tone: 'tone-blue' as const,
  },
  {
    title: { en: 'Browse concise project briefs', fr: 'Explore des mandats concis' },
    body: {
      en: 'Projects surface budget, duration, work mode, required skills, and decision timing before you apply.',
      fr: 'Chaque mandat affiche budget, durée, mode de travail, compétences requises et calendrier de décision avant de postuler.',
    },
    tone: 'tone-green' as const,
  },
  {
    title: { en: 'Apply and keep momentum in one place', fr: 'Postule et garde le momentum au même endroit' },
    body: {
      en: 'Applications, messages, notifications, and milestones stay inside the same workspace after sign-in.',
      fr: 'Candidatures, messages, notifications et étapes restent dans le même atelier après connexion.',
    },
    tone: 'tone-orange' as const,
  },
]

export const trustSignals = [
  {
    title: { en: 'Identity is part of the product', fr: 'L’identité fait partie du produit' },
    body: {
      en: 'Members verify with school or work identity, while companies onboard with work email and a dedicated company account.',
      fr: 'Les étudiants se vérifient via leur identité scolaire ou pro, et les entreprises s’inscrivent par courriel pro avec un compte dédié.',
    },
    tone: 'tone-blue' as const,
  },
  {
    title: { en: 'Projects are structured before they go live', fr: 'Les projets sont structurés avant publication' },
    body: {
      en: 'Every opportunity should explain scope, deliverables, timeline, and compensation before discovery starts.',
      fr: 'Chaque opportunité explique scope, livrables, échéance et compensation avant la découverte.',
    },
    tone: 'tone-green' as const,
  },
  {
    title: { en: 'Moderation stays visible', fr: 'La modération reste visible' },
    body: {
      en: 'Verification, audit logs, company review, and admin tooling are designed as product surfaces, not hidden assumptions.',
      fr: 'Vérification, journaux, revue d’entreprise et outils admin sont conçus comme des surfaces produit, pas des suppositions cachées.',
    },
    tone: 'tone-red' as const,
  },
]

export const companyPostingChecklist: Bilingual<string>[] = [
  { en: 'Outcome, scope, and final deliverables', fr: 'Résultat, scope et livrables finaux' },
  { en: 'Budget range, timeline, and milestone structure', fr: 'Plage budgétaire, échéance et structure d’étapes' },
  { en: 'Work mode, weekly commitment, and duration', fr: 'Mode de travail, engagement hebdomadaire et durée' },
  { en: 'Required skills, experience level, and decision owner', fr: 'Compétences requises, niveau d’expérience et responsable de décision' },
]

export const companyOperatingPrinciples = [
  {
    title: { en: 'Create a profile people can trust', fr: 'Créez un profil digne de confiance' },
    body: {
      en: 'Company branding, industry context, and verification status should make the opportunity feel legible immediately.',
      fr: 'Marque, secteur et statut de vérification rendent l’opportunité immédiatement lisible.',
    },
    tone: 'tone-blue' as const,
  },
  {
    title: { en: 'Write briefs that reduce back-and-forth', fr: 'Rédigez des mandats qui réduisent les allers-retours' },
    body: {
      en: 'Clarity on scope, budget, and review cadence helps better-fit applicants self-select into the pipeline.',
      fr: 'La clarté sur scope, budget et cadence de revue aide les bons candidats à se positionner naturellement.',
    },
    tone: 'tone-orange' as const,
  },
  {
    title: { en: 'Respond quickly once applicants arrive', fr: 'Répondez rapidement quand les candidats arrivent' },
    body: {
      en: 'The best marketplace experience depends on fast shortlisting, clear signals, and project-linked communication.',
      fr: 'La meilleure expérience dépend d’une shortlist rapide, de signaux clairs, et d’une communication liée au projet.',
    },
    tone: 'tone-green' as const,
  },
]

export const authModes = [
  {
    role: { en: 'Members', fr: 'Étudiants' },
    description: { en: 'Microsoft school or work authentication', fr: 'Authentification Microsoft scolaire ou pro' },
    tone: 'tone-blue' as const,
  },
  {
    role: { en: 'Companies', fr: 'Entreprises' },
    description: { en: 'Work email, password, or magic-link-style onboarding', fr: 'Courriel pro, mot de passe ou inscription type lien magique' },
    tone: 'tone-green' as const,
  },
  {
    role: { en: 'Admins', fr: 'Admins' },
    description: { en: 'Internally managed access with platform governance controls', fr: 'Accès géré en interne avec contrôles de gouvernance' },
    tone: 'tone-orange' as const,
  },
]

export const platformModules: Bilingual<string>[] = [
  { en: 'Projects', fr: 'Projets' },
  { en: 'Applications', fr: 'Candidatures' },
  { en: 'Matches', fr: 'Matchs' },
  { en: 'Messages', fr: 'Messages' },
  { en: 'Milestones', fr: 'Étapes' },
  { en: 'Deliverables', fr: 'Livrables' },
  { en: 'Notifications', fr: 'Notifications' },
  { en: 'Admin moderation', fr: 'Modération admin' },
]

export const faqItems = [
  {
    question: { en: 'Why does the public website matter so much here?', fr: 'Pourquoi le site public compte autant ici ?' },
    answer: {
      en: 'Because the platform has to sell trust, explain the workflow, and convert multiple audiences before anyone enters a private space.',
      fr: 'Parce que la plateforme doit vendre la confiance, expliquer le flux et convertir plusieurs audiences avant qu’on entre dans un espace privé.',
    },
  },
  {
    question: { en: 'Is the main user experience already represented in the frontend?', fr: 'L’expérience principale est-elle déjà visible dans l’interface ?' },
    answer: {
      en: 'Yes. The current website includes a dashboard, project browse page, project detail page, applications, messages, and company workspace pages.',
      fr: 'Oui. Le site inclut un tableau de bord, une page projets, une page détail, candidatures, messages et l’espace entreprise.',
    },
  },
  {
    question: { en: 'Does this structure still match the full product plan?', fr: 'Cette structure colle-t-elle encore au plan produit complet ?' },
    answer: {
      en: 'Yes. The website and main workspace map directly to the marketplace, messaging, milestone, and moderation model.',
      fr: 'Oui. Le site et l’atelier principal correspondent directement au modèle vitrine, messages, étapes et modération.',
    },
  },
  {
    question: { en: 'What makes a project feel usable on day one?', fr: 'Qu’est-ce qui rend un projet utilisable dès le premier jour ?' },
    answer: {
      en: 'A strong brief includes the outcome, deliverables, timing, budget, work mode, expected skills, and what happens after someone applies.',
      fr: 'Un bon mandat inclut le résultat, les livrables, l’échéance, le budget, le mode de travail, les compétences attendues et ce qui se passe après la candidature.',
    },
  },
  {
    question: { en: 'Why keep a separate company version?', fr: 'Pourquoi garder une version entreprise séparée ?' },
    answer: {
      en: 'Because company account creation, applicant review, and project publishing are operational tasks that need their own workspace and permissions.',
      fr: 'Parce que la création de compte entreprise, la revue de candidats et la publication de projets sont des tâches opérationnelles qui méritent leur propre espace et leurs permissions.',
    },
  },
]

export const homeProofPoints: Bilingual<string>[] = [
  { en: 'Public website first, then clean login into the right dashboard', fr: 'D’abord le site public, puis une connexion propre vers le bon tableau' },
  { en: 'Main workspace with projects, applications, messages, and milestones', fr: 'Atelier principal avec projets, candidatures, messages et étapes' },
  { en: 'Separate company version with account setup, dashboard, and project posting', fr: 'Version entreprise séparée avec création de compte, tableau et publication' },
  { en: 'Shared visual system so the site and dashboards still feel like one product', fr: 'Système visuel partagé pour que site et tableaux restent un seul produit' },
]

export const companySteps = [
  {
    title: { en: 'Create a verified company profile', fr: 'Créez un profil d’entreprise vérifié' },
    body: {
      en: 'Introduce the brand, team, industry, and why members should trust the opportunity.',
      fr: 'Présentez la marque, l’équipe, le secteur, et pourquoi les étudiants devraient faire confiance à l’opportunité.',
    },
  },
  {
    title: { en: 'Publish a scoped project brief', fr: 'Publiez un mandat bien défini' },
    body: {
      en: 'Define budget, duration, work mode, and the skills needed for success.',
      fr: 'Définissez budget, durée, mode de travail et compétences requises pour réussir.',
    },
  },
  {
    title: { en: 'Review applicants in one queue', fr: 'Examinez les candidats dans une seule file' },
    body: {
      en: 'Shortlist strong candidates, open conversations, and move into collaboration cleanly.',
      fr: 'Shortlistez les meilleurs candidats, ouvrez les conversations et passez à la collaboration proprement.',
    },
  },
]
