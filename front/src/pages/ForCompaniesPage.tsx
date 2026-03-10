import SectionHeading from '../components/SectionHeading'
import {
  companyOperatingPrinciples,
  companyPostingChecklist,
  companySteps,
  trustSignals,
} from '../data/siteContent'
import { routeHref } from '../lib/hashRouter'

const benefits = [
  {
    title: 'Post scoped work in under 10 minutes',
    body: 'The posting form structures the brief as you fill it out — title, scope, budget, skills, and review cadence are all prompted.',
    tone: 'tone-blue' as const,
  },
  {
    title: 'Get applicants who read the whole brief',
    body: 'Students see every detail before they apply. The applications you receive are from people who already understood the scope.',
    tone: 'tone-green' as const,
  },
  {
    title: 'Review candidates in one organized queue',
    body: 'All applicants for all projects appear in the applicants section. Filter by project, see fit scores, and take action directly.',
    tone: 'tone-orange' as const,
  },
  {
    title: 'Keep hiring conversations inside the platform',
    body: 'Company messages are threaded, project-linked, and visible to your whole team. No more forwarding email chains.',
    tone: 'tone-blue' as const,
  },
  {
    title: 'Milestone-based execution from day one',
    body: 'When a student is matched, the work moves through staged milestones — not vague task lists that drift into scope creep.',
    tone: 'tone-green' as const,
  },
  {
    title: 'No recruiting overhead',
    body: 'No job boards, no long interview loops, no legal complexity. Post a scoped brief, review applicants, and start the work.',
    tone: 'tone-orange' as const,
  },
]

const companyPages = [
  {
    title: 'Company dashboard',
    href: '/company/dashboard',
    body: 'Live project inventory, applicant volume, shortlist health, and pipeline status in one view.',
    tone: 'tone-blue' as const,
  },
  {
    title: 'Post a project',
    href: '/company/post-project',
    body: 'Draft a project brief with scope, budget, skills, and delivery expectations. Preview it as candidates will see it.',
    tone: 'tone-green' as const,
  },
  {
    title: 'Applicants',
    href: '/company/applicants',
    body: 'All candidates across your live projects in one queue. Shortlist, invite, or decline with full profile context.',
    tone: 'tone-orange' as const,
  },
  {
    title: 'Company messages',
    href: '/company/messages',
    body: 'Project-linked conversations with applicants. Reply fast, keep context, and maintain a clear hiring record.',
    tone: 'tone-blue' as const,
  },
] as const

function ForCompaniesPage() {
  return (
    <>
      {/* ── PAGE HEADER ──────────────────────────────────────────── */}
      <section className="page-header split-header">
        <div>
          <p className="eyebrow">For companies</p>
          <h1>Post short-term work and hire emerging talent without the overhead.</h1>
          <p className="page-intro">
            Clee gives companies a structured way to publish scoped freelance projects, review
            school-verified applicants, and manage delivery — without the usual recruiting chaos.
          </p>
        </div>

        <article className="info-card tone-blue">
          <span className="mini-label">Company value</span>
          <strong>Structured briefs → verified applicants → milestone delivery</strong>
          <p>
            Create a company profile, publish your first brief, and start collecting applications
            from students who already know exactly what the work involves.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href={routeHref('/companies/create-account')}>
              Create company account
            </a>
            <a className="button button-secondary" href={routeHref('/companies/sign-in')}>
              Company sign in
            </a>
          </div>
        </article>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────────────── */}
      <section className="section-block">
        <SectionHeading
          eyebrow="What companies get"
          title="A structured hiring loop from brief to delivery."
          description="These are the concrete advantages over the typical informal gig arrangement or expensive recruiter process."
        />

        <div className="feature-grid feature-grid-three">
          {benefits.map((benefit) => (
            <article key={benefit.title} className={`feature-card ${benefit.tone}`}>
              <h3>{benefit.title}</h3>
              <p>{benefit.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── JOURNEY ──────────────────────────────────────────────── */}
      <section className="section-block">
        <SectionHeading
          eyebrow="Company journey"
          title="From first account to active project — three clean steps."
          description="The company workspace is purpose-built so the operational tasks each have the right surface."
        />

        <div className="steps-grid">
          {companySteps.map((step, index) => {
            const tones = ['step-number-blue', 'step-number-green', 'step-number-orange']
            return (
              <article key={step.title} className="step-card">
                <span className={`step-number ${tones[index % 3]}`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            )
          })}
        </div>
      </section>

      {/* ── OPERATING PRINCIPLES + CHECKLIST ─────────────────────── */}
      <section className="section-block portal-two-column">
        <article className="panel-card">
          <SectionHeading
            eyebrow="Operating principles"
            title="What the platform expects from companies."
            description="These principles are what make Clee feel different from a generic gig board — for companies and students alike."
          />

          <div className="list-stack">
            {companyOperatingPrinciples.map((principle) => (
              <article key={principle.title} className={`list-card ${principle.tone}`}>
                <div>
                  <strong>{principle.title}</strong>
                  <p>{principle.body}</p>
                </div>
              </article>
            ))}
          </div>
        </article>

        <article className="panel-card">
          <SectionHeading
            eyebrow="Brief standard"
            title="What every strong project brief includes."
            description="Students can tell the difference between a real brief and a lazy posting. A strong brief earns stronger applicants."
          />

          <ul className="point-list">
            {companyPostingChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="hero-actions" style={{ marginTop: '0.5rem' }}>
            <a className="button button-primary" href={routeHref('/company/post-project')}>
              See the posting form
            </a>
          </div>
        </article>
      </section>

      {/* ── COMPANY WORKSPACE PAGES ───────────────────────────────── */}
      <section className="section-block portal-two-column">
        <article className="panel-card">
          <SectionHeading
            eyebrow="Company workspace"
            title="Every surface available after you sign in."
            description="These pages are built for the company-side workflow. Each one covers a specific part of the hiring and delivery loop."
          />

          <div className="list-stack">
            {companyPages.map((page) => (
              <a key={page.title} className={`list-card ${page.tone}`} href={routeHref(page.href)}>
                <div>
                  <strong>{page.title}</strong>
                  <p>{page.body}</p>
                </div>
              </a>
            ))}
          </div>
        </article>

        <article className="panel-card">
          <SectionHeading
            eyebrow="Trust on the company side"
            title="Why applicants need to trust you before they invest time applying."
            description="The platform enforces the same trust standard for companies that it does for students."
          />

          <div className="list-stack">
            {trustSignals.map((signal) => (
              <article key={signal.title} className={`list-card ${signal.tone}`}>
                <div>
                  <strong>{signal.title}</strong>
                  <p>{signal.body}</p>
                </div>
              </article>
            ))}
          </div>
        </article>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="section-block">
        <div className="cta-panel-full">
          <div>
            <p className="eyebrow">Ready to hire?</p>
            <h2>Post your first scoped project today.</h2>
            <p>
              Create a company account, fill in the brief form, and your opportunity goes live on
              the student board. No job board fees. No vague gig descriptions. Just structured work
              that attracts the right applicants.
            </p>
          </div>
          <div className="cta-panel-actions">
            <a className="button button-primary" href={routeHref('/companies/create-account')}>
              Create company account
            </a>
            <a className="button button-secondary" href={routeHref('/company/post-project')}>
              See the posting form
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default ForCompaniesPage
