import SectionHeading from '../components/SectionHeading'
import { companyProfile, companyPublishingChecklist, companyTeam } from '../data/companyPortal'
import type { CompanySession } from '../lib/demoSession'
import type { DemoCompanyProject } from '../lib/demoPlatform'
import { routeHref } from '../lib/hashRouter'

type CompanyDashboardPageProps = {
  session: CompanySession
  projects: DemoCompanyProject[]
}

function CompanyDashboardPage({ session, projects }: CompanyDashboardPageProps) {
  const activeProjects = projects.filter((p) => p.status !== 'draft').length
  const totalApplicants = projects.reduce((sum, p) => sum + p.applicants, 0)
  const totalShortlisted = projects.reduce((sum, p) => sum + p.shortlisted, 0)

  const quickActions = [
    {
      title: 'Your projects',
      body: projects.length > 0 ? `${projects.length} briefs posted — manage scope, status, and applicants.` : 'Post your first project brief to start receiving applications.',
      href: '/company/projects',
      tone: 'tone-blue' as const,
    },
    {
      title: 'Applicants',
      body: totalApplicants > 0 ? `${totalApplicants} candidates across all your live projects.` : 'Applicant profiles will appear here once your brief is live.',
      href: '/company/applicants',
      tone: 'tone-green' as const,
    },
    {
      title: 'Messages',
      body: 'Reply to candidates, share context, and keep hiring conversations in one place.',
      href: '/company/messages',
      tone: 'tone-orange' as const,
    },
    {
      title: 'Post a project',
      body: 'Draft a new scoped brief with budget, timeline, skills, and deliverables.',
      href: '/company/post-project',
      tone: 'tone-blue' as const,
    },
  ]

  const team =
    session.companyName === companyProfile.companyName
      ? companyTeam
      : [{ name: session.name, role: 'Company admin', note: 'Primary contact for this workspace.' }]

  return (
    <>
      <section className="section-block portal-section-tight">
        <div className="metrics-grid">
          <article className="metric-card tone-blue">
            <strong>{activeProjects}</strong>
            <div>
              <span>live projects</span>
              <p>{activeProjects > 0 ? 'Briefs visible and accepting applicants.' : 'Post a brief to go live.'}</p>
            </div>
          </article>
          <article className="metric-card tone-green">
            <strong>{totalApplicants}</strong>
            <div>
              <span>total applicants</span>
              <p>{totalApplicants > 0 ? 'Candidates in your pipeline right now.' : 'Applicants appear once you publish.'}</p>
            </div>
          </article>
          <article className="metric-card tone-orange">
            <strong>{totalShortlisted}</strong>
            <div>
              <span>shortlisted</span>
              <p>{totalShortlisted > 0 ? 'Strong candidates ready for next steps.' : 'Shortlisted candidates will show here.'}</p>
            </div>
          </article>
        </div>
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card">
          <SectionHeading
            eyebrow="Company profile"
            title={`${session.companyName}`}
            description={`${session.industry} · ${session.location} · Verified company`}
          />
          <p style={{ color: 'var(--ink-soft)', marginBottom: '1rem', lineHeight: 1.6 }}>{session.description}</p>
          <div className="list-stack">
            <article className="list-card">
              <div>
                <strong>Website</strong>
                <p>{session.website}</p>
              </div>
            </article>
            <article className="list-card">
              <div>
                <strong>Team size</strong>
                <p>{session.teamSize}</p>
              </div>
            </article>
            <article className="list-card">
              <div>
                <strong>Response time</strong>
                <p>Average first reply within 36 hours</p>
              </div>
            </article>
          </div>
          <div className="list-stack" style={{ marginTop: '0.75rem' }}>
            {team.map((member) => (
              <article key={member.name} className="list-card">
                <div>
                  <strong>{member.name}</strong>
                  <p>{member.role}</p>
                </div>
              </article>
            ))}
          </div>
        </article>

        <article className="panel-card">
          <SectionHeading
            eyebrow="Quick actions"
            title="Pick up where you left off."
            description="Navigate to any section of your company workspace from here."
          />
          <div className="list-stack">
            {quickActions.map((action) => (
              <a key={action.title} className="list-card" href={routeHref(action.href)}>
                <div>
                  <strong>{action.title}</strong>
                  <p>{action.body}</p>
                </div>
                <span style={{ color: 'var(--brand-orange)', fontWeight: 700, fontSize: '1.1rem' }}>→</span>
              </a>
            ))}
          </div>
        </article>
      </section>

      {projects.length > 0 ? (
        <section className="section-block portal-two-column">
          <article className="panel-card">
            <div className="card-topline">
              <span className="mini-label">Recent projects</span>
              <span className="status-pill status-live">{projects.length} total</span>
            </div>
            <div className="list-stack">
              {projects.slice(0, 3).map((project) => (
                <article key={project.id} className="list-card">
                  <div>
                    <strong>{project.title}</strong>
                    <p>{project.applicants} applicants · {project.shortlisted} shortlisted</p>
                  </div>
                  <div className="status-column">
                    <span className={`status-pill status-${project.status}`}>{project.status.replace('_', ' ')}</span>
                  </div>
                </article>
              ))}
            </div>
            <div className="hero-actions" style={{ marginTop: '0.75rem' }}>
              <a className="button button-secondary" href={routeHref('/company/projects')}>View all projects</a>
            </div>
          </article>

          <article className="panel-card">
            <SectionHeading
              eyebrow="Before you publish"
              title="Keep your briefs clear and complete."
              description="Students read every field before applying. Well-structured briefs get better applicants."
            />
            <ul className="point-list">
              {companyPublishingChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="hero-actions" style={{ marginTop: '0.75rem' }}>
              <a className="button button-primary" href={routeHref('/company/post-project')}>Post another project</a>
            </div>
          </article>
        </section>
      ) : (
        <section className="section-block">
          <article className="panel-card" style={{ border: '2px solid var(--brand-orange)', textAlign: 'center', padding: '2.5rem 2rem' }}>
            <p className="eyebrow">No projects yet</p>
            <h2 style={{ margin: '0.5rem 0 0.75rem' }}>Post your first brief to start receiving applications.</h2>
            <p style={{ color: 'var(--ink-soft)', maxWidth: '30rem', margin: '0 auto 1.5rem' }}>
              Draft a scoped project with budget, timeline, required skills, and deliverables — then publish it live on the board.
            </p>
            <a className="button button-primary" href={routeHref('/company/post-project')}>
              Post your first project →
            </a>
          </article>
        </section>
      )}
    </>
  )
}

export default CompanyDashboardPage
