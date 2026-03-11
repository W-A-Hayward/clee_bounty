import type { DemoSession } from '../lib/demoSession'
import { routeHref } from '../lib/hashRouter'

type AuthPageProps = {
  session?: DemoSession
}

function AuthPage({ session = null }: AuthPageProps) {
  const workspaceRoute = session?.role === 'company' ? '/company/dashboard' : '/dashboard'
  const workspaceLabel = session?.role === 'company' ? 'Open company dashboard' : 'Open student dashboard'

  return (
    <>
      <section className="section-block" style={{ paddingBottom: 0 }}>
        <div style={{ maxWidth: '38rem' }}>
          <p className="eyebrow">Account access</p>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: 1.2, margin: '0.5rem 0 1rem' }}>
            {session ? `Welcome back, ${session.role === 'company' ? (session as { companyName: string }).companyName : (session as { name: string }).name}.` : 'Sign in or create an account.'}
          </h1>
          <p className="page-intro" style={{ margin: 0 }}>
            {session
              ? 'Your workspace is ready. Head to your dashboard to manage projects, applications, and messages.'
              : 'Choose your path — student or company. Both have a dedicated workspace once you are inside.'}
          </p>
        </div>

        {session && (
          <div style={{ marginTop: '1.5rem' }}>
            <a className="button button-primary" href={routeHref(workspaceRoute)}>
              {workspaceLabel} →
            </a>
          </div>
        )}
      </section>

      <section className="section-block portal-two-column">
        {/* STUDENT SIDE */}
        <article className="panel-card" style={{ border: '2px solid var(--brand-green)', boxShadow: '0 4px 24px rgba(140,198,63,0.08)' }}>
          <div className="section-heading" style={{ marginBottom: '1.25rem' }}>
            <div>
              <p className="eyebrow">Students</p>
              <h2>Browse real work and build your portfolio.</h2>
            </div>
          </div>

          <div className="list-stack" style={{ marginBottom: '1.25rem' }}>
            <a className="list-card" href={routeHref('/students/sign-in')} style={{ borderColor: 'var(--brand-green)' }}>
              <div>
                <strong>Sign in as student</strong>
                <p>Return to your dashboard, application queue, and active project threads.</p>
              </div>
              <span style={{ color: 'var(--brand-green)', fontWeight: 700, fontSize: '1.1rem' }}>→</span>
            </a>
            <a className="list-card" href={routeHref('/students/create-account')}>
              <div>
                <strong>Create student account</strong>
                <p>Set up your school identity, availability, and rate — then start applying.</p>
              </div>
              <span style={{ color: 'var(--ink-soft)', fontWeight: 700, fontSize: '1.1rem' }}>→</span>
            </a>
          </div>

          <div className="hero-actions">
            <a className="button button-primary" href={routeHref('/students/sign-in')}>
              Student sign in
            </a>
            <a className="button button-secondary" href={routeHref('/students')}>
              Learn more
            </a>
          </div>
        </article>

        {/* COMPANY SIDE */}
        <article className="panel-card" style={{ border: '2px solid var(--brand-orange)', boxShadow: '0 4px 24px rgba(247,148,29,0.08)' }}>
          <div className="section-heading" style={{ marginBottom: '1.25rem' }}>
            <div>
              <p className="eyebrow">Companies</p>
              <h2>Post structured work and hire emerging talent.</h2>
            </div>
          </div>

          <div className="list-stack" style={{ marginBottom: '1.25rem' }}>
            <a className="list-card" href={routeHref('/companies/sign-in')} style={{ borderColor: 'var(--brand-orange)' }}>
              <div>
                <strong>Sign in as company</strong>
                <p>Return to your workspace — manage live briefs, review applicants, and message candidates.</p>
              </div>
              <span style={{ color: 'var(--brand-orange)', fontWeight: 700, fontSize: '1.1rem' }}>→</span>
            </a>
            <a className="list-card" href={routeHref('/companies/create-account')}>
              <div>
                <strong>Create company account</strong>
                <p>Set up a verified company profile and post your first scoped brief.</p>
              </div>
              <span style={{ color: 'var(--ink-soft)', fontWeight: 700, fontSize: '1.1rem' }}>→</span>
            </a>
          </div>

          <div className="hero-actions">
            <a className="button button-primary" href={routeHref('/companies/sign-in')}>
              Company sign in
            </a>
            <a className="button button-secondary" href={routeHref('/companies')}>
              Learn more
            </a>
          </div>
        </article>
      </section>

      <section className="section-block">
        <div className="cta-panel-full">
          <div>
            <p className="eyebrow">Not ready to sign up?</p>
            <h2>Browse the project board first.</h2>
            <p>
              The full marketplace is public. Read real briefs, see actual budgets, and get a feel
              for the work quality before creating an account.
            </p>
          </div>
          <div className="cta-panel-actions">
            <a className="button button-primary" href={routeHref('/projects')}>
              Browse open projects
            </a>
            <a className="button button-secondary" href={routeHref('/how-it-works')}>
              How Clee works
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default AuthPage
