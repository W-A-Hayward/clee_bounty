import SectionHeading from '../components/SectionHeading'
import type { StudentApplication, StudentProject } from '../data/studentPortal'
import { routeHref } from '../lib/hashRouter'

type ApplicationsPageProps = {
  applications: Array<StudentApplication & { project?: StudentProject }>
}

function ApplicationsPage({ applications }: ApplicationsPageProps) {
  const shortlisted = applications.filter((a) => a.status === 'shortlisted' || a.status === 'interviewing').length

  return (
    <>
      <section className="section-block portal-section-tight">
        <SectionHeading
          eyebrow="Applications"
          title="Your full application queue."
          description="Track every brief you've applied to — status updates, company feedback, and next steps in one place."
        />

        {applications.length > 0 && (
          <div className="metrics-grid">
            <article className="metric-card tone-blue">
              <strong>{applications.length}</strong>
              <div>
                <span>total applications</span>
                <p>Projects you've applied to since joining the platform.</p>
              </div>
            </article>
            <article className="metric-card tone-green">
              <strong>{shortlisted}</strong>
              <div>
                <span>shortlisted</span>
                <p>{shortlisted > 0 ? 'Companies are moving you forward — check for messages.' : 'Keep applying to build your pipeline.'}</p>
              </div>
            </article>
            <article className="metric-card tone-orange">
              <strong>{applications.filter((a) => a.status === 'submitted').length}</strong>
              <div>
                <span>pending review</span>
                <p>Applications waiting on the company's first response.</p>
              </div>
            </article>
          </div>
        )}
      </section>

      <section className="section-block">
        {applications.length > 0 ? (
          <div className="list-stack">
            {applications.map((application) => (
              <article key={application.id} className="list-card list-card-large">
                <div>
                  <span className="card-kicker">{application.project?.company}</span>
                  <h3>{application.project?.title}</h3>
                  {application.note ? <p style={{ color: 'var(--ink-soft)', marginTop: '0.25rem' }}>{application.note}</p> : null}
                </div>
                <div className="status-column">
                  <span className={`status-pill status-${application.status}`}>{application.status}</span>
                  <small>{application.appliedLabel}</small>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <article className="panel-card" style={{ textAlign: 'center', padding: '2.5rem 2rem' }}>
            <p className="eyebrow">No applications yet</p>
            <h2 style={{ margin: '0.5rem 0 0.75rem' }}>Find a project that fits and apply.</h2>
            <p style={{ color: 'var(--ink-soft)', maxWidth: '28rem', margin: '0 auto 1.5rem' }}>
              Browse scoped briefs with real budgets, clear timelines, and defined deliverables — then apply directly from the project page.
            </p>
            <a className="button button-primary" href={routeHref('/projects')}>
              Browse open projects →
            </a>
          </article>
        )}
      </section>

      {applications.length > 0 && (
        <section className="section-block">
          <div className="cta-panel-full">
            <div>
              <p className="eyebrow">Keep building</p>
              <h2>More opportunities on the board.</h2>
              <p>
                New briefs are added regularly. Browse all open projects to find the next one that matches your skills and availability.
              </p>
            </div>
            <div className="cta-panel-actions">
              <a className="button button-primary" href={routeHref('/projects')}>Browse projects</a>
              <a className="button button-secondary" href={routeHref('/messages')}>Check messages</a>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default ApplicationsPage
