export type ProjectMilestone = {
  title: string
  dueLabel: string
  amount: string
  status: 'pending' | 'in_progress' | 'submitted' | 'approved'
}

export type StudentProject = {
  slug: string
  title: string
  company: string
  industry: string
  category: string
  workMode: string
  duration: string
  budget: string
  compensationType: string
  experienceLevel: string
  deadlineLabel: string
  postedLabel: string
  summary: string
  description: string
  companySummary: string
  fitReason: string
  skills: string[]
  applicationChecklist: string[]
  matchScore: number
  tone: 'tone-blue' | 'tone-green' | 'tone-orange' | 'tone-red'
  deliverables: string[]
  milestones: ProjectMilestone[]
}

export type StudentApplication = {
  id: string
  projectSlug: string
  status: 'submitted' | 'shortlisted' | 'interviewing' | 'accepted'
  appliedLabel: string
  note: string
}

export type StudentMessage = {
  id: string
  company: string
  projectSlug: string
  preview: string
  lastActive: string
  unread: number
  thread: string[]
}

export const studentProfile = {
  name: 'Amira Khan',
  school: 'Concordia University',
  program: 'BCompSc, Product + Frontend',
  profileCompletion: 84,
  portfolioUrl: 'amira.design',
  availability: '12h/week',
  rate: '$28/hr',
}

export const studentProjects: StudentProject[] = [
  {
    slug: 'design-system-sprint',
    title: 'Design system sprint for a B2B product relaunch',
    company: 'Northline Systems',
    industry: 'B2B SaaS',
    category: 'Design systems',
    workMode: 'Remote',
    duration: '3 weeks',
    budget: '$2.8k - $3.6k',
    compensationType: 'Fixed project budget',
    experienceLevel: 'Intermediate',
    deadlineLabel: 'Apply by Mar 21',
    postedLabel: 'Posted 2 days ago',
    summary: 'Audit an existing UI, define reusable patterns, and hand off cleaner frontend direction.',
    description:
      'Northline is refreshing a mature B2B dashboard and needs a freelancer who can tighten visual consistency, document component patterns, and partner with a product lead through handoff.',
    companySummary:
      'Northline builds operations software for finance and logistics teams, with a lean product and design group shipping iterative improvements every sprint.',
    fitReason:
      'This brief fits strong product-minded frontend profiles because the company needs someone who can translate audit findings into a reusable UI language.',
    skills: ['Figma', 'Design systems', 'Product UI'],
    applicationChecklist: [
      'Portfolio case study showing interface cleanup or systems thinking',
      'Short note on how you audit existing product surfaces',
      'Availability for one working session per week with the product lead',
    ],
    matchScore: 94,
    tone: 'tone-blue',
    deliverables: [
      'Component inventory and cleanup map',
      'Token and usage guide',
      'Prioritized redesign recommendations',
    ],
    milestones: [
      { title: 'UI audit', dueLabel: 'Mar 14', amount: '$800', status: 'approved' },
      { title: 'System proposal', dueLabel: 'Mar 20', amount: '$1,200', status: 'in_progress' },
      { title: 'Final handoff', dueLabel: 'Mar 28', amount: '$1,200', status: 'pending' },
    ],
  },
  {
    slug: 'growth-analytics-board',
    title: 'Growth analytics board for a student ambassador campaign',
    company: 'Harbor Foods',
    industry: 'Consumer brand',
    category: 'Analytics',
    workMode: 'Hybrid',
    duration: '4 weeks',
    budget: '$1.6k - $2.4k',
    compensationType: 'Fixed project budget',
    experienceLevel: 'Intermediate',
    deadlineLabel: 'Apply by Mar 18',
    postedLabel: 'Posted 4 days ago',
    summary: 'Build an experiment readout that helps the team see what channels are really working.',
    description:
      'Harbor Foods wants a contributor to organize campaign inputs, define reporting structure, and ship a clear analytics board that leadership can actually use.',
    companySummary:
      'Harbor Foods is running a campus growth push and needs cleaner measurement across ambassador, content, and event channels.',
    fitReason:
      'This project is strong for people who can move between raw data, reporting logic, and narrative presentation without overcomplicating the output.',
    skills: ['SQL', 'Analytics', 'Presentation'],
    applicationChecklist: [
      'One example of a dashboard, readout, or reporting framework you simplified',
      'Comfort with ambiguous source data and campaign metrics',
      'Availability for two review checkpoints during the month',
    ],
    matchScore: 88,
    tone: 'tone-green',
    deliverables: [
      'Reporting template',
      'Experiment backlog structure',
      'Readout deck with recommendations',
    ],
    milestones: [
      { title: 'Data intake', dueLabel: 'Mar 12', amount: '$500', status: 'submitted' },
      { title: 'Board setup', dueLabel: 'Mar 19', amount: '$700', status: 'in_progress' },
      { title: 'Final story', dueLabel: 'Mar 27', amount: '$800', status: 'pending' },
    ],
  },
  {
    slug: 'accessibility-polish',
    title: 'Accessibility polish for a patient education frontend',
    company: 'Luma Health Lab',
    industry: 'Health tech',
    category: 'Frontend',
    workMode: 'Remote',
    duration: '5 weeks',
    budget: '$3.4k - $4.8k',
    compensationType: 'Milestone-based budget',
    experienceLevel: 'Advanced',
    deadlineLabel: 'Apply by Mar 25',
    postedLabel: 'Posted yesterday',
    summary: 'Refine onboarding clarity and accessibility across a high-impact public product surface.',
    description:
      'Luma needs someone who can review interaction patterns, improve accessibility gaps, and collaborate with a designer to improve a patient-facing experience before launch.',
    companySummary:
      'Luma Health Lab ships patient education tooling for clinics and nonprofits, with strong emphasis on readability and inclusive interaction patterns.',
    fitReason:
      'The role rewards applicants who already think about QA, accessibility, and frontend implementation as one continuous system.',
    skills: ['React', 'Accessibility', 'QA'],
    applicationChecklist: [
      'Share one project where accessibility influenced implementation choices',
      'Explain how you test interaction quality beyond the happy path',
      'Confirm availability for a five-week project cadence',
    ],
    matchScore: 91,
    tone: 'tone-orange',
    deliverables: [
      'Accessibility review log',
      'Refined onboarding flow recommendations',
      'QA checklist before release',
    ],
    milestones: [
      { title: 'Review current flow', dueLabel: 'Mar 16', amount: '$900', status: 'in_progress' },
      { title: 'Patch and QA', dueLabel: 'Mar 24', amount: '$1,400', status: 'pending' },
      { title: 'Launch review', dueLabel: 'Apr 1', amount: '$1,500', status: 'pending' },
    ],
  },
  {
    slug: 'creator-marketplace-copy',
    title: 'Content design sprint for a creator marketplace launch',
    company: 'East Quarter Studio',
    industry: 'Creator economy',
    category: 'Content design',
    workMode: 'Remote',
    duration: '2 weeks',
    budget: '$1.2k - $1.9k',
    compensationType: 'Fixed project budget',
    experienceLevel: 'Early to intermediate',
    deadlineLabel: 'Apply by Mar 15',
    postedLabel: 'Posted 5 days ago',
    summary: 'Shape launch messaging, conversion flow copy, and onboarding narrative for a new platform.',
    description:
      'East Quarter wants a freelancer who can work with product and design to sharpen value proposition, landing copy, and user guidance before launch.',
    companySummary:
      'East Quarter Studio supports early-stage creator tools and needs a concise launch narrative before the product opens publicly.',
    fitReason:
      'This opportunity fits people who are strong in UX writing, structured messaging, and turning vague concepts into crisp onboarding language.',
    skills: ['Copy', 'UX writing', 'Research'],
    applicationChecklist: [
      'Writing samples that show product or onboarding clarity',
      'Ability to work fast across product, marketing, and design feedback',
      'Interest in short launch sprints with tight review loops',
    ],
    matchScore: 79,
    tone: 'tone-red',
    deliverables: [
      'Revised landing page narrative',
      'Conversion-focused onboarding microcopy',
      'Launch messaging guidelines',
    ],
    milestones: [
      { title: 'Narrative review', dueLabel: 'Mar 10', amount: '$400', status: 'approved' },
      { title: 'Copy revision', dueLabel: 'Mar 14', amount: '$500', status: 'submitted' },
      { title: 'Final launch pass', dueLabel: 'Mar 18', amount: '$600', status: 'pending' },
    ],
  },
]

export const studentApplications: StudentApplication[] = [
  {
    id: 'app-1',
    projectSlug: 'design-system-sprint',
    status: 'shortlisted',
    appliedLabel: 'Applied Mar 5',
    note: 'Shortlisted for a 20-minute product lead chat.',
  },
  {
    id: 'app-2',
    projectSlug: 'growth-analytics-board',
    status: 'interviewing',
    appliedLabel: 'Applied Mar 2',
    note: 'Asked to send a sample reporting structure by Friday.',
  },
  {
    id: 'app-3',
    projectSlug: 'accessibility-polish',
    status: 'submitted',
    appliedLabel: 'Applied Mar 6',
    note: 'Waiting on first response from the hiring team.',
  },
]

export const studentMessages: StudentMessage[] = [
  {
    id: 'msg-1',
    company: 'Northline Systems',
    projectSlug: 'design-system-sprint',
    preview: 'We liked your portfolio framing. Are you free Thursday afternoon?',
    lastActive: '2h ago',
    unread: 2,
    thread: [
      'Hi Amira, thanks for applying. Your UI case studies feel relevant.',
      'Would you be open to a short conversation with our product lead this week?',
      'We liked your portfolio framing. Are you free Thursday afternoon?',
    ],
  },
  {
    id: 'msg-2',
    company: 'Harbor Foods',
    projectSlug: 'growth-analytics-board',
    preview: 'Can you share an example of a dashboard you have simplified before?',
    lastActive: 'Yesterday',
    unread: 0,
    thread: [
      'Thanks for the thoughtful application. We want to understand your storytelling process.',
      'Can you share an example of a dashboard you have simplified before?',
    ],
  },
]

export const studentNotifications = [
  'Northline moved your application to shortlisted.',
  'A new project matches your React and accessibility skills.',
  'Harbor Foods replied to your application.',
]

export const dashboardActions = [
  {
    title: 'Finish your profile signal',
    body: 'Add your resume link and GitHub so project applications carry stronger proof.',
    href: '/dashboard',
  },
  {
    title: 'Review fresh projects',
    body: 'Check remote, hybrid, and accessibility-heavy briefs before the earliest deadline closes.',
    href: '/projects',
  },
  {
    title: 'Reply to active conversations',
    body: 'Two companies are already waiting on next-step responses in messages.',
    href: '/messages',
  },
]

export const upcomingMilestones = [
  {
    title: 'System proposal deck',
    projectSlug: 'design-system-sprint',
    dueLabel: 'Due Mar 20',
    status: 'in_progress' as const,
  },
  {
    title: 'Campaign board setup',
    projectSlug: 'growth-analytics-board',
    dueLabel: 'Due Mar 19',
    status: 'submitted' as const,
  },
  {
    title: 'Accessibility review pass',
    projectSlug: 'accessibility-polish',
    dueLabel: 'Due Mar 16',
    status: 'pending' as const,
  },
]

export const marketplaceNotes = [
  'Each project card should answer what the work is, how long it lasts, and what the budget looks like.',
  'Use the dashboard to keep applications, notifications, and messages moving instead of splitting work across tabs.',
  'Projects with strong fit scores usually align with your skills, availability, and existing portfolio direction.',
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
