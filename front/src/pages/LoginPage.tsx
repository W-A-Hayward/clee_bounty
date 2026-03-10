import { useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import type { MemberAuthPayload } from '../lib/demoSession'
import { routeHref } from '../lib/hashRouter'

type LoginPageProps = {
  onSignIn: (payload: MemberAuthPayload) => Promise<void>
  actionLabel?: string
}

function LoginPage({ onSignIn, actionLabel = 'Continue to dashboard' }: LoginPageProps) {
  const [name, setName] = useState('Amira Khan')
  const [email, setEmail] = useState('amira@concordia.ca')
  const [password, setPassword] = useState('clee12345')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <>
      <section className="page-header split-header">
        <div>
          <p className="eyebrow">Sign in</p>
          <h1>Enter the platform and go straight to your dashboard.</h1>
          <p className="page-intro">
            Use the student access path to open your dashboard, review applications, and continue
            active project conversations.
          </p>
        </div>

        <article className="info-card tone-green">
          <span className="mini-label">After sign in</span>
          <strong>Dashboard, projects, applications, and messages</strong>
          <p>The main user flow starts here: sign in once, then the workspace becomes the default experience.</p>
          <p>
            Seed student account: <strong>amira@concordia.ca</strong> / <strong>clee12345</strong>
          </p>
        </article>
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card">
          <SectionHeading
            eyebrow="Student access"
            title="School or work identity"
            description="Use the student sign-in to open the main project, application, and message flow."
          />

          <form
            className="form-grid"
            onSubmit={async (event) => {
              event.preventDefault()
              setErrorMessage('')
              setIsSubmitting(true)

              try {
                await onSignIn({ email, name, password })
              } catch (error) {
                setErrorMessage(error instanceof Error ? error.message : 'Unable to sign in.')
              } finally {
                setIsSubmitting(false)
              }
            }}
          >
            <label className="field-shell">
              <span className="mini-label">Full name</span>
              <input onChange={(event) => setName(event.target.value)} required value={name} />
            </label>

            <label className="field-shell">
              <span className="mini-label">School or work email</span>
              <input
                onChange={(event) => setEmail(event.target.value)}
                required
                type="email"
                value={email}
              />
            </label>

            <label className="field-shell">
              <span className="mini-label">Password</span>
              <input
                onChange={(event) => setPassword(event.target.value)}
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

            <button className="button button-primary" type="submit">
              {isSubmitting ? 'Signing in...' : actionLabel}
            </button>
          </form>
        </article>

        <article className="panel-card">
          <SectionHeading eyebrow="Company?" title="Use the company login or create an account instead." />

          <div className="list-stack">
            <a className="list-card" href={routeHref('/students/create-account')}>
              <strong>Create student account</strong>
              <p>Set up your school profile, portfolio link, and availability before applying.</p>
            </a>
            <a className="list-card" href={routeHref('/companies/sign-in')}>
              <strong>Company login</strong>
              <p>Return to the company dashboard and manage posted projects.</p>
            </a>
            <a className="list-card" href={routeHref('/companies/create-account')}>
              <strong>Create company account</strong>
              <p>Open a company profile and prepare the first public project brief.</p>
            </a>
          </div>
        </article>
      </section>
    </>
  )
}

export default LoginPage
