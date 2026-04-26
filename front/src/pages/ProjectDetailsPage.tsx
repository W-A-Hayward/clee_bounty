import { useEffect, useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import type { StudentProject } from '../data/studentPortal'
import { pick, useLang } from '../i18n/LanguageContext'
import type { MemberSession } from '../lib/demoSession'
import { routeHref } from '../lib/hashRouter'
import type { DemoApplicationResult } from '../lib/demoPlatform'

type ProjectDetailsPageProps = {
  project?: StudentProject
  session?: MemberSession | null
  hasApplied?: boolean
  onApply?: (note: string) => Promise<DemoApplicationResult>
  onRequestSignIn?: () => void
}

const copy = {
  en: {
    notFoundTitle: 'Project not found.',
    notFoundBody: 'The requested project does not exist in the current project feed.',
    backToProjects: 'Back to projects',
    quickFacts: 'Quick facts',
    companyContext: 'Company context',
    whyPosting: (company: string) => `Why ${company} is posting this now.`,
    projectScope: 'Project scope',
    whyFitKicker: 'Why this is a fit',
    beforeApply: 'Before you apply',
    sharperApp: 'Use the brief to submit a sharper application.',
    signInToApply: 'Sign in to move from browsing to applying.',
    appHelp: 'The strongest applications usually mirror the scope and constraints already written into the project.',
    appStatus: 'Application status',
    alreadySubmitted: 'Application already submitted',
    trackUpdate: 'You can track the next update from the applications queue or messages.',
    viewApplications: 'View applications',
    openMessages: 'Open messages',
    shortNote: 'Short application note',
    submitted: 'Submitted',
    needsAttention: 'Needs attention',
    submitting: 'Submitting...',
    submitApp: 'Submit application',
    signInAsStudent: 'Sign in as student to apply',
    createStudent: 'Create student account',
    overview: 'Project overview',
    deliverableTitle: 'What you would actually deliver.',
    deliverableDesc: 'The brief is written as concrete outputs rather than a vague role description.',
    milestones: 'Milestones',
    milestonesTitle: 'The work is staged with actual review points.',
    statusLabels: {
      pending: 'pending',
      in_progress: 'in progress',
      submitted: 'submitted',
      approved: 'approved',
    },
    notePrefill: (company: string, title: string) => `Hi ${company}, I would be a strong fit for ${title} because `,
  },
  fr: {
    notFoundTitle: 'Projet introuvable.',
    notFoundBody: 'Le projet demandé n’existe pas dans le fil actuel.',
    backToProjects: 'Retour aux projets',
    quickFacts: 'En bref',
    companyContext: 'Contexte entreprise',
    whyPosting: (company: string) => `Pourquoi ${company} publie ça maintenant.`,
    projectScope: 'Scope du projet',
    whyFitKicker: 'Pourquoi ça colle',
    beforeApply: 'Avant de postuler',
    sharperApp: 'Sers-toi du mandat pour soumettre une candidature plus aiguisée.',
    signInToApply: 'Connecte-toi pour passer de l’exploration à la candidature.',
    appHelp: 'Les meilleures candidatures reflètent le scope et les contraintes déjà écrites dans le projet.',
    appStatus: 'Statut de la candidature',
    alreadySubmitted: 'Candidature déjà soumise',
    trackUpdate: 'Tu peux suivre la prochaine mise à jour depuis ta file de candidatures ou tes messages.',
    viewApplications: 'Voir les candidatures',
    openMessages: 'Ouvrir les messages',
    shortNote: 'Courte note de candidature',
    submitted: 'Soumise',
    needsAttention: 'À corriger',
    submitting: 'Envoi…',
    submitApp: 'Soumettre la candidature',
    signInAsStudent: 'Connecte-toi comme étudiant pour postuler',
    createStudent: 'Créer un compte étudiant',
    overview: 'Aperçu du projet',
    deliverableTitle: 'Ce que tu livrerais vraiment.',
    deliverableDesc: 'Le mandat est écrit comme des sorties concrètes plutôt qu’une description de rôle floue.',
    milestones: 'Étapes',
    milestonesTitle: 'Le travail est étagé avec de vrais points de revue.',
    statusLabels: {
      pending: 'à faire',
      in_progress: 'en cours',
      submitted: 'soumise',
      approved: 'approuvée',
    },
    notePrefill: (company: string, title: string) => `Bonjour ${company}, je serais un bon match pour ${title} parce que `,
  },
}

function ProjectDetailsPage({
  project,
  session = null,
  hasApplied = false,
  onApply,
  onRequestSignIn,
}: ProjectDetailsPageProps) {
  const lang = useLang()
  const t = copy[lang]
  const [note, setNote] = useState('')
  const [applicationFeedback, setApplicationFeedback] = useState<DemoApplicationResult | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!project) {
      return
    }

    setNote(t.notePrefill(project.company, pick(project.title, lang)))
    setApplicationFeedback(null)
  }, [project?.slug, lang])

  if (!project) {
    return (
      <section className="section-block">
        <article className="panel-card">
          <h2>{t.notFoundTitle}</h2>
          <p>{t.notFoundBody}</p>
          <a className="button button-primary" href={routeHref('/projects')}>
            {t.backToProjects}
          </a>
        </article>
      </section>
    )
  }

  return (
    <>
      <section className="section-block portal-section-tight">
        <div className="detail-hero">
          <div>
            <p className="eyebrow">{project.company}</p>
            <h2>{pick(project.title, lang)}</h2>
            <p className="page-intro">{pick(project.description, lang)}</p>
          </div>

          <article className={`info-card ${project.tone}`}>
            <span className="mini-label">{t.quickFacts}</span>
            <strong>{project.budget}</strong>
            <p>
              {pick(project.compensationType, lang)} / {pick(project.experienceLevel, lang)}
            </p>
            <p>
              {pick(project.workMode, lang)} / {pick(project.duration, lang)} / {pick(project.deadlineLabel, lang)}
            </p>
            <p>{pick(project.postedLabel, lang)}</p>
            <div className="tag-row">
              {project.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card">
          <SectionHeading
            eyebrow={t.companyContext}
            title={t.whyPosting(project.company)}
            description={pick(project.companySummary, lang)}
          />

          <div className="feature-grid feature-grid-two">
            <article className="feature-card tone-blue">
              <span className="card-kicker">{pick(project.category, lang)}</span>
              <h3>{t.projectScope}</h3>
              <p>{pick(project.summary, lang)}</p>
            </article>

            <article className={`feature-card ${project.tone}`}>
              <span className="card-kicker">{t.whyFitKicker}</span>
              <h3>{pick(project.experienceLevel, lang)}</h3>
              <p>{pick(project.fitReason, lang)}</p>
            </article>
          </div>
        </article>

        <article className="panel-card">
          <SectionHeading
            eyebrow={t.beforeApply}
            title={session ? t.sharperApp : t.signInToApply}
            description={t.appHelp}
          />

          <ul className="point-list">
            {project.applicationChecklist.map((item, idx) => (
              <li key={idx}>{pick(item, lang)}</li>
            ))}
          </ul>

          {session ? (
            hasApplied ? (
              <article className="info-card tone-green">
                <span className="mini-label">{t.appStatus}</span>
                <strong>{t.alreadySubmitted}</strong>
                <p>{t.trackUpdate}</p>
                <div className="hero-actions">
                  <a className="button button-primary" href={routeHref('/applications')}>
                    {t.viewApplications}
                  </a>
                  <a className="button button-secondary" href={routeHref('/messages')}>
                    {t.openMessages}
                  </a>
                </div>
              </article>
            ) : (
              <form
                className="form-grid"
                onSubmit={async (event) => {
                  event.preventDefault()

                  if (!onApply) {
                    return
                  }

                  setIsSubmitting(true)
                  setApplicationFeedback(await onApply(note))
                  setIsSubmitting(false)
                }}
              >
                <label className="field-shell">
                  <span className="mini-label">{t.shortNote}</span>
                  <textarea onChange={(event) => setNote(event.target.value)} rows={5} value={note} />
                </label>

                {applicationFeedback ? (
                  <article className={`info-card ${applicationFeedback.ok ? 'tone-green' : 'tone-red'}`}>
                    <span className="mini-label">{applicationFeedback.ok ? t.submitted : t.needsAttention}</span>
                    <strong>{applicationFeedback.message}</strong>
                  </article>
                ) : null}

                <div className="hero-actions">
                  <button className="button button-primary" type="submit">
                    {isSubmitting ? t.submitting : t.submitApp}
                  </button>
                  <a className="button button-secondary" href={routeHref('/projects')}>
                    {t.backToProjects}
                  </a>
                </div>
              </form>
            )
          ) : (
            <div className="hero-actions">
              <button className="button button-primary" onClick={onRequestSignIn} type="button">
                {t.signInAsStudent}
              </button>
              <a className="button button-secondary" href={routeHref('/students/create-account')}>
                {t.createStudent}
              </a>
            </div>
          )}
        </article>
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card">
          <SectionHeading
            eyebrow={t.overview}
            title={t.deliverableTitle}
            description={t.deliverableDesc}
          />

          <div className="list-stack">
            {project.deliverables.map((deliverable, idx) => (
              <article key={idx} className="list-card">
                <strong>{pick(deliverable, lang)}</strong>
              </article>
            ))}
          </div>
        </article>

        <article className="panel-card">
          <SectionHeading eyebrow={t.milestones} title={t.milestonesTitle} />

          <div className="list-stack">
            {project.milestones.map((milestone, idx) => (
              <article key={idx} className="list-card">
                <div>
                  <strong>{pick(milestone.title, lang)}</strong>
                  <p>
                    {pick(milestone.dueLabel, lang)} / {milestone.amount}
                  </p>
                </div>
                <span className={`status-pill status-${milestone.status}`}>{t.statusLabels[milestone.status]}</span>
              </article>
            ))}
          </div>
        </article>
      </section>
    </>
  )
}

export default ProjectDetailsPage
