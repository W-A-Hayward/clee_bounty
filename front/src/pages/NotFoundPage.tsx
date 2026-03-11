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
    body: 'Dashboard, applications, messages, and your profile — all in one place.',
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
      <section className="section-block" style={{ paddingBottom: 0 }}>
        <div style={{ maxWidth: '38rem' }}>
          <p className="eyebrow">404 — Page not found</p>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: 1.2, margin: '0.5rem 0 1rem' }}>
            This page doesn't exist.
          </h1>
          <p className="page-intro" style={{ margin: 0 }}>
            The route you followed isn't mapped — it may have moved, never existed, or the link was typed incorrectly. The rest of the platform is working fine.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
          <a className="button button-primary" href={routeHref('/')}>
            Back to homepage
          </a>
          <a className="button button-secondary" href={routeHref('/projects')}>
            Browse projects
          </a>
        </div>
      </section>

      <section className="section-block">
        <p className="eyebrow" style={{ marginBottom: '1rem' }}>Where would you like to go?</p>
        <div className="feature-grid feature-grid-two">
          {suggestions.map((s) => (
            <a key={s.title} className={`feature-card ${s.tone}`} href={routeHref(s.href)}>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="cta-panel-full">
          <div>
            <p className="eyebrow">Need your workspace?</p>
            <h2>Sign in and go straight to the right place.</h2>
            <p>
              If you were trying to reach a page that requires an account, sign in first and the platform will route you automatically.
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
