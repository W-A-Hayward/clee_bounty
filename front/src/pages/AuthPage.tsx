import { useLang } from '../i18n/LanguageContext'
import type { DemoSession } from '../lib/demoSession'
import { routeHref } from '../lib/hashRouter'

type AuthPageProps = {
  session?: DemoSession
}

const copy = {
  en: {
    eyebrow: 'Account access',
    welcomeBack: (name: string) => `Welcome back, ${name}.`,
    signOrCreate: 'Sign in or create an account.',
    workspaceReady: 'Your workspace is ready. Head to your dashboard to manage projects, applications, and messages.',
    chooseYourPath: 'Choose your path, student or company. Both have a dedicated workspace once you are inside.',
    openCompanyDash: 'Open company dashboard',
    openStudentDash: 'Open student dashboard',
    studentsEyebrow: 'Students',
    studentsTitle: 'Browse real work and build your portfolio.',
    signInStudent: 'Sign in as student',
    signInStudentBody: 'Return to your dashboard, application queue, and active project threads.',
    createStudent: 'Create student account',
    createStudentBody: 'Set up your school identity, availability, and rate, then start applying.',
    studentBtn: 'Student sign in',
    companiesEyebrow: 'Companies',
    companiesTitle: 'Post structured work and hire emerging talent.',
    signInCompany: 'Sign in as company',
    signInCompanyBody: 'Return to your workspace, manage live briefs, review applicants, and message candidates.',
    createCompany: 'Create company account',
    createCompanyBody: 'Set up a verified company profile and post your first scoped brief.',
    companyBtn: 'Company sign in',
    learnMore: 'Learn more',
    notReady: 'Not ready to sign up?',
    browseFirst: 'Browse the project board first.',
    browseBody: 'The full marketplace is public. Read real briefs, see actual budgets, and get a feel for the work quality before creating an account.',
    browseOpen: 'Browse open projects',
    howWorks: 'How Legend works',
  },
  fr: {
    eyebrow: 'Accès au compte',
    welcomeBack: (name: string) => `Bon retour, ${name}.`,
    signOrCreate: 'Connexion ou création de compte.',
    workspaceReady: 'Votre atelier est prêt. Direction votre tableau pour gérer projets, candidatures et messages.',
    chooseYourPath: 'Choisis ton parcours — étudiant ou entreprise. Les deux ont un atelier dédié une fois à l’intérieur.',
    openCompanyDash: 'Ouvrir l’espace entreprise',
    openStudentDash: 'Ouvrir l’atelier étudiant',
    studentsEyebrow: 'Étudiants',
    studentsTitle: 'Explore du vrai travail et construis ton portfolio.',
    signInStudent: 'Connexion étudiant',
    signInStudentBody: 'Retourne à ton tableau, ta file de candidatures et tes fils de projets actifs.',
    createStudent: 'Créer un compte étudiant',
    createStudentBody: 'Configure ton identité scolaire, ta disponibilité et ton taux, puis commence à postuler.',
    studentBtn: 'Connexion étudiant',
    companiesEyebrow: 'Entreprises',
    companiesTitle: 'Publiez du travail structuré et embauchez des talents émergents.',
    signInCompany: 'Connexion entreprise',
    signInCompanyBody: 'Retournez à votre espace, gérez les mandats actifs, examinez les candidats et messagez.',
    createCompany: 'Créer un compte entreprise',
    createCompanyBody: 'Configurez un profil d’entreprise vérifié et publiez votre premier mandat.',
    companyBtn: 'Connexion entreprise',
    learnMore: 'En savoir plus',
    notReady: 'Pas prêt à créer un compte ?',
    browseFirst: 'Explore le tableau de projets d’abord.',
    browseBody: 'La plateforme complète est publique. Lis de vrais mandats, vois de vrais budgets, et ressens la qualité du travail avant de créer un compte.',
    browseOpen: 'Explorer les projets ouverts',
    howWorks: 'Comment Legend fonctionne',
  },
}

function AuthPage({ session = null }: AuthPageProps) {
  const lang = useLang()
  const t = copy[lang]
  const workspaceRoute = session?.role === 'company' ? '/company/dashboard' : '/dashboard'
  const workspaceLabel = session?.role === 'company' ? t.openCompanyDash : t.openStudentDash
  const userName = session
    ? session.role === 'company'
      ? (session as { companyName: string }).companyName
      : (session as { name: string }).name
    : ''

  return (
    <>
      <section className="section-block" style={{ paddingBottom: 0 }}>
        <div style={{ maxWidth: '38rem' }}>
          <p className="eyebrow">{t.eyebrow}</p>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: 1.2, margin: '0.5rem 0 1rem' }}>
            {session ? t.welcomeBack(userName) : t.signOrCreate}
          </h1>
          <p className="page-intro" style={{ margin: 0 }}>
            {session ? t.workspaceReady : t.chooseYourPath}
          </p>
        </div>

        {session && (
          <div style={{ marginTop: '1.5rem' }}>
            <a className="button button-primary" href={routeHref(workspaceRoute)}>
              {workspaceLabel} →
            </a>
          </div>
        )}
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card" style={{ border: '2px solid var(--brand-green)', boxShadow: '0 4px 24px rgba(140,198,63,0.08)' }}>
          <div className="section-heading" style={{ marginBottom: '1.25rem' }}>
            <div>
              <p className="eyebrow">{t.studentsEyebrow}</p>
              <h2>{t.studentsTitle}</h2>
            </div>
          </div>

          <div className="list-stack" style={{ marginBottom: '1.25rem' }}>
            <a className="list-card" href={routeHref('/students/sign-in')} style={{ borderColor: 'var(--brand-green)' }}>
              <div>
                <strong>{t.signInStudent}</strong>
                <p>{t.signInStudentBody}</p>
              </div>
              <span style={{ color: 'var(--brand-green)', fontWeight: 700, fontSize: '1.1rem' }}>→</span>
            </a>
            <a className="list-card" href={routeHref('/students/create-account')}>
              <div>
                <strong>{t.createStudent}</strong>
                <p>{t.createStudentBody}</p>
              </div>
              <span style={{ color: 'var(--ink-soft)', fontWeight: 700, fontSize: '1.1rem' }}>→</span>
            </a>
          </div>

          <div className="hero-actions">
            <a className="button button-primary" href={routeHref('/students/sign-in')}>
              {t.studentBtn}
            </a>
            <a className="button button-secondary" href={routeHref('/students')}>
              {t.learnMore}
            </a>
          </div>
        </article>

        <article className="panel-card" style={{ border: '2px solid var(--brand-orange)', boxShadow: '0 4px 24px rgba(247,148,29,0.08)' }}>
          <div className="section-heading" style={{ marginBottom: '1.25rem' }}>
            <div>
              <p className="eyebrow">{t.companiesEyebrow}</p>
              <h2>{t.companiesTitle}</h2>
            </div>
          </div>

          <div className="list-stack" style={{ marginBottom: '1.25rem' }}>
            <a className="list-card" href={routeHref('/companies/sign-in')} style={{ borderColor: 'var(--brand-orange)' }}>
              <div>
                <strong>{t.signInCompany}</strong>
                <p>{t.signInCompanyBody}</p>
              </div>
              <span style={{ color: 'var(--brand-orange)', fontWeight: 700, fontSize: '1.1rem' }}>→</span>
            </a>
            <a className="list-card" href={routeHref('/companies/create-account')}>
              <div>
                <strong>{t.createCompany}</strong>
                <p>{t.createCompanyBody}</p>
              </div>
              <span style={{ color: 'var(--ink-soft)', fontWeight: 700, fontSize: '1.1rem' }}>→</span>
            </a>
          </div>

          <div className="hero-actions">
            <a className="button button-primary" href={routeHref('/companies/sign-in')}>
              {t.companyBtn}
            </a>
            <a className="button button-secondary" href={routeHref('/companies')}>
              {t.learnMore}
            </a>
          </div>
        </article>
      </section>

      <section className="section-block">
        <div className="cta-panel-full">
          <div>
            <p className="eyebrow">{t.notReady}</p>
            <h2>{t.browseFirst}</h2>
            <p>{t.browseBody}</p>
          </div>
          <div className="cta-panel-actions">
            <a className="button button-primary" href={routeHref('/projects')}>
              {t.browseOpen}
            </a>
            <a className="button button-secondary" href={routeHref('/how-it-works')}>
              {t.howWorks}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default AuthPage
