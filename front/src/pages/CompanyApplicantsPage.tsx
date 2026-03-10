import { useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import type { DemoCompanyProject } from '../lib/demoPlatform'
import { routeHref } from '../lib/hashRouter'

type CompanyApplicant = {
  id: string
  projectId: string
  name: string
  school: string
  program: string
  rate: string
  availability: string
  fit: string
  status: 'submitted' | 'shortlisted' | 'interviewing' | 'accepted' | 'declined'
  appliedLabel: string
  note: string
}

const mockApplicants: CompanyApplicant[] = [
  {
    id: 'ap-1',
    projectId: 'co-1',
    name: 'Amira Khan',
    school: 'Concordia University',
    program: 'BCompSc, Product + Frontend',
    rate: '$28/hr',
    availability: '12h/week',
    fit: '94%',
    status: 'shortlisted',
    appliedLabel: 'Applied Mar 5',
    note: 'Strong UI portfolio with clear design-system thinking. Product mindset visible throughout.',
  },
  {
    id: 'ap-2',
    projectId: 'co-1',
    name: 'Jordan Lee',
    school: 'McGill University',
    program: 'BSc Computer Science',
    rate: '$25/hr',
    availability: '15h/week',
    fit: '87%',
    status: 'submitted',
    appliedLabel: 'Applied Mar 6',
    note: 'Good component work. Needs to share more system-level examples before shortlist.',
  },
  {
    id: 'ap-3',
    projectId: 'co-1',
    name: 'Sofia Perez',
    school: 'Polytechnique Montréal',
    program: 'Software Engineering',
    rate: '$30/hr',
    availability: '10h/week',
    fit: '82%',
    status: 'submitted',
    appliedLabel: 'Applied Mar 7',
    note: 'Strong design-and-dev background. Availability might be tight for a 3-week sprint.',
  },
  {
    id: 'ap-4',
    projectId: 'co-2',
    name: 'Miles Chen',
    school: 'HEC Montréal',
    program: 'MSc Management Analytics',
    rate: '$26/hr',
    availability: '20h/week',
    fit: '89%',
    status: 'interviewing',
    appliedLabel: 'Applied Mar 2',
    note: 'Excellent analytics storytelling and strong availability. Already at the interview stage.',
  },
  {
    id: 'ap-5',
    projectId: 'co-2',
    name: 'Priya Sharma',
    school: 'University of Waterloo',
    program: 'Data Science + Statistics',
    rate: '$24/hr',
    availability: '18h/week',
    fit: '85%',
    status: 'shortlisted',
    appliedLabel: 'Applied Mar 3',
    note: 'Strong SQL portfolio and clear reporting structure in previous projects.',
  },
  {
    id: 'ap-6',
    projectId: 'co-3',
    name: 'Noor Haddad',
    school: 'UQAM',
    program: 'BDes, UX and Frontend',
    rate: '$29/hr',
    availability: '12h/week',
    fit: '86%',
    status: 'accepted',
    appliedLabel: 'Applied Feb 28',
    note: 'Accessibility-focused portfolio and solid QA depth. Accepted and now in kickoff.',
  },
  {
    id: 'ap-7',
    projectId: 'co-1',
    name: 'Kai Tanaka',
    school: 'UDEM',
    program: 'Interactive Media Design',
    rate: '$27/hr',
    availability: '16h/week',
    fit: '79%',
    status: 'submitted',
    appliedLabel: 'Applied Mar 8',
    note: 'Good visual instincts. Less experience with structured component systems.',
  },
]

const statusToneMap: Record<CompanyApplicant['status'], string> = {
  submitted: 'status-submitted',
  shortlisted: 'status-shortlisted',
  interviewing: 'status-interviewing',
  accepted: 'status-match',
  declined: 'status-draft',
}

type CompanyApplicantsPageProps = {
  projects: DemoCompanyProject[]
}

function CompanyApplicantsPage({ projects }: CompanyApplicantsPageProps) {
  const [activeProjectId, setActiveProjectId] = useState<string>('all')

  const projectOptions = projects.length > 0 ? projects : [
    { id: 'co-1', title: 'Frontend redesign sprint for a fintech dashboard', status: 'open', applicants: 32, shortlisted: 8, budget: '$3.2k - $4.8k', workMode: 'Remote', projectType: 'Freelance sprint', experienceLevel: 'Intermediate', deadlineLabel: 'Deadline Mar 21', owner: 'Leah Martin', summary: '', requiredSkills: [], nextStep: '', tone: 'tone-blue' as const },
    { id: 'co-2', title: 'Growth analytics board for student ambassador campaigns', status: 'in_review', applicants: 24, shortlisted: 5, budget: '$1.6k - $2.4k', workMode: 'Hybrid', projectType: 'Analytics engagement', experienceLevel: 'Intermediate', deadlineLabel: 'Deadline Mar 18', owner: 'Miles Chen', summary: '', requiredSkills: [], nextStep: '', tone: 'tone-green' as const },
    { id: 'co-3', title: 'Accessibility polish for a healthcare onboarding flow', status: 'matched', applicants: 19, shortlisted: 3, budget: '$3.4k - $4.8k', workMode: 'Remote', projectType: 'Frontend audit + patch sprint', experienceLevel: 'Advanced', deadlineLabel: 'Matched Mar 7', owner: 'Noor Haddad', summary: '', requiredSkills: [], nextStep: '', tone: 'tone-orange' as const },
  ]

  const filteredApplicants =
    activeProjectId === 'all'
      ? mockApplicants
      : mockApplicants.filter((a) => a.projectId === activeProjectId)

  const totalApplicants = mockApplicants.length
  const shortlisted = mockApplicants.filter((a) => a.status === 'shortlisted' || a.status === 'interviewing' || a.status === 'accepted').length
  const needsReview = mockApplicants.filter((a) => a.status === 'submitted').length

  const getProjectTitle = (projectId: string) =>
    projectOptions.find((p) => p.id === projectId)?.title ?? 'Unknown project'

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

      <section className="section-block portal-section-tight">
        <div className="filter-row">
          <button
            className={`filter-chip${activeProjectId === 'all' ? ' is-active' : ''}`}
            onClick={() => setActiveProjectId('all')}
            type="button"
          >
            All projects
          </button>
          {projectOptions.map((project) => (
            <button
              key={project.id}
              className={`filter-chip${activeProjectId === project.id ? ' is-active' : ''}`}
              onClick={() => setActiveProjectId(project.id)}
              type="button"
            >
              {project.title.split(' ').slice(0, 4).join(' ')}…
            </button>
          ))}
        </div>
      </section>

      <section className="section-block">
        {filteredApplicants.length > 0 ? (
          <div className="list-stack">
            {filteredApplicants.map((applicant) => (
              <article key={applicant.id} className="panel-card">
                <div className="project-card-topline">
                  <div>
                    <span className="card-kicker">{getProjectTitle(applicant.projectId).split(' ').slice(0, 6).join(' ')}…</span>
                    <h3 style={{ margin: '0.35rem 0 0', fontSize: '1.25rem' }}>{applicant.name}</h3>
                  </div>
                  <div className="status-column">
                    <span className={`status-pill ${statusToneMap[applicant.status]}`}>{applicant.status}</span>
                    <small>{applicant.appliedLabel}</small>
                  </div>
                </div>

                <div className="project-card-meta">
                  <span>{applicant.school}</span>
                  <span>{applicant.program}</span>
                  <span>{applicant.rate}</span>
                  <span>{applicant.availability}</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: '1rem', alignItems: 'end' }}>
                  <p style={{ margin: 0, color: 'var(--ink-soft)' }}>{applicant.note}</p>
                  <article className="project-card-fit">
                    <strong>{applicant.fit}</strong>
                    <small>fit score</small>
                  </article>
                </div>

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
            {projectOptions.map((project) => {
              const count = mockApplicants.filter((a) => a.projectId === project.id).length
              const pending = mockApplicants.filter((a) => a.projectId === project.id && a.status === 'submitted').length

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
