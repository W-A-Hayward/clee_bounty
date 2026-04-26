import SectionHeading from '../components/SectionHeading'
import type { StudentApplication, StudentProject } from '../data/studentPortal'
import { pick, useLang } from '../i18n/LanguageContext'
import { routeHref } from '../lib/hashRouter'

type ApplicationsPageProps = {
  applications: Array<StudentApplication & { project?: StudentProject }>
}

const copy = {
  en: {
    eyebrow: 'Applications',
    title: 'Your full application queue.',
    desc: 'Track every brief you’ve applied to, status updates, company feedback, and next steps in one place.',
    totalApps: 'total applications',
    totalAppsBody: 'Projects you’ve applied to since joining the platform.',
    shortlisted: 'shortlisted',
    shortlistedBodyYes: 'Companies are moving you forward, check for messages.',
    shortlistedBodyNo: 'Keep applying to build your pipeline.',
    pending: 'pending review',
    pendingBody: 'Applications waiting on the company’s first response.',
    noneYet: 'No applications yet',
    findFit: 'Find a project that fits and apply.',
    findFitBody: 'Browse scoped briefs with real budgets, clear timelines, and defined deliverables, then apply directly from the project page.',
    browseOpen: 'Browse open projects →',
    keepBuilding: 'Keep building',
    moreOnBoard: 'More opportunities on the board.',
    moreOnBoardBody: 'New briefs are added regularly. Browse all open projects to find the next one that matches your skills and availability.',
    browseProjects: 'Browse projects',
    checkMessages: 'Check messages',
    statusLabels: {
      submitted: 'submitted',
      shortlisted: 'shortlisted',
      interviewing: 'interviewing',
      accepted: 'accepted',
    },
  },
  fr: {
    eyebrow: 'Candidatures',
    title: 'Toute ta file de candidatures.',
    desc: 'Suis chaque mandat où tu as postulé : mises à jour de statut, retours d’entreprise, prochaines étapes, au même endroit.',
    totalApps: 'candidatures totales',
    totalAppsBody: 'Projets pour lesquels tu as postulé depuis ton inscription.',
    shortlisted: 'shortlistées',
    shortlistedBodyYes: 'Des entreprises te font avancer — vérifie tes messages.',
    shortlistedBodyNo: 'Continue à postuler pour bâtir ton pipeline.',
    pending: 'en attente',
    pendingBody: 'Candidatures en attente de la première réponse de l’entreprise.',
    noneYet: 'Aucune candidature pour l’instant',
    findFit: 'Trouve un projet qui colle et postule.',
    findFitBody: 'Explore des mandats bien définis avec de vrais budgets, échéances claires et livrables précis — puis postule directement depuis la page du projet.',
    browseOpen: 'Voir les projets ouverts →',
    keepBuilding: 'Continue à bâtir',
    moreOnBoard: 'Plus d’opportunités sur le tableau.',
    moreOnBoardBody: 'De nouveaux mandats sont ajoutés régulièrement. Explore tous les projets ouverts pour trouver le prochain qui matche tes compétences et ta disponibilité.',
    browseProjects: 'Explorer les projets',
    checkMessages: 'Voir les messages',
    statusLabels: {
      submitted: 'soumise',
      shortlisted: 'shortlistée',
      interviewing: 'entrevue',
      accepted: 'acceptée',
    },
  },
}

function ApplicationsPage({ applications }: ApplicationsPageProps) {
  const lang = useLang()
  const t = copy[lang]
  const shortlisted = applications.filter((a) => a.status === 'shortlisted' || a.status === 'interviewing').length

  return (
    <>
      <section className="section-block portal-section-tight">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          description={t.desc}
        />

        {applications.length > 0 && (
          <div className="metrics-grid">
            <article className="metric-card tone-blue">
              <strong>{applications.length}</strong>
              <div>
                <span>{t.totalApps}</span>
                <p>{t.totalAppsBody}</p>
              </div>
            </article>
            <article className="metric-card tone-green">
              <strong>{shortlisted}</strong>
              <div>
                <span>{t.shortlisted}</span>
                <p>{shortlisted > 0 ? t.shortlistedBodyYes : t.shortlistedBodyNo}</p>
              </div>
            </article>
            <article className="metric-card tone-orange">
              <strong>{applications.filter((a) => a.status === 'submitted').length}</strong>
              <div>
                <span>{t.pending}</span>
                <p>{t.pendingBody}</p>
              </div>
            </article>
          </div>
        )}
      </section>

      <section className="section-block">
        {applications.length > 0 ? (
          <div className="list-stack">
            {applications.map((application) => (
              <article key={application.id} className="list-card list-card-large">
                <div>
                  <span className="card-kicker">{application.project?.company}</span>
                  <h3>{application.project ? pick(application.project.title, lang) : ''}</h3>
                  {application.note ? <p style={{ color: 'var(--ink-soft)', marginTop: '0.25rem' }}>{pick(application.note, lang)}</p> : null}
                </div>
                <div className="status-column">
                  <span className={`status-pill status-${application.status}`}>{t.statusLabels[application.status]}</span>
                  <small>{pick(application.appliedLabel, lang)}</small>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <article className="panel-card" style={{ textAlign: 'center', padding: '2.5rem 2rem' }}>
            <p className="eyebrow">{t.noneYet}</p>
            <h2 style={{ margin: '0.5rem 0 0.75rem' }}>{t.findFit}</h2>
            <p style={{ color: 'var(--ink-soft)', maxWidth: '28rem', margin: '0 auto 1.5rem' }}>{t.findFitBody}</p>
            <a className="button button-primary" href={routeHref('/projects')}>
              {t.browseOpen}
            </a>
          </article>
        )}
      </section>

      {applications.length > 0 && (
        <section className="section-block">
          <div className="cta-panel-full">
            <div>
              <p className="eyebrow">{t.keepBuilding}</p>
              <h2>{t.moreOnBoard}</h2>
              <p>{t.moreOnBoardBody}</p>
            </div>
            <div className="cta-panel-actions">
              <a className="button button-primary" href={routeHref('/projects')}>{t.browseProjects}</a>
              <a className="button button-secondary" href={routeHref('/messages')}>{t.checkMessages}</a>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default ApplicationsPage
