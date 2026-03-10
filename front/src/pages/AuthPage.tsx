import SectionHeading from '../components/SectionHeading'
import type { DemoSession } from '../lib/demoSession'
import { routeHref } from '../lib/hashRouter'

type AuthPageProps = {
  session?: DemoSession
}

function AuthPage({ session = null }: AuthPageProps) {
  const workspaceRoute = session?.role === 'company' ? '/company/dashboard' : '/dashboard'
  const workspaceLabel =
    session?.role === 'company' ? 'Open company dashboard' : 'Open student dashboard'

  return (
    <>
      {/* ── PAGE HEADER ──────────────────────────────────────────── */}
      <section className="page-header split-header">
        <div>
          <p className="eyebrow">Account access</p>
          <h1>Your work starts here.</h1>
          <p className="page-intro">
            Browse projects as a guest or sign in to unlock your full workspace. Students apply and
            deliver. Companies post, review, and hire. Both sides get a clean dedicated path.
          </p>
        </div>

        <article className="info-card tone-blue">
          <span className="mini-label">
            {session ? 'Already signed in' : 'No account active'}
          </span>
          <strong>
            {session
              ? session.role === 'company'
                ? `${session.companyName} is active.`
                : `Welcome back, ${session.name}.`
              : 'Choose your path below.'}
          </strong>
          <p>
            {session
              ? 'Head to your workspace to manage projects, applications, and messages.'
              : 'Students browse and apply. Companies post and hire. Each role has its own workspace.'}
          </p>
          <div className="hero-actions">
            {session ? (
              <a className="button button-primary" href={routeHref(workspaceRoute)}>
                {workspaceLabel}
              </a>
            ) : (
              <>
                <a className="button button-primary" href={routeHref('/students/create-account')}>
                  Create student account
                </a>
                <a className="button button-secondary" href={routeHref('/companies/create-account')}>
                  Create company account
                </a>
              </>
            )}
          </div>
        </article>
      </section>

      {/* ── TWO PATH PANELS ──────────────────────────────────────── */}
      <section className="section-block portal-two-column">
        {/* STUDENT SIDE */}
        <article className="panel-card tone-green">
          <SectionHeading
            eyebrow="Students"
            title="Browse real work and build your portfolio."
            description="School-verified identity. Full brief before you apply. One dashboard for every project."
          />

          <div className="list-stack">
            <a className="list-card tone-green" href={routeHref('/students/sign-in')}>
              <div>
                <strong>Sign in as student</strong>
                <p>Return to your dashboard, application queue, and active project threads.</p>
              </div>
            </a>
            <a className="list-card" href={routeHref('/students/create-account')}>
              <div>
                <strong>Create student account</strong>
                <p>
                  Set up your school identity, availability, rate, and skills — then start browsing
                  with a credible profile ready to apply from.
                </p>
              </div>
            </a>
          </div>

          <div className="hero-actions" style={{ marginTop: '0.5rem' }}>
            <a className="button button-primary" href={routeHref('/students/create-account')}>
              Get started as a student
            </a>
            <a className="button button-secondary" href={routeHref('/students')}>
              Learn what you unlock
            </a>
          </div>
        </article>

        {/* COMPANY SIDE */}
        <article className="panel-card tone-orange">
          <SectionHeading
            eyebrow="Companies"
            title="Post structured work and hire emerging talent."
            description="Structured briefs. School-verified applicants. No job board fees."
          />

          <div className="list-stack">
            <a className="list-card tone-orange" href={routeHref('/companies/sign-in')}>
              <div>
                <strong>Sign in as company</strong>
                <p>
                  Return to your workspace — manage live briefs, review applicants, and keep hiring
                  conversations inside the platform.
                </p>
              </div>
            </a>
            <a className="list-card" href={routeHref('/companies/create-account')}>
              <div>
                <strong>Create company account</strong>
                <p>
                  Set up a verified company profile, then publish your first scoped brief in under
                  10 minutes.
                </p>
              </div>
            </a>
          </div>

          <div className="hero-actions" style={{ marginTop: '0.5rem' }}>
            <a className="button button-primary" href={routeHref('/companies/create-account')}>
              Get started as a company
            </a>
            <a className="button button-secondary" href={routeHref('/companies')}>
              Learn what you unlock
            </a>
          </div>
        </article>
      </section>

      {/* ── BROWSE FIRST NUDGE ───────────────────────────────────── */}
      <section className="section-block">
        <div className="cta-panel-full">
          <div>
            <p className="eyebrow">Not ready to sign up?</p>
            <h2>Browse the project board first.</h2>
            <p>
              The full project marketplace is public. Read real briefs, see actual budgets, and get
              a feel for the work quality before you commit to anything. No account required.
            </p>
          </div>
          <div className="cta-panel-actions">
            <a className="button button-primary" href={routeHref('/projects')}>
              Browse open projects
            </a>
            <a className="button button-secondary" href={routeHref('/how-it-works')}>
              How Clee works
            </a>
            <a className="button button-secondary" href={routeHref('/about')}>
              About the platform
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default AuthPage
