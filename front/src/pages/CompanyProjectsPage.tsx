import SectionHeading from '../components/SectionHeading'
import { companyPublishingChecklist } from '../data/companyPortal'
import type { DemoCompanyProject } from '../lib/demoPlatform'
import { routeHref } from '../lib/hashRouter'

type CompanyProjectsPageProps = {
  projects: DemoCompanyProject[]
}

function CompanyProjectsPage({ projects }: CompanyProjectsPageProps) {
  const openProjects = projects.filter((p) => p.status === 'open').length
  const reviewProjects = projects.filter((p) => p.status === 'in_review').length
  const totalApplicants = projects.reduce((sum, p) => sum + p.applicants, 0)

  return (
    <>
      <section className="section-block portal-section-tight">
        <SectionHeading
          eyebrow="Company projects"
          title="All your posted briefs in one place."
          description="Track live projects, applicant volume, and next steps across everything your company has published."
        />

        <div className="metrics-grid">
          <article className="metric-card tone-blue">
            <strong>{projects.length}</strong>
            <div>
              <span>total briefs</span>
              <p>Published, in review, matched, or in progress.</p>
            </div>
          </article>
          <article className="metric-card tone-green">
            <strong>{openProjects + reviewProjects}</strong>
            <div>
              <span>active review</span>
              <p>Still accepting or triaging applicants right now.</p>
            </div>
          </article>
          <article className="metric-card tone-orange">
            <strong>{totalApplicants}</strong>
            <div>
              <span>applicant volume</span>
              <p>Total candidates across all your live projects.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="section-block">
        {projects.length > 0 ? (
          <div className="list-stack">
            {projects.map((project) => (
              <article key={project.id} className={`panel-card ${project.tone}`}>
                <div className="project-card-topline">
                  <span className="card-kicker">
                    {project.projectType} / {project.workMode}
                  </span>
                  <span className={`status-pill status-${project.status}`}>{project.status.replace('_', ' ')}</span>
                </div>

                <h3>{project.title}</h3>
                <p>{project.summary}</p>

                <div className="project-card-meta">
                  <span>{project.budget}</span>
                  <span>{project.experienceLevel}</span>
                  <span>{project.deadlineLabel}</span>
                  <span>Owner: {project.owner}</span>
                </div>

                <div className="tag-row">
                  {project.requiredSkills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>

                <div className="project-card-footer">
                  <div>
                    <strong>
                      {project.applicants} applicants / {project.shortlisted} shortlisted
                    </strong>
                    <p>{project.nextStep}</p>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <a className="button button-secondary" href={routeHref('/company/applicants')}>
                      Review applicants
                    </a>
                    {project.publicSlug ? (
                      <a className="button button-ghost" href={routeHref(`/projects/${project.publicSlug}`)}>
                        Public brief
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <article className="panel-card" style={{ textAlign: 'center', padding: '2.5rem 2rem' }}>
            <p className="eyebrow">No projects yet</p>
            <h2 style={{ margin: '0.5rem 0 0.75rem' }}>Ready to post your first brief?</h2>
            <p style={{ color: 'var(--ink-soft)', maxWidth: '28rem', margin: '0 auto 1.5rem' }}>
              Fill in scope, budget, timeline, and required skills. Students will be able to apply as soon as you publish.
            </p>
            <a className="button button-primary" href={routeHref('/company/post-project')}>
              Post your first project →
            </a>
          </article>
        )}
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card">
          <SectionHeading
            eyebrow="Before you publish"
            title="A brief that reads well gets better applicants."
            description="Make sure every field is filled in before making a project live on the board."
          />

          <ul className="point-list">
            {companyPublishingChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="panel-card">
          <SectionHeading
            eyebrow="Post a new brief"
            title="Got a new project ready?"
            description="Use the posting form to draft a structured brief with all the context students need."
          />

          <a className="button button-primary" href={routeHref('/company/post-project')}>
            Post a project →
          </a>
        </article>
      </section>
    </>
  )
}

export default CompanyProjectsPage
