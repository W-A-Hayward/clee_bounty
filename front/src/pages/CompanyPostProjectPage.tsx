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
  const [title, setTitle] = useState('Frontend redesign sprint for a fintech dashboard')
  const [projectType, setProjectType] = useState('Freelance sprint')
  const [budget, setBudget] = useState('$3.2k - $4.8k')
  const [workMode, setWorkMode] = useState('Remote')
  const [duration, setDuration] = useState('5 weeks')
  const [experienceLevel, setExperienceLevel] = useState('Intermediate')
  const [deadline, setDeadline] = useState('Apply by Mar 21')
  const [skills, setSkills] = useState('React, Accessibility, Product UI')
  const [deliverables, setDeliverables] = useState(
    'Audit the current UI, define priority component changes, deliver a handoff guide',
  )
  const [reviewCadence, setReviewCadence] = useState('Weekly async review with one live checkpoint')
  const [summary, setSummary] = useState(
    'Improve information density, refresh the component language, and support a faster release handoff.',
  )
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
      <section className="page-header split-header">
        <div>
          <p className="eyebrow">Post a project</p>
          <h1>Turn a company need into a clear opportunity on the website.</h1>
          <p className="page-intro">
            Use this page to turn an internal need into a structured public brief with clear scope,
            budget, timing, and review expectations.
          </p>
        </div>

        <article className="info-card tone-orange">
          <span className="mini-label">Posting logic</span>
          <strong>Scope, budget, work mode, skills, and deadline</strong>
          <p>The public site and the platform should show the same project card language so discovery stays coherent.</p>
        </article>
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card">
          <SectionHeading
            eyebrow="Project form"
            title="Base project posting fields"
            description="This version is fuller so a company can draft something that already reads like a real project brief."
          />

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
            <article className="list-card">
              <div>
                <strong>Posting as {session.companyName}</strong>
                <p>
                  {session.industry} / {session.website}
                </p>
              </div>
            </article>

            <div className="field-row">
              <label className="field-shell">
                <span className="mini-label">Project title</span>
                <input onChange={(event) => setTitle(event.target.value)} required value={title} />
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
                <input onChange={(event) => setDuration(event.target.value)} required value={duration} />
              </label>
            </div>

            <div className="field-row">
              <label className="field-shell">
                <span className="mini-label">Budget</span>
                <input onChange={(event) => setBudget(event.target.value)} required value={budget} />
              </label>

              <label className="field-shell">
                <span className="mini-label">Application deadline</span>
                <input onChange={(event) => setDeadline(event.target.value)} required value={deadline} />
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
                <span className="mini-label">Required skills</span>
                <input onChange={(event) => setSkills(event.target.value)} required value={skills} />
              </label>
            </div>

            <label className="field-shell">
              <span className="mini-label">Project summary</span>
              <textarea onChange={(event) => setSummary(event.target.value)} required rows={5} value={summary} />
            </label>

            <label className="field-shell">
              <span className="mini-label">Deliverables</span>
              <textarea
                onChange={(event) => setDeliverables(event.target.value)}
                required
                rows={4}
                value={deliverables}
              />
            </label>

            <label className="field-shell">
              <span className="mini-label">Review cadence</span>
              <input onChange={(event) => setReviewCadence(event.target.value)} required value={reviewCadence} />
            </label>

            {postedSlug ? (
              <article className="info-card tone-green">
                <span className="mini-label">Project published</span>
                <strong>Your new brief is live in the marketplace.</strong>
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

            <button className="button button-primary" type="submit">
              {isSubmitting ? 'Publishing...' : 'Publish project'}
            </button>
          </form>
        </article>

        <div className="story-stack">
          <article className="panel-card">
            <SectionHeading eyebrow="Live preview" title="How the opportunity reads on the platform" />

            <article className="project-card tone-blue">
              <div className="project-card-topline">
                <span className="card-kicker">
                  {session.companyName} / {projectType}
                </span>
                <span className="meta-chip">{workMode}</span>
              </div>
              <h3>{title}</h3>
              <p>{deferredSummary}</p>
              <div className="project-card-meta">
                <span>{budget}</span>
                <span>{duration}</span>
                <span>{experienceLevel}</span>
                <span>{deadline}</span>
              </div>
              <div className="tag-row">
                {parsedSkills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </article>

            <div className="list-stack">
              {parsedDeliverables.map((item) => (
                <article key={item} className="list-card">
                  <strong>{item}</strong>
                </article>
              ))}
            </div>

            <article className="info-card tone-orange">
              <span className="mini-label">Review cadence</span>
              <strong>{reviewCadence}</strong>
              <p>Applicants should understand how feedback and milestone approval will work before they apply.</p>
            </article>
          </article>

          <article className="panel-card">
            <SectionHeading
              eyebrow="Publishing checklist"
              title="A good project brief answers the same core questions every time."
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
