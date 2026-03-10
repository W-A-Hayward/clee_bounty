export const publicHighlights = [
  {
    value: '3',
    label: 'core audiences',
    detail: 'Members, companies, and admins each get a clear path.',
    tone: 'tone-blue' as const,
  },
  {
    value: '8',
    label: 'workflow stages',
    detail: 'Projects move from draft to matched, in-progress, and completed.',
    tone: 'tone-orange' as const,
  },
  {
    value: '1',
    label: 'shared platform',
    detail: 'Discovery, applications, messaging, milestones, and trust stay unified.',
    tone: 'tone-green' as const,
  },
]

export const homeEntryPoints = [
  {
    kicker: 'Main access',
    title: 'Sign in and open your dashboard',
    body: 'Enter the main workspace to browse projects, apply, and keep everything moving in one place.',
    ctaLabel: 'Member sign in',
    href: '/students/sign-in',
    tone: 'tone-green' as const,
  },
  {
    kicker: 'Companies',
    title: 'Create a company account',
    body: 'Set up your company profile, then move into the dashboard and project posting flow.',
    ctaLabel: 'Create company account',
    href: '/companies/create-account',
    tone: 'tone-blue' as const,
  },
  {
    kicker: 'Returning company',
    title: 'Log in and manage live projects',
    body: 'Go straight to the company dashboard to review applicants and post new work.',
    ctaLabel: 'Company login',
    href: '/companies/sign-in',
    tone: 'tone-orange' as const,
  },
]

export const websitePillars = [
  {
    kicker: 'Discovery',
    title: 'A public marketplace that feels curated, not chaotic.',
    body:
      'Featured projects, verified companies, clear scopes, and the right amount of detail turn browsing into a stronger first impression.',
    tone: 'tone-blue' as const,
  },
  {
    kicker: 'Collaboration',
    title: 'The platform carries the work after matching.',
    body:
      'Applications, messages, milestones, deliverables, and project status live inside one coherent system instead of disconnected tools.',
    tone: 'tone-green' as const,
  },
  {
    kicker: 'Trust',
    title: 'Moderation, role logic, and verification are visible product choices.',
    body:
      'Members use school identity, companies use work-email-based onboarding, and admins have an explicit governance surface.',
    tone: 'tone-red' as const,
  },
]

export const publicWorkflow = [
  {
    step: '01',
    title: 'Members verify with school or work identity',
    body: 'The main workspace starts from stronger identity so profiles carry more credibility.',
    tone: 'tone-blue' as const,
  },
  {
    step: '02',
    title: 'Companies publish scoped freelance projects',
    body: 'Project cards surface budget, timeline, work mode, required skills, and deadlines.',
    tone: 'tone-orange' as const,
  },
  {
    step: '03',
    title: 'Applications become shortlists and matches',
    body: 'Members apply with context and companies progress applicants without losing signal.',
    tone: 'tone-green' as const,
  },
  {
    step: '04',
    title: 'Milestones and deliverables structure the work',
    body: 'Messages, reviews, and milestone states keep project execution legible.',
    tone: 'tone-blue' as const,
  },
  {
    step: '05',
    title: 'Admins protect the marketplace',
    body: 'Verification, moderation, disputes, and audit logs stay part of the platform story.',
    tone: 'tone-red' as const,
  },
]

export const studentBenefits = [
  'Build real portfolio pieces with verified companies',
  'Track applications, unread messages, and next actions in one place',
  'Use school identity to create more trust at the first click',
  'Submit deliverables and receive ratings tied to actual work',
]

export const companyBenefits = [
  'Post short-term work with structure instead of hiring informally',
  'Review applicants against skills, availability, and portfolio',
  'Manage milestones and deliverables without duct-taping separate tools',
  'Invite teammates and control visibility through company roles later',
]

export const memberJourney = [
  {
    title: 'Set up a credible profile',
    body: 'School identity, portfolio, availability, and skills summary are visible before companies review the application.',
    tone: 'tone-blue' as const,
  },
  {
    title: 'Browse concise project briefs',
    body: 'Projects surface budget, duration, work mode, required skills, and decision timing before you apply.',
    tone: 'tone-green' as const,
  },
  {
    title: 'Apply and keep momentum in one place',
    body: 'Applications, messages, notifications, and milestones stay inside the same workspace after sign-in.',
    tone: 'tone-orange' as const,
  },
]

export const trustSignals = [
  {
    title: 'Identity is part of the product',
    body: 'Members verify with school or work identity, while companies onboard with work email and a dedicated company account.',
    tone: 'tone-blue' as const,
  },
  {
    title: 'Projects are structured before they go live',
    body: 'Every opportunity should explain scope, deliverables, timeline, and compensation before discovery starts.',
    tone: 'tone-green' as const,
  },
  {
    title: 'Moderation stays visible',
    body: 'Verification, audit logs, company review, and admin tooling are designed as product surfaces, not hidden assumptions.',
    tone: 'tone-red' as const,
  },
]

export const companyPostingChecklist = [
  'Outcome, scope, and final deliverables',
  'Budget range, timeline, and milestone structure',
  'Work mode, weekly commitment, and duration',
  'Required skills, experience level, and decision owner',
]

export const companyOperatingPrinciples = [
  {
    title: 'Create a profile people can trust',
    body: 'Company branding, industry context, and verification status should make the opportunity feel legible immediately.',
    tone: 'tone-blue' as const,
  },
  {
    title: 'Write briefs that reduce back-and-forth',
    body: 'Clarity on scope, budget, and review cadence helps better-fit applicants self-select into the pipeline.',
    tone: 'tone-orange' as const,
  },
  {
    title: 'Respond quickly once applicants arrive',
    body: 'The best marketplace experience depends on fast shortlisting, clear signals, and project-linked communication.',
    tone: 'tone-green' as const,
  },
]

export const authModes = [
  {
    role: 'Members',
    description: 'Microsoft school or work authentication',
    tone: 'tone-blue' as const,
  },
  {
    role: 'Companies',
    description: 'Work email, password, or magic-link-style onboarding',
    tone: 'tone-green' as const,
  },
  {
    role: 'Admins',
    description: 'Internally managed access with platform governance controls',
    tone: 'tone-orange' as const,
  },
]

export const platformModules = [
  'Projects',
  'Applications',
  'Matches',
  'Messages',
  'Milestones',
  'Deliverables',
  'Notifications',
  'Admin moderation',
]

export const faqItems = [
  {
    question: 'Why does the public website matter so much here?',
    answer:
      'Because the platform has to sell trust, explain the workflow, and convert multiple audiences before anyone enters a private space.',
  },
  {
    question: 'Is the main user experience already represented in the frontend?',
    answer:
      'Yes. The current website includes a dashboard, project browse page, project detail page, applications, messages, and company workspace pages.',
  },
  {
    question: 'Does this structure still match the full product plan?',
    answer:
      'Yes. The website and main workspace map directly to the marketplace, messaging, milestone, and moderation model.',
  },
  {
    question: 'What makes a project feel usable on day one?',
    answer:
      'A strong brief includes the outcome, deliverables, timing, budget, work mode, expected skills, and what happens after someone applies.',
  },
  {
    question: 'Why keep a separate company version?',
    answer:
      'Because company account creation, applicant review, and project publishing are operational tasks that need their own workspace and permissions.',
  },
]

export const homeProofPoints = [
  'Public website first, then clean login into the right dashboard',
  'Main workspace with projects, applications, messages, and milestones',
  'Separate company version with account setup, dashboard, and project posting',
  'Shared visual system so the site and dashboards still feel like one product',
]

export const companySteps = [
  {
    title: 'Create a verified company profile',
    body: 'Introduce the brand, team, industry, and why members should trust the opportunity.',
  },
  {
    title: 'Publish a scoped project brief',
    body: 'Define budget, duration, work mode, and the skills needed for success.',
  },
  {
    title: 'Review applicants in one queue',
    body: 'Shortlist strong candidates, open conversations, and move into collaboration cleanly.',
  },
]
