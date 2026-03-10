import SectionHeading from '../components/SectionHeading'
import { routeHref } from '../lib/hashRouter'

const missionPoints = [
  {
    title: 'Real work, not fake internships',
    body: 'Students do actual scoped projects with deliverables and milestones — not busy-work with vague roles and unclear expectations.',
    tone: 'tone-blue' as const,
  },
  {
    title: 'Companies that take it seriously',
    body: 'Every company on the platform creates a verified profile, writes a structured brief, and commits to a review cadence before going live.',
    tone: 'tone-green' as const,
  },
  {
    title: 'Trust is part of the product',
    body: 'School identity for students, work-email-based verification for companies, and platform-level moderation protect every match.',
    tone: 'tone-orange' as const,
  },
]

const teamMembers = [
  {
    name: 'Leah Martin',
    role: 'Co-founder',
    note: 'Product and operations. Spent three years at an agency watching students take bad freelance gigs with no structure.',
  },
  {
    name: 'Miles Chen',
    role: 'Co-founder',
    note: 'Engineering and platform design. Built the first version over one weekend after a student friend got ghosted by a client.',
  },
  {
    name: 'Noor Haddad',
    role: 'Design lead',
    note: 'Responsible for the visual language, component system, and the clarity standards behind every project card on the platform.',
  },
]

const platformFacts = [
  {
    value: '4+',
    label: 'companies posting',
    note: 'Verified businesses with structured briefs and real budgets.',
    tone: 'tone-blue' as const,
  },
  {
    value: '36h',
    label: 'avg first reply',
    note: 'Companies commit to response timing before publishing a brief.',
    tone: 'tone-green' as const,
  },
  {
    value: '100%',
    label: 'structured briefs',
    note: 'Every project includes scope, budget, timeline, and skills before it goes live.',
    tone: 'tone-orange' as const,
  },
]

const principles = [
  {
    title: 'Transparency over vagueness',
    body: 'Budget, timeline, scope, and review cadence are part of the project card — not buried in a follow-up email.',
  },
  {
    title: 'Portfolio signal over credential gates',
    body: 'What students can do matters more than where they go to school. The application flow is built around showing real work.',
  },
  {
    title: 'Companies earn trust, not buy it',
    body: 'Posting fees, verification, and response standards make the supply side accountable. Quality companies stay. Bad actors do not.',
  },
  {
    title: 'Collaboration inside the platform',
    body: 'Messages, milestones, deliverables, and status updates stay unified instead of fragmenting across email and Notion.',
  },
]

function AboutPage() {
  return (
    <>
      <section className="page-header split-header">
        <div>
          <p className="eyebrow">About Clee</p>
          <h1>A marketplace built for real freelance work between companies and students.</h1>
          <p className="page-intro">
            Clee exists because most freelance gig platforms are too chaotic for students and too
            vague for companies that actually want usable output. We built a structured alternative.
          </p>
        </div>

        <article className="info-card tone-blue">
          <span className="mini-label">The short version</span>
          <strong>Structured projects. Verified students. Clear delivery.</strong>
          <p>
            Companies post scoped work with real budgets. Students browse with full context, apply
            when there is a genuine fit, and deliver inside a platform that tracks the whole thing.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href={routeHref('/projects')}>
              Browse projects
            </a>
            <a className="button button-secondary" href={routeHref('/how-it-works')}>
              How it works
            </a>
          </div>
        </article>
      </section>

      <section className="section-block">
        <SectionHeading
          eyebrow="Why we exist"
          title="The freelance experience for students was broken."
          description="Too many students were taking gigs with no scope, no budget clarity, and no way to build a real portfolio. Companies were frustrated by vague applicants and unreliable delivery. We designed a platform that fixes both sides at once."
        />

        <div className="feature-grid feature-grid-three">
          {missionPoints.map((point) => (
            <article key={point.title} className={`feature-card ${point.tone}`}>
              <h3>{point.title}</h3>
              <p>{point.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeading
          eyebrow="Platform facts"
          title="Numbers that reflect the operating standard."
          description="These are not vanity metrics. They represent commitments built into the platform itself."
        />

        <div className="metrics-grid">
          {platformFacts.map((fact) => (
            <article key={fact.label} className={`metric-card ${fact.tone}`}>
              <strong>{fact.value}</strong>
              <div>
                <span>{fact.label}</span>
                <p>{fact.note}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card">
          <SectionHeading
            eyebrow="Our principles"
            title="The values behind every product decision."
            description="These principles guide what we build, how the marketplace works, and what we refuse to compromise on."
          />

          <div className="list-stack">
            {principles.map((principle) => (
              <article key={principle.title} className="list-card">
                <div>
                  <strong>{principle.title}</strong>
                  <p>{principle.body}</p>
                </div>
              </article>
            ))}
          </div>
        </article>

        <article className="panel-card">
          <SectionHeading
            eyebrow="The team"
            title="Built by people who saw the problem first-hand."
            description="Clee started with a small group who had been on both sides of bad freelance arrangements."
          />

          <div className="list-stack">
            {teamMembers.map((member) => (
              <article key={member.name} className="list-card">
                <div>
                  <strong>{member.name}</strong>
                  <p>
                    <span style={{ fontWeight: 700, color: 'var(--brand-blue)' }}>{member.role}</span>
                    {' — '}
                    {member.note}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </article>
      </section>

      <section className="section-block">
        <SectionHeading
          eyebrow="What we are building toward"
          title="Structured collaboration from first brief to final delivery."
          description="The current version handles discovery, applications, company dashboards, and message threads. The next phase deepens milestone tracking, ratings, and admin moderation to make the platform trustworthy at scale."
        />

        <div className="feature-grid feature-grid-two">
          <article className="panel-card tone-blue">
            <SectionHeading
              eyebrow="For students"
              title="Browse real work, earn real portfolio credit."
              description="Every project on Clee comes with a brief you can read before you decide whether to apply. No mystery gigs."
            />
            <div className="hero-actions">
              <a className="button button-primary" href={routeHref('/students/create-account')}>
                Create student account
              </a>
              <a className="button button-secondary" href={routeHref('/students')}>
                Learn more
              </a>
            </div>
          </article>

          <article className="panel-card tone-orange">
            <SectionHeading
              eyebrow="For companies"
              title="Post structured work and hire with less overhead."
              description="Companies that write good briefs get better applicants. The platform enforces the brief standard before anything goes live."
            />
            <div className="hero-actions">
              <a className="button button-primary" href={routeHref('/companies/create-account')}>
                Create company account
              </a>
              <a className="button button-secondary" href={routeHref('/companies')}>
                Learn more
              </a>
            </div>
          </article>
        </div>
      </section>
    </>
  )
}

export default AboutPage
