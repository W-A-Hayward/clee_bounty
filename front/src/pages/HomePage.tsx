import ProjectCard from '../components/ProjectCard'
import SectionHeading from '../components/SectionHeading'
import type { CompanyProject } from '../data/companyPortal'
import { faqItems } from '../data/siteContent'
import type { StudentProject } from '../data/studentPortal'
import type { DemoSession } from '../lib/demoSession'
import { routeHref } from '../lib/hashRouter'

type HomePageProps = {
  session?: DemoSession
  studentProjects: StudentProject[]
  companyProjects: CompanyProject[]
}

const steps = [
  {
    number: '01',
    tone: 'step-number-blue',
    title: 'Browse real projects',
    body: 'Discover scoped freelance briefs with budget, timeline, work mode, and required skills visible before you click anything.',
  },
  {
    number: '02',
    tone: 'step-number-green',
    title: 'Apply when the fit is clear',
    body: 'Sign in as a student and submit a targeted application directly from the project brief page. Track it from your dashboard.',
  },
  {
    number: '03',
    tone: 'step-number-orange',
    title: 'Deliver with structure',
    body: 'Milestones, messages, and deliverables keep the collaboration clean — no scattered email chains or vague feedback loops.',
  },
]

function HomePage({ session = null, studentProjects, companyProjects }: HomePageProps) {
  const dashboardRoute = session?.role === 'company' ? '/company/dashboard' : '/dashboard'
  const dashboardCtaRoute = session ? dashboardRoute : '/auth'
  const dashboardLabel = session
    ? session.role === 'company'
      ? 'Company dashboard'
      : 'My dashboard'
    : 'Sign in'
  const uniqueCompanies = [...new Set(studentProjects.map((p) => p.company))].slice(0, 5)
  const featuredProject = studentProjects[0]
  const previewProjects = studentProjects.slice(0, 3)
  const displayedFaqItems = faqItems.slice(0, 6)

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Student freelance marketplace</p>
          <h1>Real projects. Real budgets. Real portfolio work.</h1>
          <p className="hero-lead">
            Students browse scoped freelance opportunities from verified companies — with budget,
            timeline, and deliverables visible upfront. Apply when it fits, deliver with structure.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href={routeHref('/projects')}>
              Browse projects
            </a>
            <a className="button button-secondary" href={routeHref('/companies/create-account')}>
              Post a project
            </a>
            <a className="button button-ghost" href={routeHref('/students')}>
              For students
            </a>
            <a className="button button-ghost" href={routeHref(dashboardCtaRoute)}>
              {dashboardLabel}
            </a>
          </div>

          <div className="metrics-grid">
            <article className="metric-card tone-blue">
              <strong>{studentProjects.length}</strong>
              <div>
                <span>live projects</span>
                <p>Scoped briefs across design, analytics, frontend, and content.</p>
              </div>
            </article>
            <article className="metric-card tone-green">
              <strong>{uniqueCompanies.length}+</strong>
              <div>
                <span>active companies</span>
                <p>Verified businesses posting real scoped work with clear budgets.</p>
              </div>
            </article>
            <article className="metric-card tone-orange">
              <strong>36h</strong>
              <div>
                <span>avg first reply</span>
                <p>Companies commit to response timing before going live on the board.</p>
              </div>
            </article>
          </div>
        </div>

        <div className="hero-stage">
          {featuredProject && (
            <article className={`hero-spotlight ${featuredProject.tone}`}>
              <div className="card-topline">
                <span className="mini-label">Featured project</span>
                <span className="status-pill status-live">{featuredProject.workMode}</span>
              </div>
              <h2>{featuredProject.title}</h2>
              <p>{featuredProject.summary}</p>
              <div className="project-card-meta">
                <span>{featuredProject.company}</span>
                <span>{featuredProject.budget}</span>
                <span>{featuredProject.duration}</span>
                <span>{featuredProject.deadlineLabel}</span>
              </div>
              <div className="tag-row">
                {featuredProject.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
              <a
                className="button button-secondary"
                href={routeHref(`/projects/${featuredProject.slug}`)}
              >
                View full brief
              </a>
            </article>
          )}

          <article className="hero-note tone-green">
            <span className="mini-label">Companies already posting</span>
            <div className="tag-row" style={{ marginBottom: '0.6rem' }}>
              {uniqueCompanies.map((company) => (
                <span key={company}>{company}</span>
              ))}
            </div>
            <p>
              Browse the board first. Sign in when you are ready to apply. If you are a company,
              create an account and publish your first brief today.
            </p>
          </article>
        </div>
      </section>

      {/* ── HIGHLIGHT BAR ────────────────────────────────────────── */}
      <div className="highlight-bar" style={{ margin: '0.5rem 0 0' }}>
        <span className="highlight-bar-dot dot-blue" />
        <span className="mini-label" style={{ margin: 0, color: 'var(--ink-strong)' }}>
          100% structured briefs
        </span>
        <span style={{ color: 'var(--ink-soft)', fontSize: '0.88rem' }}>
          Every project includes scope, budget, timeline, and skills before going live.
        </span>
        <span className="highlight-bar-dot dot-green" style={{ marginLeft: 'auto' }} />
        <span className="mini-label" style={{ margin: 0, color: 'var(--ink-strong)' }}>
          School-verified students
        </span>
        <span style={{ color: 'var(--ink-soft)', fontSize: '0.88rem' }}>
          Profiles carry real identity signal.
        </span>
        <span className="highlight-bar-dot dot-orange" />
        <span className="mini-label" style={{ margin: 0, color: 'var(--ink-strong)' }}>
          Milestone-based delivery
        </span>
        <span style={{ color: 'var(--ink-soft)', fontSize: '0.88rem' }}>
          Work moves in stages, not vague promises.
        </span>
      </div>

      {/* ── FRESH PROJECTS ───────────────────────────────────────── */}
      <section className="section-block">
        <SectionHeading
          eyebrow="Open opportunities"
          title="Fresh freelance briefs on the platform."
          description="Explore budget, duration, work mode, and skill fit before you open a single brief page."
        />

        <div className="project-grid">
          {previewProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <div className="hero-actions" style={{ marginTop: '1.5rem' }}>
          <a className="button button-primary" href={routeHref('/projects')}>
            See all {studentProjects.length} projects
          </a>
          <a className="button button-secondary" href={routeHref('/how-it-works')}>
            How it works
          </a>
        </div>
      </section>

      {/* ── HOW IT WORKS (3 steps) ───────────────────────────────── */}
      <section className="section-block">
        <SectionHeading
          eyebrow="Simple flow"
          title="Browse, apply, deliver — three clean steps."
          description="The platform is designed around real work, not vague gig listings. Every stage has a dedicated surface."
        />

        <div className="steps-grid">
          {steps.map((step) => (
            <article key={step.number} className="step-card">
              <span className={`step-number ${step.tone}`}>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── FOR STUDENTS / FOR COMPANIES ─────────────────────────── */}
      <section className="section-block portal-two-column">
        <article className="panel-card tone-green">
          <SectionHeading
            eyebrow="For students"
            title="Browse first, apply when it fits."
            description="Project briefs are public. No forced sign-up just to see what is on the board."
          />

          <div className="list-stack">
            <article className="list-card">
              <div>
                <strong>Full brief context upfront</strong>
                <p>See company, budget, timeline, work mode, and required skills before applying.</p>
              </div>
            </article>
            <article className="list-card">
              <div>
                <strong>Dashboard, applications, messages</strong>
                <p>
                  Sign in once and manage your entire freelance pipeline from one workspace.
                </p>
              </div>
            </article>
            <article className="list-card">
              <div>
                <strong>School-verified profile</strong>
                <p>
                  Your school identity gives companies more trust in your application from day one.
                </p>
              </div>
            </article>
          </div>

          <div className="hero-actions">
            <a className="button button-primary" href={routeHref('/students/create-account')}>
              Create student account
            </a>
            <a className="button button-secondary" href={routeHref('/students')}>
              Learn more
            </a>
          </div>
        </article>

        <article className="panel-card tone-blue">
          <SectionHeading
            eyebrow="For companies"
            title="Post scoped work, get better applicants."
            description="Write a structured brief once. Receive applications from students who already understand what you need."
          />

          <div className="list-stack">
            {companyProjects.slice(0, 2).map((project) => (
              <article key={project.id} className={`list-card ${project.tone}`}>
                <div>
                  <strong>{project.title}</strong>
                  <p>
                    {project.projectType} / {project.budget} / {project.workMode}
                  </p>
                </div>
                <div className="status-column">
                  <span className={`status-pill status-${project.status}`}>{project.status}</span>
                  <small>{project.applicants} applicants</small>
                </div>
              </article>
            ))}
          </div>

          <div className="hero-actions">
            <a className="button button-primary" href={routeHref('/companies/create-account')}>
              Create company account
            </a>
            <a className="button button-secondary" href={routeHref('/companies')}>
              Learn more
            </a>
          </div>
        </article>
      </section>

      {/* ── TRUST SIGNALS ────────────────────────────────────────── */}
      <section className="section-block">
        <SectionHeading
          eyebrow="Built on trust"
          title="Identity, structure, and moderation built in from day one."
          description="Both sides of the marketplace need to trust each other before a project can succeed."
        />

        <div className="feature-grid feature-grid-three">
          <article className="feature-card tone-blue">
            <span className="card-kicker">Identity</span>
            <h3>School-verified students, work-email verified companies</h3>
            <p>
              Every account uses a real identity signal — not just a username and password.
            </p>
          </article>
          <article className="feature-card tone-green">
            <span className="card-kicker">Structure</span>
            <h3>Every brief passes a standard before going live</h3>
            <p>
              Scope, deliverables, budget, timeline, and review cadence are required — not optional
              extras.
            </p>
          </article>
          <article className="feature-card tone-orange">
            <span className="card-kicker">Moderation</span>
            <h3>Disputes, verification, and quality control are real product surfaces</h3>
            <p>
              Platform governance is visible and designed in, not buried in fine print.
            </p>
          </article>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="section-block">
        <SectionHeading
          eyebrow="Common questions"
          title="What people ask before they get started."
          description="More detail is available on the how it works page, the for students page, and the for companies page."
        />

        <div className="faq-grid">
          {displayedFaqItems.map((item) => (
            <article key={item.question} className="faq-item">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>

        <div className="hero-actions" style={{ marginTop: '1.5rem' }}>
          <a className="button button-secondary" href={routeHref('/how-it-works')}>
            Full platform overview
          </a>
          <a className="button button-ghost" href={routeHref('/about')}>
            About Clee
          </a>
        </div>
      </section>

      {/* ── CTA PANEL ────────────────────────────────────────────── */}
      <section className="section-block">
        <div className="cta-panel-full">
          <div>
            <p className="eyebrow">Ready to start?</p>
            <h2>Join the marketplace that takes freelance work seriously.</h2>
            <p>
              Students get real portfolio work with verified companies. Companies get structured
              output without recruiting overhead. The platform keeps both sides accountable.
            </p>
          </div>
          <div className="cta-panel-actions">
            <a className="button button-primary" href={routeHref('/students/create-account')}>
              Create student account
            </a>
            <a className="button button-secondary" href={routeHref('/companies/create-account')}>
              Post a project
            </a>
            <a className="button button-ghost" href={routeHref('/projects')}>
              Browse first
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
