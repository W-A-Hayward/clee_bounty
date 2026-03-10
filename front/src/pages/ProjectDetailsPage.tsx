import { useEffect, useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import type { StudentProject } from '../data/studentPortal'
import type { MemberSession } from '../lib/demoSession'
import { routeHref } from '../lib/hashRouter'
import type { DemoApplicationResult } from '../lib/demoPlatform'

type ProjectDetailsPageProps = {
  project?: StudentProject
  session?: MemberSession | null
  hasApplied?: boolean
  onApply?: (note: string) => Promise<DemoApplicationResult>
  onRequestSignIn?: () => void
}

function ProjectDetailsPage({
  project,
  session = null,
  hasApplied = false,
  onApply,
  onRequestSignIn,
}: ProjectDetailsPageProps) {
  const [note, setNote] = useState('')
  const [applicationFeedback, setApplicationFeedback] = useState<DemoApplicationResult | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!project) {
      return
    }

    setNote(`Hi ${project.company}, I would be a strong fit for ${project.title} because `)
    setApplicationFeedback(null)
  }, [project?.slug])

  if (!project) {
    return (
      <section className="section-block">
        <article className="panel-card">
          <h2>Project not found.</h2>
          <p>The requested project does not exist in the current project feed.</p>
          <a className="button button-primary" href={routeHref('/projects')}>
            Back to projects
          </a>
        </article>
      </section>
    )
  }

  return (
    <>
      <section className="section-block portal-section-tight">
        <div className="detail-hero">
          <div>
            <p className="eyebrow">{project.company}</p>
            <h2>{project.title}</h2>
            <p className="page-intro">{project.description}</p>
          </div>

          <article className={`info-card ${project.tone}`}>
            <span className="mini-label">Quick facts</span>
            <strong>{project.budget}</strong>
            <p>
              {project.compensationType} / {project.experienceLevel}
            </p>
            <p>
              {project.workMode} / {project.duration} / {project.deadlineLabel}
            </p>
            <p>{project.postedLabel}</p>
            <div className="tag-row">
              {project.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card">
          <SectionHeading
            eyebrow="Company context"
            title={`Why ${project.company} is posting this now.`}
            description={project.companySummary}
          />

          <div className="feature-grid feature-grid-two">
            <article className="feature-card tone-blue">
              <span className="card-kicker">{project.category}</span>
              <h3>Project scope</h3>
              <p>{project.summary}</p>
            </article>

            <article className={`feature-card ${project.tone}`}>
              <span className="card-kicker">Why this is a fit</span>
              <h3>{project.experienceLevel}</h3>
              <p>{project.fitReason}</p>
            </article>
          </div>
        </article>

        <article className="panel-card">
          <SectionHeading
            eyebrow="Before you apply"
            title={session ? 'Use the brief to submit a sharper application.' : 'Sign in to move from browsing to applying.'}
            description="The strongest applications usually mirror the scope and constraints already written into the project."
          />

          <ul className="point-list">
            {project.applicationChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          {session ? (
            hasApplied ? (
              <article className="info-card tone-green">
                <span className="mini-label">Application status</span>
                <strong>Application already submitted</strong>
                <p>You can track the next update from the applications queue or messages.</p>
                <div className="hero-actions">
                  <a className="button button-primary" href={routeHref('/applications')}>
                    View applications
                  </a>
                  <a className="button button-secondary" href={routeHref('/messages')}>
                    Open messages
                  </a>
                </div>
              </article>
            ) : (
              <form
                className="form-grid"
                onSubmit={async (event) => {
                  event.preventDefault()

                  if (!onApply) {
                    return
                  }

                  setIsSubmitting(true)
                  setApplicationFeedback(await onApply(note))
                  setIsSubmitting(false)
                }}
              >
                <label className="field-shell">
                  <span className="mini-label">Short application note</span>
                  <textarea onChange={(event) => setNote(event.target.value)} rows={5} value={note} />
                </label>

                {applicationFeedback ? (
                  <article className={`info-card ${applicationFeedback.ok ? 'tone-green' : 'tone-red'}`}>
                    <span className="mini-label">{applicationFeedback.ok ? 'Submitted' : 'Needs attention'}</span>
                    <strong>{applicationFeedback.message}</strong>
                  </article>
                ) : null}

                <div className="hero-actions">
                  <button className="button button-primary" type="submit">
                    {isSubmitting ? 'Submitting...' : 'Submit application'}
                  </button>
                  <a className="button button-secondary" href={routeHref('/projects')}>
                    Back to projects
                  </a>
                </div>
              </form>
            )
          ) : (
            <div className="hero-actions">
              <button className="button button-primary" onClick={onRequestSignIn} type="button">
                Sign in as student to apply
              </button>
              <a className="button button-secondary" href={routeHref('/students/create-account')}>
                Create student account
              </a>
            </div>
          )}
        </article>
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card">
          <SectionHeading
            eyebrow="Project overview"
            title="What you would actually deliver."
            description="The brief is written as concrete outputs rather than a vague role description."
          />

          <div className="list-stack">
            {project.deliverables.map((deliverable) => (
              <article key={deliverable} className="list-card">
                <strong>{deliverable}</strong>
              </article>
            ))}
          </div>
        </article>

        <article className="panel-card">
          <SectionHeading eyebrow="Milestones" title="The work is staged with actual review points." />

          <div className="list-stack">
            {project.milestones.map((milestone) => (
              <article key={milestone.title} className="list-card">
                <div>
                  <strong>{milestone.title}</strong>
                  <p>
                    {milestone.dueLabel} / {milestone.amount}
                  </p>
                </div>
                <span className={`status-pill status-${milestone.status}`}>{milestone.status}</span>
              </article>
            ))}
          </div>
        </article>
      </section>
    </>
  )
}

export default ProjectDetailsPage
