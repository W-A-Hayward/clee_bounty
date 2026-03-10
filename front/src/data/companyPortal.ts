export type CompanyProject = {
  id: string
  title: string
  status: 'draft' | 'open' | 'in_review' | 'matched' | 'in_progress'
  applicants: number
  shortlisted: number
  budget: string
  workMode: string
  projectType: string
  experienceLevel: string
  deadlineLabel: string
  owner: string
  summary: string
  requiredSkills: string[]
  nextStep: string
  tone: 'tone-blue' | 'tone-green' | 'tone-orange' | 'tone-red'
}

export const companyProfile = {
  companyName: 'Northline Systems',
  website: 'northline.io',
  industry: 'B2B SaaS',
  location: 'Montreal / Remote team',
  teamSize: '42 people',
  verificationStatus: 'Verified company',
  responseTime: 'Average first reply within 36 hours',
  description:
    'Northline hires students for short, scoped product and operations projects that can plug into an existing roadmap without creating internship overhead.',
}

export const companyProjects: CompanyProject[] = [
  {
    id: 'co-1',
    title: 'Frontend redesign sprint for a fintech dashboard',
    status: 'open',
    applicants: 32,
    shortlisted: 8,
    budget: '$3.2k - $4.8k',
    workMode: 'Remote',
    projectType: 'Freelance sprint',
    experienceLevel: 'Intermediate',
    deadlineLabel: 'Deadline Mar 21',
    owner: 'Leah Martin',
    summary: 'Refresh density, patterns, and component consistency before a spring release.',
    requiredSkills: ['React', 'Product UI', 'Accessibility'],
    nextStep: 'First-pass applicant review due tomorrow',
    tone: 'tone-blue',
  },
  {
    id: 'co-2',
    title: 'Growth analytics board for student ambassador campaigns',
    status: 'in_review',
    applicants: 24,
    shortlisted: 5,
    budget: '$1.6k - $2.4k',
    workMode: 'Hybrid',
    projectType: 'Analytics engagement',
    experienceLevel: 'Intermediate',
    deadlineLabel: 'Deadline Mar 18',
    owner: 'Miles Chen',
    summary: 'Turn campaign data into a clean, repeatable readout for the growth team.',
    requiredSkills: ['SQL', 'Analytics', 'Presentation'],
    nextStep: 'Waiting on final shortlist decision',
    tone: 'tone-green',
  },
  {
    id: 'co-3',
    title: 'Accessibility polish for a healthcare onboarding flow',
    status: 'matched',
    applicants: 19,
    shortlisted: 3,
    budget: '$3.4k - $4.8k',
    workMode: 'Remote',
    projectType: 'Frontend audit + patch sprint',
    experienceLevel: 'Advanced',
    deadlineLabel: 'Matched Mar 7',
    owner: 'Noor Haddad',
    summary: 'Close accessibility gaps before a broader onboarding rollout begins.',
    requiredSkills: ['Accessibility', 'QA', 'React'],
    nextStep: 'Kickoff notes and milestone draft need approval',
    tone: 'tone-orange',
  },
]

export const companyNotifications = [
  '8 new applicants landed on the fintech redesign sprint.',
  'One shortlisted candidate accepted an intro call.',
  'Company verification completed and public badge is now visible.',
]

export const applicantSnapshots = [
  {
    name: 'Amira Khan',
    fit: '94% fit',
    note: 'Strong frontend portfolio and school-verified identity.',
  },
  {
    name: 'Miles Chen',
    fit: '89% fit',
    note: 'Great analytics storytelling and strong availability.',
  },
  {
    name: 'Noor Haddad',
    fit: '86% fit',
    note: 'Accessibility-focused project samples and QA depth.',
  },
]

export const companyPipelineStages = [
  {
    label: 'New applicants',
    value: '18',
    note: 'Need first review before the next deadline closes.',
    tone: 'tone-blue' as const,
  },
  {
    label: 'Shortlist calls',
    value: '6',
    note: 'Candidates ready for intro chat or async follow-up.',
    tone: 'tone-green' as const,
  },
  {
    label: 'Milestones active',
    value: '4',
    note: 'Matched work already moving across deliverables.',
    tone: 'tone-orange' as const,
  },
]

export const companyTeam = [
  {
    name: 'Leah Martin',
    role: 'Company admin',
    note: 'Owns profile, publishing standards, and final hiring decisions.',
  },
  {
    name: 'Miles Chen',
    role: 'Growth lead',
    note: 'Reviews analytics and campaign-focused applicants.',
  },
  {
    name: 'Noor Haddad',
    role: 'Product designer',
    note: 'Helps scope design systems and accessibility briefs.',
  },
]

export const companyPublishingChecklist = [
  'Define the real outcome, not just a vague task list',
  'Include budget, work mode, duration, and decision timing',
  'State which skills are required versus nice to have',
  'Explain review cadence and how milestones will be approved',
]
