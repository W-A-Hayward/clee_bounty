import { useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import type { DemoApplicationResult, ProfileUpdate } from '../lib/demoPlatform'
import type { MemberSession } from '../lib/demoSession'
import { routeHref } from '../lib/hashRouter'

type StudentProfilePageProps = {
  session: MemberSession
  onSave?: (updates: ProfileUpdate) => Promise<DemoApplicationResult>
}

const skillOptions = [
  'React', 'Figma', 'Design systems', 'Accessibility', 'Product UI',
  'SQL', 'Analytics', 'UX writing', 'Research', 'Node.js', 'TypeScript',
  'QA', 'Presentation', 'Copy', 'CSS', 'Next.js',
]


function StudentProfilePage({ session, onSave }: StudentProfilePageProps) {
  const [name, setName] = useState(session.name)
  const [program, setProgram] = useState(session.program)
  const [school, setSchool] = useState(session.school)
  const [availability, setAvailability] = useState(session.availability)
  const [rate, setRate] = useState(session.rate)
  const [portfolio, setPortfolio] = useState(session.portfolioUrl)
  const [github, setGithub] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [bio, setBio] = useState(
    'Product-minded frontend developer with a focus on clean interfaces and design systems. I work best on projects where implementation quality and design thinking overlap.',
  )
  const [selectedSkills, setSelectedSkills] = useState(['React', 'Figma', 'Design systems', 'Accessibility'])
  const [saved, setSaved] = useState(false)

  const toggleSkill = (skill: string) => {
    setSaved(false)
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    )
  }

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault()
    if (onSave) {
      await onSave({ name, school, program, portfolioUrl: portfolio, availability, rate })
    }
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const profileStrength =
    [name, program, school, availability, rate, portfolio, github, bio, selectedSkills.length > 0]
      .filter(Boolean).length

  const maxStrength = 9
  const strengthPercent = Math.round((profileStrength / maxStrength) * 100)

  const strengthLabel =
    strengthPercent >= 90 ? 'Strong — ready to apply' :
    strengthPercent >= 70 ? 'Good — a few details left' :
    'Getting started — add more to improve match quality'

  return (
    <>
      <section className="section-block portal-section-tight">
        <div className="detail-hero">
          <div>
            <p className="eyebrow">Student profile</p>
            <h2>{session.name}</h2>
            <p className="page-intro">
              Your profile is visible to verified companies when you apply. Keeping it accurate
              improves match quality and application credibility.
            </p>
          </div>

          <article className="info-card tone-green">
            <span className="mini-label">Profile strength</span>
            <strong>{strengthPercent}% — {strengthLabel}</strong>
            <p>
              Profiles with a portfolio link, clear availability, and skill tags receive stronger
              match recommendations and more company replies.
            </p>
            <div className="hero-actions">
              <a className="button button-secondary" href={routeHref('/projects')}>
                Browse matching projects
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card">
          <SectionHeading
            eyebrow="Edit profile"
            title="Keep your information current."
            description="Changes apply to future applications. Existing application notes are not affected."
          />

          <form className="form-grid" onSubmit={handleSave}>
            <div className="field-row">
              <label className="field-shell">
                <span className="mini-label">Full name</span>
                <input onChange={(e) => { setName(e.target.value); setSaved(false) }} value={name} />
              </label>
              <label className="field-shell">
                <span className="mini-label">School email</span>
                <input disabled type="email" value={session.email} />
              </label>
            </div>

            <div className="field-row">
              <label className="field-shell">
                <span className="mini-label">School</span>
                <input onChange={(e) => { setSchool(e.target.value); setSaved(false) }} value={school} />
              </label>
              <label className="field-shell">
                <span className="mini-label">Program</span>
                <input onChange={(e) => { setProgram(e.target.value); setSaved(false) }} value={program} />
              </label>
            </div>

            <div className="field-row">
              <label className="field-shell">
                <span className="mini-label">Availability</span>
                <input onChange={(e) => { setAvailability(e.target.value); setSaved(false) }} placeholder="e.g. 12h/week" value={availability} />
              </label>
              <label className="field-shell">
                <span className="mini-label">Target rate</span>
                <input onChange={(e) => { setRate(e.target.value); setSaved(false) }} placeholder="e.g. $28/hr" value={rate} />
              </label>
            </div>

            <label className="field-shell">
              <span className="mini-label">Short bio</span>
              <textarea onChange={(e) => { setBio(e.target.value); setSaved(false) }} rows={4} value={bio} />
            </label>

            <div className="field-row">
              <label className="field-shell">
                <span className="mini-label">Portfolio</span>
                <input onChange={(e) => { setPortfolio(e.target.value); setSaved(false) }} placeholder="amira.design" value={portfolio} />
              </label>
              <label className="field-shell">
                <span className="mini-label">GitHub</span>
                <input onChange={(e) => { setGithub(e.target.value); setSaved(false) }} placeholder="github.com/you" value={github} />
              </label>
            </div>

            <label className="field-shell">
              <span className="mini-label">LinkedIn</span>
              <input onChange={(e) => { setLinkedin(e.target.value); setSaved(false) }} placeholder="linkedin.com/in/you" value={linkedin} />
            </label>

            {saved && (
              <article className="info-card tone-green">
                <span className="mini-label">Saved</span>
                <strong>Profile updated successfully.</strong>
              </article>
            )}

            <button className="button button-primary" type="submit">
              Save profile
            </button>
          </form>
        </article>

        <div className="story-stack">
          <article className="panel-card">
            <SectionHeading
              eyebrow="Skills"
              title="What companies will see when you apply."
              description="Select the skills that honestly represent your strongest areas. These feed into project match scoring."
            />

            <div className="filter-row" style={{ gap: '0.5rem' }}>
              {skillOptions.map((skill) => (
                <button
                  key={skill}
                  className={`filter-chip${selectedSkills.includes(skill) ? ' is-active' : ''}`}
                  onClick={() => toggleSkill(skill)}
                  type="button"
                >
                  {skill}
                </button>
              ))}
            </div>

            {selectedSkills.length > 0 && (
              <div style={{ marginTop: '0.75rem' }}>
                <span className="mini-label" style={{ display: 'block', marginBottom: '0.5rem' }}>Selected</span>
                <div className="tag-row">
                  {selectedSkills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
            )}
          </article>

          <article className="panel-card">
            <SectionHeading
              eyebrow="Profile preview"
              title="How companies see your card."
            />

            <article className="feature-card tone-green">
              <span className="card-kicker">{school}</span>
              <h3>{name}</h3>
              <p>{program}</p>
              <p style={{ marginTop: '0.5rem', color: 'var(--ink-soft)' }}>
                {availability} / {rate} / {portfolio}
              </p>
              {selectedSkills.length > 0 && (
                <div className="tag-row" style={{ marginTop: '0.5rem' }}>
                  {selectedSkills.slice(0, 4).map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              )}
            </article>

            <div className="list-stack">
              <article className="list-card">
                <div>
                  <strong>Applications</strong>
                  <p>Browse and manage your active applications</p>
                </div>
                <a className="button button-ghost" href={routeHref('/applications')}>
                  View
                </a>
              </article>
              <article className="list-card">
                <div>
                  <strong>Messages</strong>
                  <p>Open conversations with companies you have applied to.</p>
                </div>
                <a className="button button-ghost" href={routeHref('/messages')}>
                  Open
                </a>
              </article>
            </div>
          </article>
        </div>
      </section>
    </>
  )
}

export default StudentProfilePage
