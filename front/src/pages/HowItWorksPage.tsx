import SectionHeading from '../components/SectionHeading'
import {
  companyPostingChecklist,
  companySteps,
  memberJourney,
  publicWorkflow,
  trustSignals,
} from '../data/siteContent'
import { routeHref } from '../lib/hashRouter'

function HowItWorksPage() {
  return (
    <>
      {/* ── PAGE HEADER ──────────────────────────────────────────── */}
      <section className="page-header split-header">
        <div>
          <p className="eyebrow">How it works</p>
          <h1>One platform, two workspaces, and a clean freelance loop.</h1>
          <p className="page-intro">
            Clee connects students with scoped project work from verified companies. Every stage —
            discovery, application, matching, and delivery — has a dedicated surface built for it.
          </p>
        </div>

        <article className="info-card tone-blue">
          <span className="mini-label">At a glance</span>
          <strong>Students browse, apply, and deliver. Companies post, review, and hire.</strong>
          <p>
            The public website is the discovery layer. Sign in to unlock the workspace — a separate
            dashboard tailored to each audience.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href={routeHref('/projects')}>
              Browse projects
            </a>
            <a className="button button-secondary" href={routeHref('/auth')}>
              Get started
            </a>
          </div>
        </article>
      </section>

      {/* ── CORE FLOW (5 steps) ──────────────────────────────────── */}
      <section className="section-block">
        <SectionHeading
          eyebrow="Core flow"
          title="Five stages from browse to completed project."
          description="Each step maps to a real page or module in the platform. Nothing is skipped or left to email."
        />

        <div className="workflow-grid">
          {publicWorkflow.map((step) => (
            <article key={step.step} className={`workflow-card ${step.tone}`}>
              <span className="workflow-step">{step.step}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── STUDENT PATH + COMPANY PATH ──────────────────────────── */}
      <section className="section-block portal-two-column">
        <article className="panel-card">
          <SectionHeading
            eyebrow="Student path"
            title="Browse first, commit when it makes sense."
            description="The student workspace is built around the full apply-to-deliver loop, not just a project list."
          />

          <div className="list-stack">
            {memberJourney.map((step) => (
              <article key={step.title} className={`list-card ${step.tone}`}>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.body}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="hero-actions">
            <a className="button button-primary" href={routeHref('/students/create-account')}>
              Create student account
            </a>
            <a className="button button-ghost" href={routeHref('/students')}>
              For students
            </a>
          </div>
        </article>

        <article className="panel-card">
          <SectionHeading
            eyebrow="Company path"
            title="Post, review, match, and collaborate — all in one workspace."
            description="The company side is intentionally separate so project publishing and applicant review have the right operational surface."
          />

          <div className="list-stack">
            {companySteps.map((step) => (
              <article key={step.title} className="list-card">
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.body}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="hero-actions">
            <a className="button button-primary" href={routeHref('/companies/create-account')}>
              Create company account
            </a>
            <a className="button button-ghost" href={routeHref('/companies')}>
              For companies
            </a>
          </div>
        </article>
      </section>

      {/* ── BRIEF STANDARD ───────────────────────────────────────── */}
      <section className="section-block">
        <SectionHeading
          eyebrow="Brief standard"
          title="Every project answers the same core questions."
          description="This is what makes the marketplace feel usable instead of vague. Strong briefs attract better-fit applicants."
        />

        <div className="feature-grid feature-grid-two">
          <article className="panel-card">
            <p className="eyebrow">What every brief must include</p>
            <ul className="point-list">
              {companyPostingChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <div className="list-stack">
            <article className="feature-card tone-blue">
              <span className="card-kicker">Why this matters</span>
              <h3>Clarity at the brief level reduces back-and-forth at every stage after</h3>
              <p>
                Applicants who read a clear brief already know whether to apply. Companies who write
                a clear brief get applications that actually match the work.
              </p>
            </article>
            <article className="feature-card tone-green">
              <span className="card-kicker">What happens next</span>
              <h3>After submitting, students track status from the applications queue</h3>
              <p>
                Status changes, messages, and milestone updates all flow through the same workspace
                — nothing gets lost in a separate inbox.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ── TRUST ────────────────────────────────────────────────── */}
      <section className="section-block">
        <SectionHeading
          eyebrow="Trust signals"
          title="Credibility is visible on both sides of the marketplace."
          description="Trust is a product decision, not a compliance task. These surfaces are designed in — not bolted on."
        />

        <div className="feature-grid feature-grid-three">
          {trustSignals.map((signal) => (
            <article key={signal.title} className={`feature-card ${signal.tone}`}>
              <h3>{signal.title}</h3>
              <p>{signal.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="section-block">
        <div className="cta-panel-full">
          <div>
            <p className="eyebrow">Start using the platform</p>
            <h2>The loop works best when you try it directly.</h2>
            <p>
              Browse the project board first. Sign in when you find a brief worth applying to.
              If you are a company, create an account and post your first scoped opportunity.
            </p>
          </div>
          <div className="cta-panel-actions">
            <a className="button button-primary" href={routeHref('/projects')}>
              Browse projects
            </a>
            <a className="button button-secondary" href={routeHref('/students/create-account')}>
              Student account
            </a>
            <a className="button button-ghost" href={routeHref('/companies/create-account')}>
              Company account
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default HowItWorksPage
