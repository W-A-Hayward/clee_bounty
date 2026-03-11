import { useEffect, useState } from 'react'
import './App.css'
import CompanyLayout from './components/CompanyLayout'
import PublicLayout from './components/PublicLayout'
import WorkspaceLayout from './components/WorkspaceLayout'
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

function App() {
  const currentPath = useHashPath()
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
  const pageTitle = getPageTitle(currentPath, (slug) => getProjectBySlug(slug)?.title)

  useEffect(() => {
    document.title = `${pageTitle} | Clee`
  }, [pageTitle])

  if (status === 'loading') {
    return (
      <PublicLayout currentPath={currentPath} onSignOut={() => undefined} session={null}>
        <section className="section-block">
          <article className="panel-card">
            <p className="eyebrow">Loading</p>
            <h2>Checking your account session.</h2>
            <p>The website is loading your sign-in state before opening the right workspace.</p>
          </article>
        </section>
      </PublicLayout>
    )
  }

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

  if (currentPath === '/') {
    return (
      <PublicLayout currentPath={currentPath} onSignOut={triggerSignOut} session={session}>
        <HomePage companyProjects={companyProjects} session={session} studentProjects={studentProjects} />
      </PublicLayout>
    )
  }

  if (currentPath === '/about') {
    return (
      <PublicLayout currentPath={currentPath} onSignOut={triggerSignOut} session={session}>
        <AboutPage />
      </PublicLayout>
    )
  }

  if (currentPath === '/how-it-works') {
    return (
      <PublicLayout currentPath={currentPath} onSignOut={triggerSignOut} session={session}>
        <HowItWorksPage />
      </PublicLayout>
    )
  }

  if (isStudentInfoRoute) {
    return (
      <PublicLayout currentPath="/students" onSignOut={triggerSignOut} session={session}>
        <ForStudentsPage session={session} />
      </PublicLayout>
    )
  }

  if (isCompanyInfoRoute) {
    return (
      <PublicLayout currentPath="/companies" onSignOut={triggerSignOut} session={session}>
        <ForCompaniesPage />
      </PublicLayout>
    )
  }

  if (isAuthRoute) {
    return (
      <PublicLayout currentPath="/auth" onSignOut={triggerSignOut} session={session}>
        <AuthPage session={session} />
      </PublicLayout>
    )
  }

  if (isPublicProjectsRoute) {
    if (memberSession && currentPath === '/projects') {
      return (
        <WorkspaceLayout
          currentPath={currentPath}
          onSignOut={triggerSignOut}
          session={memberSession}
          subtitle="Browse scoped freelance opportunities with clearer fit, budget, and delivery context."
          title="Open projects"
        >
          <ProjectsPage projects={studentProjects} />
        </WorkspaceLayout>
      )
    }

    if (memberSession && currentPath.startsWith('/projects/')) {
      const slug = currentPath.replace('/projects/', '')
      const project = getProjectBySlug(slug)

      return (
        <WorkspaceLayout
          currentPath={currentPath}
          onSignOut={triggerSignOut}
          session={memberSession}
          subtitle="Review scope, company context, deliverables, and milestone structure before applying."
          title="Project details"
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
        </WorkspaceLayout>
      )
    }

    if (currentPath === '/projects') {
      return (
        <PublicLayout currentPath={currentPath} onSignOut={triggerSignOut} session={session}>
          <ProjectsPage projects={studentProjects} />
        </PublicLayout>
      )
    }

    if (currentPath.startsWith('/projects/')) {
      const slug = currentPath.replace('/projects/', '')
      const project = getProjectBySlug(slug)

      return (
        <PublicLayout currentPath={currentPath} onSignOut={triggerSignOut} session={session}>
          <ProjectDetailsPage
            hasApplied={project ? hasApplied(project.slug) : false}
            onRequestSignIn={() => openMemberLogin(currentPath)}
            project={project}
          />
        </PublicLayout>
      )
    }
  }

  if (isStudentLoginRoute) {
    return (
      <PublicLayout currentPath="/students/sign-in" onSignOut={triggerSignOut} session={session}>
        <LoginPage actionLabel="Continue to student workspace" onSignIn={completeMemberSignIn} />
      </PublicLayout>
    )
  }

  if (isStudentCreateRoute) {
    return (
      <PublicLayout currentPath="/students/create-account" onSignOut={triggerSignOut} session={session}>
        <StudentAccountPage onCreateAccount={completeMemberAccountCreate} />
      </PublicLayout>
    )
  }

  if (isCompanyLoginRoute) {
    return (
      <PublicLayout currentPath="/companies/sign-in" onSignOut={triggerSignOut} session={session}>
        <CompanyLoginPage actionLabel="Continue to company workspace" onSignIn={completeCompanySignIn} />
      </PublicLayout>
    )
  }

  if (isCompanyCreateRoute) {
    return (
      <PublicLayout currentPath="/companies/create-account" onSignOut={triggerSignOut} session={session}>
        <CompanyAccountPage onCreateAccount={completeCompanyAccountCreate} />
      </PublicLayout>
    )
  }

  if (isMemberRoute) {
    if (!memberSession) {
      return (
        <PublicLayout currentPath="/students/sign-in" onSignOut={triggerSignOut} session={session}>
          <LoginPage actionLabel="Continue to requested page" onSignIn={(payload) => completeMemberSignIn(payload, currentPath)} />
        </PublicLayout>
      )
    }

    if (currentPath === '/dashboard' || currentPath === '/student/dashboard') {
      return (
        <WorkspaceLayout
          currentPath="/dashboard"
          onSignOut={triggerSignOut}
          session={memberSession}
          subtitle="Sign in once, then manage projects, applications, milestones, and messages from one place."
          title="Your dashboard"
        >
          <DashboardPage
            applications={applicationsWithProjects}
            messages={messagesWithProjects}
            projects={studentProjects}
            session={memberSession}
          />
        </WorkspaceLayout>
      )
    }

    if (currentPath === '/applications' || currentPath === '/student/applications') {
      return (
        <WorkspaceLayout
          currentPath="/applications"
          onSignOut={triggerSignOut}
          session={memberSession}
          subtitle="Track every application, see what changed, and understand what companies want next."
          title="Your applications"
        >
          <ApplicationsPage applications={applicationsWithProjects} />
        </WorkspaceLayout>
      )
    }

    if (currentPath === '/messages' || currentPath === '/student/messages') {
      return (
        <WorkspaceLayout
          currentPath="/messages"
          onSignOut={triggerSignOut}
          session={memberSession}
          subtitle="Keep project-linked conversations inside the platform instead of scattering them across email."
          title="Messages"
        >
          <MessagesPage messages={messagesWithProjects} onReply={submitMessageReply} />
        </WorkspaceLayout>
      )
    }

    if (currentPath === '/profile') {
      return (
        <WorkspaceLayout
          currentPath="/profile"
          onSignOut={triggerSignOut}
          session={memberSession}
          subtitle="Your profile is visible to verified companies when you apply. Keep it accurate to improve match quality."
          title="Your profile"
        >
          <StudentProfilePage onSave={updateStudentProfileRemote} session={memberSession} />
        </WorkspaceLayout>
      )
    }
  }

  if (isCompanyRoute) {
    if (!companySession) {
      return (
        <PublicLayout currentPath="/companies/sign-in" onSignOut={triggerSignOut} session={session}>
          <CompanyLoginPage actionLabel="Continue to requested page" onSignIn={(payload) => completeCompanySignIn(payload, currentPath)} />
        </PublicLayout>
      )
    }

    if (currentPath === '/company/dashboard') {
      return (
        <CompanyLayout
          currentPath={currentPath}
          onSignOut={triggerSignOut}
          session={companySession}
          subtitle="Track company profile health, live project inventory, applicant flow, and publishing quality."
          title="Company dashboard"
        >
          <CompanyDashboardPage projects={visibleCompanyProjects} session={companySession} />
        </CompanyLayout>
      )
    }

    if (currentPath === '/company/projects') {
      return (
        <CompanyLayout
          currentPath={currentPath}
          onSignOut={triggerSignOut}
          session={companySession}
          subtitle="Manage every project your company has published or is actively reviewing."
          title="Company projects"
        >
          <CompanyProjectsPage projects={visibleCompanyProjects} />
        </CompanyLayout>
      )
    }

    if (currentPath === '/company/post-project') {
      return (
        <CompanyLayout
          currentPath={currentPath}
          onSignOut={triggerSignOut}
          session={companySession}
          subtitle="Draft a project brief that reads clearly on the website and holds up during applicant review."
          title="Post a project"
        >
          <CompanyPostProjectPage
            onPostProject={(draft) => postCompanyProject(draft, companySession)}
            session={companySession}
          />
        </CompanyLayout>
      )
    }

    if (currentPath === '/company/applicants') {
      return (
        <CompanyLayout
          currentPath={currentPath}
          onSignOut={triggerSignOut}
          session={companySession}
          subtitle="Review every candidate in one queue. Filter by project and move them through your pipeline."
          title="Applicants"
        >
          <CompanyApplicantsPage applicants={companyApplicants} projects={visibleCompanyProjects} />
        </CompanyLayout>
      )
    }

    if (currentPath === '/company/messages') {
      return (
        <CompanyLayout
          currentPath={currentPath}
          onSignOut={triggerSignOut}
          session={companySession}
          subtitle="Reply to candidates, share project context, and keep all hiring conversations inside the platform."
          title="Messages"
        >
          <CompanyMessagesPage messages={companyMessages} projects={visibleCompanyProjects} session={companySession} />
        </CompanyLayout>
      )
    }
  }

  return (
    <PublicLayout currentPath={currentPath} onSignOut={triggerSignOut} session={session}>
      <NotFoundPage />
    </PublicLayout>
  )
}

function getPageTitle(path: string, resolveProjectTitle: (slug: string) => string | undefined) {
  if (path === '/') {
    return 'Home'
  }

  if (path === '/how-it-works') {
    return 'How It Works'
  }

  if (path === '/about') {
    return 'About'
  }

  if (path === '/students' || path === '/for-students') {
    return 'For Students'
  }

  if (path === '/for-companies' || path === '/companies') {
    return 'For Companies'
  }

  if (path === '/auth' || path === '/sign-in' || path === '/access') {
    return 'Account Access'
  }

  if (path === '/projects') {
    return 'Projects'
  }

  if (path === '/login' || path === '/students/sign-in') {
    return 'Student Sign In'
  }

  if (path === '/create-account' || path === '/students/create-account') {
    return 'Create Student Account'
  }

  if (path === '/company/login' || path === '/companies/sign-in') {
    return 'Company Login'
  }

  if (path === '/company/create-account' || path === '/companies/create-account') {
    return 'Create Company Account'
  }

  if (path === '/company/dashboard') {
    return 'Company Dashboard'
  }

  if (path === '/company/projects') {
    return 'Company Projects'
  }

  if (path === '/company/post-project') {
    return 'Post Project'
  }

  if (path === '/dashboard' || path === '/student/dashboard') {
    return 'Dashboard'
  }

  if (path.startsWith('/projects/')) {
    return resolveProjectTitle(path.replace('/projects/', '')) ?? 'Project Details'
  }

  if (path === '/applications' || path === '/student/applications') {
    return 'Applications'
  }

  if (path === '/messages' || path === '/student/messages') {
    return 'Messages'
  }

  if (path === '/profile') {
    return 'Your Profile'
  }

  if (path === '/company/applicants') {
    return 'Applicants'
  }

  if (path === '/company/messages') {
    return 'Company Messages'
  }

  return 'Page Not Found'
}

export default App
