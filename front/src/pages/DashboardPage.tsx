import ProjectCard from '../components/ProjectCard'
import SectionHeading from '../components/SectionHeading'
import {
  dashboardActions,
  getProjectBySlug,
  marketplaceNotes,
  studentNotifications,
  upcomingMilestones,
  type StudentApplication,
  type StudentMessage,
  type StudentProject,
} from '../data/studentPortal'
import type { MemberSession } from '../lib/demoSession'
import { routeHref } from '../lib/hashRouter'

type DashboardPageProps = {
  session: MemberSession
  projects: StudentProject[]
  applications: Array<StudentApplication & { project?: StudentProject }>
  messages: Array<StudentMessage & { project?: StudentProject }>
}

function DashboardPage({ session, projects, applications, messages }: DashboardPageProps) {

  return (
    <>
      <section className="section-block portal-section-tight">
        <div className="metrics-grid">
          <article className="metric-card tone-blue">
            <strong>{projects.length}</strong>
            <div>
              <span>matched projects</span>
              <p>Recommended by skills, rate, and portfolio direction.</p>
            </div>
          </article>
          <article className="metric-card tone-green">
            <strong>{applications.length}</strong>
            <div>
              <span>active applications</span>
              <p>One shortlisted, one interviewing, one newly submitted.</p>
            </div>
          </article>
          <article className="metric-card tone-orange">
            <strong>{messages.reduce((sum, message) => sum + message.unread, 0)}</strong>
            <div>
              <span>unread messages</span>
              <p>Companies are already replying to your strongest applications.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card">
          <SectionHeading
            eyebrow="Quick actions"
            title="What should move next."
            description="A usable dashboard should show the next best actions, not just metrics."
          />

          <div className="list-stack">
            {dashboardActions.map((action) => (
              <a key={action.title} className="list-card" href={routeHref(action.href)}>
                <div>
                  <strong>{action.title}</strong>
                  <p>{action.body}</p>
                </div>
              </a>
            ))}
          </div>
        </article>

        <article className="panel-card">
          <SectionHeading
            eyebrow="Profile signal"
            title={`${session.name} looks ready to apply.`}
            description="These details already improve project matching and application credibility."
          />

          <div className="list-stack">
            <article className="list-card">
              <div>
                <strong>{session.school}</strong>
                <p>{session.program}</p>
              </div>
            </article>
            <article className="list-card">
              <div>
                <strong>Availability</strong>
                <p>{session.availability}</p>
              </div>
            </article>
            <article className="list-card">
              <div>
                <strong>Portfolio</strong>
                <p>{session.portfolioUrl}</p>
              </div>
            </article>
            <article className="list-card">
              <div>
                <strong>Target rate</strong>
                <p>{session.rate}</p>
              </div>
            </article>
          </div>
        </article>
      </section>

      <section className="section-block">
        <SectionHeading
          eyebrow="Recommended for you"
          title="Projects aligned with your product and frontend profile."
          description={`${session.portfolioUrl} and ${session.availability} availability are already helping prioritize relevant opportunities.`}
        />

        <div className="project-grid">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card">
          <div className="card-topline">
            <span className="mini-label">Application pipeline</span>
            <span className="status-pill status-match">moving</span>
          </div>

          <div className="list-stack">
            {applications.map((application) => (
              <article key={application.id} className="list-card">
                <div>
                  <strong>{application.project?.title}</strong>
                  <p>{application.project?.company}</p>
                </div>
                <div className="status-column">
                  <span className={`status-pill status-${application.status}`}>{application.status}</span>
                  <small>{application.appliedLabel}</small>
                </div>
              </article>
            ))}
          </div>
        </article>

        <article className="panel-card">
          <SectionHeading
            eyebrow="Milestone queue"
            title="Upcoming work stays visible after matching."
            description="The dashboard should keep the next deadline visible after matching."
          />

          <div className="list-stack">
            {upcomingMilestones.map((milestone) => {
              const project = getProjectBySlug(milestone.projectSlug)

              return (
                <article key={`${milestone.projectSlug}-${milestone.title}`} className="list-card">
                  <div>
                    <strong>{milestone.title}</strong>
                    <p>{project?.title}</p>
                  </div>
                  <div className="status-column">
                    <span className={`status-pill status-${milestone.status}`}>{milestone.status}</span>
                    <small>{milestone.dueLabel}</small>
                  </div>
                </article>
              )
            })}
          </div>
        </article>
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card">
          <div className="card-topline">
            <span className="mini-label">Notifications</span>
            <span className="status-pill status-live">live</span>
          </div>

          <div className="list-stack">
            {studentNotifications.map((notification) => (
              <article key={notification} className="list-card">
                <strong>{notification}</strong>
              </article>
            ))}
          </div>
        </article>

        <article className="panel-card">
          <SectionHeading
            eyebrow="Marketplace notes"
            title="The workspace should teach people how to use it well."
            description="These reminders keep the main experience focused on strong briefs and real opportunities."
          />

          <ul className="point-list">
            {marketplaceNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </article>
      </section>
    </>
  )
}

export default DashboardPage
