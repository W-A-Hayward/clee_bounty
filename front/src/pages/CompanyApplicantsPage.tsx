import { useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import { pick, useLang } from '../i18n/LanguageContext'
import type { ApiCompanyApplicant, DemoCompanyProject } from '../lib/demoPlatform'
import { routeHref } from '../lib/hashRouter'

const statusToneMap: Record<ApiCompanyApplicant['status'], string> = {
  submitted: 'status-submitted',
  shortlisted: 'status-shortlisted',
  interviewing: 'status-interviewing',
  accepted: 'status-match',
}

type CompanyApplicantsPageProps = {
  projects: DemoCompanyProject[]
  applicants: ApiCompanyApplicant[]
}

const copy = {
  en: {
    eyebrow: 'Applicant review',
    title: 'All candidates across your active projects.',
    desc: 'Filter by project to focus review. Shortlist, invite to interview, or decline from one queue.',
    totalApplicants: 'total applicants',
    totalApplicantsBody: 'Candidates who have submitted to any of your live briefs.',
    shortlistedOrFurther: 'shortlisted or further',
    shortlistedBody: 'Candidates who passed first review and are moving forward.',
    awaitingReview: 'awaiting first review',
    awaitingBody: 'New submissions that have not been acted on yet.',
    allProjects: 'All projects',
    shortlist: 'Shortlist candidate',
    decline: 'Decline',
    invite: 'Invite to interview',
    sendMessage: 'Send message',
    moveAccepted: 'Move to accepted',
    openConvo: 'Open conversation',
    viewProjectMsgs: 'View project messages',
    noneOnProject: 'No applicants on this project yet.',
    noneBody: 'Once the brief is live and candidates start applying, they will appear here.',
    postProject: 'Post a project',
    reviewTipsEyebrow: 'Review tips',
    reviewTipsTitle: 'Move faster with a clear first-pass standard.',
    reviewTipsDesc: 'A quick first read reduces back-and-forth and helps the right candidates move forward without delay.',
    tips: [
      'Check portfolio fit before reading the note in full',
      'Availability and rate mismatches are easy early filters',
      'Shortlist before you are fully decided, it signals momentum',
      'Decline quickly when the fit is clearly off, candidates appreciate clarity',
    ],
    pipelineEyebrow: 'Pipeline status',
    pipelineTitle: 'Projects by current applicant pressure.',
    pipelineDesc: 'Projects with more unreviewed submissions need attention first.',
    applicantSingular: 'applicant',
    applicantPlural: 'applicants',
    awaitingSuffix: 'awaiting review',
    statusLabels: {
      submitted: 'submitted',
      shortlisted: 'shortlisted',
      interviewing: 'interviewing',
      accepted: 'accepted',
      draft: 'draft',
      open: 'open',
      in_review: 'in review',
      matched: 'matched',
      in_progress: 'in progress',
    } as Record<string, string>,
  },
  fr: {
    eyebrow: 'Revue des candidats',
    title: 'Tous les candidats sur vos projets actifs.',
    desc: 'Filtrez par projet pour concentrer la revue. Shortlistez, invitez en entrevue ou refusez depuis une seule file.',
    totalApplicants: 'candidats au total',
    totalApplicantsBody: 'Candidats qui ont postulé à n’importe lequel de vos mandats actifs.',
    shortlistedOrFurther: 'shortlistés ou plus loin',
    shortlistedBody: 'Candidats qui ont passé la première revue et avancent.',
    awaitingReview: 'en attente de première revue',
    awaitingBody: 'Nouvelles soumissions qui n’ont pas encore été traitées.',
    allProjects: 'Tous les projets',
    shortlist: 'Shortlister',
    decline: 'Refuser',
    invite: 'Inviter en entrevue',
    sendMessage: 'Envoyer un message',
    moveAccepted: 'Passer à accepté',
    openConvo: 'Ouvrir la conversation',
    viewProjectMsgs: 'Voir les messages du projet',
    noneOnProject: 'Aucun candidat sur ce projet pour l’instant.',
    noneBody: 'Dès que le mandat est en ligne et que des candidats postulent, ils apparaîtront ici.',
    postProject: 'Publier un projet',
    reviewTipsEyebrow: 'Conseils de revue',
    reviewTipsTitle: 'Avancez plus vite avec un standard clair de première passe.',
    reviewTipsDesc: 'Une première lecture rapide réduit les allers-retours et aide les bons candidats à avancer sans délai.',
    tips: [
      'Vérifiez l’adéquation du portfolio avant de lire la note en entier',
      'Les écarts de disponibilité et de taux sont des filtres faciles dès le départ',
      'Shortlistez avant d’être complètement décidé — ça signale du momentum',
      'Refusez rapidement quand le fit est clairement off — les candidats apprécient la clarté',
    ],
    pipelineEyebrow: 'État du pipeline',
    pipelineTitle: 'Projets par pression de candidats actuelle.',
    pipelineDesc: 'Les projets avec plus de soumissions non examinées ont besoin d’attention en premier.',
    applicantSingular: 'candidat',
    applicantPlural: 'candidats',
    awaitingSuffix: 'en attente de revue',
    statusLabels: {
      submitted: 'soumise',
      shortlisted: 'shortlisté',
      interviewing: 'entrevue',
      accepted: 'accepté',
      draft: 'brouillon',
      open: 'ouvert',
      in_review: 'en revue',
      matched: 'matché',
      in_progress: 'en cours',
    } as Record<string, string>,
  },
}

function CompanyApplicantsPage({ projects, applicants }: CompanyApplicantsPageProps) {
  const lang = useLang()
  const t = copy[lang]
  const [activeSlug, setActiveSlug] = useState<string>('all')

  const filteredApplicants =
    activeSlug === 'all'
      ? applicants
      : applicants.filter((a) => a.projectSlug === activeSlug)

  const totalApplicants = applicants.length
  const shortlisted = applicants.filter((a) => a.status === 'shortlisted' || a.status === 'interviewing' || a.status === 'accepted').length
  const needsReview = applicants.filter((a) => a.status === 'submitted').length

  return (
    <>
      <section className="section-block portal-section-tight">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          description={t.desc}
        />

        <div className="metrics-grid">
          <article className="metric-card tone-blue">
            <strong>{totalApplicants}</strong>
            <div>
              <span>{t.totalApplicants}</span>
              <p>{t.totalApplicantsBody}</p>
            </div>
          </article>
          <article className="metric-card tone-green">
            <strong>{shortlisted}</strong>
            <div>
              <span>{t.shortlistedOrFurther}</span>
              <p>{t.shortlistedBody}</p>
            </div>
          </article>
          <article className="metric-card tone-orange">
            <strong>{needsReview}</strong>
            <div>
              <span>{t.awaitingReview}</span>
              <p>{t.awaitingBody}</p>
            </div>
          </article>
        </div>
      </section>

      {projects.length > 0 && (
        <section className="section-block portal-section-tight">
          <div className="filter-row">
            <button
              className={`filter-chip${activeSlug === 'all' ? ' is-active' : ''}`}
              onClick={() => setActiveSlug('all')}
              type="button"
            >
              {t.allProjects}
            </button>
            {projects.map((project) => {
              const titleStr = pick(project.title, lang)
              return (
                <button
                  key={project.id}
                  className={`filter-chip${activeSlug === (project.publicSlug ?? project.id) ? ' is-active' : ''}`}
                  onClick={() => setActiveSlug(project.publicSlug ?? project.id)}
                  type="button"
                >
                  {titleStr.split(' ').slice(0, 4).join(' ')}…
                </button>
              )
            })}
          </div>
        </section>
      )}

      <section className="section-block">
        {filteredApplicants.length > 0 ? (
          <div className="list-stack">
            {filteredApplicants.map((applicant) => (
              <article key={applicant.id} className="panel-card">
                <div className="project-card-topline">
                  <div>
                    <span className="card-kicker">{applicant.projectTitle.split(' ').slice(0, 6).join(' ')}…</span>
                    <h3 style={{ margin: '0.35rem 0 0', fontSize: '1.25rem' }}>{applicant.studentName}</h3>
                  </div>
                  <div className="status-column">
                    <span className={`status-pill ${statusToneMap[applicant.status]}`}>{t.statusLabels[applicant.status] ?? applicant.status}</span>
                    <small>{applicant.appliedLabel}</small>
                  </div>
                </div>

                <div className="project-card-meta">
                  <span>{applicant.studentSchool}</span>
                  <span>{applicant.studentProgram}</span>
                  <span>{applicant.studentRate}</span>
                  <span>{applicant.studentAvailability}</span>
                </div>

                <p style={{ margin: '0.5rem 0 0', color: 'var(--ink-soft)' }}>{applicant.note}</p>

                <div className="hero-actions">
                  {applicant.status === 'submitted' && (
                    <>
                      <button className="button button-primary" type="button">
                        {t.shortlist}
                      </button>
                      <button className="button button-secondary" type="button">
                        {t.decline}
                      </button>
                    </>
                  )}
                  {applicant.status === 'shortlisted' && (
                    <>
                      <button className="button button-primary" type="button">
                        {t.invite}
                      </button>
                      <a className="button button-secondary" href={routeHref('/company/messages')}>
                        {t.sendMessage}
                      </a>
                    </>
                  )}
                  {applicant.status === 'interviewing' && (
                    <>
                      <button className="button button-primary" type="button">
                        {t.moveAccepted}
                      </button>
                      <a className="button button-secondary" href={routeHref('/company/messages')}>
                        {t.openConvo}
                      </a>
                    </>
                  )}
                  {applicant.status === 'accepted' && (
                    <a className="button button-secondary" href={routeHref('/company/messages')}>
                      {t.viewProjectMsgs}
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <article className="panel-card">
            <h2>{t.noneOnProject}</h2>
            <p>{t.noneBody}</p>
            <a className="button button-primary" href={routeHref('/company/post-project')}>
              {t.postProject}
            </a>
          </article>
        )}
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card">
          <SectionHeading
            eyebrow={t.reviewTipsEyebrow}
            title={t.reviewTipsTitle}
            description={t.reviewTipsDesc}
          />

          <div className="list-stack">
            {t.tips.map((tip) => (
              <article key={tip} className="list-card">
                <strong>{tip}</strong>
              </article>
            ))}
          </div>
        </article>

        <article className="panel-card">
          <SectionHeading
            eyebrow={t.pipelineEyebrow}
            title={t.pipelineTitle}
            description={t.pipelineDesc}
          />

          <div className="list-stack">
            {projects.map((project) => {
              const slug = project.publicSlug ?? project.id
              const count = applicants.filter((a) => a.projectSlug === slug).length
              const pending = applicants.filter((a) => a.projectSlug === slug && a.status === 'submitted').length
              const titleStr = pick(project.title, lang)

              return (
                <article key={project.id} className={`list-card ${project.tone}`}>
                  <div>
                    <strong>{titleStr.split(' ').slice(0, 5).join(' ')}…</strong>
                    <p>
                      {count} {count !== 1 ? t.applicantPlural : t.applicantSingular} / {pending} {t.awaitingSuffix}
                    </p>
                  </div>
                  <span className={`status-pill status-${project.status}`}>{t.statusLabels[project.status] ?? project.status}</span>
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
