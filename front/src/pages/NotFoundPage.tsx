import { routeHref } from '../lib/hashRouter'

const suggestions = [
  {
    title: 'Browse open projects',
    body: 'See the full marketplace — budgets, timelines, skills, and briefs.',
    href: '/projects',
    tone: 'tone-blue' as const,
  },
  {
    title: 'Student workspace',
    body: 'Dashboard, applications, messages, and your profile — everything in one place.',
    href: '/dashboard',
    tone: 'tone-green' as const,
  },
  {
    title: 'Company workspace',
    body: 'Post a brief, review applicants, or manage live projects from your dashboard.',
    href: '/company/dashboard',
    tone: 'tone-orange' as const,
  },
  {
    title: 'How Clee works',
    body: 'Understand the platform flow from first browse to final delivery.',
    href: '/how-it-works',
    tone: 'tone-blue' as const,
  },
]

function NotFoundPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="page-header split-header">
        <div>
          <p className="eyebrow">404 — Not found</p>
          <h1>This page does not exist.</h1>
          <p className="page-intro">
            The route you followed is not mapped. It may have moved, never existed, or the link
            was typed incorrectly. The rest of the platform is working fine.
          </p>
        </div>

        <article className="info-card tone-red">
          <span className="mini-label">Let us get you back on track</span>
          <strong>Start from a known location.</strong>
          <p>
            The homepage, project board, and your workspace are all one click away. Use the links
            below or pick from the suggestions further down.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href={routeHref('/')}>
              Back to homepage
            </a>
            <a className="button button-secondary" href={routeHref('/projects')}>
              Browse projects
            </a>
          </div>
        </article>
      </section>

      {/* ── SUGGESTIONS ──────────────────────────────────────────── */}
      <section className="section-block">
        <div className="feature-grid feature-grid-two">
          {suggestions.map((s) => (
            <a key={s.title} className={`feature-card ${s.tone}`} href={routeHref(s.href)}>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </a>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────── */}
      <section className="section-block">
        <div className="cta-panel-full">
          <div>
            <p className="eyebrow">Still lost?</p>
            <h2>Sign in and go straight to your workspace.</h2>
            <p>
              If you were trying to reach a page that requires an account, sign in first and the
              platform will route you to the right place automatically.
            </p>
          </div>
          <div className="cta-panel-actions">
            <a className="button button-primary" href={routeHref('/students/sign-in')}>
              Student sign in
            </a>
            <a className="button button-secondary" href={routeHref('/companies/sign-in')}>
              Company sign in
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default NotFoundPage
