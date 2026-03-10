import type { IncomingMessage, ServerResponse } from 'node:http'
import { env } from './config/env.ts'
import { clearSessionCookie, parseCookies, serializeSessionCookie } from './lib/auth.ts'
import {
  FileStore,
  type CompanyAuthPayload,
  type CompanyProjectDraft,
  type MemberAuthPayload,
} from './lib/store.ts'

const store = new FileStore(env.dataFile)

export async function handleRequest(request: IncomingMessage, response: ServerResponse) {
  applyCors(request, response)

  if (request.method === 'OPTIONS') {
    response.writeHead(204)
    response.end()
    return
  }

  const method = request.method?.toUpperCase() ?? 'GET'
  const requestUrl = new URL(request.url ?? '/', env.displayUrl)
  const pathname = requestUrl.pathname.replace(/\/+$/, '') || '/'
  const session = getSessionFromRequest(request)

  try {
    if (method === 'GET' && pathname === '/') {
      sendJson(response, 200, {
        ok: true,
        service: 'clee-bounty-api',
        docs: {
          health: '/api/health',
          session: '/api/session',
          projects: '/api/projects',
        },
      })
      return
    }

    if (method === 'GET' && pathname === '/api') {
      sendJson(response, 200, {
        ok: true,
        service: 'clee-bounty-api',
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
          'GET /api/company/projects',
        ],
      })
      return
    }

    if (method === 'GET' && pathname === '/api/health') {
      sendJson(response, 200, {
        ok: true,
        service: 'clee-bounty-api',
        environment: env.nodeEnv,
        time: new Date().toISOString(),
        host: env.host,
        port: env.port,
        storageFile: env.dataFile,
      })
      return
    }

    if (method === 'GET' && pathname === '/api/session') {
      sendJson(response, 200, {
        ok: true,
        session: session?.user ?? null,
      })
      return
    }

    if (method === 'POST' && pathname === '/api/auth/student/login') {
      const body = await readJsonBody<MemberAuthPayload>(request)
      const createdSession = store.authenticateStudent(body)

      sendJson(
        response,
        200,
        {
          ok: true,
          session: createdSession.user,
        },
        {
          'Set-Cookie': serializeSessionCookie(createdSession.token),
        },
      )
      return
    }

    if (method === 'POST' && pathname === '/api/auth/student/register') {
      const body = await readJsonBody<MemberAuthPayload>(request)
      const createdSession = store.registerStudent(body)

      sendJson(
        response,
        201,
        {
          ok: true,
          session: createdSession.user,
        },
        {
          'Set-Cookie': serializeSessionCookie(createdSession.token),
        },
      )
      return
    }

    if (method === 'POST' && pathname === '/api/auth/company/login') {
      const body = await readJsonBody<CompanyAuthPayload>(request)
      const createdSession = store.authenticateCompany(body)

      sendJson(
        response,
        200,
        {
          ok: true,
          session: createdSession.user,
        },
        {
          'Set-Cookie': serializeSessionCookie(createdSession.token),
        },
      )
      return
    }

    if (method === 'POST' && pathname === '/api/auth/company/register') {
      const body = await readJsonBody<CompanyAuthPayload>(request)
      const createdSession = store.registerCompany(body)

      sendJson(
        response,
        201,
        {
          ok: true,
          session: createdSession.user,
        },
        {
          'Set-Cookie': serializeSessionCookie(createdSession.token),
        },
      )
      return
    }

    if (method === 'POST' && pathname === '/api/auth/logout') {
      if (session) {
        store.destroySession(session.token)
      }

      sendJson(
        response,
        200,
        {
          ok: true,
        },
        {
          'Set-Cookie': clearSessionCookie(),
        },
      )
      return
    }

    if (method === 'GET' && pathname === '/api/projects') {
      sendJson(response, 200, {
        ok: true,
        projects: store.listPublicProjects(),
      })
      return
    }

    if (method === 'GET' && pathname === '/api/applications') {
      const student = requireStudentSession(session)

      sendJson(response, 200, {
        ok: true,
        applications: store.listApplicationsForStudentEmail(student.email),
      })
      return
    }

    if (method === 'GET' && pathname === '/api/messages') {
      const student = requireStudentSession(session)

      sendJson(response, 200, {
        ok: true,
        messages: store.listMessagesForStudentEmail(student.email),
      })
      return
    }

    if (method === 'GET' && pathname === '/api/company/projects') {
      const company = requireCompanySession(session)

      sendJson(response, 200, {
        ok: true,
        projects: store.listCompanyProjectsByEmail(company.email),
      })
      return
    }

    if (method === 'POST' && pathname === '/api/projects') {
      const company = requireCompanySession(session)
      const body = await readJsonBody<CompanyProjectDraft>(request)

      sendJson(response, 201, {
        ok: true,
        project: store.createProject(company, body),
      })
      return
    }

    const applicationMatch = pathname.match(/^\/api\/projects\/([^/]+)\/applications$/)

    if (method === 'POST' && applicationMatch) {
      const student = requireStudentSession(session)
      const body = await readJsonBody<{
        companyName: string
        note: string
        projectTitle: string
      }>(request)

      const slug = decodeURIComponent(applicationMatch[1] ?? '')
      const result = store.createApplication(student, {
        projectSlug: slug,
        companyName: body.companyName,
        note: body.note,
        projectTitle: body.projectTitle,
      })

      sendJson(response, 201, {
        ok: true,
        message: result.message,
      })
      return
    }

    sendJson(response, 404, {
      ok: false,
      error: 'Not Found',
      path: pathname,
    })
  } catch (error) {
    if (error instanceof HttpError) {
      sendJson(
        response,
        error.statusCode,
        {
          ok: false,
          error: error.message,
        },
        error.clearSession ? { 'Set-Cookie': clearSessionCookie() } : {},
      )
      return
    }

    const message = error instanceof Error ? error.message : 'Unexpected server error'
    console.error('[api] unhandled error', error)
    sendJson(response, 500, {
      ok: false,
      error: message,
    })
  }
}

class HttpError extends Error {
  statusCode: number
  clearSession: boolean

  constructor(statusCode: number, message: string, options: { clearSession?: boolean } = {}) {
    super(message)
    this.statusCode = statusCode
    this.clearSession = options.clearSession ?? false
  }
}

function getSessionFromRequest(request: IncomingMessage) {
  const cookies = parseCookies(request.headers.cookie)
  const token = cookies.clee_session

  if (!token) {
    return null
  }

  return store.getSession(token)
}

function requireStudentSession(
  session: ReturnType<typeof getSessionFromRequest>,
) {
  if (!session || session.user.role !== 'member') {
    throw new HttpError(401, 'Student sign-in required.', {
      clearSession: Boolean(session),
    })
  }

  return session.user
}

function requireCompanySession(
  session: ReturnType<typeof getSessionFromRequest>,
) {
  if (!session || session.user.role !== 'company') {
    throw new HttpError(401, 'Company sign-in required.', {
      clearSession: Boolean(session),
    })
  }

  return session.user
}

function applyCors(request: IncomingMessage, response: ServerResponse) {
  const origin = request.headers.origin
  const allowOrigin =
    env.corsOrigin === '*'
      ? '*'
      : origin && env.corsOrigin.includes(origin)
        ? origin
        : env.corsOrigin[0]

  if (allowOrigin) {
    response.setHeader('Access-Control-Allow-Origin', allowOrigin)
  }

  if (env.corsOrigin !== '*') {
    response.setHeader('Vary', 'Origin')
  }

  response.setHeader('Access-Control-Allow-Credentials', 'true')
  response.setHeader('Access-Control-Allow-Methods', 'DELETE, GET, OPTIONS, PATCH, POST, PUT')
  response.setHeader(
    'Access-Control-Allow-Headers',
    request.headers['access-control-request-headers'] ?? 'Content-Type, Authorization',
  )
  response.setHeader('Access-Control-Max-Age', '86400')
}

function sendJson(
  response: ServerResponse,
  statusCode: number,
  payload: unknown,
  extraHeaders: Record<string, string> = {},
) {
  const body = JSON.stringify(payload, null, 2)

  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body).toString(),
    ...extraHeaders,
  })
  response.end(body)
}

async function readJsonBody<T>(request: IncomingMessage): Promise<T> {
  const chunks: Buffer[] = []

  for await (const chunk of request) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }

  const raw = Buffer.concat(chunks).toString('utf-8').trim()

  if (raw.length === 0) {
    return {} as T
  }

  try {
    return JSON.parse(raw) as T
  } catch {
    throw new HttpError(400, 'Invalid JSON body.')
  }
}
