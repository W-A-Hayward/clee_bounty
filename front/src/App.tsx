import { useEffect, useState } from 'react'
import './App.css'
import AppShell from './components/AppShell'
import CommandPalette from './components/CommandPalette'
import PublicLayout from './components/PublicLayout'
import { pick, useLang, type Lang } from './i18n/LanguageContext'
import { useDemoPlatform } from './lib/demoPlatform'
import { useDemoSession } from './lib/demoSession'
import { routeHref, useHashPath } from './lib/hashRouter'
import AboutPage from './pages/AboutPage'
import ApplicationsPage from './pages/ApplicationsPage'
import AuthPage from './pages/AuthPage'
import CompanyAccountPage from './pages/CompanyAccountPage'
import CompanyApplicantsPage from './pages/CompanyApplicantsPage'
import CompanyDashboardPage from './pages/CompanyDashboardPage'
import CompanyLoginPage from './pages/CompanyLoginPage'
import CompanyMessagesPage from './pages/CompanyMessagesPage'
import CompanyPostProjectPage from './pages/CompanyPostProjectPage'
import CompanyProjectsPage from './pages/CompanyProjectsPage'
import DashboardPage from './pages/DashboardPage'
import ForCompaniesPage from './pages/ForCompaniesPage'
import ForStudentsPage from './pages/ForStudentsPage'
import HomePage from './pages/HomePage'
import HowItWorksPage from './pages/HowItWorksPage'
import LoginPage from './pages/LoginPage'
import MessagesPage from './pages/MessagesPage'
import NotFoundPage from './pages/NotFoundPage'
import ProjectDetailsPage from './pages/ProjectDetailsPage'
import ProjectsPage from './pages/ProjectsPage'
import StudentAccountPage from './pages/StudentAccountPage'
import StudentProfilePage from './pages/StudentProfilePage'

const subtitles = {
  en: {
    booting: 'Connecting to the marketplace',
    bootingBody: 'Loading your session and the live brief feed.',
    bootingEyebrow: 'Booting',
    marketplace: 'Marketplace',
    marketplaceSub: 'Browse scoped freelance opportunities with full context, then apply when the fit is sharp.',
    projectBrief: 'Project brief',
    projectBriefSub: 'Review scope, deliverables and milestone structure before applying.',
    studio: 'Studio',
    studioOverview: 'Studio overview',
    studioSub: 'Sign in once, then manage projects, applications, milestones, and messages from one workspace.',
    applications: 'Applications',
    applicationsSub: 'Track every brief you applied to. Status changes, company replies, and next moves in one queue.',
    messages: 'Messages',
    messagesSub: 'Project-linked conversations live here — no scattered email threads.',
    profile: 'Profile',
    profileSub: 'Your profile is what companies read first when you apply. Keep it sharp.',
    companyOs: 'Company OS',
    companyOsSub: 'Track inventory, applicant flow, and publishing quality across every brief.',
    projects: 'Projects',
    projectsSub: 'Manage every brief your company has published or is reviewing.',
    newBrief: 'New brief',
    newBriefSub: 'Draft a project brief that reads sharp on the marketplace and holds up under applicant review.',
    applicants: 'Applicants',
    applicantsSub: 'Review every candidate in one queue. Filter by project, move them through your pipeline.',
    companyMessages: 'Messages',
    companyMessagesSub: 'Reply to candidates and keep all hiring conversation inside the platform.',
    continueStudio: 'Continue to studio',
    continueCompanyOs: 'Continue to company OS',
    continueRequested: 'Continue to requested page',
    home: 'Home',
    howItWorks: 'How it works',
    about: 'About',
    forStudents: 'For students',
    forCompanies: 'For companies',
    accountAccess: 'Account access',
    studentSignIn: 'Student sign in',
    createStudent: 'Create student account',
    companyLogin: 'Company login',
    createCompany: 'Create company account',
    companyProjects: 'Company projects',
    postProject: 'Post project',
    notFound: 'Not found',
  },
  fr: {
    booting: 'Connexion à la plateforme',
    bootingBody: 'Chargement de ta session et du fil des mandats.',
    bootingEyebrow: 'Démarrage',
    marketplace: 'Projets',
    marketplaceSub: 'Explore des opportunités freelance bien définies, en contexte complet, puis postule quand ça colle.',
    projectBrief: 'Mandat',
    projectBriefSub: 'Lis le scope, les livrables et la structure d’étapes avant de postuler.',
    studio: 'Atelier',
    studioOverview: 'Vue d’ensemble',
    studioSub: 'Connecte-toi une fois, puis gère projets, candidatures, étapes et messages depuis un seul atelier.',
    applications: 'Candidatures',
    applicationsSub: 'Suis chaque mandat où tu as postulé. Changements de statut, réponses, prochaines étapes — tout dans une file.',
    messages: 'Messages',
    messagesSub: 'Les conversations liées aux projets vivent ici — pas de fils de courriels éparpillés.',
    profile: 'Profil',
    profileSub: 'Ton profil, c’est ce que les entreprises lisent en premier. Garde-le aiguisé.',
    companyOs: 'Espace entreprise',
    companyOsSub: 'Suivez l’inventaire, le flux de candidatures et la qualité de publication sur chaque mandat.',
    projects: 'Projets',
    projectsSub: 'Gérez chaque mandat publié ou en revue par votre entreprise.',
    newBrief: 'Nouveau mandat',
    newBriefSub: 'Rédigez un mandat qui lit aiguisé sur la vitrine et tient bon sous la revue des candidats.',
    applicants: 'Candidats',
    applicantsSub: 'Examinez chaque candidat dans une seule file. Filtrez par projet, déplacez-les dans votre pipeline.',
    companyMessages: 'Messages',
    companyMessagesSub: 'Répondez aux candidats et gardez toute la conversation d’embauche dans la plateforme.',
    continueStudio: 'Continuer vers l’atelier',
    continueCompanyOs: 'Continuer vers l’espace entreprise',
    continueRequested: 'Continuer vers la page demandée',
    home: 'Accueil',
    howItWorks: 'Comment ça marche',
    about: 'À propos',
    forStudents: 'Pour les étudiants',
    forCompanies: 'Pour les entreprises',
    accountAccess: 'Accès au compte',
    studentSignIn: 'Connexion étudiant',
    createStudent: 'Créer un compte étudiant',
    companyLogin: 'Connexion entreprise',
    createCompany: 'Créer un compte entreprise',
    companyProjects: 'Projets entreprise',
    postProject: 'Publier un mandat',
    notFound: 'Page introuvable',
  },
}

function App() {
  const currentPath = useHashPath()
  const lang = useLang()
  const t = subtitles[lang]
  const { session, status, signInCompany, createCompanyAccount, signInMember, createMemberAccount, signOut } =
    useDemoSession()
  const {
    studentProjects,
    companyProjects,
    companyApplicants,
    companyMessages,
    applicationsWithProjects,
    messagesWithProjects,
    getProjectBySlug,
    getCompanyProjectsForSession,
    hasApplied,
    submitApplication,
    postCompanyProject,
    submitMessageReply,
    updateStudentProfileRemote,
  } = useDemoPlatform(session, status)

  const [memberAuthTarget, setMemberAuthTarget] = useState('/dashboard')
  const [companyAuthTarget, setCompanyAuthTarget] = useState('/company/dashboard')
  const [paletteOpen, setPaletteOpen] = useState(false)

  const memberSession = session?.role === 'member' ? session : null
  const companySession = session?.role === 'company' ? session : null

  const isPublicProjectsRoute = currentPath === '/projects' || currentPath.startsWith('/projects/')
  const isAuthRoute = currentPath === '/auth' || currentPath === '/sign-in' || currentPath === '/access'
  const isStudentInfoRoute = currentPath === '/students' || currentPath === '/for-students'
  const isStudentLoginRoute = currentPath === '/login' || currentPath === '/students/sign-in'
  const isStudentCreateRoute =
    currentPath === '/create-account' || currentPath === '/students/create-account'
  const isCompanyInfoRoute = currentPath === '/for-companies' || currentPath === '/companies'
  const isCompanyLoginRoute = currentPath === '/company/login' || currentPath === '/companies/sign-in'
  const isCompanyCreateRoute =
    currentPath === '/company/create-account' || currentPath === '/companies/create-account'

  const isLegacyMemberAlias =
    currentPath === '/student/dashboard' ||
    currentPath === '/student/applications' ||
    currentPath === '/student/messages'

  const isMemberRoute =
    currentPath === '/dashboard' ||
    currentPath === '/applications' ||
    currentPath === '/messages' ||
    currentPath === '/profile' ||
    isLegacyMemberAlias

  const isCompanyRoute =
    currentPath === '/company/dashboard' ||
    currentPath === '/company/projects' ||
    currentPath === '/company/post-project' ||
    currentPath === '/company/applicants' ||
    currentPath === '/company/messages'

  const visibleCompanyProjects = companySession ? getCompanyProjectsForSession(companySession) : []
  const pageTitle = getPageTitle(currentPath, lang, (slug) => {
    const p = getProjectBySlug(slug)
    return p ? pick(p.title, lang) : undefined
  })

  useEffect(() => {
    document.title = `${pageTitle} · Legend`
  }, [pageTitle])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setPaletteOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (status === 'loading') {
    return (
      <PublicLayout
        currentPath={currentPath}
        onOpenPalette={() => setPaletteOpen(true)}
        onSignOut={() => undefined}
        session={null}
      >
        <section className="section-block">
          <article className="panel-card">
            <p className="eyebrow">{t.bootingEyebrow}</p>
            <h2>{t.booting}</h2>
            <p>{t.bootingBody}</p>
          </article>
        </section>
      </PublicLayout>
    )
  }

  const openPalette = () => setPaletteOpen(true)
  const closePalette = () => setPaletteOpen(false)

  const openMemberLogin = (nextPath = '/dashboard') => {
    setMemberAuthTarget(nextPath)
    window.location.hash = routeHref('/students/sign-in')
  }

  const completeMemberSignIn = async (
    payload: Parameters<typeof signInMember>[0],
    nextPath = memberAuthTarget,
  ) => {
    await signInMember(payload, nextPath)
    setMemberAuthTarget('/dashboard')
  }

  const completeMemberAccountCreate = async (
    payload: Parameters<typeof createMemberAccount>[0],
    nextPath = memberAuthTarget,
  ) => {
    await createMemberAccount(payload, nextPath)
    setMemberAuthTarget('/dashboard')
  }

  const completeCompanySignIn = async (
    payload: Parameters<typeof signInCompany>[0],
    nextPath = companyAuthTarget,
  ) => {
    await signInCompany(payload, nextPath)
    setCompanyAuthTarget('/company/dashboard')
  }

  const completeCompanyAccountCreate = async (
    payload: Parameters<typeof createCompanyAccount>[0],
    nextPath = companyAuthTarget,
  ) => {
    await createCompanyAccount(payload, nextPath)
    setCompanyAuthTarget('/company/dashboard')
  }

  const handleSignOut = async () => {
    setMemberAuthTarget('/dashboard')
    setCompanyAuthTarget('/company/dashboard')
    await signOut()
  }

  const triggerSignOut = () => {
    void handleSignOut()
  }

  const renderInPublic = (children: React.ReactNode, path = currentPath) => (
    <PublicLayout
      currentPath={path}
      onOpenPalette={openPalette}
      onSignOut={triggerSignOut}
      session={session}
    >
      {children}
    </PublicLayout>
  )

  let body: React.ReactNode = null

  if (currentPath === '/') {
    body = renderInPublic(
      <HomePage
        companyProjects={companyProjects}
        onOpenPalette={openPalette}
        session={session}
        studentProjects={studentProjects}
      />,
    )
  } else if (currentPath === '/about') {
    body = renderInPublic(<AboutPage />)
  } else if (currentPath === '/how-it-works') {
    body = renderInPublic(<HowItWorksPage />)
  } else if (isStudentInfoRoute) {
    body = renderInPublic(<ForStudentsPage session={session} />, '/students')
  } else if (isCompanyInfoRoute) {
    body = renderInPublic(<ForCompaniesPage />, '/companies')
  } else if (isAuthRoute) {
    body = renderInPublic(<AuthPage session={session} />, '/auth')
  } else if (isPublicProjectsRoute) {
    if (memberSession && currentPath === '/projects') {
      body = (
        <AppShell
          currentPath={currentPath}
          onOpenPalette={openPalette}
          onSignOut={triggerSignOut}
          session={memberSession}
          subtitle={t.marketplaceSub}
          title={t.marketplace}
          variant="student"
        >
          <ProjectsPage projects={studentProjects} />
        </AppShell>
      )
    } else if (memberSession && currentPath.startsWith('/projects/')) {
      const slug = currentPath.replace('/projects/', '')
      const project = getProjectBySlug(slug)
      body = (
        <AppShell
          currentPath={currentPath}
          onOpenPalette={openPalette}
          onSignOut={triggerSignOut}
          session={memberSession}
          subtitle={t.projectBriefSub}
          title={project ? pick(project.title, lang) : t.projectBrief}
          variant="student"
        >
          <ProjectDetailsPage
            hasApplied={project ? hasApplied(project.slug) : false}
            onApply={async (note) =>
              project
                ? submitApplication(project, memberSession, note)
                : { ok: false, message: 'Project not found.' }
            }
            project={project}
            session={memberSession}
          />
        </AppShell>
      )
    } else if (currentPath === '/projects') {
      body = renderInPublic(<ProjectsPage projects={studentProjects} />)
    } else if (currentPath.startsWith('/projects/')) {
      const slug = currentPath.replace('/projects/', '')
      const project = getProjectBySlug(slug)
      body = renderInPublic(
        <ProjectDetailsPage
          hasApplied={project ? hasApplied(project.slug) : false}
          onRequestSignIn={() => openMemberLogin(currentPath)}
          project={project}
        />,
      )
    }
  } else if (isStudentLoginRoute) {
    body = renderInPublic(
      <LoginPage actionLabel={t.continueStudio} onSignIn={completeMemberSignIn} />,
      '/students/sign-in',
    )
  } else if (isStudentCreateRoute) {
    body = renderInPublic(
      <StudentAccountPage onCreateAccount={completeMemberAccountCreate} />,
      '/students/create-account',
    )
  } else if (isCompanyLoginRoute) {
    body = renderInPublic(
      <CompanyLoginPage actionLabel={t.continueCompanyOs} onSignIn={completeCompanySignIn} />,
      '/companies/sign-in',
    )
  } else if (isCompanyCreateRoute) {
    body = renderInPublic(
      <CompanyAccountPage onCreateAccount={completeCompanyAccountCreate} />,
      '/companies/create-account',
    )
  } else if (isMemberRoute) {
    if (!memberSession) {
      body = renderInPublic(
        <LoginPage actionLabel={t.continueRequested} onSignIn={(payload) => completeMemberSignIn(payload, currentPath)} />,
        '/students/sign-in',
      )
    } else if (currentPath === '/dashboard' || currentPath === '/student/dashboard') {
      body = (
        <AppShell
          currentPath="/dashboard"
          onOpenPalette={openPalette}
          onSignOut={triggerSignOut}
          session={memberSession}
          subtitle={t.studioSub}
          title={t.studioOverview}
          variant="student"
        >
          <DashboardPage
            applications={applicationsWithProjects}
            messages={messagesWithProjects}
            projects={studentProjects}
            session={memberSession}
          />
        </AppShell>
      )
    } else if (currentPath === '/applications' || currentPath === '/student/applications') {
      body = (
        <AppShell
          currentPath="/applications"
          onOpenPalette={openPalette}
          onSignOut={triggerSignOut}
          session={memberSession}
          subtitle={t.applicationsSub}
          title={t.applications}
          variant="student"
        >
          <ApplicationsPage applications={applicationsWithProjects} />
        </AppShell>
      )
    } else if (currentPath === '/messages' || currentPath === '/student/messages') {
      body = (
        <AppShell
          currentPath="/messages"
          onOpenPalette={openPalette}
          onSignOut={triggerSignOut}
          session={memberSession}
          subtitle={t.messagesSub}
          title={t.messages}
          variant="student"
        >
          <MessagesPage messages={messagesWithProjects} onReply={submitMessageReply} />
        </AppShell>
      )
    } else if (currentPath === '/profile') {
      body = (
        <AppShell
          currentPath="/profile"
          onOpenPalette={openPalette}
          onSignOut={triggerSignOut}
          session={memberSession}
          subtitle={t.profileSub}
          title={t.profile}
          variant="student"
        >
          <StudentProfilePage onSave={updateStudentProfileRemote} session={memberSession} />
        </AppShell>
      )
    }
  } else if (isCompanyRoute) {
    if (!companySession) {
      body = renderInPublic(
        <CompanyLoginPage actionLabel={t.continueRequested} onSignIn={(payload) => completeCompanySignIn(payload, currentPath)} />,
        '/companies/sign-in',
      )
    } else if (currentPath === '/company/dashboard') {
      body = (
        <AppShell
          currentPath={currentPath}
          onOpenPalette={openPalette}
          onSignOut={triggerSignOut}
          session={companySession}
          subtitle={t.companyOsSub}
          title={t.companyOs}
          variant="company"
        >
          <CompanyDashboardPage projects={visibleCompanyProjects} session={companySession} />
        </AppShell>
      )
    } else if (currentPath === '/company/projects') {
      body = (
        <AppShell
          currentPath={currentPath}
          onOpenPalette={openPalette}
          onSignOut={triggerSignOut}
          session={companySession}
          subtitle={t.projectsSub}
          title={t.projects}
          variant="company"
        >
          <CompanyProjectsPage projects={visibleCompanyProjects} />
        </AppShell>
      )
    } else if (currentPath === '/company/post-project') {
      body = (
        <AppShell
          currentPath={currentPath}
          onOpenPalette={openPalette}
          onSignOut={triggerSignOut}
          session={companySession}
          subtitle={t.newBriefSub}
          title={t.newBrief}
          variant="company"
        >
          <CompanyPostProjectPage
            onPostProject={(draft) => postCompanyProject(draft, companySession)}
            session={companySession}
          />
        </AppShell>
      )
    } else if (currentPath === '/company/applicants') {
      body = (
        <AppShell
          currentPath={currentPath}
          onOpenPalette={openPalette}
          onSignOut={triggerSignOut}
          session={companySession}
          subtitle={t.applicantsSub}
          title={t.applicants}
          variant="company"
        >
          <CompanyApplicantsPage applicants={companyApplicants} projects={visibleCompanyProjects} />
        </AppShell>
      )
    } else if (currentPath === '/company/messages') {
      body = (
        <AppShell
          currentPath={currentPath}
          onOpenPalette={openPalette}
          onSignOut={triggerSignOut}
          session={companySession}
          subtitle={t.companyMessagesSub}
          title={t.companyMessages}
          variant="company"
        >
          <CompanyMessagesPage messages={companyMessages} projects={visibleCompanyProjects} session={companySession} />
        </AppShell>
      )
    }
  }

  if (!body) {
    body = renderInPublic(<NotFoundPage />)
  }

  return (
    <>
      {body}
      <CommandPalette
        onClose={closePalette}
        onSignOut={triggerSignOut}
        open={paletteOpen}
        session={session}
      />
    </>
  )
}

function getPageTitle(path: string, lang: Lang, resolveProjectTitle: (slug: string) => string | undefined) {
  const tt = subtitles[lang]
  if (path === '/') return tt.home
  if (path === '/how-it-works') return tt.howItWorks
  if (path === '/about') return tt.about
  if (path === '/students' || path === '/for-students') return tt.forStudents
  if (path === '/for-companies' || path === '/companies') return tt.forCompanies
  if (path === '/auth' || path === '/sign-in' || path === '/access') return tt.accountAccess
  if (path === '/projects') return tt.marketplace
  if (path === '/login' || path === '/students/sign-in') return tt.studentSignIn
  if (path === '/create-account' || path === '/students/create-account') return tt.createStudent
  if (path === '/company/login' || path === '/companies/sign-in') return tt.companyLogin
  if (path === '/company/create-account' || path === '/companies/create-account') return tt.createCompany
  if (path === '/company/dashboard') return tt.companyOs
  if (path === '/company/projects') return tt.companyProjects
  if (path === '/company/post-project') return tt.postProject
  if (path === '/dashboard' || path === '/student/dashboard') return tt.studio
  if (path.startsWith('/projects/')) return resolveProjectTitle(path.replace('/projects/', '')) ?? tt.projectBrief
  if (path === '/applications' || path === '/student/applications') return tt.applications
  if (path === '/messages' || path === '/student/messages') return tt.messages
  if (path === '/profile') return tt.profile
  if (path === '/company/applicants') return tt.applicants
  if (path === '/company/messages') return tt.companyMessages
  return tt.notFound
}

export default App
