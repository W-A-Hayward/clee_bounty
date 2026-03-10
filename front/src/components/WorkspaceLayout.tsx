import type { ReactNode } from 'react'
import type { MemberSession } from '../lib/demoSession'
import NavLink from './NavLink'

type WorkspaceLayoutProps = {
  currentPath: string
  session: MemberSession
  title: string
  subtitle: string
  onSignOut: () => void
  children: ReactNode
}

function WorkspaceLayout({
  currentPath,
  session,
  title,
  subtitle,
  onSignOut,
  children,
}: WorkspaceLayoutProps) {
  return (
    <div className="site-shell">
      <div className="atmosphere atmosphere-blue" />
      <div className="atmosphere atmosphere-green" />
      <div className="atmosphere atmosphere-orange" />

      <header className="site-nav workspace-nav">
        <div className="workspace-brand-group">
          <a className="brandmark" href="#/dashboard">
            <span className="brandmark-icon">C</span>
            <span className="brandmark-copy">
              <strong>Clee</strong>
              <small>{session.name}</small>
            </span>
          </a>

          <div className="workspace-profile-pill">
            <strong>{session.school}</strong>
            <span>{session.program}</span>
          </div>
        </div>

        <nav aria-label="Workspace" className="site-links workspace-links">
          <NavLink className="nav-link" currentPath={currentPath} label="Dashboard" to="/dashboard" />
          <NavLink className="nav-link" currentPath={currentPath} label="Projects" to="/projects" />
          <NavLink className="nav-link" currentPath={currentPath} label="Applications" to="/applications" />
          <NavLink className="nav-link" currentPath={currentPath} label="Messages" to="/messages" />
          <NavLink className="nav-link" currentPath={currentPath} label="Profile" to="/profile" />
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

      <main>
        <section className="portal-hero">
          <div>
            <p className="eyebrow">Student workspace</p>
            <h1>{title}</h1>
            <p className="page-intro">{subtitle}</p>
          </div>

          <div className="portal-profile-card tone-green">
            <span className="mini-label">Your profile</span>
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
