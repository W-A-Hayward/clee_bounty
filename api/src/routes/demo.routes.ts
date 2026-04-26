import { Router, type Request, type Response } from "express";
import { join } from "node:path";
import {
  clearSessionCookie,
  parseCookies,
  serializeSessionCookie,
} from "../lib/auth.ts";
import { FileStore, type CompanySession, type MemberSession } from "../lib/store.ts";

const store = new FileStore(join(process.cwd(), "data", "store.json"));
const router = Router();

router.get("/session", (req, res) => {
  const session = getSession(req);
  res.json({ ok: true, session: session?.user ?? null });
});

router.post("/auth/student/login", (req, res) => {
  handleAuth(res, () => store.authenticateStudent(req.body));
});

router.post("/auth/student/register", (req, res) => {
  handleAuth(res, () => store.registerStudent(req.body));
});

router.post("/auth/company/login", (req, res) => {
  handleAuth(res, () => store.authenticateCompany(req.body));
});

router.post("/auth/company/register", (req, res) => {
  handleAuth(res, () => store.registerCompany(req.body));
});

router.post("/auth/logout", (req, res) => {
  const token = getSessionToken(req);
  if (token) {
    store.destroySession(token);
  }

  res.setHeader("Set-Cookie", clearSessionCookie());
  res.json({ ok: true });
});

router.get("/projects", (_req, res) => {
  res.json({ ok: true, projects: store.listPublicProjects() });
});

router.post("/projects", (req, res) => {
  const session = requireCompanySession(req, res);
  if (!session) return;

  respond(res, () => ({
    ok: true,
    project: store.createProject(session, req.body),
  }));
});

router.post("/projects/:slug/applications", (req, res) => {
  const session = requireMemberSession(req, res);
  if (!session) return;

  respond(res, () => ({
    ok: true,
    ...store.createApplication(session, {
      ...req.body,
      projectSlug: req.params.slug,
    }),
  }));
});

router.get("/applications", (req, res) => {
  const session = requireMemberSession(req, res);
  if (!session) return;

  res.json({
    ok: true,
    applications: store.listApplicationsForStudentEmail(session.email),
  });
});

router.get("/messages", (req, res) => {
  const session = requireMemberSession(req, res);
  if (!session) return;

  res.json({
    ok: true,
    messages: store.listMessagesForStudentEmail(session.email),
  });
});

router.post("/messages/:id/reply", (req, res) => {
  const session = requireMemberSession(req, res);
  if (!session) return;

  respond(res, () => {
    store.addStudentMessageReply(req.params.id, session.email, String(req.body.text ?? ""));
    return { ok: true };
  });
});

router.patch("/profile", (req, res) => {
  const session = requireMemberSession(req, res);
  if (!session) return;

  respond(res, () => ({
    ok: true,
    session: store.updateStudentProfile(session.email, req.body),
  }));
});

router.get("/company/projects", (req, res) => {
  const session = requireCompanySession(req, res);
  if (!session) return;

  res.json({
    ok: true,
    projects: store.listCompanyProjectsByEmail(session.email),
  });
});

router.get("/company/applicants", (req, res) => {
  const session = requireCompanySession(req, res);
  if (!session) return;

  res.json({
    ok: true,
    applicants: store.listCompanyApplicants(session.email),
  });
});

router.get("/company/messages", (req, res) => {
  const session = requireCompanySession(req, res);
  if (!session) return;

  res.json({
    ok: true,
    messages: store.listCompanyMessages(session.email),
  });
});

function handleAuth(
  res: Response,
  action: () => { token: string; user: MemberSession | CompanySession },
) {
  respond(res, () => {
    const result = action();
    res.setHeader("Set-Cookie", serializeSessionCookie(result.token));
    return { ok: true, session: result.user };
  });
}

function respond(res: Response, action: () => unknown) {
  try {
    res.json(action());
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
}

function getSession(req: Request) {
  const token = getSessionToken(req);
  return token ? store.getSession(token) : null;
}

function getSessionToken(req: Request) {
  return parseCookies(req.headers.cookie).clee_session;
}

function requireMemberSession(req: Request, res: Response) {
  const session = getSession(req);
  if (!session || session.user.role !== "member") {
    res.status(401).json({ error: "Please sign in as a student." });
    return null;
  }

  return session.user;
}

function requireCompanySession(req: Request, res: Response) {
  const session = getSession(req);
  if (!session || session.user.role !== "company") {
    res.status(401).json({ error: "Please sign in as a company." });
    return null;
  }

  return session.user;
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong.";
}

export default router;
