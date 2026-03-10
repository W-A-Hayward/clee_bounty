import SectionHeading from '../components/SectionHeading'
import type { StudentApplication, StudentProject } from '../data/studentPortal'

type ApplicationsPageProps = {
  applications: Array<StudentApplication & { project?: StudentProject }>
}

function ApplicationsPage({ applications }: ApplicationsPageProps) {

  return (
    <>
      <section className="section-block portal-section-tight">
        <SectionHeading
          eyebrow="Applications"
          title="Track every active application in one queue."
          description="Status changes stay visible in the workspace so progress does not disappear into email."
        />
      </section>

      <section className="section-block">
        <div className="list-stack">
          {applications.map((application) => (
            <article key={application.id} className="list-card list-card-large">
              <div>
                <span className="card-kicker">{application.project?.company}</span>
                <h3>{application.project?.title}</h3>
                <p>{application.note}</p>
              </div>
              <div className="status-column">
                <span className={`status-pill status-${application.status}`}>{application.status}</span>
                <small>{application.appliedLabel}</small>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

export default ApplicationsPage
