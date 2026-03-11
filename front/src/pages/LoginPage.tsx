import { useState } from 'react'
import type { MemberAuthPayload } from '../lib/demoSession'
import { routeHref } from '../lib/hashRouter'

type LoginPageProps = {
  onSignIn: (payload: MemberAuthPayload) => Promise<void>
  actionLabel?: string
}

function LoginPage({ onSignIn, actionLabel = 'Continue to dashboard' }: LoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <>
      <section className="section-block" style={{ paddingBottom: 0 }}>
        <div style={{ maxWidth: '36rem' }}>
          <p className="eyebrow">Student sign in</p>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', lineHeight: 1.2, margin: '0.5rem 0 1rem' }}>
            Welcome back. Your workspace is waiting.
          </h1>
          <p className="page-intro" style={{ margin: 0 }}>
            Sign in to access your dashboard, track applications, and continue conversations with companies.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '1.5rem 0 0', color: 'var(--brand-blue)', fontWeight: 700, fontSize: '0.9rem' }}>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          Enter your credentials below
        </div>
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card" style={{ border: '2px solid var(--brand-blue)', boxShadow: '0 4px 24px rgba(31,95,175,0.08)' }}>
          <div className="section-heading" style={{ marginBottom: '1.25rem' }}>
            <div>
              <p className="eyebrow">Student access</p>
              <h2>Sign in to your account</h2>
            </div>
          </div>

          <form
            className="form-grid"
            onSubmit={async (event) => {
              event.preventDefault()
              setErrorMessage('')
              setIsSubmitting(true)
              try {
                await onSignIn({ email, name: '', password })
              } catch (error) {
                setErrorMessage(error instanceof Error ? error.message : 'Unable to sign in.')
              } finally {
                setIsSubmitting(false)
              }
            }}
          >
            <label className="field-shell">
              <span className="mini-label">School or work email</span>
              <input
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@university.ca"
                required
                type="email"
                value={email}
              />
            </label>

            <label className="field-shell">
              <span className="mini-label">Password</span>
              <input
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                required
                type="password"
                value={password}
              />
            </label>

            {errorMessage ? (
              <article className="info-card tone-red">
                <span className="mini-label">Sign-in error</span>
                <strong>{errorMessage}</strong>
              </article>
            ) : null}

            <button className="button button-primary" disabled={isSubmitting} style={{ marginTop: '0.25rem' }} type="submit">
              {isSubmitting ? 'Signing in…' : `${actionLabel} →`}
            </button>

            <p style={{ margin: '0.25rem 0 0', fontSize: '0.82rem', color: 'var(--ink-soft)', textAlign: 'center' }}>
              No account yet?{' '}
              <a href={routeHref('/students/create-account')} style={{ color: 'var(--brand-blue)', fontWeight: 700 }}>
                Create one here
              </a>
            </p>
          </form>
        </article>

        <div className="story-stack">
          <article className="info-card tone-blue">
            <span className="mini-label">Demo credentials</span>
            <strong>amira@concordia.ca</strong>
            <p>Password: <strong>clee12345</strong></p>
            <p style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
              Use this to explore the full student workspace — dashboard, projects, applications, and messages.
            </p>
          </article>

          <article className="panel-card">
            <div className="section-heading" style={{ marginBottom: '1rem' }}>
              <div>
                <p className="eyebrow">Other options</p>
                <h2>Not a student?</h2>
              </div>
            </div>
            <div className="list-stack">
              <a className="list-card" href={routeHref('/students/create-account')}>
                <div>
                  <strong>Create student account</strong>
                  <p>Set up your school profile and start applying to projects.</p>
                </div>
              </a>
              <a className="list-card" href={routeHref('/companies/sign-in')}>
                <div>
                  <strong>Company sign in</strong>
                  <p>Return to the company dashboard and manage posted projects.</p>
                </div>
              </a>
              <a className="list-card" href={routeHref('/companies/create-account')}>
                <div>
                  <strong>Create company account</strong>
                  <p>Post your first project brief and start receiving applications.</p>
                </div>
              </a>
            </div>
          </article>
        </div>
      </section>
    </>
  )
}

export default LoginPage
