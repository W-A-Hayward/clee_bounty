import { useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import type { CompanyAuthPayload } from '../lib/demoSession'
import { routeHref } from '../lib/hashRouter'

type CompanyLoginPageProps = {
  onSignIn: (payload: CompanyAuthPayload) => Promise<void>
  actionLabel?: string
}

function CompanyLoginPage({ onSignIn, actionLabel = 'Continue to company dashboard' }: CompanyLoginPageProps) {
  const [name, setName] = useState('Leah Martin')
  const [email, setEmail] = useState('team@northline.io')
  const [companyName, setCompanyName] = useState('Northline Systems')
  const [password, setPassword] = useState('clee12345')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <>
      <section className="page-header split-header">
        <div>
          <p className="eyebrow">Company login</p>
          <h1>Open the company workspace and manage active projects.</h1>
          <p className="page-intro">
            Use the company access path to return to your dashboard, review applicants, and manage
            live project briefs.
          </p>
        </div>

        <article className="info-card tone-blue">
          <span className="mini-label">Company workspace</span>
          <strong>Projects, applicants, and posting flow</strong>
          <p>Use this path for company-side dashboards instead of the main member workspace.</p>
          <p>
            Seed company account: <strong>team@northline.io</strong> / <strong>clee12345</strong>
          </p>
        </article>
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card">
          <SectionHeading
            eyebrow="Company access"
            title="Work email and company identity"
            description="Use the company login to simulate a verified company member entering the workspace."
          />

          <form
            className="form-grid"
            onSubmit={async (event) => {
              event.preventDefault()
              setErrorMessage('')
              setIsSubmitting(true)

              try {
                await onSignIn({ companyName, email, name, password })
              } catch (error) {
                setErrorMessage(error instanceof Error ? error.message : 'Unable to sign in.')
              } finally {
                setIsSubmitting(false)
              }
            }}
          >
            <label className="field-shell">
              <span className="mini-label">Contact name</span>
              <input onChange={(event) => setName(event.target.value)} required value={name} />
            </label>

            <label className="field-shell">
              <span className="mini-label">Company name</span>
              <input onChange={(event) => setCompanyName(event.target.value)} required value={companyName} />
            </label>

            <label className="field-shell">
              <span className="mini-label">Work email</span>
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
          <SectionHeading eyebrow="Need an account?" title="Create a company profile first." />

          <div className="list-stack">
            <a className="list-card" href={routeHref('/companies/create-account')}>
              <strong>Create company account</strong>
              <p>Open a company profile and move into the posting flow.</p>
            </a>
            <a className="list-card" href={routeHref('/students/create-account')}>
              <strong>Create student account</strong>
              <p>Set up the student-side workspace for browsing and applications.</p>
            </a>
            <a className="list-card" href={routeHref('/students/sign-in')}>
              <strong>Member sign in</strong>
              <p>Use the main member entry if you are browsing or applying to projects.</p>
            </a>
          </div>
        </article>
      </section>
    </>
  )
}

export default CompanyLoginPage
