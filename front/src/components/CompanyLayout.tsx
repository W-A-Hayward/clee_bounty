import type { ReactNode } from 'react'
import type { CompanySession } from '../lib/demoSession'
import NavLink from './NavLink'

type CompanyLayoutProps = {
  currentPath: string
  session: CompanySession
  title: string
  subtitle: string
  onSignOut: () => void
  children: ReactNode
}

function CompanyLayout({
  currentPath,
  session,
  title,
  subtitle,
  onSignOut,
  children,
}: CompanyLayoutProps) {
  return (
    <div className="site-shell">
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
          <NavLink className="nav-link" currentPath={currentPath} label="Dashboard" to="/company/dashboard" />
          <NavLink className="nav-link" currentPath={currentPath} label="Projects" to="/company/projects" />
          <NavLink className="nav-link" currentPath={currentPath} label="Applicants" to="/company/applicants" />
          <NavLink className="nav-link" currentPath={currentPath} label="Messages" to="/company/messages" />
          <NavLink className="nav-link" currentPath={currentPath} label="Post Project" to="/company/post-project" />
        </nav>

        <div className="site-actions">
          <a className="button button-secondary" href="#/">
            Back to website
          </a>
          <button className="button button-ghost" onClick={onSignOut} type="button">
            Log out
          </button>
        </div>
      </header>

      <main className="workspace-main">
        <section className="portal-hero">
          <div>
            <p className="eyebrow">Company workspace</p>
            <h1>{title}</h1>
            <p className="page-intro">{subtitle}</p>
          </div>

          <div className="portal-profile-card tone-blue">
            <span className="mini-label">Company account</span>
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
                {session.teamSize} team
              </span>
            </div>
          </div>
        </section>

        {children}

        <footer className="workspace-footer">
          <span>© {new Date().getFullYear()} Clee — Student freelance marketplace</span>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <a href="#/">Back to website</a>
            <a href="#/projects">Browse projects</a>
            <a href="#/how-it-works">How it works</a>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default CompanyLayout
