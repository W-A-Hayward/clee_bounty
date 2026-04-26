import { useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import { useLang } from '../i18n/LanguageContext'
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

const copy = {
  en: {
    eyebrow: 'Student profile',
    intro: 'Your profile is visible to verified companies when you apply. Keeping it accurate improves match quality and application credibility.',
    strengthLabel: 'Profile strength',
    strengthBody: 'Profiles with a portfolio link, clear availability, and skill tags receive stronger match recommendations and more company replies.',
    browseMatching: 'Browse matching projects',
    editEyebrow: 'Edit profile',
    editTitle: 'Keep your information current.',
    editDesc: 'Changes apply to future applications. Existing application notes are not affected.',
    fullName: 'Full name',
    schoolEmail: 'School email',
    school: 'School',
    program: 'Program',
    availability: 'Availability',
    targetRate: 'Target rate',
    shortBio: 'Short bio',
    portfolio: 'Portfolio',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    saved: 'Saved',
    savedBody: 'Profile updated successfully.',
    saveButton: 'Save profile',
    skillsEyebrow: 'Skills',
    skillsTitle: 'What companies will see when you apply.',
    skillsDesc: 'Select the skills that honestly represent your strongest areas. These feed into project match scoring.',
    selected: 'Selected',
    previewEyebrow: 'Profile preview',
    previewTitle: 'How companies see your card.',
    applications: 'Applications',
    applicationsBody: 'Browse and manage your active applications',
    view: 'View',
    messages: 'Messages',
    messagesBody: 'Open conversations with companies you have applied to.',
    open: 'Open',
    bioPlaceholder: 'Product-minded frontend developer with a focus on clean interfaces and design systems. I work best on projects where implementation quality and design thinking overlap.',
    strengthStrong: 'Strong, ready to apply',
    strengthGood: 'Good, a few details left',
    strengthStart: 'Getting started, add more to improve match quality',
    availabilityPh: 'e.g. 12h/week',
    ratePh: 'e.g. $28/hr',
    portfolioPh: 'amira.design',
    githubPh: 'github.com/you',
    linkedinPh: 'linkedin.com/in/you',
  },
  fr: {
    eyebrow: 'Profil étudiant',
    intro: 'Ton profil est visible aux entreprises vérifiées quand tu postules. Le garder à jour améliore la qualité du match et la crédibilité de tes candidatures.',
    strengthLabel: 'Force du profil',
    strengthBody: 'Les profils avec un lien portfolio, une disponibilité claire et des compétences tagguées reçoivent de meilleures recommandations et plus de réponses.',
    browseMatching: 'Explorer les projets pertinents',
    editEyebrow: 'Modifier le profil',
    editTitle: 'Garde ton information à jour.',
    editDesc: 'Les changements s’appliquent aux candidatures futures. Les notes existantes ne sont pas modifiées.',
    fullName: 'Nom complet',
    schoolEmail: 'Courriel scolaire',
    school: 'École',
    program: 'Programme',
    availability: 'Disponibilité',
    targetRate: 'Taux cible',
    shortBio: 'Courte bio',
    portfolio: 'Portfolio',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    saved: 'Sauvegardé',
    savedBody: 'Profil mis à jour avec succès.',
    saveButton: 'Sauvegarder le profil',
    skillsEyebrow: 'Compétences',
    skillsTitle: 'Ce que les entreprises voient quand tu postules.',
    skillsDesc: 'Choisis les compétences qui représentent honnêtement tes forces. Elles alimentent le score de match.',
    selected: 'Sélectionnées',
    previewEyebrow: 'Aperçu du profil',
    previewTitle: 'Comment les entreprises voient ta carte.',
    applications: 'Candidatures',
    applicationsBody: 'Explore et gère tes candidatures actives',
    view: 'Voir',
    messages: 'Messages',
    messagesBody: 'Conversations ouvertes avec les entreprises où tu as postulé.',
    open: 'Ouvrir',
    bioPlaceholder: 'Développeuse frontend orientée produit, focus sur les interfaces propres et les design systems. Je donne le meilleur sur des projets où qualité d’implémentation et pensée design se chevauchent.',
    strengthStrong: 'Solide, prête à postuler',
    strengthGood: 'Bon, quelques détails à compléter',
    strengthStart: 'En démarrage — ajoute plus pour améliorer la qualité du match',
    availabilityPh: 'p. ex. 12h/semaine',
    ratePh: 'p. ex. 28$/h',
    portfolioPh: 'amira.design',
    githubPh: 'github.com/toi',
    linkedinPh: 'linkedin.com/in/toi',
  },
}

function StudentProfilePage({ session, onSave }: StudentProfilePageProps) {
  const lang = useLang()
  const t = copy[lang]
  const [name, setName] = useState(session.name)
  const [program, setProgram] = useState(session.program)
  const [school, setSchool] = useState(session.school)
  const [availability, setAvailability] = useState(session.availability)
  const [rate, setRate] = useState(session.rate)
  const [portfolio, setPortfolio] = useState(session.portfolioUrl)
  const [github, setGithub] = useState('github.com/amira')
  const [linkedin, setLinkedin] = useState('linkedin.com/in/amira-khan')
  const [bio, setBio] = useState(t.bioPlaceholder)
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
    strengthPercent >= 90 ? t.strengthStrong :
    strengthPercent >= 70 ? t.strengthGood :
    t.strengthStart

  return (
    <>
      <section className="section-block portal-section-tight">
        <div className="detail-hero">
          <div>
            <p className="eyebrow">{t.eyebrow}</p>
            <h2>{session.name}</h2>
            <p className="page-intro">{t.intro}</p>
          </div>

          <article className="info-card tone-green">
            <span className="mini-label">{t.strengthLabel}</span>
            <strong>{strengthPercent}%, {strengthLabel}</strong>
            <p>{t.strengthBody}</p>
            <div className="hero-actions">
              <a className="button button-secondary" href={routeHref('/projects')}>
                {t.browseMatching}
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card">
          <SectionHeading
            eyebrow={t.editEyebrow}
            title={t.editTitle}
            description={t.editDesc}
          />

          <form className="form-grid" onSubmit={handleSave}>
            <div className="field-row">
              <label className="field-shell">
                <span className="mini-label">{t.fullName}</span>
                <input onChange={(e) => { setName(e.target.value); setSaved(false) }} value={name} />
              </label>
              <label className="field-shell">
                <span className="mini-label">{t.schoolEmail}</span>
                <input disabled type="email" value={session.email} />
              </label>
            </div>

            <div className="field-row">
              <label className="field-shell">
                <span className="mini-label">{t.school}</span>
                <input onChange={(e) => { setSchool(e.target.value); setSaved(false) }} value={school} />
              </label>
              <label className="field-shell">
                <span className="mini-label">{t.program}</span>
                <input onChange={(e) => { setProgram(e.target.value); setSaved(false) }} value={program} />
              </label>
            </div>

            <div className="field-row">
              <label className="field-shell">
                <span className="mini-label">{t.availability}</span>
                <input onChange={(e) => { setAvailability(e.target.value); setSaved(false) }} placeholder={t.availabilityPh} value={availability} />
              </label>
              <label className="field-shell">
                <span className="mini-label">{t.targetRate}</span>
                <input onChange={(e) => { setRate(e.target.value); setSaved(false) }} placeholder={t.ratePh} value={rate} />
              </label>
            </div>

            <label className="field-shell">
              <span className="mini-label">{t.shortBio}</span>
              <textarea onChange={(e) => { setBio(e.target.value); setSaved(false) }} rows={4} value={bio} />
            </label>

            <div className="field-row">
              <label className="field-shell">
                <span className="mini-label">{t.portfolio}</span>
                <input onChange={(e) => { setPortfolio(e.target.value); setSaved(false) }} placeholder={t.portfolioPh} value={portfolio} />
              </label>
              <label className="field-shell">
                <span className="mini-label">{t.github}</span>
                <input onChange={(e) => { setGithub(e.target.value); setSaved(false) }} placeholder={t.githubPh} value={github} />
              </label>
            </div>

            <label className="field-shell">
              <span className="mini-label">{t.linkedin}</span>
              <input onChange={(e) => { setLinkedin(e.target.value); setSaved(false) }} placeholder={t.linkedinPh} value={linkedin} />
            </label>

            {saved && (
              <article className="info-card tone-green">
                <span className="mini-label">{t.saved}</span>
                <strong>{t.savedBody}</strong>
              </article>
            )}

            <button className="button button-primary" type="submit">
              {t.saveButton}
            </button>
          </form>
        </article>

        <div className="story-stack">
          <article className="panel-card">
            <SectionHeading
              eyebrow={t.skillsEyebrow}
              title={t.skillsTitle}
              description={t.skillsDesc}
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
                <span className="mini-label" style={{ display: 'block', marginBottom: '0.5rem' }}>{t.selected}</span>
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
              eyebrow={t.previewEyebrow}
              title={t.previewTitle}
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
                  <strong>{t.applications}</strong>
                  <p>{t.applicationsBody}</p>
                </div>
                <a className="button button-ghost" href={routeHref('/applications')}>
                  {t.view}
                </a>
              </article>
              <article className="list-card">
                <div>
                  <strong>{t.messages}</strong>
                  <p>{t.messagesBody}</p>
                </div>
                <a className="button button-ghost" href={routeHref('/messages')}>
                  {t.open}
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
