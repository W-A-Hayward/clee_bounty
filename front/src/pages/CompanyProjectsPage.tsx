import SectionHeading from '../components/SectionHeading'
import { companyPublishingChecklist } from '../data/companyPortal'
import type { DemoCompanyProject } from '../lib/demoPlatform'
import { routeHref } from '../lib/hashRouter'

type CompanyProjectsPageProps = {
  projects: DemoCompanyProject[]
}

function CompanyProjectsPage({ projects }: CompanyProjectsPageProps) {
  const openProjects = projects.filter((project) => project.status === 'open').length
  const reviewProjects = projects.filter((project) => project.status === 'in_review').length
  const totalApplicants = projects.reduce((sum, project) => sum + project.applicants, 0)

  return (
    <>
      <section className="section-block portal-section-tight">
        <SectionHeading
          eyebrow="Company projects"
          title="Manage the roles your company has published on the website."
          description="This company-side view tracks live project inventory, status, and applicant volume."
        />

        <div className="metrics-grid">
          <article className="metric-card tone-blue">
            <strong>{projects.length}</strong>
            <div>
              <span>total briefs</span>
              <p>Published, reviewing, matched, or still in draft internally.</p>
            </div>
          </article>
          <article className="metric-card tone-green">
            <strong>{openProjects + reviewProjects}</strong>
            <div>
              <span>active review</span>
              <p>Projects still receiving or triaging applicants.</p>
            </div>
          </article>
          <article className="metric-card tone-orange">
            <strong>{totalApplicants}</strong>
            <div>
              <span>applicant volume</span>
              <p>Candidate demand is visible across the whole company pipeline.</p>
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
                  <span className={`status-pill status-${project.status}`}>{project.status}</span>
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

                  {project.publicSlug ? (
                    <a className="button button-secondary" href={routeHref(`/projects/${project.publicSlug}`)}>
                      View public brief
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <article className="panel-card">
            <h2>No projects posted yet.</h2>
            <p>Publish the first scoped brief to make the company workspace feel real.</p>
            <a className="button button-primary" href={routeHref('/company/post-project')}>
              Post your first project
            </a>
          </article>
        )}
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card">
          <SectionHeading
            eyebrow="Before publishing"
            title="Project quality stays consistent when the team uses one checklist."
            description="This is the operational layer behind a trustworthy company workspace."
          />

          <ul className="point-list">
            {companyPublishingChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="panel-card">
          <SectionHeading
            eyebrow="Next action"
            title="Open a new brief when the current scope is clear enough."
            description="The posting page gives companies more structure for drafting a usable opportunity."
          />

          <a className="button button-primary" href={routeHref('/company/post-project')}>
            Post another project
          </a>
        </article>
      </section>
    </>
  )
}

export default CompanyProjectsPage
