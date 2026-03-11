import { useDeferredValue, useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import { companyPublishingChecklist } from '../data/companyPortal'
import type { CompanySession } from '../lib/demoSession'
import type { CompanyProjectDraft } from '../lib/demoPlatform'
import { routeHref } from '../lib/hashRouter'

type CompanyPostProjectPageProps = {
  session: CompanySession
  onPostProject: (draft: CompanyProjectDraft) => Promise<string>
}

function CompanyPostProjectPage({ session, onPostProject }: CompanyPostProjectPageProps) {
  const [title, setTitle] = useState('')
  const [projectType, setProjectType] = useState('Freelance sprint')
  const [budget, setBudget] = useState('')
  const [workMode, setWorkMode] = useState('Remote')
  const [duration, setDuration] = useState('')
  const [experienceLevel, setExperienceLevel] = useState('Intermediate')
  const [deadline, setDeadline] = useState('')
  const [skills, setSkills] = useState('')
  const [deliverables, setDeliverables] = useState('')
  const [reviewCadence, setReviewCadence] = useState('')
  const [summary, setSummary] = useState('')
  const [postedSlug, setPostedSlug] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const deferredSummary = useDeferredValue(summary)
  const parsedSkills = skills
    .split(',')
    .map((skill) => skill.trim())
    .filter(Boolean)
  const parsedDeliverables = deliverables
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  return (
    <>
      <section className="section-block" style={{ paddingBottom: 0 }}>
        <div style={{ maxWidth: '36rem' }}>
          <p className="eyebrow">Post a project</p>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', lineHeight: 1.2, margin: '0.5rem 0 1rem' }}>
            Turn your company need into a clear brief on the board.
          </h1>
          <p className="page-intro" style={{ margin: 0 }}>
            Fill in scope, budget, timeline, and required skills. Students will see the full brief before they apply.
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
              <p className="eyebrow">Project brief</p>
              <h2>Project details</h2>
            </div>
          </div>

          <form
            className="form-grid"
            onSubmit={async (event) => {
              event.preventDefault()
              setErrorMessage('')
              setIsSubmitting(true)

              try {
                const slug = await onPostProject({
                  title,
                  projectType,
                  budget,
                  workMode,
                  duration,
                  experienceLevel,
                  deadlineLabel: deadline,
                  skills: parsedSkills,
                  deliverables: parsedDeliverables,
                  reviewCadence,
                  summary,
                })

                setPostedSlug(slug)
              } catch (error) {
                setErrorMessage(error instanceof Error ? error.message : 'Unable to publish the project.')
              } finally {
                setIsSubmitting(false)
              }
            }}
          >
            <article className="list-card" style={{ borderColor: 'var(--brand-orange)' }}>
              <div>
                <strong>Posting as {session.companyName}</strong>
                <p>{session.industry} · {session.website}</p>
              </div>
            </article>

            <div className="field-row">
              <label className="field-shell">
                <span className="mini-label">Project title</span>
                <input onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Frontend redesign sprint for a fintech dashboard" required value={title} />
              </label>

              <label className="field-shell">
                <span className="mini-label">Project type</span>
                <select onChange={(event) => setProjectType(event.target.value)} value={projectType}>
                  <option>Freelance sprint</option>
                  <option>Short-term engagement</option>
                  <option>Portfolio project</option>
                </select>
              </label>
            </div>

            <div className="field-row">
              <label className="field-shell">
                <span className="mini-label">Work mode</span>
                <select onChange={(event) => setWorkMode(event.target.value)} value={workMode}>
                  <option>Remote</option>
                  <option>Hybrid</option>
                  <option>On-site</option>
                </select>
              </label>

              <label className="field-shell">
                <span className="mini-label">Duration</span>
                <input onChange={(event) => setDuration(event.target.value)} placeholder="e.g. 4 weeks" required value={duration} />
              </label>
            </div>

            <div className="field-row">
              <label className="field-shell">
                <span className="mini-label">Budget</span>
                <input onChange={(event) => setBudget(event.target.value)} placeholder="e.g. $2k - $3.5k" required value={budget} />
              </label>

              <label className="field-shell">
                <span className="mini-label">Application deadline</span>
                <input onChange={(event) => setDeadline(event.target.value)} placeholder="e.g. Apply by Apr 10" required value={deadline} />
              </label>
            </div>

            <div className="field-row">
              <label className="field-shell">
                <span className="mini-label">Experience level</span>
                <select onChange={(event) => setExperienceLevel(event.target.value)} value={experienceLevel}>
                  <option>Early to intermediate</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </label>

              <label className="field-shell">
                <span className="mini-label">Required skills <span style={{ color: 'var(--ink-soft)', fontWeight: 400 }}>(comma-separated)</span></span>
                <input onChange={(event) => setSkills(event.target.value)} placeholder="e.g. React, Figma, Accessibility" required value={skills} />
              </label>
            </div>

            <label className="field-shell">
              <span className="mini-label">Project summary</span>
              <textarea onChange={(event) => setSummary(event.target.value)} placeholder="What is the scope? What problem does this solve? What does success look like?" required rows={4} value={summary} />
            </label>

            <label className="field-shell">
              <span className="mini-label">Deliverables <span style={{ color: 'var(--ink-soft)', fontWeight: 400 }}>(comma-separated)</span></span>
              <textarea
                onChange={(event) => setDeliverables(event.target.value)}
                placeholder="e.g. UI audit report, revised component library, handoff documentation"
                required
                rows={3}
                value={deliverables}
              />
            </label>

            <label className="field-shell">
              <span className="mini-label">Review cadence</span>
              <input onChange={(event) => setReviewCadence(event.target.value)} placeholder="e.g. Weekly async check-in, one live review at midpoint" required value={reviewCadence} />
            </label>

            {postedSlug ? (
              <article className="info-card tone-green">
                <span className="mini-label">Project published</span>
                <strong>Your new brief is live on the marketplace.</strong>
                <div className="hero-actions">
                  <a className="button button-primary" href={routeHref(`/projects/${postedSlug}`)}>
                    View public brief
                  </a>
                  <a className="button button-secondary" href={routeHref('/company/projects')}>
                    Open company projects
                  </a>
                </div>
              </article>
            ) : null}

            {errorMessage ? (
              <article className="info-card tone-red">
                <span className="mini-label">Publish error</span>
                <strong>{errorMessage}</strong>
              </article>
            ) : null}

            <button className="button button-primary" disabled={isSubmitting} style={{ marginTop: '0.25rem' }} type="submit">
              {isSubmitting ? 'Publishing…' : 'Publish project →'}
            </button>
          </form>
        </article>

        <div className="story-stack">
          {(title || summary) ? (
            <article className="panel-card">
              <SectionHeading eyebrow="Live preview" title="How this will look on the board" />

              <article className="project-card tone-orange">
                <div className="project-card-topline">
                  <span className="card-kicker">
                    {session.companyName} / {projectType}
                  </span>
                  <span className="meta-chip">{workMode}</span>
                </div>
                <h3>{title || 'Your project title'}</h3>
                <p>{deferredSummary || 'Your project summary will appear here.'}</p>
                <div className="project-card-meta">
                  {budget && <span>{budget}</span>}
                  {duration && <span>{duration}</span>}
                  {experienceLevel && <span>{experienceLevel}</span>}
                  {deadline && <span>{deadline}</span>}
                </div>
                {parsedSkills.length > 0 && (
                  <div className="tag-row">
                    {parsedSkills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                )}
              </article>

              {parsedDeliverables.length > 0 && (
                <div className="list-stack" style={{ marginTop: '0.75rem' }}>
                  {parsedDeliverables.map((item) => (
                    <article key={item} className="list-card">
                      <strong>{item}</strong>
                    </article>
                  ))}
                </div>
              )}
            </article>
          ) : (
            <article className="info-card tone-orange">
              <span className="mini-label">Live preview</span>
              <strong>Start filling in the form</strong>
              <p>A preview of your project card will appear here as you type.</p>
            </article>
          )}

          <article className="panel-card">
            <SectionHeading
              eyebrow="Publishing checklist"
              title="What makes a strong brief."
              description="Students can tell the difference between a real brief and a lazy posting. A detailed brief earns better applicants."
            />

            <ul className="point-list">
              {companyPublishingChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </>
  )
}

export default CompanyPostProjectPage
