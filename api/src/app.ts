import type { IncomingMessage, ServerResponse } from 'node:http'
import { env } from './config/env.ts'
import { clearSessionCookie, parseCookies, serializeSessionCookie } from './lib/auth.ts'
import {
  FileStore,
  type CompanyAuthPayload,
  type CompanyProjectDraft,
  type CompanySession,
  type MemberAuthPayload,
  type MemberSession,
  type StudentProfileUpdate,
} from './lib/store.ts'

const store = new FileStore(env.dataFile)

class HttpError extends Error {
  statusCode: number
  clearSession: boolean

  constructor(statusCode: number, message: string, clearSession = false) {
    super(message)
    this.statusCode = statusCode
    this.clearSession = clearSession
  }
}

export async function handleRequest(request: IncomingMessage, response: ServerResponse) {
  const url = new URL(request.url ?? '/', `http://${request.headers.host ?? 'localhost'}`)
  const pathname = url.pathname
  const method = request.method ?? 'GET'

  applyCors(request, response)

  if (method === 'OPTIONS') {
    response.writeHead(204)
    response.end()
    return
  }

  try {
    if (method === 'GET' && pathname === '/') {
      return sendJson(response, 200, { service: 'clee-api', version: '1.0.0' })
    }

    if (method === 'GET' && pathname === '/api') {
      return sendJson(response, 200, {
        routes: [
          'GET /api/health',
          'GET /api/session',
          'POST /api/auth/student/login',
          'POST /api/auth/student/register',
          'POST /api/auth/company/login',
          'POST /api/auth/company/register',
          'POST /api/auth/logout',
          'GET /api/projects',
          'POST /api/projects',
          'POST /api/projects/:slug/applications',
          'GET /api/applications',
          'GET /api/messages',
          'POST /api/messages/:id/reply',
          'PATCH /api/profile',
          'GET /api/company/projects',
          'GET /api/company/applicants',
          'GET /api/company/messages',
        ],
      })
    }

    if (method === 'GET' && pathname === '/api/health') {
      return sendJson(response, 200, { ok: true, timestamp: new Date().toISOString() })
    }

    if (method === 'GET' && pathname === '/api/session') {
      const session = getSessionFromRequest(request)
      if (!session) {
        return sendJson(response, 200, { ok: true, session: null })
      }
      return sendJson(response, 200, { ok: true, session: session.user })
    }

    if (method === 'POST' && pathname === '/api/auth/student/login') {
      const body = await readJsonBody<MemberAuthPayload>(request)
      const result = store.authenticateStudent(body)
      response.setHeader('Set-Cookie', serializeSessionCookie(result.token))
      return sendJson(response, 200, { ok: true, session: result.user })
    }

    if (method === 'POST' && pathname === '/api/auth/student/register') {
      const body = await readJsonBody<MemberAuthPayload>(request)
      const result = store.registerStudent(body)
      response.setHeader('Set-Cookie', serializeSessionCookie(result.token))
      return sendJson(response, 200, { ok: true, session: result.user })
    }

    if (method === 'POST' && pathname === '/api/auth/company/login') {
      const body = await readJsonBody<CompanyAuthPayload>(request)
      const result = store.authenticateCompany(body)
      response.setHeader('Set-Cookie', serializeSessionCookie(result.token))
      return sendJson(response, 200, { ok: true, session: result.user })
    }

    if (method === 'POST' && pathname === '/api/auth/company/register') {
      const body = await readJsonBody<CompanyAuthPayload>(request)
      const result = store.registerCompany(body)
      response.setHeader('Set-Cookie', serializeSessionCookie(result.token))
      return sendJson(response, 200, { ok: true, session: result.user })
    }

    if (method === 'POST' && pathname === '/api/auth/logout') {
      const session = getSessionFromRequest(request)
      if (session) {
        store.destroySession(session.token)
      }
      response.setHeader('Set-Cookie', clearSessionCookie())
      return sendJson(response, 200, { ok: true })
    }

    if (method === 'GET' && pathname === '/api/projects') {
      const projects = store.listPublicProjects()
      return sendJson(response, 200, { ok: true, projects })
    }

    if (method === 'POST' && pathname === '/api/projects') {
      const company = requireCompanySession(request)
      const body = await readJsonBody<CompanyProjectDraft>(request)
      const project = store.createProject(company, body)
      return sendJson(response, 201, { ok: true, project })
    }

    const applyMatch = pathname.match(/^\/api\/projects\/([^/]+)\/applications$/)
    if (method === 'POST' && applyMatch) {
      const slug = decodeURIComponent(applyMatch[1])
      const student = requireStudentSession(request)
      const body = await readJsonBody<{ companyName: string; note: string; projectTitle: string }>(request)
      const result = store.createApplication(student, { projectSlug: slug, ...body })
      return sendJson(response, 201, { ok: true, ...result })
    }

    if (method === 'GET' && pathname === '/api/applications') {
      const student = requireStudentSession(request)
      const applications = store.listApplicationsForStudentEmail(student.email)
      return sendJson(response, 200, { ok: true, applications })
    }

    if (method === 'GET' && pathname === '/api/messages') {
      const student = requireStudentSession(request)
      const messages = store.listMessagesForStudentEmail(student.email)
      return sendJson(response, 200, { ok: true, messages })
    }

    const replyMatch = pathname.match(/^\/api\/messages\/([^/]+)\/reply$/)
    if (method === 'POST' && replyMatch) {
      const messageId = decodeURIComponent(replyMatch[1])
      const student = requireStudentSession(request)
      const body = await readJsonBody<{ text: string }>(request)
      store.addStudentMessageReply(messageId, student.email, body.text)
      return sendJson(response, 200, { ok: true })
    }

    if (method === 'PATCH' && pathname === '/api/profile') {
      const student = requireStudentSession(request)
      const body = await readJsonBody<StudentProfileUpdate>(request)
      const updated = store.updateStudentProfile(student.email, body)
      return sendJson(response, 200, { ok: true, session: updated })
    }

    if (method === 'GET' && pathname === '/api/company/projects') {
      const company = requireCompanySession(request)
      const projects = store.listCompanyProjectsByEmail(company.email)
      return sendJson(response, 200, { ok: true, projects })
    }

    if (method === 'GET' && pathname === '/api/company/applicants') {
      const company = requireCompanySession(request)
      const applicants = store.listCompanyApplicants(company.email)
      return sendJson(response, 200, { ok: true, applicants })
    }

    if (method === 'GET' && pathname === '/api/company/messages') {
      const company = requireCompanySession(request)
      const messages = store.listCompanyMessages(company.email)
      return sendJson(response, 200, { ok: true, messages })
    }

    return sendJson(response, 404, { error: 'Route not found.' })
  } catch (error) {
    if (error instanceof HttpError) {
      if (error.clearSession) {
        response.setHeader('Set-Cookie', clearSessionCookie())
      }
      return sendJson(response, error.statusCode, { error: error.message })
    }

    const message = error instanceof Error ? error.message : 'Unexpected server error.'
    return sendJson(response, 500, { error: message })
  }
}

function getSessionFromRequest(request: IncomingMessage) {
  const cookies = parseCookies(request.headers.cookie)
  const token = cookies['clee_session']
  if (!token) return null
  return store.getSession(token)
}

function requireStudentSession(request: IncomingMessage): MemberSession {
  const session = getSessionFromRequest(request)
  if (!session) {
    throw new HttpError(401, 'Sign in required.')
  }
  if (session.user.role !== 'member') {
    throw new HttpError(403, 'Student access only.')
  }
  return session.user as MemberSession
}

function requireCompanySession(request: IncomingMessage): CompanySession {
  const session = getSessionFromRequest(request)
  if (!session) {
    throw new HttpError(401, 'Sign in required.')
  }
  if (session.user.role !== 'company') {
    throw new HttpError(403, 'Company access only.')
  }
  return session.user as CompanySession
}

function applyCors(request: IncomingMessage, response: ServerResponse) {
  const origin = request.headers.origin
  const allowed = env.corsOrigin

  if (allowed === '*') {
    response.setHeader('Access-Control-Allow-Origin', origin ?? '*')
  } else if (origin && (allowed as string[]).includes(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin)
  }

  response.setHeader('Access-Control-Allow-Credentials', 'true')
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
}

function sendJson(response: ServerResponse, statusCode: number, payload: unknown) {
  const body = JSON.stringify(payload)
  response.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body),
  })
  response.end(body)
}

async function readJsonBody<T>(request: IncomingMessage): Promise<T> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []

    request.on('data', (chunk: Buffer) => {
      chunks.push(chunk)
    })

    request.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf-8')

      if (!raw) {
        resolve({} as T)
        return
      }

      try {
        resolve(JSON.parse(raw) as T)
      } catch {
        reject(new HttpError(400, 'Invalid JSON body.'))
      }
    })

    request.on('error', reject)
  })
}
