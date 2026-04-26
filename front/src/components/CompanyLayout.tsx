import type { ReactNode } from 'react'
import { useLang } from '../i18n/LanguageContext'
import type { CompanySession } from '../lib/demoSession'
import LanguageToggle from './LanguageToggle'
import NavLink from './NavLink'

type CompanyLayoutProps = {
  currentPath: string
  session: CompanySession
  title: string
  subtitle: string
  onSignOut: () => void
  children: ReactNode
}

const copy = {
  en: {
    skip: 'Skip to main content',
    nav: {
      dashboard: 'Dashboard',
      projects: 'Projects',
      applicants: 'Applicants',
      messages: 'Messages',
      postProject: 'Post Project',
    },
    backToSite: 'Back to website',
    logOut: 'Log out',
    eyebrow: 'Company workspace',
    companyAccount: 'Company account',
    teamSuffix: 'team',
  },
  fr: {
    skip: 'Aller au contenu principal',
    nav: {
      dashboard: 'Tableau de bord',
      projects: 'Projets',
      applicants: 'Candidats',
      messages: 'Messages',
      postProject: 'Publier un mandat',
    },
    backToSite: 'Retour au site',
    logOut: 'Déconnexion',
    eyebrow: 'Espace entreprise',
    companyAccount: 'Compte entreprise',
    teamSuffix: 'équipe',
  },
}

function CompanyLayout({
  currentPath,
  session,
  title,
  subtitle,
  onSignOut,
  children,
}: CompanyLayoutProps) {
  const lang = useLang()
  const t = copy[lang]
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        {t.skip}
      </a>
      <div className="atmosphere atmosphere-blue" />
      <div className="atmosphere atmosphere-green" />
      <div className="atmosphere atmosphere-orange" />

      <header className="site-nav workspace-nav">
        <div className="workspace-brand-group">
          <a className="brandmark" href="#/company/dashboard">
            <span className="brandmark-icon">C</span>
            <span className="brandmark-copy">
              <strong>{session.companyName}</strong>
              <small>{session.email}</small>
            </span>
          </a>

          <div className="workspace-profile-pill">
            <strong>{session.industry}</strong>
            <span>{session.location}</span>
          </div>
        </div>

        <nav aria-label="Company workspace" className="site-links workspace-links">
          <NavLink className="nav-link" currentPath={currentPath} label={t.nav.dashboard} to="/company/dashboard" />
          <NavLink className="nav-link" currentPath={currentPath} label={t.nav.projects} to="/company/projects" />
          <NavLink className="nav-link" currentPath={currentPath} label={t.nav.applicants} to="/company/applicants" />
          <NavLink className="nav-link" currentPath={currentPath} label={t.nav.messages} to="/company/messages" />
          <NavLink className="nav-link" currentPath={currentPath} label={t.nav.postProject} to="/company/post-project" />
        </nav>

        <div className="site-actions">
          <LanguageToggle />
          <a className="button button-secondary" href="#/">
            {t.backToSite}
          </a>
          <button className="button button-ghost" onClick={onSignOut} type="button">
            {t.logOut}
          </button>
        </div>
      </header>

      <main id="main-content">
        <section className="portal-hero">
          <div>
            <p className="eyebrow">{t.eyebrow}</p>
            <h1>{title}</h1>
            <p className="page-intro">{subtitle}</p>
          </div>

          <div className="portal-profile-card tone-blue">
            <span className="mini-label">{t.companyAccount}</span>
            <strong>{session.companyName}</strong>
            <p>{session.description}</p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '0.2rem 0.65rem',
                  borderRadius: '999px',
                  background: 'rgba(31,95,175,0.12)',
                  color: 'var(--brand-blue)',
                }}
              >
                {session.industry}
              </span>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '0.2rem 0.65rem',
                  borderRadius: '999px',
                  background: 'rgba(247,148,29,0.12)',
                  color: 'var(--brand-orange)',
                }}
              >
                {session.teamSize} {t.teamSuffix}
              </span>
            </div>
          </div>
        </section>

        {children}
      </main>
    </div>
  )
}

export default CompanyLayout
