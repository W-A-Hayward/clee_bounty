import { useLang } from '../i18n/LanguageContext'
import { routeHref } from '../lib/hashRouter'

const copy = {
  en: {
    eyebrow: '404, Page not found',
    h1: "This page doesn't exist.",
    intro: "The route you followed isn't mapped, it may have moved, never existed, or the link was typed incorrectly. The rest of the platform is working fine.",
    backHome: 'Back to homepage',
    browseProjects: 'Browse projects',
    whereGo: 'Where would you like to go?',
    suggestions: [
      { title: 'Browse open projects', body: 'See the full marketplace, budgets, timelines, skills, and briefs.', href: '/projects', tone: 'tone-blue' },
      { title: 'Student workspace', body: 'Dashboard, applications, messages, and your profile, all in one place.', href: '/dashboard', tone: 'tone-green' },
      { title: 'Company workspace', body: 'Post a brief, review applicants, or manage live projects from your dashboard.', href: '/company/dashboard', tone: 'tone-orange' },
      { title: 'How Legend works', body: 'Understand the platform flow from first browse to final delivery.', href: '/how-it-works', tone: 'tone-blue' },
    ],
    needWorkspace: 'Need your workspace?',
    signInTitle: 'Sign in and go straight to the right place.',
    signInBody: 'If you were trying to reach a page that requires an account, sign in first and the platform will route you automatically.',
    studentSignIn: 'Student sign in',
    companySignIn: 'Company sign in',
  },
  fr: {
    eyebrow: '404 — Page introuvable',
    h1: 'Cette page n’existe pas.',
    intro: 'La route que tu as suivie n’est pas mappée — elle a pu être déplacée, ne jamais avoir existé, ou le lien a été mal tapé. Le reste de la plateforme fonctionne bien.',
    backHome: 'Retour à l’accueil',
    browseProjects: 'Explorer les projets',
    whereGo: 'Où aimerais-tu aller ?',
    suggestions: [
      { title: 'Explorer les projets ouverts', body: 'Voir la plateforme complète — budgets, échéances, compétences et mandats.', href: '/projects', tone: 'tone-blue' },
      { title: 'Atelier étudiant', body: 'Tableau, candidatures, messages et profil — tout au même endroit.', href: '/dashboard', tone: 'tone-green' },
      { title: 'Espace entreprise', body: 'Publier un mandat, examiner les candidats ou gérer les projets actifs depuis votre tableau.', href: '/company/dashboard', tone: 'tone-orange' },
      { title: 'Comment Legend fonctionne', body: 'Comprends le flux de la plateforme de la première exploration à la livraison finale.', href: '/how-it-works', tone: 'tone-blue' },
    ],
    needWorkspace: 'Besoin de ton atelier ?',
    signInTitle: 'Connecte-toi et va directement au bon endroit.',
    signInBody: 'Si tu essayais d’atteindre une page qui demande un compte, connecte-toi d’abord et la plateforme te routera automatiquement.',
    studentSignIn: 'Connexion étudiant',
    companySignIn: 'Connexion entreprise',
  },
}

function NotFoundPage() {
  const lang = useLang()
  const t = copy[lang]
  return (
    <>
      <section className="section-block" style={{ paddingBottom: 0 }}>
        <div style={{ maxWidth: '38rem' }}>
          <p className="eyebrow">{t.eyebrow}</p>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: 1.2, margin: '0.5rem 0 1rem' }}>
            {t.h1}
          </h1>
          <p className="page-intro" style={{ margin: 0 }}>{t.intro}</p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
          <a className="button button-primary" href={routeHref('/')}>
            {t.backHome}
          </a>
          <a className="button button-secondary" href={routeHref('/projects')}>
            {t.browseProjects}
          </a>
        </div>
      </section>

      <section className="section-block">
        <p className="eyebrow" style={{ marginBottom: '1rem' }}>{t.whereGo}</p>
        <div className="feature-grid feature-grid-two">
          {t.suggestions.map((s) => (
            <a key={s.title} className={`feature-card ${s.tone}`} href={routeHref(s.href)}>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="cta-panel-full">
          <div>
            <p className="eyebrow">{t.needWorkspace}</p>
            <h2>{t.signInTitle}</h2>
            <p>{t.signInBody}</p>
          </div>
          <div className="cta-panel-actions">
            <a className="button button-primary" href={routeHref('/students/sign-in')}>
              {t.studentSignIn}
            </a>
            <a className="button button-secondary" href={routeHref('/companies/sign-in')}>
              {t.companySignIn}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default NotFoundPage
