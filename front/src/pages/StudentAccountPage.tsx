import { useState } from 'react'
import type { MemberAuthPayload } from '../lib/demoSession'
import { routeHref } from '../lib/hashRouter'

type StudentAccountPageProps = {
  onCreateAccount: (payload: MemberAuthPayload) => Promise<void>
}

function StudentAccountPage({ onCreateAccount }: StudentAccountPageProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [school, setSchool] = useState('')
  const [program, setProgram] = useState('')
  const [portfolioUrl, setPortfolioUrl] = useState('')
  const [availability, setAvailability] = useState('')
  const [rate, setRate] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <>
      <section className="section-block" style={{ paddingBottom: 0 }}>
        <div style={{ maxWidth: '36rem' }}>
          <p className="eyebrow">Join as a student</p>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', lineHeight: 1.2, margin: '0.5rem 0 1rem' }}>
            Create your account and start applying to real projects.
          </h1>
          <p className="page-intro" style={{ margin: 0 }}>
            Takes about two minutes. Fill in the form below — companies will see your profile when you apply to a brief.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '1.5rem 0 0', color: 'var(--brand-green)', fontWeight: 700, fontSize: '0.9rem' }}>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          Fill in the form below
        </div>
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card" style={{ border: '2px solid var(--brand-green)', boxShadow: '0 4px 24px rgba(140,198,63,0.10)' }}>
          <div className="section-heading" style={{ marginBottom: '1.25rem' }}>
            <div>
              <p className="eyebrow">Your details</p>
              <h2>Student profile basics</h2>
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
                  name,
                  email,
                  password,
                  school,
                  program,
                  portfolioUrl: portfolioUrl || 'portfolio.example',
                  availability: availability || '10h/week',
                  rate: rate || '$25/hr',
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
                <input onChange={(e) => setName(e.target.value)} placeholder="Amira Khan" required value={name} />
              </label>
              <label className="field-shell">
                <span className="mini-label">School email</span>
                <input onChange={(e) => setEmail(e.target.value)} placeholder="you@university.ca" required type="email" value={email} />
              </label>
            </div>

            <div className="field-row">
              <label className="field-shell">
                <span className="mini-label">School</span>
                <input onChange={(e) => setSchool(e.target.value)} placeholder="Concordia University" required value={school} />
              </label>
              <label className="field-shell">
                <span className="mini-label">Program</span>
                <input onChange={(e) => setProgram(e.target.value)} placeholder="e.g. BCompSc, Product + Design" required value={program} />
              </label>
            </div>

            <div className="field-row">
              <label className="field-shell">
                <span className="mini-label">Availability</span>
                <input onChange={(e) => setAvailability(e.target.value)} placeholder="e.g. 12h/week" value={availability} />
              </label>
              <label className="field-shell">
                <span className="mini-label">Target rate</span>
                <input onChange={(e) => setRate(e.target.value)} placeholder="e.g. $28/hr" value={rate} />
              </label>
            </div>

            <label className="field-shell">
              <span className="mini-label">
                Portfolio URL{' '}
                <span style={{ color: 'var(--ink-soft)', fontWeight: 400 }}>(optional)</span>
              </span>
              <input onChange={(e) => setPortfolioUrl(e.target.value)} placeholder="yourname.design or github.com/you" value={portfolioUrl} />
            </label>

            <label className="field-shell">
              <span className="mini-label">Password</span>
              <input onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" required type="password" value={password} />
            </label>

            {errorMessage ? (
              <article className="info-card tone-red">
                <span className="mini-label">Error</span>
                <strong>{errorMessage}</strong>
              </article>
            ) : null}

            <button className="button button-primary" disabled={isSubmitting} style={{ marginTop: '0.25rem' }} type="submit">
              {isSubmitting ? 'Creating account…' : 'Create student account →'}
            </button>

            <p style={{ margin: '0.25rem 0 0', fontSize: '0.82rem', color: 'var(--ink-soft)', textAlign: 'center' }}>
              Already have an account?{' '}
              <a href={routeHref('/students/sign-in')} style={{ color: 'var(--brand-blue)', fontWeight: 700 }}>
                Sign in here
              </a>
            </p>
          </form>
        </article>

        <div className="story-stack">
          <article className="info-card tone-green">
            <span className="mini-label">What you unlock</span>
            <strong>A full student workspace</strong>
            <p>Browse projects, apply with a note, track your pipeline, and message companies — all from one place.</p>
          </article>

          <article className="panel-card">
            <div className="section-heading" style={{ marginBottom: '1rem' }}>
              <div>
                <p className="eyebrow">How it works</p>
                <h2>Four steps to your first project</h2>
              </div>
            </div>
            <div className="list-stack">
              {[
                { step: '01', label: 'Create your profile', desc: 'School, program, rate, and portfolio in two minutes.' },
                { step: '02', label: 'Browse open projects', desc: 'Scoped briefs with budget, timeline, and skill fit.' },
                { step: '03', label: 'Apply with a note', desc: 'Short note explaining your fit. No long cover letter.' },
                { step: '04', label: 'Get matched', desc: 'Companies review your profile and reach out directly.' },
              ].map(({ step, label, desc }) => (
                <article key={step} className="list-card">
                  <span style={{ fontFamily: 'Fraunces, serif', fontSize: '1.4rem', fontWeight: 700, color: 'var(--brand-green)', lineHeight: 1, minWidth: '2rem' }}>
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

export default StudentAccountPage
