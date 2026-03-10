import SectionHeading from '../components/SectionHeading'
import { memberJourney, trustSignals } from '../data/siteContent'
import type { DemoSession } from '../lib/demoSession'
import { routeHref } from '../lib/hashRouter'

type ForStudentsPageProps = {
  session?: DemoSession
}

const benefits = [
  {
    title: 'See the full brief before you apply',
    body: 'Budget, timeline, work mode, deliverables, and company context are visible from the project card — no surprise scope changes after you commit.',
    tone: 'tone-blue' as const,
  },
  {
    title: 'Build a portfolio with real outcomes',
    body: 'Every project has defined deliverables and milestones, so your work is documented and presentable by the time you finish.',
    tone: 'tone-green' as const,
  },
  {
    title: 'One workspace for the whole pipeline',
    body: 'Applications, messages, milestone updates, and notifications all live in your dashboard — nothing gets lost in email.',
    tone: 'tone-orange' as const,
  },
  {
    title: 'School-verified identity builds trust',
    body: 'Your school identity makes your profile credible before a company even reads your application note. No extra steps required.',
    tone: 'tone-blue' as const,
  },
  {
    title: 'Set your rate and availability',
    body: 'Control how much you earn and how much time you commit. Only projects that fit your schedule surface as strong matches.',
    tone: 'tone-green' as const,
  },
  {
    title: 'Apply to multiple projects in parallel',
    body: 'Track all your applications in one queue. See what moved, what needs a reply, and what is still waiting for company action.',
    tone: 'tone-orange' as const,
  },
]

const workspacePages = [
  {
    title: 'Browse projects',
    href: '/projects',
    body: 'Full briefs with budget, timeline, work mode, and skills — all visible before you sign in.',
    tone: 'tone-blue' as const,
  },
  {
    title: 'Your dashboard',
    href: '/dashboard',
    body: 'Recommended projects, active applications, milestone queue, and unread messages in one place.',
    tone: 'tone-green' as const,
  },
  {
    title: 'Applications queue',
    href: '/applications',
    body: 'Track every submission, see status changes, and understand what companies want next.',
    tone: 'tone-orange' as const,
  },
  {
    title: 'Messages',
    href: '/messages',
    body: 'Keep company conversations inside the platform, linked to the project they belong to.',
    tone: 'tone-blue' as const,
  },
  {
    title: 'Your profile',
    href: '/profile',
    body: 'Manage your portfolio link, skills, rate, and availability — the signal companies read first.',
    tone: 'tone-green' as const,
  },
] as const

function ForStudentsPage({ session = null }: ForStudentsPageProps) {
  const primaryRoute = session?.role === 'member' ? '/dashboard' : '/students/create-account'
  const primaryLabel = session?.role === 'member' ? 'Open your dashboard' : 'Create student account'

  return (
    <>
      {/* ── PAGE HEADER ──────────────────────────────────────────── */}
      <section className="page-header split-header">
        <div>
          <p className="eyebrow">For students</p>
          <h1>Freelance work with structure, not chaos.</h1>
          <p className="page-intro">
            Browse scoped projects from verified companies. Apply with a clear brief in hand.
            Deliver through a workspace that tracks everything — so your portfolio proof is built in
            by the time you finish.
          </p>
        </div>

        <article className="info-card tone-green">
          <span className="mini-label">Student flow</span>
          <strong>Browse → Apply → Deliver → Portfolio credit</strong>
          <p>
            No forced sign-up just to see what is on the board. Browse first, sign in when you find
            something worth applying to, and manage everything from one dashboard after that.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href={routeHref(primaryRoute)}>
              {primaryLabel}
            </a>
            <a className="button button-secondary" href={routeHref('/projects')}>
              Browse projects
            </a>
          </div>
        </article>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────────────── */}
      <section className="section-block">
        <SectionHeading
          eyebrow="Why students use it"
          title="What the platform actually gives you."
          description="These are the concrete advantages over the typical freelance or gig experience students deal with elsewhere."
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
          eyebrow="The student journey"
          title="A clear path from first browse to first delivery."
          description="Each stage has a dedicated workspace surface so nothing falls through the cracks between application and payment."
        />

        <div className="feature-grid feature-grid-three">
          {memberJourney.map((step) => (
            <article key={step.title} className={`feature-card ${step.tone}`}>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── WORKSPACE PAGES + TRUST ──────────────────────────────── */}
      <section className="section-block portal-two-column">
        <article className="panel-card">
          <SectionHeading
            eyebrow="Your workspace"
            title="Every surface you unlock after signing in."
            description="These pages are live and connected. Each one is built around a specific part of the student workflow."
          />

          <div className="list-stack">
            {workspacePages.map((page) => (
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
            eyebrow="Why trust matters"
            title="You deserve to know a project is real before you invest time applying."
            description="By the time you read a brief, the company behind it has already committed to the platform's standard."
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
            <p className="eyebrow">Ready to find real work?</p>
            <h2>Your first freelance project is already on the board.</h2>
            <p>
              Create a student account, set up your profile with your skills and availability, and
              start browsing briefs. Apply when the fit is real — not just when you are bored
              scrolling a gig board.
            </p>
          </div>
          <div className="cta-panel-actions">
            <a className="button button-primary" href={routeHref('/students/create-account')}>
              Create account
            </a>
            <a className="button button-secondary" href={routeHref('/projects')}>
              Browse projects first
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default ForStudentsPage
