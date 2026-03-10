import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { createSessionToken, hashPassword, verifyPassword } from './auth.ts'

type Tone = 'tone-blue' | 'tone-green' | 'tone-orange' | 'tone-red'

type ProjectMilestone = {
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
  tone: Tone
  deliverables: string[]
  milestones: ProjectMilestone[]
}

export type CompanyProject = {
  id: string
  publicSlug?: string
  companyName: string
  companyUserId: string
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
  tone: Tone
  createdAt: string
}

export type StudentApplication = {
  id: string
  projectSlug: string
  projectTitle: string
  companyName: string
  studentUserId: string
  status: 'submitted' | 'shortlisted' | 'interviewing' | 'accepted'
  appliedLabel: string
  note: string
  createdAt: string
}

export type StudentMessage = {
  id: string
  company: string
  projectSlug: string
  studentUserId: string
  preview: string
  lastActive: string
  unread: number
  thread: string[]
  updatedAt: string
}

type StudentRecord = {
  id: string
  role: 'member'
  name: string
  email: string
  passwordHash: string
  school: string
  program: string
  portfolioUrl: string
  availability: string
  rate: string
  createdAt: string
}

type CompanyRecord = {
  id: string
  role: 'company'
  name: string
  email: string
  passwordHash: string
  companyName: string
  website: string
  industry: string
  location: string
  teamSize: string
  description: string
  createdAt: string
}

type SessionRecord = {
  token: string
  userId: string
  role: 'member' | 'company'
  createdAt: string
}

type PersistedState = {
  students: StudentRecord[]
  companies: CompanyRecord[]
  publicProjects: StudentProject[]
  companyProjects: CompanyProject[]
  applications: StudentApplication[]
  messages: StudentMessage[]
  sessions: SessionRecord[]
}

export type MemberSession = Omit<StudentRecord, 'createdAt' | 'id' | 'passwordHash'>
export type CompanySession = Omit<CompanyRecord, 'createdAt' | 'id' | 'passwordHash'>
export type SessionUser = MemberSession | CompanySession

export type MemberAuthPayload = {
  name: string
  email: string
  password: string
  school?: string
  program?: string
  portfolioUrl?: string
  availability?: string
  rate?: string
}

export type CompanyAuthPayload = {
  name: string
  email: string
  password: string
  companyName: string
  website?: string
  industry?: string
  location?: string
  teamSize?: string
  description?: string
}

export type CompanyProjectDraft = {
  title: string
  projectType: string
  budget: string
  workMode: string
  duration: string
  experienceLevel: string
  deadlineLabel: string
  skills: string[]
  deliverables: string[]
  reviewCadence: string
  summary: string
}

export class FileStore {
  private data: PersistedState
  private filePath: string

  constructor(filePath: string) {
    this.filePath = filePath
    this.data = this.load()
  }

  getSession(token: string) {
    const session = this.data.sessions.find((entry) => entry.token === token)

    if (!session) {
      return null
    }

    if (session.role === 'member') {
      const student = this.data.students.find((entry) => entry.id === session.userId)

      if (!student) {
        this.destroySession(token)
        return null
      }

      return {
        token,
        user: sanitizeStudent(student),
      } as const
    }

    const company = this.data.companies.find((entry) => entry.id === session.userId)

    if (!company) {
      this.destroySession(token)
      return null
    }

    return {
      token,
      user: sanitizeCompany(company),
    } as const
  }

  authenticateStudent(payload: MemberAuthPayload) {
    const email = normalizeEmail(payload.email)
    const student = this.data.students.find((entry) => entry.email === email)

    if (!student || !verifyPassword(payload.password, student.passwordHash)) {
      throw new Error('Invalid email or password.')
    }

    return this.createSessionForStudent(student)
  }

  registerStudent(payload: MemberAuthPayload) {
    const email = normalizeEmail(payload.email)

    if (this.emailExists(email)) {
      throw new Error('An account already exists for that email.')
    }

    const now = new Date().toISOString()
    const student: StudentRecord = {
      id: createId('stu'),
      role: 'member',
      name: requireText(payload.name, 'Name'),
      email,
      passwordHash: hashPassword(payload.password),
      school: requireText(payload.school ?? 'Concordia University', 'School'),
      program: requireText(payload.program ?? 'BCompSc, Product + Frontend', 'Program'),
      portfolioUrl: requireText(payload.portfolioUrl ?? 'portfolio.example', 'Portfolio URL'),
      availability: requireText(payload.availability ?? '10h/week', 'Availability'),
      rate: requireText(payload.rate ?? '$25/hr', 'Rate'),
      createdAt: now,
    }

    this.data.students.unshift(student)
    this.persist()
    return this.createSessionForStudent(student)
  }

  authenticateCompany(payload: CompanyAuthPayload) {
    const email = normalizeEmail(payload.email)
    const company = this.data.companies.find((entry) => entry.email === email)

    if (!company || !verifyPassword(payload.password, company.passwordHash)) {
      throw new Error('Invalid email or password.')
    }

    return this.createSessionForCompany(company)
  }

  registerCompany(payload: CompanyAuthPayload) {
    const email = normalizeEmail(payload.email)

    if (this.emailExists(email)) {
      throw new Error('An account already exists for that email.')
    }

    const now = new Date().toISOString()
    const company: CompanyRecord = {
      id: createId('cmp'),
      role: 'company',
      name: requireText(payload.name, 'Contact name'),
      email,
      passwordHash: hashPassword(payload.password),
      companyName: requireText(payload.companyName, 'Company name'),
      website: requireText(payload.website ?? 'company.example', 'Website'),
      industry: requireText(payload.industry ?? 'Technology', 'Industry'),
      location: requireText(payload.location ?? 'Remote', 'Location'),
      teamSize: requireText(payload.teamSize ?? '1-10 people', 'Team size'),
      description: requireText(
        payload.description ?? 'A company profile with clear project scope and student-friendly freelance work.',
        'Company description',
      ),
      createdAt: now,
    }

    this.data.companies.unshift(company)
    this.persist()
    return this.createSessionForCompany(company)
  }

  destroySession(token: string) {
    this.data.sessions = this.data.sessions.filter((session) => session.token !== token)
    this.persist()
  }

  listPublicProjects() {
    return [...this.data.publicProjects].sort(compareByPostedDate)
  }

  listCompanyProjects(companyUserId: string) {
    return this.data.companyProjects
      .filter((project) => project.companyUserId === companyUserId)
      .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
  }

  listCompanyProjectsByEmail(email: string) {
    return this.listCompanyProjects(this.requireCompanyRecord(email).id)
  }

  listApplicationsForStudent(studentUserId: string) {
    return this.data.applications
      .filter((application) => application.studentUserId === studentUserId)
      .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
      .map(stripCreatedAt)
  }

  listApplicationsForStudentEmail(email: string) {
    return this.listApplicationsForStudent(this.requireStudentRecord(email).id)
  }

  listMessagesForStudent(studentUserId: string) {
    return this.data.messages
      .filter((message) => message.studentUserId === studentUserId)
      .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))
      .map(stripUpdatedAt)
  }

  listMessagesForStudentEmail(email: string) {
    return this.listMessagesForStudent(this.requireStudentRecord(email).id)
  }

  createProject(company: CompanySession, draft: CompanyProjectDraft) {
    const now = new Date().toISOString()
    const slug = createUniqueSlug(
      requireText(draft.title, 'Project title'),
      this.data.publicProjects.map((project) => project.slug),
    )
    const tone = pickTone(this.data.publicProjects.length)
    const skills = dedupeList(draft.skills)
    const deliverables = dedupeList(draft.deliverables)

    const publicProject: StudentProject = {
      slug,
      title: requireText(draft.title, 'Project title'),
      company: company.companyName,
      industry: company.industry,
      category: requireText(draft.projectType, 'Project type'),
      workMode: requireText(draft.workMode, 'Work mode'),
      duration: requireText(draft.duration, 'Duration'),
      budget: requireText(draft.budget, 'Budget'),
      compensationType: 'Fixed project budget',
      experienceLevel: requireText(draft.experienceLevel, 'Experience level'),
      deadlineLabel: requireText(draft.deadlineLabel, 'Deadline'),
      postedLabel: formatDateLabel('Posted'),
      summary: requireText(draft.summary, 'Summary'),
      description: `${requireText(draft.summary, 'Summary')} Review cadence: ${requireText(draft.reviewCadence, 'Review cadence')}.`,
      companySummary: company.description,
      fitReason:
        skills.length > 0
          ? `This brief is strongest for students with practical experience in ${skills.slice(0, 2).join(' and ')}.`
          : 'This brief fits students who can move through a short, scoped freelance sprint with clear communication.',
      skills: skills.length > 0 ? skills : ['Communication', 'Execution'],
      applicationChecklist: [
        `Share one example related to ${skills[0] ?? 'the project scope'}.`,
        `Confirm availability for ${requireText(draft.duration, 'Duration')}.`,
        `Explain how you would approach ${deliverables[0] ?? 'the first deliverable'}.`,
      ],
      matchScore: 88,
      tone,
      deliverables: deliverables.length > 0 ? deliverables : ['Define scope', 'Ship core deliverable', 'Deliver handoff notes'],
      milestones: buildMilestones(deliverables),
    }

    const companyProject: CompanyProject = {
      id: createId('prj'),
      publicSlug: slug,
      companyName: company.companyName,
      companyUserId: this.requireCompanyRecord(company.email).id,
      title: publicProject.title,
      status: 'open',
      applicants: 0,
      shortlisted: 0,
      budget: publicProject.budget,
      workMode: publicProject.workMode,
      projectType: publicProject.category,
      experienceLevel: publicProject.experienceLevel,
      deadlineLabel: publicProject.deadlineLabel.replace('Apply by', 'Deadline'),
      owner: company.name,
      summary: publicProject.summary,
      requiredSkills: publicProject.skills,
      nextStep: 'Project is live and ready for the first applicants.',
      tone,
      createdAt: now,
    }

    this.data.publicProjects.unshift(publicProject)
    this.data.companyProjects.unshift(companyProject)
    this.persist()
    return publicProject
  }

  createApplication(
    student: MemberSession,
    payload: {
      projectSlug: string
      companyName: string
      note: string
      projectTitle: string
    },
  ) {
    const studentRecord = this.requireStudentRecord(student.email)
    const projectSlug = requireText(payload.projectSlug, 'Project slug')
    const projectTitle = requireText(payload.projectTitle, 'Project title')
    const companyName = requireText(payload.companyName, 'Company name')

    const hasExisting = this.data.applications.some(
      (application) => application.studentUserId === studentRecord.id && application.projectSlug === projectSlug,
    )

    if (hasExisting) {
      throw new Error('You already applied to this project.')
    }

    const note = requireText(payload.note, 'Application note')
    const createdAt = new Date().toISOString()

    this.data.applications.unshift({
      id: createId('app'),
      projectSlug,
      projectTitle,
      companyName,
      studentUserId: studentRecord.id,
      status: 'submitted',
      appliedLabel: formatDateLabel('Applied'),
      note,
      createdAt,
    })

    this.data.messages.unshift({
      id: createId('msg'),
      company: companyName,
      projectSlug,
      studentUserId: studentRecord.id,
      preview: `Thanks for applying to ${projectTitle}. We will review your note shortly.`,
      lastActive: 'Just now',
      unread: 1,
      thread: [
        `Hi ${student.name}, thanks for applying to ${projectTitle}.`,
        `Your note: ${note}`,
        'We will review your profile and follow up with next steps soon.',
      ],
      updatedAt: createdAt,
    })

    const companyProject = this.data.companyProjects.find(
      (project) => project.publicSlug === projectSlug || project.title === projectTitle,
    )

    if (companyProject) {
      companyProject.applicants += 1
      companyProject.nextStep = 'A fresh application arrived and is ready for first review.'
    }

    this.persist()

    return {
      message: `Application submitted to ${companyName}.`,
    }
  }

  private createSessionForStudent(student: StudentRecord) {
    return this.createSession(student.id, sanitizeStudent(student))
  }

  private createSessionForCompany(company: CompanyRecord) {
    return this.createSession(company.id, sanitizeCompany(company))
  }

  private createSession(userId: string, user: SessionUser) {
    const token = createSessionToken()

    this.data.sessions.unshift({
      token,
      userId,
      role: user.role,
      createdAt: new Date().toISOString(),
    })
    this.persist()

    return {
      token,
      user,
    } as const
  }

  private requireStudentRecord(email: string) {
    const student = this.data.students.find((entry) => entry.email === normalizeEmail(email))

    if (!student) {
      throw new Error('Student account not found.')
    }

    return student
  }

  private requireCompanyRecord(email: string) {
    const company = this.data.companies.find((entry) => entry.email === normalizeEmail(email))

    if (!company) {
      throw new Error('Company account not found.')
    }

    return company
  }

  private emailExists(email: string) {
    return (
      this.data.students.some((entry) => entry.email === email) ||
      this.data.companies.some((entry) => entry.email === email)
    )
  }

  private load() {
    if (!existsSync(this.filePath)) {
      mkdirSync(dirname(this.filePath), { recursive: true })
      const seed = createSeedData()
      writeFileSync(this.filePath, JSON.stringify(seed, null, 2))
      return seed
    }

    const raw = readFileSync(this.filePath, 'utf-8')
    return JSON.parse(raw) as PersistedState
  }

  private persist() {
    writeFileSync(this.filePath, JSON.stringify(this.data, null, 2))
  }
}

function createSeedData(): PersistedState {
  const createdAt = new Date('2026-03-09T12:00:00.000Z').toISOString()
  const studentId = 'stu_amira'
  const companyId = 'cmp_northline'

  return {
    students: [
      {
        id: studentId,
        role: 'member',
        name: 'Amira Khan',
        email: 'amira@concordia.ca',
        passwordHash: hashPassword('clee12345'),
        school: 'Concordia University',
        program: 'BCompSc, Product + Frontend',
        portfolioUrl: 'amira.design',
        availability: '12h/week',
        rate: '$28/hr',
        createdAt,
      },
    ],
    companies: [
      {
        id: companyId,
        role: 'company',
        name: 'Leah Martin',
        email: 'team@northline.io',
        passwordHash: hashPassword('clee12345'),
        companyName: 'Northline Systems',
        website: 'northline.io',
        industry: 'B2B SaaS',
        location: 'Montreal / Remote team',
        teamSize: '42 people',
        description:
          'Northline hires students for short, scoped product and operations projects that can plug into an existing roadmap without creating internship overhead.',
        createdAt,
      },
    ],
    publicProjects: [],
    companyProjects: [
      {
        id: 'co-1',
        publicSlug: 'design-system-sprint',
        companyName: 'Northline Systems',
        companyUserId: companyId,
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
        createdAt,
      },
      {
        id: 'co-2',
        publicSlug: 'growth-analytics-board',
        companyName: 'Northline Systems',
        companyUserId: companyId,
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
        createdAt,
      },
      {
        id: 'co-3',
        publicSlug: 'accessibility-polish',
        companyName: 'Northline Systems',
        companyUserId: companyId,
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
        createdAt,
      },
    ],
    applications: [
      {
        id: 'app-1',
        projectSlug: 'design-system-sprint',
        projectTitle: 'Design system sprint for a B2B product relaunch',
        companyName: 'Northline Systems',
        studentUserId: studentId,
        status: 'shortlisted',
        appliedLabel: 'Applied Mar 5',
        note: 'Shortlisted for a 20-minute product lead chat.',
        createdAt,
      },
      {
        id: 'app-2',
        projectSlug: 'growth-analytics-board',
        projectTitle: 'Growth analytics board for a student ambassador campaign',
        companyName: 'Harbor Foods',
        studentUserId: studentId,
        status: 'interviewing',
        appliedLabel: 'Applied Mar 2',
        note: 'Asked to send a sample reporting structure by Friday.',
        createdAt,
      },
      {
        id: 'app-3',
        projectSlug: 'accessibility-polish',
        projectTitle: 'Accessibility polish for a healthcare onboarding flow',
        companyName: 'Northline Systems',
        studentUserId: studentId,
        status: 'submitted',
        appliedLabel: 'Applied Mar 6',
        note: 'Waiting on first response from the hiring team.',
        createdAt,
      },
    ],
    messages: [
      {
        id: 'msg-1',
        company: 'Northline Systems',
        projectSlug: 'design-system-sprint',
        studentUserId: studentId,
        preview: 'We liked your portfolio framing. Are you free Thursday afternoon?',
        lastActive: '2h ago',
        unread: 2,
        thread: [
          'Hi Amira, thanks for applying. Your UI case studies feel relevant.',
          'Would you be open to a short conversation with our product lead this week?',
          'We liked your portfolio framing. Are you free Thursday afternoon?',
        ],
        updatedAt: createdAt,
      },
      {
        id: 'msg-2',
        company: 'Harbor Foods',
        projectSlug: 'growth-analytics-board',
        studentUserId: studentId,
        preview: 'Can you share an example of a dashboard you have simplified before?',
        lastActive: 'Yesterday',
        unread: 0,
        thread: [
          'Thanks for the thoughtful application. We want to understand your storytelling process.',
          'Can you share an example of a dashboard you have simplified before?',
        ],
        updatedAt: createdAt,
      },
    ],
    sessions: [],
  }
}

function sanitizeStudent(student: StudentRecord): MemberSession {
  return {
    role: 'member',
    name: student.name,
    email: student.email,
    school: student.school,
    program: student.program,
    portfolioUrl: student.portfolioUrl,
    availability: student.availability,
    rate: student.rate,
  }
}

function sanitizeCompany(company: CompanyRecord): CompanySession {
  return {
    role: 'company',
    name: company.name,
    email: company.email,
    companyName: company.companyName,
    website: company.website,
    industry: company.industry,
    location: company.location,
    teamSize: company.teamSize,
    description: company.description,
  }
}

function stripCreatedAt(application: StudentApplication) {
  const { createdAt: _createdAt, ...rest } = application
  return rest
}

function stripUpdatedAt(message: StudentMessage) {
  const { updatedAt: _updatedAt, ...rest } = message
  return rest
}

function compareByPostedDate(left: StudentProject, right: StudentProject) {
  return right.postedLabel.localeCompare(left.postedLabel)
}

function requireText(value: string, label: string) {
  const trimmed = value.trim()

  if (trimmed.length === 0) {
    throw new Error(`${label} is required.`)
  }

  return trimmed
}

function normalizeEmail(value: string) {
  return requireText(value, 'Email').toLowerCase()
}

function createId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`
}

function pickTone(index: number): Tone {
  const tones: Tone[] = ['tone-blue', 'tone-green', 'tone-orange', 'tone-red']
  return tones[index % tones.length] ?? 'tone-blue'
}

function dedupeList(values: string[]) {
  return [...new Set(values.map((item) => item.trim()).filter(Boolean))]
}

function createUniqueSlug(title: string, existingSlugs: string[]) {
  const baseSlug =
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'project'

  let candidate = baseSlug
  let index = 2

  while (existingSlugs.includes(candidate)) {
    candidate = `${baseSlug}-${index}`
    index += 1
  }

  return candidate
}

function buildMilestones(deliverables: string[]) {
  const steps = deliverables.length > 0 ? deliverables.slice(0, 3) : ['Scope alignment', 'Core delivery', 'Handoff']

  return steps.map((step, index) => ({
    title: step,
    dueLabel: `Checkpoint ${index + 1}`,
    amount: 'Milestone budget set during kickoff',
    status: 'pending' as const,
  }))
}

function formatDateLabel(prefix: 'Applied' | 'Posted') {
  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  })

  return `${prefix} ${formatter.format(new Date())}`
}
