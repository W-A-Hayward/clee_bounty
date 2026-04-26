import { useDeferredValue, useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import { companyPublishingChecklist } from '../data/companyPortal'
import { pick, useLang } from '../i18n/LanguageContext'
import type { CompanySession } from '../lib/demoSession'
import type { CompanyProjectDraft } from '../lib/demoPlatform'
import { routeHref } from '../lib/hashRouter'

type CompanyPostProjectPageProps = {
  session: CompanySession
  onPostProject: (draft: CompanyProjectDraft) => Promise<string>
}

const copy = {
  en: {
    eyebrow: 'Post a project',
    h1: 'Turn your company need into a clear brief on the board.',
    intro: 'Fill in scope, budget, timeline, and required skills. Students will see the full brief before they apply.',
    fillIn: 'Fill in the form below',
    briefEyebrow: 'Project brief',
    briefTitle: 'Project details',
    postingAs: (name: string) => `Posting as ${name}`,
    title: 'Project title',
    titlePh: 'e.g. Frontend redesign sprint for a fintech dashboard',
    typeLabel: 'Project type',
    types: ['Freelance sprint', 'Short-term engagement', 'Portfolio project'],
    workMode: 'Work mode',
    workModes: ['Remote', 'Hybrid', 'On-site'],
    duration: 'Duration',
    durationPh: 'e.g. 4 weeks',
    budget: 'Budget',
    budgetPh: 'e.g. $2k - $3.5k',
    deadline: 'Application deadline',
    deadlinePh: 'e.g. Apply by Apr 10',
    expLevel: 'Experience level',
    expLevels: ['Early to intermediate', 'Intermediate', 'Advanced'],
    skills: 'Required skills',
    skillsHint: '(comma-separated)',
    skillsPh: 'e.g. React, Figma, Accessibility',
    summary: 'Project summary',
    summaryPh: 'What is the scope? What problem does this solve? What does success look like?',
    deliverables: 'Deliverables',
    deliverablesPh: 'e.g. UI audit report, revised component library, handoff documentation',
    cadence: 'Review cadence',
    cadencePh: 'e.g. Weekly async check-in, one live review at midpoint',
    published: 'Project published',
    publishedBody: 'Your new brief is live on the marketplace.',
    viewPublic: 'View public brief',
    openCompanyProjects: 'Open company projects',
    publishError: 'Publish error',
    publishing: 'Publishing…',
    publish: 'Publish project →',
    livePreviewEyebrow: 'Live preview',
    livePreviewTitle: 'How this will look on the board',
    placeholderTitle: 'Your project title',
    placeholderSummary: 'Your project summary will appear here.',
    livePreviewEmptyTitle: 'Start filling in the form',
    livePreviewEmptyBody: 'A preview of your project card will appear here as you type.',
    checklistEyebrow: 'Publishing checklist',
    checklistTitle: 'What makes a strong brief.',
    checklistDesc: 'Students can tell the difference between a real brief and a lazy posting. A detailed brief earns better applicants.',
    fallbackErr: 'Unable to publish the project.',
  },
  fr: {
    eyebrow: 'Publier un projet',
    h1: 'Transformez votre besoin d’entreprise en un mandat clair sur le tableau.',
    intro: 'Remplissez scope, budget, échéance et compétences requises. Les étudiants verront le mandat complet avant de postuler.',
    fillIn: 'Remplissez le formulaire ci-dessous',
    briefEyebrow: 'Mandat',
    briefTitle: 'Détails du projet',
    postingAs: (name: string) => `Publication par ${name}`,
    title: 'Titre du projet',
    titlePh: 'p. ex. Sprint de refonte frontend pour un tableau fintech',
    typeLabel: 'Type de projet',
    types: ['Sprint freelance', 'Mandat court terme', 'Projet portfolio'],
    workMode: 'Mode de travail',
    workModes: ['À distance', 'Hybride', 'Sur place'],
    duration: 'Durée',
    durationPh: 'p. ex. 4 semaines',
    budget: 'Budget',
    budgetPh: 'p. ex. 2 000$ - 3 500$',
    deadline: 'Date limite de candidature',
    deadlinePh: 'p. ex. Postule avant le 10 avril',
    expLevel: 'Niveau d’expérience',
    expLevels: ['Junior à intermédiaire', 'Intermédiaire', 'Avancé'],
    skills: 'Compétences requises',
    skillsHint: '(séparées par des virgules)',
    skillsPh: 'p. ex. React, Figma, Accessibilité',
    summary: 'Résumé du projet',
    summaryPh: 'Quel est le scope ? Quel problème ça résout ? À quoi ressemble le succès ?',
    deliverables: 'Livrables',
    deliverablesPh: 'p. ex. Rapport d’audit UI, bibliothèque de composants révisée, documentation de remise',
    cadence: 'Cadence de revue',
    cadencePh: 'p. ex. Point async hebdomadaire, une revue live à mi-parcours',
    published: 'Projet publié',
    publishedBody: 'Votre nouveau mandat est en ligne sur la vitrine.',
    viewPublic: 'Voir le mandat public',
    openCompanyProjects: 'Ouvrir les projets entreprise',
    publishError: 'Erreur de publication',
    publishing: 'Publication…',
    publish: 'Publier le projet →',
    livePreviewEyebrow: 'Aperçu en direct',
    livePreviewTitle: 'À quoi ça ressemblera sur le tableau',
    placeholderTitle: 'Votre titre de projet',
    placeholderSummary: 'Votre résumé apparaîtra ici.',
    livePreviewEmptyTitle: 'Commencez à remplir le formulaire',
    livePreviewEmptyBody: 'Un aperçu de votre carte de projet apparaîtra ici au fur et à mesure.',
    checklistEyebrow: 'Liste de publication',
    checklistTitle: 'Ce qui fait un mandat solide.',
    checklistDesc: 'Les étudiants distinguent un vrai mandat d’une publication paresseuse. Un mandat détaillé attire de meilleurs candidats.',
    fallbackErr: 'Impossible de publier le projet.',
  },
}

function CompanyPostProjectPage({ session, onPostProject }: CompanyPostProjectPageProps) {
  const lang = useLang()
  const t = copy[lang]
  const [title, setTitle] = useState('')
  const [projectType, setProjectType] = useState(t.types[0])
  const [budget, setBudget] = useState('')
  const [workMode, setWorkMode] = useState(t.workModes[0])
  const [duration, setDuration] = useState('')
  const [experienceLevel, setExperienceLevel] = useState(t.expLevels[1])
  const [deadline, setDeadline] = useState('')
  const [skills, setSkills] = useState('')
  const [deliverables, setDeliverables] = useState('')
  const [reviewCadence, setReviewCadence] = useState('')
  const [summary, setSummary] = useState('')
  const [postedSlug, setPostedSlug] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const deferredSummary = useDeferredValue(summary)
  const parsedSkills = skills.split(',').map((s) => s.trim()).filter(Boolean)
  const parsedDeliverables = deliverables.split(',').map((s) => s.trim()).filter(Boolean)

  return (
    <>
      <section className="section-block" style={{ paddingBottom: 0 }}>
        <div style={{ maxWidth: '36rem' }}>
          <p className="eyebrow">{t.eyebrow}</p>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', lineHeight: 1.2, margin: '0.5rem 0 1rem' }}>
            {t.h1}
          </h1>
          <p className="page-intro" style={{ margin: 0 }}>{t.intro}</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '1.5rem 0 0', color: 'var(--brand-orange)', fontWeight: 700, fontSize: '0.9rem' }}>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          {t.fillIn}
        </div>
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card" style={{ border: '2px solid var(--brand-orange)', boxShadow: '0 4px 24px rgba(247,148,29,0.08)' }}>
          <div className="section-heading" style={{ marginBottom: '1.25rem' }}>
            <div>
              <p className="eyebrow">{t.briefEyebrow}</p>
              <h2>{t.briefTitle}</h2>
            </div>
          </div>

          <form
            className="form-grid"
            onSubmit={async (event) => {
              event.preventDefault()
              setErrorMessage('')
              setIsSubmitting(true)

              try {
                const slug = await onPostProject({
                  title,
                  projectType,
                  budget,
                  workMode,
                  duration,
                  experienceLevel,
                  deadlineLabel: deadline,
                  skills: parsedSkills,
                  deliverables: parsedDeliverables,
                  reviewCadence,
                  summary,
                })

                setPostedSlug(slug)
              } catch (error) {
                setErrorMessage(error instanceof Error ? error.message : t.fallbackErr)
              } finally {
                setIsSubmitting(false)
              }
            }}
          >
            <article className="list-card" style={{ borderColor: 'var(--brand-orange)' }}>
              <div>
                <strong>{t.postingAs(session.companyName)}</strong>
                <p>{session.industry} · {session.website}</p>
              </div>
            </article>

            <div className="field-row">
              <label className="field-shell">
                <span className="mini-label">{t.title}</span>
                <input onChange={(event) => setTitle(event.target.value)} placeholder={t.titlePh} required value={title} />
              </label>

              <label className="field-shell">
                <span className="mini-label">{t.typeLabel}</span>
                <select onChange={(event) => setProjectType(event.target.value)} value={projectType}>
                  {t.types.map((opt) => <option key={opt}>{opt}</option>)}
                </select>
              </label>
            </div>

            <div className="field-row">
              <label className="field-shell">
                <span className="mini-label">{t.workMode}</span>
                <select onChange={(event) => setWorkMode(event.target.value)} value={workMode}>
                  {t.workModes.map((opt) => <option key={opt}>{opt}</option>)}
                </select>
              </label>

              <label className="field-shell">
                <span className="mini-label">{t.duration}</span>
                <input onChange={(event) => setDuration(event.target.value)} placeholder={t.durationPh} required value={duration} />
              </label>
            </div>

            <div className="field-row">
              <label className="field-shell">
                <span className="mini-label">{t.budget}</span>
                <input onChange={(event) => setBudget(event.target.value)} placeholder={t.budgetPh} required value={budget} />
              </label>

              <label className="field-shell">
                <span className="mini-label">{t.deadline}</span>
                <input onChange={(event) => setDeadline(event.target.value)} placeholder={t.deadlinePh} required value={deadline} />
              </label>
            </div>

            <div className="field-row">
              <label className="field-shell">
                <span className="mini-label">{t.expLevel}</span>
                <select onChange={(event) => setExperienceLevel(event.target.value)} value={experienceLevel}>
                  {t.expLevels.map((opt) => <option key={opt}>{opt}</option>)}
                </select>
              </label>

              <label className="field-shell">
                <span className="mini-label">{t.skills} <span style={{ color: 'var(--ink-soft)', fontWeight: 400 }}>{t.skillsHint}</span></span>
                <input onChange={(event) => setSkills(event.target.value)} placeholder={t.skillsPh} required value={skills} />
              </label>
            </div>

            <label className="field-shell">
              <span className="mini-label">{t.summary}</span>
              <textarea onChange={(event) => setSummary(event.target.value)} placeholder={t.summaryPh} required rows={4} value={summary} />
            </label>

            <label className="field-shell">
              <span className="mini-label">{t.deliverables} <span style={{ color: 'var(--ink-soft)', fontWeight: 400 }}>{t.skillsHint}</span></span>
              <textarea
                onChange={(event) => setDeliverables(event.target.value)}
                placeholder={t.deliverablesPh}
                required
                rows={3}
                value={deliverables}
              />
            </label>

            <label className="field-shell">
              <span className="mini-label">{t.cadence}</span>
              <input onChange={(event) => setReviewCadence(event.target.value)} placeholder={t.cadencePh} required value={reviewCadence} />
            </label>

            {postedSlug ? (
              <article className="info-card tone-green">
                <span className="mini-label">{t.published}</span>
                <strong>{t.publishedBody}</strong>
                <div className="hero-actions">
                  <a className="button button-primary" href={routeHref(`/projects/${postedSlug}`)}>
                    {t.viewPublic}
                  </a>
                  <a className="button button-secondary" href={routeHref('/company/projects')}>
                    {t.openCompanyProjects}
                  </a>
                </div>
              </article>
            ) : null}

            {errorMessage ? (
              <article className="info-card tone-red">
                <span className="mini-label">{t.publishError}</span>
                <strong>{errorMessage}</strong>
              </article>
            ) : null}

            <button className="button button-primary" disabled={isSubmitting} style={{ marginTop: '0.25rem' }} type="submit">
              {isSubmitting ? t.publishing : t.publish}
            </button>
          </form>
        </article>

        <div className="story-stack">
          {(title || summary) ? (
            <article className="panel-card">
              <SectionHeading eyebrow={t.livePreviewEyebrow} title={t.livePreviewTitle} />

              <article className="project-card tone-orange">
                <div className="project-card-topline">
                  <span className="card-kicker">
                    {session.companyName} / {projectType}
                  </span>
                  <span className="meta-chip">{workMode}</span>
                </div>
                <h3>{title || t.placeholderTitle}</h3>
                <p>{deferredSummary || t.placeholderSummary}</p>
                <div className="project-card-meta">
                  {budget && <span>{budget}</span>}
                  {duration && <span>{duration}</span>}
                  {experienceLevel && <span>{experienceLevel}</span>}
                  {deadline && <span>{deadline}</span>}
                </div>
                {parsedSkills.length > 0 && (
                  <div className="tag-row">
                    {parsedSkills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                )}
              </article>

              {parsedDeliverables.length > 0 && (
                <div className="list-stack" style={{ marginTop: '0.75rem' }}>
                  {parsedDeliverables.map((item) => (
                    <article key={item} className="list-card">
                      <strong>{item}</strong>
                    </article>
                  ))}
                </div>
              )}
            </article>
          ) : (
            <article className="info-card tone-orange">
              <span className="mini-label">{t.livePreviewEyebrow}</span>
              <strong>{t.livePreviewEmptyTitle}</strong>
              <p>{t.livePreviewEmptyBody}</p>
            </article>
          )}

          <article className="panel-card">
            <SectionHeading
              eyebrow={t.checklistEyebrow}
              title={t.checklistTitle}
              description={t.checklistDesc}
            />

            <ul className="point-list">
              {companyPublishingChecklist.map((item, idx) => (
                <li key={idx}>{pick(item, lang)}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </>
  )
}

export default CompanyPostProjectPage
