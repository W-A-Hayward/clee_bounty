import { useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import type { CompanyAuthPayload } from '../lib/demoSession'
import { routeHref } from '../lib/hashRouter'

type CompanyAccountPageProps = {
  onCreateAccount: (payload: CompanyAuthPayload) => Promise<void>
}

function CompanyAccountPage({ onCreateAccount }: CompanyAccountPageProps) {
  const [contactName, setContactName] = useState('Leah Martin')
  const [companyName, setCompanyName] = useState('Northline Systems')
  const [workEmail, setWorkEmail] = useState('team@northline.io')
  const [website, setWebsite] = useState('northline.io')
  const [industry, setIndustry] = useState('B2B SaaS')
  const [location, setLocation] = useState('Montreal / Remote team')
  const [teamSize, setTeamSize] = useState('42 people')
  const [password, setPassword] = useState('clee12345')
  const [description, setDescription] = useState(
    'Northline hires students for short, scoped product and operations projects with clear ownership.',
  )
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <>
      <section className="page-header split-header">
        <div>
          <p className="eyebrow">Company account</p>
          <h1>Create a company account and start publishing opportunities.</h1>
          <p className="page-intro">
            Set up the company profile, introduce the team clearly, and move directly into the
            workspace that manages project publishing.
          </p>
        </div>

        <article className="info-card tone-blue">
          <span className="mini-label">What happens next</span>
          <strong>Verification, profile setup, then posting</strong>
          <p>
            The company path is intentionally separate from the main member workspace because work
            email identity and team permissions behave differently.
          </p>
          <a className="button button-primary" href={routeHref('/companies/sign-in')}>
            Already have a company login?
          </a>
        </article>
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card">
          <SectionHeading
            eyebrow="Setup form"
            title="Base company account fields"
            description="Use the onboarding fields to create a company profile that reads clearly on the public website."
          />

          <form
            className="form-grid"
            onSubmit={async (event) => {
              event.preventDefault()
              setErrorMessage('')
              setIsSubmitting(true)

              try {
                await onCreateAccount({
                  name: contactName,
                  email: workEmail,
                  password,
                  companyName,
                  website,
                  industry,
                  location,
                  teamSize,
                  description,
                })
              } catch (error) {
                setErrorMessage(error instanceof Error ? error.message : 'Unable to create the company account.')
              } finally {
                setIsSubmitting(false)
              }
            }}
          >
            <label className="field-shell">
              <span className="mini-label">Contact name</span>
              <input onChange={(event) => setContactName(event.target.value)} required value={contactName} />
            </label>

            <label className="field-shell">
              <span className="mini-label">Company name</span>
              <input onChange={(event) => setCompanyName(event.target.value)} required value={companyName} />
            </label>

            <label className="field-shell">
              <span className="mini-label">Work email</span>
              <input
                onChange={(event) => setWorkEmail(event.target.value)}
                required
                type="email"
                value={workEmail}
              />
            </label>

            <div className="field-row">
              <label className="field-shell">
                <span className="mini-label">Website</span>
                <input onChange={(event) => setWebsite(event.target.value)} required value={website} />
              </label>

              <label className="field-shell">
                <span className="mini-label">Industry</span>
                <input onChange={(event) => setIndustry(event.target.value)} required value={industry} />
              </label>
            </div>

            <div className="field-row">
              <label className="field-shell">
                <span className="mini-label">Location</span>
                <input onChange={(event) => setLocation(event.target.value)} required value={location} />
              </label>

              <label className="field-shell">
                <span className="mini-label">Team size</span>
                <input onChange={(event) => setTeamSize(event.target.value)} required value={teamSize} />
              </label>
            </div>

            <label className="field-shell">
              <span className="mini-label">Password</span>
              <input
                onChange={(event) => setPassword(event.target.value)}
                required
                type="password"
                value={password}
              />
            </label>

            <label className="field-shell">
              <span className="mini-label">Company description</span>
              <textarea onChange={(event) => setDescription(event.target.value)} rows={4} value={description} />
            </label>

            {errorMessage ? (
              <article className="info-card tone-red">
                <span className="mini-label">Account error</span>
                <strong>{errorMessage}</strong>
              </article>
            ) : null}

            <button className="button button-primary" type="submit">
              {isSubmitting ? 'Creating account...' : 'Create account and open dashboard'}
            </button>
          </form>
        </article>

        <article className="panel-card">
          <SectionHeading eyebrow="Preview" title="Company profile card" />

          <article className="feature-card tone-green">
            <span className="card-kicker">Company preview</span>
            <h3>{companyName}</h3>
            <p>
              {industry} / {website}
            </p>
            <p>
              {location} / {teamSize}
            </p>
            <p>{workEmail}</p>
          </article>

          <a className="button button-secondary" href={routeHref('/companies/sign-in')}>
            Already have an account? Log in
          </a>
        </article>
      </section>
    </>
  )
}

export default CompanyAccountPage
