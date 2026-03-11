import { useState } from 'react'
import type { CompanyAuthPayload } from '../lib/demoSession'
import { routeHref } from '../lib/hashRouter'

type CompanyAccountPageProps = {
  onCreateAccount: (payload: CompanyAuthPayload) => Promise<void>
}

function CompanyAccountPage({ onCreateAccount }: CompanyAccountPageProps) {
  const [contactName, setContactName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [workEmail, setWorkEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [industry, setIndustry] = useState('')
  const [location, setLocation] = useState('')
  const [teamSize, setTeamSize] = useState('')
  const [password, setPassword] = useState('')
  const [description, setDescription] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <>
      <section className="section-block" style={{ paddingBottom: 0 }}>
        <div style={{ maxWidth: '36rem' }}>
          <p className="eyebrow">Join as a company</p>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', lineHeight: 1.2, margin: '0.5rem 0 1rem' }}>
            Create your account and start posting scoped projects.
          </h1>
          <p className="page-intro" style={{ margin: 0 }}>
            Set up your company profile in a few minutes. Students will see this when they review your briefs.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '1.5rem 0 0', color: 'var(--brand-orange)', fontWeight: 700, fontSize: '0.9rem' }}>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          Fill in the form below
        </div>
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card" style={{ border: '2px solid var(--brand-orange)', boxShadow: '0 4px 24px rgba(247,148,29,0.08)' }}>
          <div className="section-heading" style={{ marginBottom: '1.25rem' }}>
            <div>
              <p className="eyebrow">Company details</p>
              <h2>Your company profile</h2>
            </div>
          </div>

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
                  website: website || 'company.example',
                  industry: industry || 'Technology',
                  location: location || 'Remote',
                  teamSize: teamSize || '1–10 people',
                  description: description || 'A company posting scoped projects for students.',
                })
              } catch (error) {
                setErrorMessage(error instanceof Error ? error.message : 'Unable to create the company account.')
              } finally {
                setIsSubmitting(false)
              }
            }}
          >
            <div className="field-row">
              <label className="field-shell">
                <span className="mini-label">Your name</span>
                <input onChange={(e) => setContactName(e.target.value)} placeholder="Leah Martin" required value={contactName} />
              </label>
              <label className="field-shell">
                <span className="mini-label">Company name</span>
                <input onChange={(e) => setCompanyName(e.target.value)} placeholder="Northline Systems" required value={companyName} />
              </label>
            </div>

            <label className="field-shell">
              <span className="mini-label">Work email</span>
              <input onChange={(e) => setWorkEmail(e.target.value)} placeholder="you@company.com" required type="email" value={workEmail} />
            </label>

            <div className="field-row">
              <label className="field-shell">
                <span className="mini-label">Industry</span>
                <input onChange={(e) => setIndustry(e.target.value)} placeholder="e.g. B2B SaaS" value={industry} />
              </label>
              <label className="field-shell">
                <span className="mini-label">Location</span>
                <input onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Montreal / Remote" value={location} />
              </label>
            </div>

            <div className="field-row">
              <label className="field-shell">
                <span className="mini-label">Website <span style={{ color: 'var(--ink-soft)', fontWeight: 400 }}>(optional)</span></span>
                <input onChange={(e) => setWebsite(e.target.value)} placeholder="yourcompany.com" value={website} />
              </label>
              <label className="field-shell">
                <span className="mini-label">Team size <span style={{ color: 'var(--ink-soft)', fontWeight: 400 }}>(optional)</span></span>
                <input onChange={(e) => setTeamSize(e.target.value)} placeholder="e.g. 10–50 people" value={teamSize} />
              </label>
            </div>

            <label className="field-shell">
              <span className="mini-label">Password</span>
              <input onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" required type="password" value={password} />
            </label>

            <label className="field-shell">
              <span className="mini-label">Company description <span style={{ color: 'var(--ink-soft)', fontWeight: 400 }}>(optional)</span></span>
              <textarea onChange={(e) => setDescription(e.target.value)} placeholder="What kind of projects do you post? What's your team like?" rows={3} value={description} />
            </label>

            {errorMessage ? (
              <article className="info-card tone-red">
                <span className="mini-label">Error</span>
                <strong>{errorMessage}</strong>
              </article>
            ) : null}

            <button className="button button-primary" disabled={isSubmitting} style={{ marginTop: '0.25rem' }} type="submit">
              {isSubmitting ? 'Creating account…' : 'Create company account →'}
            </button>

            <p style={{ margin: '0.25rem 0 0', fontSize: '0.82rem', color: 'var(--ink-soft)', textAlign: 'center' }}>
              Already have an account?{' '}
              <a href={routeHref('/companies/sign-in')} style={{ color: 'var(--brand-orange)', fontWeight: 700 }}>
                Sign in here
              </a>
            </p>
          </form>
        </article>

        <div className="story-stack">
          <article className="info-card tone-orange">
            <span className="mini-label">What you get</span>
            <strong>A full company workspace</strong>
            <p>Post scoped briefs, review applicants, manage your pipeline, and message candidates — all in one place.</p>
          </article>

          <article className="panel-card">
            <div className="section-heading" style={{ marginBottom: '1rem' }}>
              <div>
                <p className="eyebrow">How it works</p>
                <h2>From account to first hire</h2>
              </div>
            </div>
            <div className="list-stack">
              {[
                { step: '01', label: 'Create your profile', desc: 'Company name, industry, location, and a short description.' },
                { step: '02', label: 'Post a project brief', desc: 'Scope, budget, timeline, and required skills — all in one form.' },
                { step: '03', label: 'Review applicants', desc: 'School-verified candidates with notes and portfolio links.' },
                { step: '04', label: 'Hire and deliver', desc: 'Message candidates, confirm the match, and track milestones.' },
              ].map(({ step, label, desc }) => (
                <article key={step} className="list-card">
                  <span style={{ fontFamily: 'Fraunces, serif', fontSize: '1.4rem', fontWeight: 700, color: 'var(--brand-orange)', lineHeight: 1, minWidth: '2rem' }}>
                    {step}
                  </span>
                  <div>
                    <strong>{label}</strong>
                    <p>{desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </article>
        </div>
      </section>
    </>
  )
}

export default CompanyAccountPage
