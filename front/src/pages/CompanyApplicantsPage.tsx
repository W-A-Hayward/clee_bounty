import { useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import type { ApiCompanyApplicant, DemoCompanyProject } from '../lib/demoPlatform'
import { routeHref } from '../lib/hashRouter'

const statusToneMap: Record<ApiCompanyApplicant['status'], string> = {
  submitted: 'status-submitted',
  shortlisted: 'status-shortlisted',
  interviewing: 'status-interviewing',
  accepted: 'status-match',
}

type CompanyApplicantsPageProps = {
  projects: DemoCompanyProject[]
  applicants: ApiCompanyApplicant[]
}

function CompanyApplicantsPage({ projects, applicants }: CompanyApplicantsPageProps) {
  const [activeSlug, setActiveSlug] = useState<string>('all')

  const filteredApplicants =
    activeSlug === 'all'
      ? applicants
      : applicants.filter((a) => a.projectSlug === activeSlug)

  const totalApplicants = applicants.length
  const shortlisted = applicants.filter((a) => a.status === 'shortlisted' || a.status === 'interviewing' || a.status === 'accepted').length
  const needsReview = applicants.filter((a) => a.status === 'submitted').length

  return (
    <>
      <section className="section-block portal-section-tight">
        <SectionHeading
          eyebrow="Applicant review"
          title="All candidates across your active projects."
          description="Filter by project to focus review. Shortlist, invite to interview, or decline from one queue."
        />

        <div className="metrics-grid">
          <article className="metric-card tone-blue">
            <strong>{totalApplicants}</strong>
            <div>
              <span>total applicants</span>
              <p>Candidates who have submitted to any of your live briefs.</p>
            </div>
          </article>
          <article className="metric-card tone-green">
            <strong>{shortlisted}</strong>
            <div>
              <span>shortlisted or further</span>
              <p>Candidates who passed first review and are moving forward.</p>
            </div>
          </article>
          <article className="metric-card tone-orange">
            <strong>{needsReview}</strong>
            <div>
              <span>awaiting first review</span>
              <p>New submissions that have not been acted on yet.</p>
            </div>
          </article>
        </div>
      </section>

      {projects.length > 0 && (
        <section className="section-block portal-section-tight">
          <div className="filter-row">
            <button
              className={`filter-chip${activeSlug === 'all' ? ' is-active' : ''}`}
              onClick={() => setActiveSlug('all')}
              type="button"
            >
              All projects
            </button>
            {projects.map((project) => (
              <button
                key={project.id}
                className={`filter-chip${activeSlug === (project.publicSlug ?? project.id) ? ' is-active' : ''}`}
                onClick={() => setActiveSlug(project.publicSlug ?? project.id)}
                type="button"
              >
                {project.title.split(' ').slice(0, 4).join(' ')}…
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="section-block">
        {filteredApplicants.length > 0 ? (
          <div className="list-stack">
            {filteredApplicants.map((applicant) => (
              <article key={applicant.id} className="panel-card">
                <div className="project-card-topline">
                  <div>
                    <span className="card-kicker">{applicant.projectTitle.split(' ').slice(0, 6).join(' ')}…</span>
                    <h3 style={{ margin: '0.35rem 0 0', fontSize: '1.25rem' }}>{applicant.studentName}</h3>
                  </div>
                  <div className="status-column">
                    <span className={`status-pill ${statusToneMap[applicant.status]}`}>{applicant.status}</span>
                    <small>{applicant.appliedLabel}</small>
                  </div>
                </div>

                <div className="project-card-meta">
                  <span>{applicant.studentSchool}</span>
                  <span>{applicant.studentProgram}</span>
                  <span>{applicant.studentRate}</span>
                  <span>{applicant.studentAvailability}</span>
                </div>

                <p style={{ margin: '0.5rem 0 0', color: 'var(--ink-soft)' }}>{applicant.note}</p>

                <div className="hero-actions">
                  {applicant.status === 'submitted' && (
                    <>
                      <button className="button button-primary" type="button">
                        Shortlist candidate
                      </button>
                      <button className="button button-secondary" type="button">
                        Decline
                      </button>
                    </>
                  )}
                  {applicant.status === 'shortlisted' && (
                    <>
                      <button className="button button-primary" type="button">
                        Invite to interview
                      </button>
                      <a className="button button-secondary" href={routeHref('/company/messages')}>
                        Send message
                      </a>
                    </>
                  )}
                  {applicant.status === 'interviewing' && (
                    <>
                      <button className="button button-primary" type="button">
                        Move to accepted
                      </button>
                      <a className="button button-secondary" href={routeHref('/company/messages')}>
                        Open conversation
                      </a>
                    </>
                  )}
                  {applicant.status === 'accepted' && (
                    <a className="button button-secondary" href={routeHref('/company/messages')}>
                      View project messages
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <article className="panel-card">
            <h2>No applicants on this project yet.</h2>
            <p>Once the brief is live and candidates start applying, they will appear here.</p>
            <a className="button button-primary" href={routeHref('/company/post-project')}>
              Post a project
            </a>
          </article>
        )}
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card">
          <SectionHeading
            eyebrow="Review tips"
            title="Move faster with a clear first-pass standard."
            description="A quick first read reduces back-and-forth and helps the right candidates move forward without delay."
          />

          <div className="list-stack">
            {[
              'Check portfolio fit before reading the note in full',
              'Availability and rate mismatches are easy early filters',
              'Shortlist before you are fully decided — it signals momentum',
              'Decline quickly when the fit is clearly off — candidates appreciate clarity',
            ].map((tip) => (
              <article key={tip} className="list-card">
                <strong>{tip}</strong>
              </article>
            ))}
          </div>
        </article>

        <article className="panel-card">
          <SectionHeading
            eyebrow="Pipeline status"
            title="Projects by current applicant pressure."
            description="Projects with more unreviewed submissions need attention first."
          />

          <div className="list-stack">
            {projects.map((project) => {
              const slug = project.publicSlug ?? project.id
              const count = applicants.filter((a) => a.projectSlug === slug).length
              const pending = applicants.filter((a) => a.projectSlug === slug && a.status === 'submitted').length

              return (
                <article key={project.id} className={`list-card ${project.tone}`}>
                  <div>
                    <strong>{project.title.split(' ').slice(0, 5).join(' ')}…</strong>
                    <p>
                      {count} applicant{count !== 1 ? 's' : ''} / {pending} awaiting review
                    </p>
                  </div>
                  <span className={`status-pill status-${project.status}`}>{project.status}</span>
                </article>
              )
            })}
          </div>
        </article>
      </section>
    </>
  )
}

export default CompanyApplicantsPage
