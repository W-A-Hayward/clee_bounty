import SectionHeading from '../components/SectionHeading'
import { companyProfile, companyPublishingChecklist, companyTeam } from '../data/companyPortal'
import { pick, useLang } from '../i18n/LanguageContext'
import type { CompanySession } from '../lib/demoSession'
import type { DemoCompanyProject } from '../lib/demoPlatform'
import { routeHref } from '../lib/hashRouter'

type CompanyDashboardPageProps = {
  session: CompanySession
  projects: DemoCompanyProject[]
}

const copy = {
  en: {
    liveProjects: 'live projects',
    liveProjectsBodyYes: 'Briefs visible and accepting applicants.',
    liveProjectsBodyNo: 'Post a brief to go live.',
    totalApplicants: 'total applicants',
    totalApplicantsBodyYes: 'Candidates in your pipeline right now.',
    totalApplicantsBodyNo: 'Applicants appear once you publish.',
    shortlisted: 'shortlisted',
    shortlistedBodyYes: 'Strong candidates ready for next steps.',
    shortlistedBodyNo: 'Shortlisted candidates will show here.',
    companyProfile: 'Company profile',
    verifiedSuffix: 'Verified company',
    website: 'Website',
    teamSize: 'Team size',
    responseTime: 'Response time',
    responseBody: 'Average first reply within 36 hours',
    quickActions: 'Quick actions',
    quickActionsTitle: 'Pick up where you left off.',
    quickActionsDesc: 'Navigate to any section of your company workspace from here.',
    yourProjects: 'Your projects',
    yourProjectsBodyYes: (n: number) => `${n} briefs posted, manage scope, status, and applicants.`,
    yourProjectsBodyNo: 'Post your first project brief to start receiving applications.',
    applicantsCard: 'Applicants',
    applicantsCardYes: (n: number) => `${n} candidates across all your live projects.`,
    applicantsCardNo: 'Applicant profiles will appear here once your brief is live.',
    messages: 'Messages',
    messagesBody: 'Reply to candidates, share context, and keep hiring conversations in one place.',
    postProject: 'Post a project',
    postProjectBody: 'Draft a new scoped brief with budget, timeline, skills, and deliverables.',
    recent: 'Recent projects',
    totalSuffix: 'total',
    applicantsSuffix: 'applicants',
    shortlistedSuffix: 'shortlisted',
    viewAll: 'View all projects',
    beforePublish: 'Before you publish',
    beforePublishTitle: 'Keep your briefs clear and complete.',
    beforePublishDesc: 'Students read every field before applying. Well-structured briefs get better applicants.',
    postAnother: 'Post another project',
    noneYet: 'No projects yet',
    postFirst: 'Post your first brief to start receiving applications.',
    postFirstBody: 'Draft a scoped project with budget, timeline, required skills, and deliverables, then publish it live on the board.',
    postFirstBtn: 'Post your first project →',
    statusLabels: {
      draft: 'draft',
      open: 'open',
      in_review: 'in review',
      matched: 'matched',
      in_progress: 'in progress',
    } as Record<string, string>,
    primaryContact: 'Primary contact for this workspace.',
    companyAdmin: 'Company admin',
  },
  fr: {
    liveProjects: 'projets actifs',
    liveProjectsBodyYes: 'Mandats visibles et acceptant des candidatures.',
    liveProjectsBodyNo: 'Publiez un mandat pour le rendre actif.',
    totalApplicants: 'candidats au total',
    totalApplicantsBodyYes: 'Candidats dans votre pipeline en ce moment.',
    totalApplicantsBodyNo: 'Les candidats apparaîtront une fois que vous publierez.',
    shortlisted: 'shortlistés',
    shortlistedBodyYes: 'Candidats solides prêts pour la prochaine étape.',
    shortlistedBodyNo: 'Les candidats shortlistés apparaîtront ici.',
    companyProfile: 'Profil entreprise',
    verifiedSuffix: 'Entreprise vérifiée',
    website: 'Site web',
    teamSize: 'Taille de l’équipe',
    responseTime: 'Temps de réponse',
    responseBody: 'Première réponse moyenne sous 36 heures',
    quickActions: 'Actions rapides',
    quickActionsTitle: 'Reprenez là où vous étiez.',
    quickActionsDesc: 'Accédez à n’importe quelle section de votre espace entreprise depuis ici.',
    yourProjects: 'Vos projets',
    yourProjectsBodyYes: (n: number) => `${n} mandats publiés — gérez scope, statut et candidats.`,
    yourProjectsBodyNo: 'Publiez votre premier mandat pour commencer à recevoir des candidatures.',
    applicantsCard: 'Candidats',
    applicantsCardYes: (n: number) => `${n} candidats sur l’ensemble de vos projets actifs.`,
    applicantsCardNo: 'Les profils de candidats apparaîtront ici une fois votre mandat publié.',
    messages: 'Messages',
    messagesBody: 'Répondez aux candidats, partagez du contexte, et gardez les conversations d’embauche au même endroit.',
    postProject: 'Publier un projet',
    postProjectBody: 'Rédigez un nouveau mandat bien défini avec budget, échéance, compétences et livrables.',
    recent: 'Projets récents',
    totalSuffix: 'au total',
    applicantsSuffix: 'candidats',
    shortlistedSuffix: 'shortlistés',
    viewAll: 'Voir tous les projets',
    beforePublish: 'Avant de publier',
    beforePublishTitle: 'Gardez vos mandats clairs et complets.',
    beforePublishDesc: 'Les étudiants lisent chaque champ avant de postuler. Des mandats bien structurés attirent de meilleurs candidats.',
    postAnother: 'Publier un autre projet',
    noneYet: 'Aucun projet pour l’instant',
    postFirst: 'Publiez votre premier mandat pour commencer à recevoir des candidatures.',
    postFirstBody: 'Rédigez un mandat bien défini avec budget, échéance, compétences requises et livrables, puis publiez-le sur le tableau.',
    postFirstBtn: 'Publier votre premier projet →',
    statusLabels: {
      draft: 'brouillon',
      open: 'ouvert',
      in_review: 'en revue',
      matched: 'matché',
      in_progress: 'en cours',
    } as Record<string, string>,
    primaryContact: 'Contact principal pour cet espace.',
    companyAdmin: 'Admin entreprise',
  },
}

function CompanyDashboardPage({ session, projects }: CompanyDashboardPageProps) {
  const lang = useLang()
  const t = copy[lang]
  const activeProjects = projects.filter((p) => p.status !== 'draft').length
  const totalApplicants = projects.reduce((sum, p) => sum + p.applicants, 0)
  const totalShortlisted = projects.reduce((sum, p) => sum + p.shortlisted, 0)

  const quickActions = [
    {
      title: t.yourProjects,
      body: projects.length > 0 ? t.yourProjectsBodyYes(projects.length) : t.yourProjectsBodyNo,
      href: '/company/projects',
    },
    {
      title: t.applicantsCard,
      body: totalApplicants > 0 ? t.applicantsCardYes(totalApplicants) : t.applicantsCardNo,
      href: '/company/applicants',
    },
    {
      title: t.messages,
      body: t.messagesBody,
      href: '/company/messages',
    },
    {
      title: t.postProject,
      body: t.postProjectBody,
      href: '/company/post-project',
    },
  ]

  const team =
    session.companyName === companyProfile.companyName
      ? companyTeam
      : [{ name: session.name, role: { en: t.companyAdmin, fr: t.companyAdmin }, note: { en: t.primaryContact, fr: t.primaryContact } }]

  return (
    <>
      <section className="section-block portal-section-tight">
        <div className="metrics-grid">
          <article className="metric-card tone-blue">
            <strong>{activeProjects}</strong>
            <div>
              <span>{t.liveProjects}</span>
              <p>{activeProjects > 0 ? t.liveProjectsBodyYes : t.liveProjectsBodyNo}</p>
            </div>
          </article>
          <article className="metric-card tone-green">
            <strong>{totalApplicants}</strong>
            <div>
              <span>{t.totalApplicants}</span>
              <p>{totalApplicants > 0 ? t.totalApplicantsBodyYes : t.totalApplicantsBodyNo}</p>
            </div>
          </article>
          <article className="metric-card tone-orange">
            <strong>{totalShortlisted}</strong>
            <div>
              <span>{t.shortlisted}</span>
              <p>{totalShortlisted > 0 ? t.shortlistedBodyYes : t.shortlistedBodyNo}</p>
            </div>
          </article>
        </div>
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card">
          <SectionHeading
            eyebrow={t.companyProfile}
            title={`${session.companyName}`}
            description={`${session.industry} · ${session.location} · ${t.verifiedSuffix}`}
          />
          <p style={{ color: 'var(--ink-soft)', marginBottom: '1rem', lineHeight: 1.6 }}>{session.description}</p>
          <div className="list-stack">
            <article className="list-card">
              <div>
                <strong>{t.website}</strong>
                <p>{session.website}</p>
              </div>
            </article>
            <article className="list-card">
              <div>
                <strong>{t.teamSize}</strong>
                <p>{session.teamSize}</p>
              </div>
            </article>
            <article className="list-card">
              <div>
                <strong>{t.responseTime}</strong>
                <p>{t.responseBody}</p>
              </div>
            </article>
          </div>
          <div className="list-stack" style={{ marginTop: '0.75rem' }}>
            {team.map((member) => (
              <article key={member.name} className="list-card">
                <div>
                  <strong>{member.name}</strong>
                  <p>{pick(member.role, lang)}</p>
                </div>
              </article>
            ))}
          </div>
        </article>

        <article className="panel-card">
          <SectionHeading
            eyebrow={t.quickActions}
            title={t.quickActionsTitle}
            description={t.quickActionsDesc}
          />
          <div className="list-stack">
            {quickActions.map((action) => (
              <a key={action.title} className="list-card" href={routeHref(action.href)}>
                <div>
                  <strong>{action.title}</strong>
                  <p>{action.body}</p>
                </div>
                <span style={{ color: 'var(--brand-orange)', fontWeight: 700, fontSize: '1.1rem' }}>→</span>
              </a>
            ))}
          </div>
        </article>
      </section>

      {projects.length > 0 ? (
        <section className="section-block portal-two-column">
          <article className="panel-card">
            <div className="card-topline">
              <span className="mini-label">{t.recent}</span>
              <span className="status-pill status-live">{projects.length} {t.totalSuffix}</span>
            </div>
            <div className="list-stack">
              {projects.slice(0, 3).map((project) => (
                <article key={project.id} className="list-card">
                  <div>
                    <strong>{pick(project.title, lang)}</strong>
                    <p>{project.applicants} {t.applicantsSuffix} · {project.shortlisted} {t.shortlistedSuffix}</p>
                  </div>
                  <div className="status-column">
                    <span className={`status-pill status-${project.status}`}>{t.statusLabels[project.status] ?? project.status}</span>
                  </div>
                </article>
              ))}
            </div>
            <div className="hero-actions" style={{ marginTop: '0.75rem' }}>
              <a className="button button-secondary" href={routeHref('/company/projects')}>{t.viewAll}</a>
            </div>
          </article>

          <article className="panel-card">
            <SectionHeading
              eyebrow={t.beforePublish}
              title={t.beforePublishTitle}
              description={t.beforePublishDesc}
            />
            <ul className="point-list">
              {companyPublishingChecklist.map((item, idx) => (
                <li key={idx}>{pick(item, lang)}</li>
              ))}
            </ul>
            <div className="hero-actions" style={{ marginTop: '0.75rem' }}>
              <a className="button button-primary" href={routeHref('/company/post-project')}>{t.postAnother}</a>
            </div>
          </article>
        </section>
      ) : (
        <section className="section-block">
          <article className="panel-card" style={{ border: '2px solid var(--brand-orange)', textAlign: 'center', padding: '2.5rem 2rem' }}>
            <p className="eyebrow">{t.noneYet}</p>
            <h2 style={{ margin: '0.5rem 0 0.75rem' }}>{t.postFirst}</h2>
            <p style={{ color: 'var(--ink-soft)', maxWidth: '30rem', margin: '0 auto 1.5rem' }}>{t.postFirstBody}</p>
            <a className="button button-primary" href={routeHref('/company/post-project')}>
              {t.postFirstBtn}
            </a>
          </article>
        </section>
      )}
    </>
  )
}

export default CompanyDashboardPage
