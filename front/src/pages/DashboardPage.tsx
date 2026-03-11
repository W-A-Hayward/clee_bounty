import ProjectCard from '../components/ProjectCard'
import SectionHeading from '../components/SectionHeading'
import {
  getProjectBySlug,
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
  const unread = messages.reduce((sum, m) => sum + m.unread, 0)
  const shortlisted = applications.filter((a) => a.status === 'shortlisted' || a.status === 'interviewing').length

  const quickActions = [
    { title: 'Browse open projects', body: 'Find new briefs that match your skills and availability.', href: '/projects' },
    { title: 'Your applications', body: `${applications.length} active — track status and see what's moved.`, href: '/applications' },
    { title: 'Messages', body: unread > 0 ? `${unread} unread — companies are waiting for a reply.` : 'Stay on top of project conversations.', href: '/messages' },
    { title: 'Your profile', body: 'Update your portfolio link, skills, rate, and availability.', href: '/profile' },
  ]

  return (
    <>
      <section className="section-block portal-section-tight">
        <div className="metrics-grid">
          <article className="metric-card tone-blue">
            <strong>{projects.length}</strong>
            <div>
              <span>open projects</span>
              <p>Live briefs matching your skills and availability right now.</p>
            </div>
          </article>
          <article className="metric-card tone-green">
            <strong>{applications.length}</strong>
            <div>
              <span>active applications</span>
              <p>{shortlisted > 0 ? `${shortlisted} shortlisted or further — things are moving.` : 'Apply to a project to start your pipeline.'}</p>
            </div>
          </article>
          <article className="metric-card tone-orange">
            <strong>{unread}</strong>
            <div>
              <span>unread messages</span>
              <p>{unread > 0 ? 'Companies are reaching out — check your inbox.' : 'No unread messages right now.'}</p>
            </div>
          </article>
        </div>
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card">
          <SectionHeading
            eyebrow="Quick actions"
            title="Pick up where you left off."
            description="Your most important next moves across projects, applications, and messages."
          />
          <div className="list-stack">
            {quickActions.map((action) => (
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
            eyebrow="Your profile"
            title={`${session.name}`}
            description="This is what companies see when you apply. Keep it current to improve match quality."
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
                <strong>Target rate</strong>
                <p>{session.rate}</p>
              </div>
            </article>
            <article className="list-card">
              <div>
                <strong>Portfolio</strong>
                <p>{session.portfolioUrl}</p>
              </div>
            </article>
          </div>
          <div className="hero-actions" style={{ marginTop: '0.75rem' }}>
            <a className="button button-secondary" href={routeHref('/profile')}>Edit profile</a>
          </div>
        </article>
      </section>

      {projects.length > 0 && (
        <section className="section-block">
          <SectionHeading
            eyebrow="Recommended for you"
            title="Projects worth a look right now."
            description={`Matched based on your skills, ${session.availability} availability, and ${session.rate} target rate.`}
          />
          <div className="project-grid">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <div className="hero-actions" style={{ marginTop: '1.5rem' }}>
            <a className="button button-primary" href={routeHref('/projects')}>See all projects</a>
          </div>
        </section>
      )}

      <section className="section-block portal-two-column">
        <article className="panel-card">
          <div className="card-topline">
            <span className="mini-label">Application pipeline</span>
            {applications.length > 0 && <span className="status-pill status-live">{applications.length} active</span>}
          </div>

          {applications.length > 0 ? (
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
          ) : (
            <div style={{ padding: '1rem 0' }}>
              <p style={{ color: 'var(--ink-soft)', marginBottom: '0.75rem' }}>No applications yet. Browse projects and apply to get started.</p>
              <a className="button button-primary" href={routeHref('/projects')}>Browse projects</a>
            </div>
          )}
        </article>

        <article className="panel-card">
          <SectionHeading
            eyebrow="Upcoming milestones"
            title="Active deadlines across your projects."
            description="Milestones appear here after you are matched to a project."
          />
          {upcomingMilestones.length > 0 ? (
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
          ) : (
            <p style={{ color: 'var(--ink-soft)' }}>Milestones will appear here after you are matched to a project.</p>
          )}
        </article>
      </section>
    </>
  )
}

export default DashboardPage
