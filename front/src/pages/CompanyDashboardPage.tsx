import SectionHeading from '../components/SectionHeading'
import {
  applicantSnapshots,
  companyProfile,
  companyPublishingChecklist,
  companyTeam,
} from '../data/companyPortal'
import type { CompanySession } from '../lib/demoSession'
import type { DemoCompanyProject } from '../lib/demoPlatform'

type CompanyDashboardPageProps = {
  session: CompanySession
  projects: DemoCompanyProject[]
}

function CompanyDashboardPage({ session, projects }: CompanyDashboardPageProps) {
  const activeProjects = projects.filter((project) => project.status !== 'draft').length
  const totalApplicants = projects.reduce((sum, project) => sum + project.applicants, 0)
  const totalShortlisted = projects.reduce((sum, project) => sum + project.shortlisted, 0)
  const notifications =
    projects.length > 0
      ? [
          `${projects[0]?.applicants ?? 0} applicants are tied to your most visible live brief.`,
          `${activeProjects} projects are currently live or moving through review.`,
          'Use the projects page to tighten scope before the next hiring step slips.',
        ]
      : [
          'Your company profile is live, but no projects are posted yet.',
          'Publish the first scoped brief to start collecting applicants.',
          'Once activity starts, applicant and messaging signals will appear here.',
        ]
  const pipelineStages = [
    {
      label: 'Live projects',
      value: String(activeProjects),
      note: projects.length > 0 ? 'Published or currently in review.' : 'Nothing is live yet.',
      tone: 'tone-blue' as const,
    },
    {
      label: 'Applicants',
      value: String(totalApplicants),
      note: totalApplicants > 0 ? 'Candidate demand is already visible.' : 'Applicants will appear after publishing.',
      tone: 'tone-green' as const,
    },
    {
      label: 'Shortlisted',
      value: String(totalShortlisted),
      note: totalShortlisted > 0 ? 'Candidates are moving forward.' : 'Shortlist activity will appear here.',
      tone: 'tone-orange' as const,
    },
  ]
  const team =
    session.companyName === companyProfile.companyName
      ? companyTeam
      : [
          {
            name: session.name,
            role: 'Company admin',
            note: 'Primary contact managing profile setup, project publishing, and applicant review.',
          },
        ]

  return (
    <>
      <section className="section-block portal-section-tight">
        <div className="metrics-grid">
          <article className="metric-card tone-blue">
            <strong>{activeProjects}</strong>
            <div>
              <span>live projects</span>
              <p>Roles currently visible or progressing through review.</p>
            </div>
          </article>
          <article className="metric-card tone-green">
            <strong>{totalApplicants}</strong>
            <div>
              <span>total applicants</span>
              <p>People already entering the company pipeline.</p>
            </div>
          </article>
          <article className="metric-card tone-orange">
            <strong>{totalShortlisted}</strong>
            <div>
              <span>shortlisted</span>
              <p>Strong candidates ready for calls, review, or matching.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card">
          <SectionHeading
            eyebrow="Company profile"
            title={`${session.companyName} is live on the website.`}
            description={`${session.industry} / ${session.location} / Verified company`}
          />

          <p className="page-intro">{session.description}</p>

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
                <strong>Response cadence</strong>
                <p>Average first reply within 36 hours</p>
              </div>
            </article>
          </div>
        </article>

        <article className="panel-card">
          <div className="card-topline">
            <span className="mini-label">Notifications</span>
            <span className="status-pill status-live">company</span>
          </div>

          <div className="list-stack">
            {notifications.map((notification) => (
              <article key={notification} className="list-card">
                <div>
                  <strong>{notification}</strong>
                </div>
              </article>
            ))}
          </div>
        </article>
      </section>

      <section className="section-block">
        <SectionHeading
          eyebrow="Pipeline health"
          title="The company workspace should make hiring momentum obvious."
          description="These snapshots tell the team what needs action next without forcing them to jump across multiple pages."
        />

        <div className="feature-grid feature-grid-three">
          {pipelineStages.map((stage) => (
            <article key={stage.label} className={`feature-card ${stage.tone}`}>
              <span className="card-kicker">{stage.label}</span>
              <h3>{stage.value}</h3>
              <p>{stage.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card">
          <SectionHeading
            eyebrow="Applicant snapshots"
            title="The company version can already preview candidate signal."
            description={
              projects.length > 0
                ? 'This is enough frontend structure to anchor future applicant review tools.'
                : 'Once your first project is live, candidate signal will start collecting here.'
            }
          />

          <div className="feature-grid feature-grid-three">
            {applicantSnapshots.map((applicant) => (
              <article key={applicant.name} className="feature-card tone-green">
                <span className="card-kicker">{applicant.fit}</span>
                <h3>{applicant.name}</h3>
                <p>{applicant.note}</p>
              </article>
            ))}
          </div>
        </article>

        <article className="panel-card">
          <SectionHeading
            eyebrow="Publishing discipline"
            title="Good company projects follow the same internal standard."
            description="This turns the company dashboard into a real operations surface instead of just a list of cards."
          />

          <ul className="point-list">
            {companyPublishingChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="list-stack">
            {team.map((member) => (
              <article key={member.name} className="list-card">
                <div>
                  <strong>{member.name}</strong>
                  <p>
                    {member.role} / {member.note}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </article>
      </section>
    </>
  )
}

export default CompanyDashboardPage
