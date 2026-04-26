import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useLang } from '../i18n/LanguageContext'
import type { DemoSession } from '../lib/demoSession'
import LanguageToggle from './LanguageToggle'
import NavLink from './NavLink'

type PublicLayoutProps = {
  currentPath: string
  session: DemoSession
  onSignOut: () => void
  onOpenPalette: () => void
  children: ReactNode
}

const copy = {
  en: {
    skip: 'Skip to main content',
    tagline: 'KEY TO THE MAP',
    nav: {
      home: 'Home',
      marketplace: 'Marketplace',
      students: 'Students',
      companies: 'Companies',
      howItWorks: 'How it works',
      about: 'About',
    },
    cmdkAria: 'Open command palette',
    studio: 'My studio',
    companyOs: 'Company OS',
    signOut: 'Sign out',
    signIn: 'Sign in',
    postProject: 'Post a project',
    footerDesc:
      'The key to the student opportunity map. Real projects from verified companies, structured briefs, and a workspace that turns every project into a portfolio chapter.',
    joinAsStudent: 'Join as student',
    cols: {
      platform: 'Platform',
      students: 'Students',
      companies: 'Companies',
      account: 'Account',
    },
    links: {
      home: 'Home',
      marketplace: 'Marketplace',
      howItWorks: 'How it works',
      aboutLegend: 'About Legend',
      forStudents: 'For students',
      forCompanies: 'For companies',
      createAccount: 'Create account',
      signIn: 'Sign in',
      studioDashboard: 'Studio dashboard',
      applications: 'Applications',
      messages: 'Messages',
      companyLogin: 'Company login',
      companyOs: 'Company OS',
      postBrief: 'Post a brief',
      applicants: 'Applicants',
      accountAccess: 'Account access',
      studentSignIn: 'Student sign in',
      companySignIn: 'Company sign in',
      newStudent: 'New student',
      newCompany: 'New company',
    },
    footerTagline: 'LEGEND · THE KEY TO THE MAP',
    pressCmdK: 'Press ⌘K anywhere',
  },
  fr: {
    skip: 'Aller au contenu principal',
    tagline: 'LA CLÉ DE LA CARTE',
    nav: {
      home: 'Accueil',
      marketplace: 'Projets',
      students: 'Étudiants',
      companies: 'Entreprises',
      howItWorks: 'Comment ça marche',
      about: 'À propos',
    },
    cmdkAria: 'Ouvrir la palette de commandes',
    studio: 'Mon atelier',
    companyOs: 'Espace entreprise',
    signOut: 'Déconnexion',
    signIn: 'Connexion',
    postProject: 'Publier un projet',
    footerDesc:
      "La clé de la carte des opportunités étudiantes. Des vrais projets, des entreprises vérifiées, des mandats structurés, et un espace qui transforme chaque projet en chapitre de portfolio.",
    joinAsStudent: 'Rejoindre comme étudiant',
    cols: {
      platform: 'Plateforme',
      students: 'Étudiants',
      companies: 'Entreprises',
      account: 'Compte',
    },
    links: {
      home: 'Accueil',
      marketplace: 'Projets',
      howItWorks: 'Comment ça marche',
      aboutLegend: 'À propos de Legend',
      forStudents: 'Pour les étudiants',
      forCompanies: 'Pour les entreprises',
      createAccount: 'Créer un compte',
      signIn: 'Connexion',
      studioDashboard: 'Tableau atelier',
      applications: 'Candidatures',
      messages: 'Messages',
      companyLogin: 'Connexion entreprise',
      companyOs: 'Espace entreprise',
      postBrief: 'Publier un mandat',
      applicants: 'Candidats',
      accountAccess: 'Accès au compte',
      studentSignIn: 'Connexion étudiant',
      companySignIn: 'Connexion entreprise',
      newStudent: 'Nouvel étudiant',
      newCompany: 'Nouvelle entreprise',
    },
    footerTagline: 'LEGEND · LA CLÉ DE LA CARTE',
    pressCmdK: 'Appuie sur ⌘K partout',
  },
}

function PublicLayout({ currentPath, session, onSignOut, onOpenPalette, children }: PublicLayoutProps) {
  const lang = useLang()
  const t = copy[lang]
  const dashboardRoute = session?.role === 'company' ? '/company/dashboard' : '/dashboard'
  const dashboardLabel = session?.role === 'company' ? t.companyOs : t.studio

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">{t.skip}</a>
      <div className="atmosphere atmosphere-blue" />
      <div className="atmosphere atmosphere-green" />
      <div className="atmosphere atmosphere-orange" />

      <header className="site-nav">
        <a className="brandmark" href="#/">
          <span className="brandmark-icon">L</span>
          <span className="brandmark-copy">
            <strong>Legend</strong>
            <small>{t.tagline}</small>
          </span>
        </a>

        <nav aria-label="Primary" className="site-links">
          <NavLink className="nav-link" currentPath={currentPath} exact label={t.nav.home} to="/" />
          <NavLink className="nav-link" currentPath={currentPath} label={t.nav.marketplace} to="/projects" />
          <NavLink className="nav-link" currentPath={currentPath} label={t.nav.students} to="/students" />
          <NavLink className="nav-link" currentPath={currentPath} label={t.nav.companies} to="/companies" />
          <NavLink className="nav-link" currentPath={currentPath} label={t.nav.howItWorks} to="/how-it-works" />
          <NavLink className="nav-link" currentPath={currentPath} label={t.nav.about} to="/about" />
        </nav>

        <div className="site-actions">
          <LanguageToggle />
          <button
            aria-label={t.cmdkAria}
            className="cmdk-trigger"
            onClick={onOpenPalette}
            type="button"
          >
            <span className="cmdk-trigger-glyph">⌘</span>
            <kbd>K</kbd>
          </button>
          {session ? (
            <>
              <NavLink className="button button-secondary" currentPath={currentPath} label={dashboardLabel} to={dashboardRoute} />
              <button className="button button-ghost" onClick={onSignOut} type="button">
                {t.signOut}
              </button>
            </>
          ) : (
            <>
              <NavLink className="button button-ghost" currentPath={currentPath} label={t.signIn} to="/auth" />
              <NavLink className="button button-primary" currentPath={currentPath} label={t.postProject} to="/companies/create-account" />
            </>
          )}
        </div>
      </header>

      <motion.main
        animate={{ opacity: 1 }}
        id="main-content"
        initial={{ opacity: 0 }}
        key={currentPath}
        transition={{ duration: 0.28, ease: 'easeOut' }}
      >
        {children}
      </motion.main>

      <footer className="site-footer-full">
        <div>
          <a className="brandmark" href="#/" style={{ display: 'inline-flex', marginBottom: '0.75rem' }}>
            <span className="brandmark-icon">L</span>
            <span className="brandmark-copy">
              <strong>Legend</strong>
              <small>{t.tagline}</small>
            </span>
          </a>
          <p className="footer-brand-desc">{t.footerDesc}</p>
          <div className="hero-actions" style={{ marginTop: '1.25rem' }}>
            <a className="button button-primary" href="#/students/create-account">{t.joinAsStudent}</a>
            <a className="button button-ghost" href="#/companies/create-account">{t.postProject}</a>
          </div>
        </div>

        <div>
          <span className="footer-col-label">{t.cols.platform}</span>
          <div className="footer-col-links">
            <a href="#/">{t.links.home}</a>
            <a href="#/projects">{t.links.marketplace}</a>
            <a href="#/how-it-works">{t.links.howItWorks}</a>
            <a href="#/about">{t.links.aboutLegend}</a>
          </div>
        </div>

        <div>
          <span className="footer-col-label">{t.cols.students}</span>
          <div className="footer-col-links">
            <a href="#/students">{t.links.forStudents}</a>
            <a href="#/students/create-account">{t.links.createAccount}</a>
            <a href="#/students/sign-in">{t.links.signIn}</a>
            <a href="#/dashboard">{t.links.studioDashboard}</a>
            <a href="#/applications">{t.links.applications}</a>
            <a href="#/messages">{t.links.messages}</a>
          </div>
        </div>

        <div>
          <span className="footer-col-label">{t.cols.companies}</span>
          <div className="footer-col-links">
            <a href="#/companies">{t.links.forCompanies}</a>
            <a href="#/companies/create-account">{t.links.createAccount}</a>
            <a href="#/companies/sign-in">{t.links.companyLogin}</a>
            <a href="#/company/dashboard">{t.links.companyOs}</a>
            <a href="#/company/post-project">{t.links.postBrief}</a>
            <a href="#/company/applicants">{t.links.applicants}</a>
          </div>
        </div>

        <div>
          <span className="footer-col-label">{t.cols.account}</span>
          <div className="footer-col-links">
            <a href="#/auth">{t.links.accountAccess}</a>
            <a href="#/students/sign-in">{t.links.studentSignIn}</a>
            <a href="#/companies/sign-in">{t.links.companySignIn}</a>
            <a href="#/students/create-account">{t.links.newStudent}</a>
            <a href="#/companies/create-account">{t.links.newCompany}</a>
          </div>
        </div>

        <div className="footer-bottom" style={{ gridColumn: '1 / -1' }}>
          <span>© {new Date().getFullYear()} {t.footerTagline}</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#/how-it-works" style={{ textDecoration: 'none' }}>{t.links.howItWorks}</a>
            <a href="#/about" style={{ textDecoration: 'none' }}>{t.nav.about}</a>
            <button
              className="footer-cmdk-link"
              onClick={onOpenPalette}
              style={{ background: 'transparent', border: 0, padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}
              type="button"
            >
              {t.pressCmdK}
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PublicLayout
