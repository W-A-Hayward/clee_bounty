import type { StudentApplication, StudentMessage, StudentProject } from '../data/studentPortal'
import type { CompanyProjectDraft, DemoCompanyProject } from './demoPlatform'
import type { CompanyAuthPayload, CompanySession, DemoSession, MemberAuthPayload, MemberSession } from './demoSession'

type ApiSession = MemberSession | CompanySession

type JsonRequestBody = Record<string, unknown> | undefined

export class ApiError extends Error {
  statusCode: number

  constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
  }
}

export type ApiCompanyApplicant = {
  id: string
  projectSlug: string
  projectTitle: string
  companyName: string
  status: 'submitted' | 'shortlisted' | 'interviewing' | 'accepted'
  appliedLabel: string
  note: string
  studentName: string
  studentSchool: string
  studentProgram: string
  studentPortfolio: string
  studentRate: string
  studentAvailability: string
}

export type ApiCompanyMessageThread = {
  id: string
  company: string
  projectSlug: string
  preview: string
  lastActive: string
  unread: number
  thread: string[]
  studentName: string
  studentEmail: string
}

export type ProfileUpdate = {
  name?: string
  school?: string
  program?: string
  portfolioUrl?: string
  availability?: string
  rate?: string
}

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? ''

export async function fetchSession() {
  return request<{ ok: true; session: DemoSession }>('/api/session')
}

export async function loginStudent(payload: MemberAuthPayload) {
  return request<{ ok: true; session: ApiSession }>('/api/auth/student/login', {
    body: payload,
    method: 'POST',
  })
}

export async function registerStudent(payload: MemberAuthPayload) {
  return request<{ ok: true; session: ApiSession }>('/api/auth/student/register', {
    body: payload,
    method: 'POST',
  })
}

export async function loginCompany(payload: CompanyAuthPayload) {
  return request<{ ok: true; session: ApiSession }>('/api/auth/company/login', {
    body: payload,
    method: 'POST',
  })
}

export async function registerCompany(payload: CompanyAuthPayload) {
  return request<{ ok: true; session: ApiSession }>('/api/auth/company/register', {
    body: payload,
    method: 'POST',
  })
}

export async function logout() {
  return request<{ ok: true }>('/api/auth/logout', {
    method: 'POST',
  })
}

export async function fetchProjects() {
  return request<{ ok: true; projects: StudentProject[] }>('/api/projects')
}

export async function fetchApplications() {
  return request<{ ok: true; applications: StudentApplication[] }>('/api/applications')
}

export async function fetchMessages() {
  return request<{ ok: true; messages: StudentMessage[] }>('/api/messages')
}

export async function fetchCompanyProjects() {
  return request<{ ok: true; projects: DemoCompanyProject[] }>('/api/company/projects')
}

export async function fetchCompanyApplicants() {
  return request<{ ok: true; applicants: ApiCompanyApplicant[] }>('/api/company/applicants')
}

export async function fetchCompanyMessages() {
  return request<{ ok: true; messages: ApiCompanyMessageThread[] }>('/api/company/messages')
}

export async function createProject(draft: CompanyProjectDraft) {
  return request<{ ok: true; project: StudentProject }>('/api/projects', {
    body: draft,
    method: 'POST',
  })
}

export async function applyToProject(
  slug: string,
  payload: {
    companyName: string
    note: string
    projectTitle: string
  },
) {
  return request<{ ok: true; message: string }>(`/api/projects/${slug}/applications`, {
    body: payload,
    method: 'POST',
  })
}

export async function updateProfile(updates: ProfileUpdate) {
  return request<{ ok: true; session: MemberSession }>('/api/profile', {
    body: updates as Record<string, unknown>,
    method: 'PATCH',
  })
}

export async function replyToMessage(messageId: string, text: string) {
  return request<{ ok: true }>(`/api/messages/${messageId}/reply`, {
    body: { text },
    method: 'POST',
  })
}

async function request<T>(
  path: string,
  options: {
    method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
    body?: JsonRequestBody
  } = {},
): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    body: options.body ? JSON.stringify(options.body) : undefined,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    method: options.method ?? 'GET',
  })

  const payload = (await response.json().catch(() => null)) as { error?: string } | null

  if (!response.ok) {
    throw new ApiError(response.status, payload?.error ?? 'Request failed.')
  }

  return payload as T
}
