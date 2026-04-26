import type { ReactNode } from 'react'
import { useLang } from '../i18n/LanguageContext'
import type { MemberSession } from '../lib/demoSession'
import LanguageToggle from './LanguageToggle'
import NavLink from './NavLink'

type WorkspaceLayoutProps = {
  currentPath: string
  session: MemberSession
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
      applications: 'Applications',
      messages: 'Messages',
      profile: 'Profile',
    },
    backToSite: 'Back to website',
    logOut: 'Log out',
    eyebrow: 'Student workspace',
    yourProfile: 'Your profile',
  },
  fr: {
    skip: 'Aller au contenu principal',
    nav: {
      dashboard: 'Tableau de bord',
      projects: 'Projets',
      applications: 'Candidatures',
      messages: 'Messages',
      profile: 'Profil',
    },
    backToSite: 'Retour au site',
    logOut: 'Déconnexion',
    eyebrow: 'Atelier étudiant',
    yourProfile: 'Ton profil',
  },
}

function WorkspaceLayout({
  currentPath,
  session,
  title,
  subtitle,
  onSignOut,
  children,
}: WorkspaceLayoutProps) {
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
          <a className="brandmark" href="#/dashboard">
            <span className="brandmark-icon">L</span>
            <span className="brandmark-copy">
              <strong>Legend</strong>
              <small>{session.name}</small>
            </span>
          </a>

          <div className="workspace-profile-pill">
            <strong>{session.school}</strong>
            <span>{session.program}</span>
          </div>
        </div>

        <nav aria-label="Workspace" className="site-links workspace-links">
          <NavLink className="nav-link" currentPath={currentPath} label={t.nav.dashboard} to="/dashboard" />
          <NavLink className="nav-link" currentPath={currentPath} label={t.nav.projects} to="/projects" />
          <NavLink className="nav-link" currentPath={currentPath} label={t.nav.applications} to="/applications" />
          <NavLink className="nav-link" currentPath={currentPath} label={t.nav.messages} to="/messages" />
          <NavLink className="nav-link" currentPath={currentPath} label={t.nav.profile} to="/profile" />
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

          <div className="portal-profile-card tone-green">
            <span className="mini-label">{t.yourProfile}</span>
            <strong>{session.name}</strong>
            <p>
              {session.school} · {session.program}
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '0.2rem 0.65rem',
                  borderRadius: '999px',
                  background: 'rgba(140,198,63,0.18)',
                  color: 'var(--brand-green)',
                }}
              >
                {session.availability}
              </span>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '0.2rem 0.65rem',
                  borderRadius: '999px',
                  background: 'rgba(31,95,175,0.1)',
                  color: 'var(--brand-blue)',
                }}
              >
                {session.rate}
              </span>
            </div>
          </div>
        </section>

        {children}
      </main>
    </div>
  )
}

export default WorkspaceLayout
