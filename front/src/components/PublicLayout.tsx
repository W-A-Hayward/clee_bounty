import type { ReactNode } from 'react'
import type { DemoSession } from '../lib/demoSession'
import NavLink from './NavLink'

type PublicLayoutProps = {
  currentPath: string
  session: DemoSession
  onSignOut: () => void
  children: ReactNode
}

function PublicLayout({ currentPath, session, onSignOut, children }: PublicLayoutProps) {
  const dashboardRoute = session?.role === 'company' ? '/company/dashboard' : '/dashboard'
  const dashboardLabel = session?.role === 'company' ? 'Company dashboard' : 'My dashboard'

  return (
    <div className="site-shell">
      <div className="atmosphere atmosphere-blue" />
      <div className="atmosphere atmosphere-green" />
      <div className="atmosphere atmosphere-orange" />

      <header className="site-nav">
        <a className="brandmark" href="#/">
          <span className="brandmark-icon">C</span>
          <span className="brandmark-copy">
            <strong>Clee</strong>
            <small>student project marketplace</small>
          </span>
        </a>

        <nav aria-label="Primary" className="site-links">
          <NavLink className="nav-link" currentPath={currentPath} exact label="Home" to="/" />
          <NavLink className="nav-link" currentPath={currentPath} label="Projects" to="/projects" />
          <NavLink className="nav-link" currentPath={currentPath} label="Students" to="/students" />
          <NavLink className="nav-link" currentPath={currentPath} label="Companies" to="/companies" />
          <NavLink className="nav-link" currentPath={currentPath} label="How It Works" to="/how-it-works" />
          <NavLink className="nav-link" currentPath={currentPath} label="About" to="/about" />
        </nav>

        <div className="site-actions">
          {session ? (
            <>
              <NavLink className="button button-primary" currentPath={currentPath} label={dashboardLabel} to={dashboardRoute} />
              <button className="button button-ghost" onClick={onSignOut} type="button">
                Log out
              </button>
            </>
          ) : (
            <>
              <NavLink className="button button-secondary" currentPath={currentPath} label="Sign in" to="/auth" />
              <NavLink className="button button-primary" currentPath={currentPath} label="Post a project" to="/companies/create-account" />
            </>
          )}
        </div>
      </header>

      <main>{children}</main>

      <footer className="site-footer-full">
        <div>
          <a className="brandmark" href="#/" style={{ display: 'inline-flex', marginBottom: '0.75rem' }}>
            <span className="brandmark-icon">C</span>
            <span className="brandmark-copy">
              <strong>Clee</strong>
              <small>student project marketplace</small>
            </span>
          </a>
          <p className="footer-brand-desc">
            Real freelance projects from verified companies. Students browse with full context, apply
            when it fits, and deliver inside a platform that tracks every step.
          </p>
          <div className="hero-actions" style={{ marginTop: '1.25rem' }}>
            <a className="button button-primary" href="#/students/create-account">
              Join as student
            </a>
            <a className="button button-secondary" href="#/companies/create-account">
              Post a project
            </a>
          </div>
        </div>

        <div>
          <span className="footer-col-label">Platform</span>
          <div className="footer-col-links">
            <a href="#/">Home</a>
            <a href="#/projects">Browse projects</a>
            <a href="#/how-it-works">How it works</a>
            <a href="#/about">About Clee</a>
          </div>
        </div>

        <div>
          <span className="footer-col-label">Students</span>
          <div className="footer-col-links">
            <a href="#/students">For students</a>
            <a href="#/students/create-account">Create account</a>
            <a href="#/students/sign-in">Sign in</a>
            <a href="#/dashboard">Dashboard</a>
            <a href="#/applications">Applications</a>
            <a href="#/messages">Messages</a>
          </div>
        </div>

        <div>
          <span className="footer-col-label">Companies</span>
          <div className="footer-col-links">
            <a href="#/companies">For companies</a>
            <a href="#/companies/create-account">Create account</a>
            <a href="#/companies/sign-in">Company login</a>
            <a href="#/company/dashboard">Dashboard</a>
            <a href="#/company/post-project">Post a project</a>
            <a href="#/company/applicants">Applicants</a>
          </div>
        </div>

        <div>
          <span className="footer-col-label">Account</span>
          <div className="footer-col-links">
            <a href="#/auth">Account access</a>
            <a href="#/students/sign-in">Student sign in</a>
            <a href="#/companies/sign-in">Company sign in</a>
            <a href="#/students/create-account">New student</a>
            <a href="#/companies/create-account">New company</a>
          </div>
        </div>

        <div className="footer-bottom" style={{ gridColumn: '1 / -1' }}>
          <span>© {new Date().getFullYear()} Clee — Student freelance marketplace.</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#/how-it-works" style={{ color: 'var(--ink-soft)', textDecoration: 'none', fontSize: '0.84rem' }}>How it works</a>
            <a href="#/about" style={{ color: 'var(--ink-soft)', textDecoration: 'none', fontSize: '0.84rem' }}>About</a>
            <a href="#/auth" style={{ color: 'var(--ink-soft)', textDecoration: 'none', fontSize: '0.84rem' }}>Account access</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PublicLayout
