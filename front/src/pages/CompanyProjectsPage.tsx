import SectionHeading from '../components/SectionHeading'
import { companyPublishingChecklist } from '../data/companyPortal'
import { pick, useLang } from '../i18n/LanguageContext'
import type { DemoCompanyProject } from '../lib/demoPlatform'
import { routeHref } from '../lib/hashRouter'

type CompanyProjectsPageProps = {
  projects: DemoCompanyProject[]
}

const copy = {
  en: {
    eyebrow: 'Company projects',
    title: 'All your posted briefs in one place.',
    desc: 'Track live projects, applicant volume, and next steps across everything your company has published.',
    totalBriefs: 'total briefs',
    totalBriefsBody: 'Published, in review, matched, or in progress.',
    activeReview: 'active review',
    activeReviewBody: 'Still accepting or triaging applicants right now.',
    applicantVolume: 'applicant volume',
    applicantVolumeBody: 'Total candidates across all your live projects.',
    ownerLabel: 'Owner',
    applicants: 'applicants',
    shortlisted: 'shortlisted',
    review: 'Review applicants',
    publicBrief: 'Public brief',
    noneYet: 'No projects yet',
    readyPost: 'Ready to post your first brief?',
    readyBody: 'Fill in scope, budget, timeline, and required skills. Students will be able to apply as soon as you publish.',
    postFirst: 'Post your first project →',
    beforePublish: 'Before you publish',
    beforeTitle: 'A brief that reads well gets better applicants.',
    beforeDesc: 'Make sure every field is filled in before making a project live on the board.',
    postNew: 'Post a new brief',
    postNewTitle: 'Got a new project ready?',
    postNewDesc: 'Use the posting form to draft a structured brief with all the context students need.',
    postProject: 'Post a project →',
    statusLabels: {
      draft: 'draft',
      open: 'open',
      in_review: 'in review',
      matched: 'matched',
      in_progress: 'in progress',
    } as Record<string, string>,
  },
  fr: {
    eyebrow: 'Projets entreprise',
    title: 'Tous vos mandats publiés au même endroit.',
    desc: 'Suivez les projets actifs, le volume de candidats et les prochaines étapes pour tout ce que votre entreprise a publié.',
    totalBriefs: 'mandats au total',
    totalBriefsBody: 'Publiés, en revue, matchés ou en cours.',
    activeReview: 'en revue active',
    activeReviewBody: 'Encore en train d’accepter ou trier des candidats.',
    applicantVolume: 'volume de candidats',
    applicantVolumeBody: 'Total des candidats sur tous vos projets actifs.',
    ownerLabel: 'Responsable',
    applicants: 'candidats',
    shortlisted: 'shortlistés',
    review: 'Examiner les candidats',
    publicBrief: 'Mandat public',
    noneYet: 'Aucun projet pour l’instant',
    readyPost: 'Prêt à publier votre premier mandat ?',
    readyBody: 'Remplissez scope, budget, échéance et compétences requises. Les étudiants pourront postuler dès la publication.',
    postFirst: 'Publier votre premier projet →',
    beforePublish: 'Avant de publier',
    beforeTitle: 'Un mandat bien écrit attire de meilleurs candidats.',
    beforeDesc: 'Assurez-vous que chaque champ est rempli avant de rendre un projet actif sur le tableau.',
    postNew: 'Publier un nouveau mandat',
    postNewTitle: 'Un nouveau projet prêt ?',
    postNewDesc: 'Utilisez le formulaire pour rédiger un mandat structuré avec tout le contexte dont les étudiants ont besoin.',
    postProject: 'Publier un projet →',
    statusLabels: {
      draft: 'brouillon',
      open: 'ouvert',
      in_review: 'en revue',
      matched: 'matché',
      in_progress: 'en cours',
    } as Record<string, string>,
  },
}

function CompanyProjectsPage({ projects }: CompanyProjectsPageProps) {
  const lang = useLang()
  const t = copy[lang]
  const openProjects = projects.filter((p) => p.status === 'open').length
  const reviewProjects = projects.filter((p) => p.status === 'in_review').length
  const totalApplicants = projects.reduce((sum, p) => sum + p.applicants, 0)

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
            <strong>{projects.length}</strong>
            <div>
              <span>{t.totalBriefs}</span>
              <p>{t.totalBriefsBody}</p>
            </div>
          </article>
          <article className="metric-card tone-green">
            <strong>{openProjects + reviewProjects}</strong>
            <div>
              <span>{t.activeReview}</span>
              <p>{t.activeReviewBody}</p>
            </div>
          </article>
          <article className="metric-card tone-orange">
            <strong>{totalApplicants}</strong>
            <div>
              <span>{t.applicantVolume}</span>
              <p>{t.applicantVolumeBody}</p>
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
                    {pick(project.projectType, lang)} / {pick(project.workMode, lang)}
                  </span>
                  <span className={`status-pill status-${project.status}`}>{t.statusLabels[project.status] ?? project.status}</span>
                </div>

                <h3>{pick(project.title, lang)}</h3>
                <p>{pick(project.summary, lang)}</p>

                <div className="project-card-meta">
                  <span>{project.budget}</span>
                  <span>{pick(project.experienceLevel, lang)}</span>
                  <span>{pick(project.deadlineLabel, lang)}</span>
                  <span>{t.ownerLabel}: {project.owner}</span>
                </div>

                <div className="tag-row">
                  {project.requiredSkills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>

                <div className="project-card-footer">
                  <div>
                    <strong>
                      {project.applicants} {t.applicants} / {project.shortlisted} {t.shortlisted}
                    </strong>
                    <p>{pick(project.nextStep, lang)}</p>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <a className="button button-secondary" href={routeHref('/company/applicants')}>
                      {t.review}
                    </a>
                    {project.publicSlug ? (
                      <a className="button button-ghost" href={routeHref(`/projects/${project.publicSlug}`)}>
                        {t.publicBrief}
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <article className="panel-card" style={{ textAlign: 'center', padding: '2.5rem 2rem' }}>
            <p className="eyebrow">{t.noneYet}</p>
            <h2 style={{ margin: '0.5rem 0 0.75rem' }}>{t.readyPost}</h2>
            <p style={{ color: 'var(--ink-soft)', maxWidth: '28rem', margin: '0 auto 1.5rem' }}>{t.readyBody}</p>
            <a className="button button-primary" href={routeHref('/company/post-project')}>
              {t.postFirst}
            </a>
          </article>
        )}
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card">
          <SectionHeading
            eyebrow={t.beforePublish}
            title={t.beforeTitle}
            description={t.beforeDesc}
          />

          <ul className="point-list">
            {companyPublishingChecklist.map((item, idx) => (
              <li key={idx}>{pick(item, lang)}</li>
            ))}
          </ul>
        </article>

        <article className="panel-card">
          <SectionHeading
            eyebrow={t.postNew}
            title={t.postNewTitle}
            description={t.postNewDesc}
          />

          <a className="button button-primary" href={routeHref('/company/post-project')}>
            {t.postProject}
          </a>
        </article>
      </section>
    </>
  )
}

export default CompanyProjectsPage
