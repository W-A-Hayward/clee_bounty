import { useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import type { MemberAuthPayload } from '../lib/demoSession'
import { routeHref } from '../lib/hashRouter'

type StudentAccountPageProps = {
  onCreateAccount: (payload: MemberAuthPayload) => Promise<void>
}

function StudentAccountPage({ onCreateAccount }: StudentAccountPageProps) {
  const [name, setName] = useState('Amira Khan')
  const [email, setEmail] = useState('amira@concordia.ca')
  const [school, setSchool] = useState('Concordia University')
  const [program, setProgram] = useState('BCompSc, Product + Frontend')
  const [portfolioUrl, setPortfolioUrl] = useState('amira.design')
  const [availability, setAvailability] = useState('12h/week')
  const [rate, setRate] = useState('$28/hr')
  const [password, setPassword] = useState('clee12345')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <>
      <section className="page-header split-header">
        <div>
          <p className="eyebrow">Student account</p>
          <h1>Create a student profile and move straight into the marketplace.</h1>
          <p className="page-intro">
            Collect the basics that make the student workspace useful from day one: identity,
            school context, portfolio signal, and availability.
          </p>
        </div>

        <article className="info-card tone-green">
          <span className="mini-label">What this unlocks</span>
          <strong>Dashboard, applications, messages, and project apply flow</strong>
          <p>A student account makes the marketplace feel real instead of stopping at static project cards.</p>
          <a className="button button-secondary" href={routeHref('/students/sign-in')}>
            Already have a sign-in?
          </a>
        </article>
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card">
          <SectionHeading
            eyebrow="Setup form"
            title="Student profile basics"
            description="Keep it concise, but include enough information for a company to understand fit quickly."
          />

          <form
            className="form-grid"
            onSubmit={async (event) => {
              event.preventDefault()
              setErrorMessage('')
              setIsSubmitting(true)

              try {
                await onCreateAccount({
                  name,
                  email,
                  password,
                  school,
                  program,
                  portfolioUrl,
                  availability,
                  rate,
                })
              } catch (error) {
                setErrorMessage(error instanceof Error ? error.message : 'Unable to create the student account.')
              } finally {
                setIsSubmitting(false)
              }
            }}
          >
            <div className="field-row">
              <label className="field-shell">
                <span className="mini-label">Full name</span>
                <input onChange={(event) => setName(event.target.value)} required value={name} />
              </label>

              <label className="field-shell">
                <span className="mini-label">School email</span>
                <input
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  type="email"
                  value={email}
                />
              </label>
            </div>

            <div className="field-row">
              <label className="field-shell">
                <span className="mini-label">School</span>
                <input onChange={(event) => setSchool(event.target.value)} required value={school} />
              </label>

              <label className="field-shell">
                <span className="mini-label">Program</span>
                <input onChange={(event) => setProgram(event.target.value)} required value={program} />
              </label>
            </div>

            <div className="field-row">
              <label className="field-shell">
                <span className="mini-label">Portfolio</span>
                <input onChange={(event) => setPortfolioUrl(event.target.value)} required value={portfolioUrl} />
              </label>

              <label className="field-shell">
                <span className="mini-label">Availability</span>
                <input onChange={(event) => setAvailability(event.target.value)} required value={availability} />
              </label>
            </div>

            <label className="field-shell">
              <span className="mini-label">Target rate</span>
              <input onChange={(event) => setRate(event.target.value)} required value={rate} />
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
                <span className="mini-label">Account error</span>
                <strong>{errorMessage}</strong>
              </article>
            ) : null}

            <button className="button button-primary" type="submit">
              {isSubmitting ? 'Creating account...' : 'Create student account'}
            </button>
          </form>
        </article>

        <article className="panel-card">
          <SectionHeading eyebrow="Preview" title="How your profile will read in the workspace" />

          <div className="list-stack">
            <article className="list-card">
              <div>
                <strong>{name}</strong>
                <p>{program}</p>
              </div>
            </article>
            <article className="list-card">
              <div>
                <strong>{school}</strong>
                <p>{email}</p>
              </div>
            </article>
            <article className="list-card">
              <div>
                <strong>{portfolioUrl}</strong>
                <p>
                  {availability} / {rate}
                </p>
              </div>
            </article>
          </div>
        </article>
      </section>
    </>
  )
}

export default StudentAccountPage
