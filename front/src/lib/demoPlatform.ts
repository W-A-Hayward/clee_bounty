import { useEffect, useState } from 'react'
import { type CompanyProject } from '../data/companyPortal'
import {
  getProjectBySlug as getBaseProjectBySlug,
  studentProjects as baseStudentProjects,
  type StudentApplication,
  type StudentMessage,
  type StudentProject,
} from '../data/studentPortal'
import { pick } from '../i18n/LanguageContext'
import {
  applyToProject,
  createProject,
  fetchApplications,
  fetchCompanyApplicants,
  fetchCompanyMessages,
  fetchCompanyProjects,
  fetchMessages,
  fetchProjects,
  replyToMessage,
  updateProfile,
  type ApiCompanyApplicant,
  type ApiCompanyMessageThread,
  type ProfileUpdate,
} from './api'
import type { CompanySession, DemoSession, MemberSession } from './demoSession'

export type { ApiCompanyApplicant, ApiCompanyMessageThread, ProfileUpdate }

export type DemoCompanyProject = CompanyProject & {
  publicSlug?: string
}

export type DemoApplicationResult =
  | {
      ok: true
      message: string
    }
  | {
      ok: false
      message: string
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

export function useDemoPlatform(session: DemoSession, authStatus: 'loading' | 'ready') {
  const [remoteProjects, setRemoteProjects] = useState<StudentProject[]>([])
  const [applications, setApplications] = useState<StudentApplication[]>([])
  const [messages, setMessages] = useState<StudentMessage[]>([])
  const [companyProjectsState, setCompanyProjects] = useState<DemoCompanyProject[]>([])
  const [companyApplicants, setCompanyApplicants] = useState<ApiCompanyApplicant[]>([])
  const [companyMessages, setCompanyMessages] = useState<ApiCompanyMessageThread[]>([])

  useEffect(() => {
    void loadPublicProjects()
  }, [])

  useEffect(() => {
    if (authStatus !== 'ready') {
      return
    }

    if (!session) {
      setApplications([])
      setMessages([])
      setCompanyProjects([])
      setCompanyApplicants([])
      setCompanyMessages([])
      return
    }

    if (session.role === 'member') {
      void refreshStudentData()
      return
    }

    void refreshCompanyData()
  }, [authStatus, session])

  const studentProjects = mergeProjects(remoteProjects, baseStudentProjects)

  const getProjectBySlug = (slug: string) =>
    studentProjects.find((project) => project.slug === slug) ?? getBaseProjectBySlug(slug)

  const applicationsWithProjects = applications.map((application) => ({
    ...application,
    project: getProjectBySlug(application.projectSlug),
  }))

  const messagesWithProjects = messages.map((message) => ({
    ...message,
    project: getProjectBySlug(message.projectSlug),
  }))

  const hasApplied = (projectSlug: string) =>
    applications.some((application) => application.projectSlug === projectSlug)

  const getCompanyProjectsForSession = (_session: CompanySession) => companyProjectsState

  const submitApplication = async (
    project: StudentProject,
    _session: MemberSession,
    note: string,
  ): Promise<DemoApplicationResult> => {
    try {
      const result = await applyToProject(project.slug, {
        companyName: project.company,
        note,
        projectTitle: pick(project.title, 'en'),
      })

      await refreshStudentData()

      return {
        ok: true,
        message: result.message,
      }
    } catch (error) {
      return {
        ok: false,
        message: getErrorMessage(error),
      }
    }
  }

  const postCompanyProject = async (draft: CompanyProjectDraft, _session: CompanySession) => {
    const result = await createProject(draft)
    await Promise.all([refreshCompanyData(), loadPublicProjects()])
    return result.project.slug
  }

  const submitMessageReply = async (messageId: string, text: string): Promise<DemoApplicationResult> => {
    try {
      await replyToMessage(messageId, text)
      await refreshStudentData()
      return { ok: true, message: 'Reply sent.' }
    } catch (error) {
      return { ok: false, message: getErrorMessage(error) }
    }
  }

  const updateStudentProfileRemote = async (updates: ProfileUpdate): Promise<DemoApplicationResult> => {
    try {
      await updateProfile(updates)
      return { ok: true, message: 'Profile updated.' }
    } catch (error) {
      return { ok: false, message: getErrorMessage(error) }
    }
  }

  return {
    studentProjects,
    companyProjects: companyProjectsState,
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
  }

  async function loadPublicProjects() {
    try {
      const result = await fetchProjects()
      setRemoteProjects(result.projects)
    } catch {
      setRemoteProjects([])
    }
  }

  async function refreshStudentData() {
    try {
      const [applicationResult, messageResult] = await Promise.all([fetchApplications(), fetchMessages()])
      setApplications(applicationResult.applications)
      setMessages(messageResult.messages)
    } catch {
      setApplications([])
      setMessages([])
    }
  }

  async function refreshCompanyData() {
    try {
      const [projectResult, applicantResult, messageResult] = await Promise.all([
        fetchCompanyProjects(),
        fetchCompanyApplicants(),
        fetchCompanyMessages(),
      ])
      setCompanyProjects(projectResult.projects)
      setCompanyApplicants(applicantResult.applicants)
      setCompanyMessages(messageResult.messages)
    } catch {
      setCompanyProjects([])
      setCompanyApplicants([])
      setCompanyMessages([])
    }
  }
}

function mergeProjects(remoteProjects: StudentProject[], baseProjects: StudentProject[]) {
  const bySlug = new Map<string, StudentProject>()

  for (const project of [...remoteProjects, ...baseProjects]) {
    if (!bySlug.has(project.slug)) {
      bySlug.set(project.slug, project)
    }
  }

  return [...bySlug.values()]
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message
  }

  return 'Something went wrong.'
}
