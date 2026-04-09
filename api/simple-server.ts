/**
 * Simple file-backed API server matching the frontend's API contract.
 * Uses data/store.json as the persistent data store.
 */

import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import crypto from "crypto";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STORE_PATH = path.join(__dirname, "data/store.json");

// ── Store helpers ────────────────────────────────────────────────────────────

function readStore() {
  return JSON.parse(readFileSync(STORE_PATH, "utf8")) as Store;
}

function writeStore(data: Store) {
  writeFileSync(STORE_PATH, JSON.stringify(data, null, 2));
}

// ── Types ────────────────────────────────────────────────────────────────────

type Student = {
  id: string;
  role: "member";
  name: string;
  email: string;
  passwordHash: string;
  school: string;
  program: string;
  portfolioUrl: string;
  availability: string;
  rate: string;
  createdAt: string;
};

type Company = {
  id: string;
  role: "company";
  name: string;
  email: string;
  passwordHash: string;
  companyName: string;
  website: string;
  industry: string;
  location: string;
  teamSize: string;
  description: string;
  createdAt: string;
};

type Application = {
  id: string;
  projectSlug: string;
  projectTitle: string;
  companyName: string;
  studentUserId: string;
  status: "submitted" | "shortlisted" | "interviewing" | "accepted";
  appliedLabel: string;
  note: string;
  createdAt: string;
};

type Message = {
  id: string;
  company: string;
  projectSlug: string;
  studentUserId: string;
  preview: string;
  lastActive: string;
  unread: number;
  thread: string[];
  updatedAt: string;
};

type CompanyMessage = {
  id: string;
  company: string;
  projectSlug: string;
  preview: string;
  lastActive: string;
  unread: number;
  thread: string[];
  studentName: string;
  studentEmail: string;
  updatedAt: string;
};

type Store = {
  students: Student[];
  companies: Company[];
  publicProjects: any[];
  companyProjects: any[];
  applications: Application[];
  messages: Message[];
  companyMessages?: CompanyMessage[];
  sessions: { token: string; userId: string; role: string; createdAt: string }[];
};

// ── Password helpers ──────────────────────────────────────────────────────────

function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString("hex");
    crypto.scrypt(password, salt, 64, (err, key) => {
      if (err) return reject(err);
      resolve(`${salt}:${key.toString("hex")}`);
    });
  });
}

function verifyPassword(password: string, stored: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const [salt, hash] = stored.split(":");
    if (!salt || !hash) return resolve(false);
    crypto.scrypt(password, salt, 64, (err, key) => {
      if (err) return reject(err);
      resolve(key.toString("hex") === hash);
    });
  });
}

// ── Session helpers ───────────────────────────────────────────────────────────

function createSession(userId: string, role: string): string {
  const token = crypto.randomBytes(24).toString("hex");
  const store = readStore();
  store.sessions.push({ token, userId, role, createdAt: new Date().toISOString() });
  // keep sessions lean — drop oldest beyond 100
  if (store.sessions.length > 100) store.sessions = store.sessions.slice(-100);
  writeStore(store);
  return token;
}

function getSessionUser(token: string): { userId: string; role: string } | null {
  if (!token) return null;
  const store = readStore();
  return store.sessions.find((s) => s.token === token) ?? null;
}

function resolveUser(userId: string, role: string, store: Store): any {
  if (role === "member") return store.students.find((s) => s.id === userId) ?? null;
  if (role === "company") return store.companies.find((c) => c.id === userId) ?? null;
  return null;
}

function buildMemberSession(user: Student) {
  return {
    role: "member" as const,
    name: user.name,
    email: user.email,
    school: user.school,
    program: user.program,
    portfolioUrl: user.portfolioUrl,
    availability: user.availability,
    rate: user.rate,
  };
}

function buildCompanySession(user: Company) {
  return {
    role: "company" as const,
    name: user.name,
    email: user.email,
    companyName: user.companyName,
    website: user.website,
    industry: user.industry,
    location: user.location,
    teamSize: user.teamSize,
    description: user.description,
  };
}

// ── App ───────────────────────────────────────────────────────────────────────

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

const COOKIE = "clee_session";

// ── Session ───────────────────────────────────────────────────────────────────

app.get("/api/session", (req, res) => {
  const token = req.cookies[COOKIE] as string | undefined;
  if (!token) return res.json({ ok: true, session: null });

  const sessionEntry = getSessionUser(token);
  if (!sessionEntry) return res.json({ ok: true, session: null });

  const store = readStore();
  const user = resolveUser(sessionEntry.userId, sessionEntry.role, store);
  if (!user) return res.json({ ok: true, session: null });

  const session = sessionEntry.role === "member"
    ? buildMemberSession(user)
    : buildCompanySession(user);

  return res.json({ ok: true, session });
});

// ── Auth ──────────────────────────────────────────────────────────────────────

app.post("/api/auth/student/login", async (req, res) => {
  const { email, password } = req.body as { email: string; password: string };
  const store = readStore();
  const user = store.students.find((s) => s.email === email);

  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return res.status(401).json({ error: "Invalid email or password." });
  }

  const token = createSession(user.id, "member");
  res.cookie(COOKIE, token, { httpOnly: true, sameSite: "lax", maxAge: 7 * 24 * 60 * 60 * 1000 });
  return res.json({ ok: true, session: buildMemberSession(user) });
});

app.post("/api/auth/student/register", async (req, res) => {
  const { name, email, password, school, program, portfolioUrl, availability, rate } = req.body as any;
  const store = readStore();

  if (store.students.find((s) => s.email === email)) {
    return res.status(409).json({ error: "Email already in use." });
  }

  const user: Student = {
    id: `stu_${crypto.randomBytes(4).toString("hex")}`,
    role: "member",
    name: name || email.split("@")[0],
    email,
    passwordHash: await hashPassword(password),
    school: school ?? "University",
    program: program ?? "Undeclared",
    portfolioUrl: portfolioUrl ?? "",
    availability: availability ?? "10h/week",
    rate: rate ?? "$25/hr",
    createdAt: new Date().toISOString(),
  };

  store.students.push(user);
  writeStore(store);

  const token = createSession(user.id, "member");
  res.cookie(COOKIE, token, { httpOnly: true, sameSite: "lax", maxAge: 7 * 24 * 60 * 60 * 1000 });
  return res.json({ ok: true, session: buildMemberSession(user) });
});

app.post("/api/auth/company/login", async (req, res) => {
  const { email, password } = req.body as { email: string; password: string };
  const store = readStore();
  const user = store.companies.find((c) => c.email === email);

  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return res.status(401).json({ error: "Invalid email or password." });
  }

  const token = createSession(user.id, "company");
  res.cookie(COOKIE, token, { httpOnly: true, sameSite: "lax", maxAge: 7 * 24 * 60 * 60 * 1000 });
  return res.json({ ok: true, session: buildCompanySession(user) });
});

app.post("/api/auth/company/register", async (req, res) => {
  const { name, email, password, companyName, website, industry, location, teamSize, description } = req.body as any;
  const store = readStore();

  if (store.companies.find((c) => c.email === email)) {
    return res.status(409).json({ error: "Email already in use." });
  }

  const user: Company = {
    id: `cmp_${crypto.randomBytes(4).toString("hex")}`,
    role: "company",
    name: name || email.split("@")[0],
    email,
    passwordHash: await hashPassword(password),
    companyName: companyName || "My Company",
    website: website ?? "",
    industry: industry ?? "Technology",
    location: location ?? "Remote",
    teamSize: teamSize ?? "1–10 people",
    description: description ?? "",
    createdAt: new Date().toISOString(),
  };

  store.companies.push(user);
  writeStore(store);

  const token = createSession(user.id, "company");
  res.cookie(COOKIE, token, { httpOnly: true, sameSite: "lax", maxAge: 7 * 24 * 60 * 60 * 1000 });
  return res.json({ ok: true, session: buildCompanySession(user) });
});

app.post("/api/auth/logout", (req, res) => {
  const token = req.cookies[COOKIE] as string | undefined;
  if (token) {
    const store = readStore();
    store.sessions = store.sessions.filter((s) => s.token !== token);
    writeStore(store);
  }
  res.clearCookie(COOKIE);
  return res.json({ ok: true });
});

// ── Projects (public) ─────────────────────────────────────────────────────────

app.get("/api/projects", (_req, res) => {
  const store = readStore();
  return res.json({ ok: true, projects: store.publicProjects });
});

app.post("/api/projects", (req, res) => {
  const token = req.cookies[COOKIE] as string | undefined;
  const session = token ? getSessionUser(token) : null;
  if (!session || session.role !== "company") {
    return res.status(401).json({ error: "Company account required." });
  }

  const store = readStore();
  const company = store.companies.find((c) => c.id === session.userId);
  if (!company) return res.status(401).json({ error: "Company not found." });

  const draft = req.body as any;
  const slug = draft.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);

  const uniqueSlug = `${slug}-${crypto.randomBytes(3).toString("hex")}`;

  const publicProject = {
    slug: uniqueSlug,
    title: draft.title,
    company: company.companyName,
    industry: company.industry,
    category: draft.projectType,
    workMode: draft.workMode,
    duration: draft.duration,
    budget: draft.budget,
    compensationType: "Fixed project budget",
    experienceLevel: draft.experienceLevel,
    deadlineLabel: draft.deadlineLabel,
    postedLabel: `Posted ${new Date().toLocaleDateString("en-CA", { month: "short", day: "numeric" })}`,
    summary: draft.summary,
    description: draft.summary,
    companySummary: company.description,
    fitReason: `Best fit for students with experience in ${(draft.skills as string[]).join(", ")}.`,
    skills: draft.skills,
    applicationChecklist: draft.deliverables.map((d: string) => `Share an example related to ${d}.`),
    matchScore: 85,
    tone: "tone-blue",
    deliverables: draft.deliverables,
    milestones: draft.deliverables.map((d: string, i: number) => ({
      title: d,
      dueLabel: `Checkpoint ${i + 1}`,
      amount: "Milestone budget set during kickoff",
      status: "pending",
    })),
  };

  const companyProject = {
    id: `prj_${crypto.randomBytes(4).toString("hex")}`,
    publicSlug: uniqueSlug,
    companyName: company.companyName,
    companyUserId: company.id,
    title: draft.title,
    status: "open",
    applicants: 0,
    shortlisted: 0,
    budget: draft.budget,
    workMode: draft.workMode,
    projectType: draft.projectType,
    experienceLevel: draft.experienceLevel,
    deadlineLabel: `Deadline ${draft.deadlineLabel}`,
    owner: company.name,
    summary: draft.summary,
    requiredSkills: draft.skills,
    nextStep: "New brief live — waiting for first applications.",
    tone: "tone-blue",
    createdAt: new Date().toISOString(),
  };

  store.publicProjects.unshift(publicProject);
  store.companyProjects.unshift(companyProject);
  writeStore(store);

  return res.json({ ok: true, project: publicProject });
});

// ── Applications (student) ────────────────────────────────────────────────────

app.get("/api/applications", (req, res) => {
  const token = req.cookies[COOKIE] as string | undefined;
  const session = token ? getSessionUser(token) : null;
  if (!session || session.role !== "member") {
    return res.status(401).json({ error: "Student account required." });
  }

  const store = readStore();
  const applications = store.applications.filter((a) => a.studentUserId === session.userId);
  return res.json({ ok: true, applications });
});

app.post("/api/projects/:slug/applications", (req, res) => {
  const token = req.cookies[COOKIE] as string | undefined;
  const session = token ? getSessionUser(token) : null;
  if (!session || session.role !== "member") {
    return res.status(401).json({ error: "Student account required." });
  }

  const store = readStore();
  const { slug } = req.params;
  const { note, companyName, projectTitle } = req.body as any;

  const existing = store.applications.find(
    (a) => a.projectSlug === slug && a.studentUserId === session.userId,
  );
  if (existing) {
    return res.status(409).json({ error: "Already applied to this project." });
  }

  const student = store.students.find((s) => s.id === session.userId);
  const project = store.publicProjects.find((p) => p.slug === slug);

  const appId = `app_${crypto.randomBytes(4).toString("hex")}`;
  const now = new Date();
  const appliedLabel = `Applied ${now.toLocaleDateString("en-CA", { month: "short", day: "numeric" })}`;

  const application: Application = {
    id: appId,
    projectSlug: slug,
    projectTitle: projectTitle ?? project?.title ?? slug,
    companyName: companyName ?? project?.company ?? "Company",
    studentUserId: session.userId,
    status: "submitted",
    appliedLabel,
    note: note ?? "",
    createdAt: now.toISOString(),
  };

  store.applications.push(application);

  // auto-create a message thread for this application
  const msgId = `msg_${crypto.randomBytes(4).toString("hex")}`;
  const studentName = student?.name ?? "Student";
  const compName = companyName ?? project?.company ?? "Company";

  store.messages.push({
    id: msgId,
    company: compName,
    projectSlug: slug,
    studentUserId: session.userId,
    preview: `Thanks for applying to ${application.projectTitle}. We will review your note shortly.`,
    lastActive: "Just now",
    unread: 1,
    thread: [
      `Hi ${studentName}, thanks for applying to ${application.projectTitle}.`,
      `Your note: ${note}`,
      "We will review your profile and follow up with next steps soon.",
    ],
    updatedAt: now.toISOString(),
  });

  // update company project applicant count
  const cp = store.companyProjects.find((p) => p.publicSlug === slug);
  if (cp) {
    cp.applicants = (cp.applicants ?? 0) + 1;
    cp.nextStep = "A fresh application arrived and is ready for first review.";
  }

  // ensure company messages exist
  if (!store.companyMessages) store.companyMessages = [];
  store.companyMessages.push({
    id: `cmsg_${crypto.randomBytes(4).toString("hex")}`,
    company: compName,
    projectSlug: slug,
    preview: `${studentName} applied: ${(note ?? "").slice(0, 60)}`,
    lastActive: "Just now",
    unread: 1,
    thread: [
      `${studentName} applied to ${application.projectTitle}.`,
      `Application note: ${note}`,
    ],
    studentName,
    studentEmail: student?.email ?? "",
    updatedAt: now.toISOString(),
  });

  writeStore(store);

  return res.json({ ok: true, message: `Application submitted to ${application.projectTitle}.` });
});

// ── Messages (student) ────────────────────────────────────────────────────────

app.get("/api/messages", (req, res) => {
  const token = req.cookies[COOKIE] as string | undefined;
  const session = token ? getSessionUser(token) : null;
  if (!session || session.role !== "member") {
    return res.status(401).json({ error: "Student account required." });
  }

  const store = readStore();
  const messages = store.messages.filter((m) => m.studentUserId === session.userId);
  return res.json({ ok: true, messages });
});

app.post("/api/messages/:id/reply", (req, res) => {
  const token = req.cookies[COOKIE] as string | undefined;
  const session = token ? getSessionUser(token) : null;
  if (!session || session.role !== "member") {
    return res.status(401).json({ error: "Student account required." });
  }

  const store = readStore();
  const student = store.students.find((s) => s.id === session.userId);
  const msg = store.messages.find(
    (m) => m.id === req.params.id && m.studentUserId === session.userId,
  );

  if (!msg) return res.status(404).json({ error: "Message not found." });

  const { text } = req.body as { text: string };
  msg.thread.push(`${student?.name ?? "You"}: ${text}`);
  msg.lastActive = "Just now";
  msg.unread = 0;
  msg.updatedAt = new Date().toISOString();
  writeStore(store);

  return res.json({ ok: true });
});

// ── Company: projects ─────────────────────────────────────────────────────────

app.get("/api/company/projects", (req, res) => {
  const token = req.cookies[COOKIE] as string | undefined;
  const session = token ? getSessionUser(token) : null;
  if (!session || session.role !== "company") {
    return res.status(401).json({ error: "Company account required." });
  }

  const store = readStore();
  const projects = store.companyProjects.filter((p) => p.companyUserId === session.userId);
  return res.json({ ok: true, projects });
});

// ── Company: applicants ───────────────────────────────────────────────────────

app.get("/api/company/applicants", (req, res) => {
  const token = req.cookies[COOKIE] as string | undefined;
  const session = token ? getSessionUser(token) : null;
  if (!session || session.role !== "company") {
    return res.status(401).json({ error: "Company account required." });
  }

  const store = readStore();
  const company = store.companies.find((c) => c.id === session.userId);
  if (!company) return res.status(401).json({ error: "Company not found." });

  const companyProjectSlugs = new Set(
    store.companyProjects
      .filter((p) => p.companyUserId === session.userId)
      .map((p) => p.publicSlug)
      .filter(Boolean),
  );

  const applicants = store.applications
    .filter((a) => companyProjectSlugs.has(a.projectSlug))
    .map((a) => {
      const student = store.students.find((s) => s.id === a.studentUserId);
      return {
        id: a.id,
        projectSlug: a.projectSlug,
        projectTitle: a.projectTitle,
        companyName: a.companyName,
        status: a.status,
        appliedLabel: a.appliedLabel,
        note: a.note,
        studentName: student?.name ?? "Student",
        studentSchool: student?.school ?? "",
        studentProgram: student?.program ?? "",
        studentPortfolio: student?.portfolioUrl ?? "",
        studentRate: student?.rate ?? "",
        studentAvailability: student?.availability ?? "",
      };
    });

  return res.json({ ok: true, applicants });
});

// ── Company: messages ─────────────────────────────────────────────────────────

app.get("/api/company/messages", (req, res) => {
  const token = req.cookies[COOKIE] as string | undefined;
  const session = token ? getSessionUser(token) : null;
  if (!session || session.role !== "company") {
    return res.status(401).json({ error: "Company account required." });
  }

  const store = readStore();
  const company = store.companies.find((c) => c.id === session.userId);
  if (!company) return res.status(401).json({ error: "Company not found." });

  const companyProjectSlugs = new Set(
    store.companyProjects
      .filter((p) => p.companyUserId === session.userId)
      .map((p) => p.publicSlug)
      .filter(Boolean),
  );

  // Build company-side messages from student messages that match company's projects
  const messages = store.messages
    .filter((m) => companyProjectSlugs.has(m.projectSlug))
    .map((m) => {
      const student = store.students.find((s) => s.id === m.studentUserId);
      return {
        id: m.id,
        company: m.company,
        projectSlug: m.projectSlug,
        preview: m.preview,
        lastActive: m.lastActive,
        unread: m.unread,
        thread: m.thread,
        studentName: student?.name ?? "Student",
        studentEmail: student?.email ?? "",
      };
    });

  return res.json({ ok: true, messages });
});

// ── Profile update (student) ──────────────────────────────────────────────────

app.patch("/api/profile", (req, res) => {
  const token = req.cookies[COOKIE] as string | undefined;
  const session = token ? getSessionUser(token) : null;
  if (!session || session.role !== "member") {
    return res.status(401).json({ error: "Student account required." });
  }

  const store = readStore();
  const user = store.students.find((s) => s.id === session.userId);
  if (!user) return res.status(404).json({ error: "User not found." });

  const updates = req.body as Partial<Pick<Student, "name" | "school" | "program" | "portfolioUrl" | "availability" | "rate">>;
  if (updates.name) user.name = updates.name;
  if (updates.school) user.school = updates.school;
  if (updates.program) user.program = updates.program;
  if (updates.portfolioUrl !== undefined) user.portfolioUrl = updates.portfolioUrl;
  if (updates.availability) user.availability = updates.availability;
  if (updates.rate) user.rate = updates.rate;

  writeStore(store);

  return res.json({ ok: true, session: buildMemberSession(user) });
});

// ── Start ─────────────────────────────────────────────────────────────────────

const PORT = Number(process.env.PORT ?? 4000);
app.listen(PORT, () => {
  console.log(`[api] listening on http://localhost:${PORT}`);
});
