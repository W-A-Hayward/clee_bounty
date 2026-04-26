import { motion } from 'framer-motion'
import { useEffect, useState, type ReactNode } from 'react'
import { useLang } from '../i18n/LanguageContext'
import type { CompanySession, MemberSession } from '../lib/demoSession'
import { isRouteActive, routeHref } from '../lib/hashRouter'
import LanguageToggle from './LanguageToggle'

type ShellSession = MemberSession | CompanySession

type ShellLink = {
  labelKey: keyof typeof linkLabels.en
  to: string
  glyph: string
  badge?: string
  exact?: boolean
}

type AppShellProps = {
  session: ShellSession
  variant: 'student' | 'company'
  currentPath: string
  title: string
  subtitle: string
  children: ReactNode
  onOpenPalette: () => void
  onSignOut: () => void
}

const linkLabels = {
  en: {
    overview: 'Overview',
    marketplace: 'Marketplace',
    applications: 'Applications',
    messages: 'Messages',
    profile: 'Profile',
    projects: 'Projects',
    applicants: 'Applicants',
    newBrief: 'New brief',
  },
  fr: {
    overview: 'Vue d’ensemble',
    marketplace: 'Projets',
    applications: 'Candidatures',
    messages: 'Messages',
    profile: 'Profil',
    projects: 'Projets',
    applicants: 'Candidats',
    newBrief: 'Nouveau mandat',
  },
}

const shellCopy = {
  en: {
    skip: 'Skip to main content',
    cmdkLabel: 'Search · jump · act',
    workspace: 'Workspace',
    publicSite: 'Public site',
    signOut: 'Sign out',
    studio: 'Studio',
    companyOs: 'Company OS',
    studentEyebrow: 'Student workspace',
    companyEyebrow: 'Company workspace',
    quick: 'Quick',
  },
  fr: {
    skip: 'Aller au contenu principal',
    cmdkLabel: 'Cherche · navigue · agis',
    workspace: 'Atelier',
    publicSite: 'Site public',
    signOut: 'Déconnexion',
    studio: 'Atelier',
    companyOs: 'Espace entreprise',
    studentEyebrow: 'Atelier étudiant',
    companyEyebrow: 'Espace entreprise',
    quick: 'Rapide',
  },
}

const studentLinks: ShellLink[] = [
  { labelKey: 'overview', to: '/dashboard', glyph: '◐' },
  { labelKey: 'marketplace', to: '/projects', glyph: '◇' },
  { labelKey: 'applications', to: '/applications', glyph: '◫' },
  { labelKey: 'messages', to: '/messages', glyph: '◊' },
  { labelKey: 'profile', to: '/profile', glyph: '◉' },
]

const companyLinks: ShellLink[] = [
  { labelKey: 'overview', to: '/company/dashboard', glyph: '◐' },
  { labelKey: 'projects', to: '/company/projects', glyph: '◇' },
  { labelKey: 'applicants', to: '/company/applicants', glyph: '◫' },
  { labelKey: 'messages', to: '/company/messages', glyph: '◊' },
  { labelKey: 'newBrief', to: '/company/post-project', glyph: '✦' },
]

function AppShell({
  session,
  variant,
  currentPath,
  title,
  subtitle,
  children,
  onOpenPalette,
  onSignOut,
}: AppShellProps) {
  const lang = useLang()
  const t = shellCopy[lang]
  const labels = linkLabels[lang]
  const links = variant === 'company' ? companyLinks : studentLinks
  const homeRoute = variant === 'company' ? '/company/dashboard' : '/dashboard'
  const sessionLabel =
    variant === 'company'
      ? (session as CompanySession).companyName
      : (session as MemberSession).name
  const sessionMeta =
    variant === 'company'
      ? `${(session as CompanySession).industry} · ${(session as CompanySession).location}`
      : `${(session as MemberSession).school}`

  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const sync = () => setCollapsed(window.innerWidth < 1080)
    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [])

  return (
    <div className="appshell">
      <a className="skip-link" href="#main-content">{t.skip}</a>

      <aside
        aria-label={variant === 'company' ? t.companyOs : t.studio}
        className={`appshell-sidebar${collapsed ? ' is-collapsed' : ''}`}
      >
        <a className="appshell-brand" href={routeHref(homeRoute)}>
          <span className="brandmark-icon">L</span>
          <span className="appshell-brand-copy">
            <strong>Legend</strong>
            <small>{variant === 'company' ? (lang === 'fr' ? 'ENTREPRISE' : 'COMPANY OS') : (lang === 'fr' ? 'ATELIER' : 'STUDIO')}</small>
          </span>
        </a>

        <button
          className="appshell-cmdk-trigger"
          onClick={onOpenPalette}
          type="button"
        >
          <span className="cmdk-trigger-glyph">⌘</span>
          <span className="cmdk-trigger-label">{t.cmdkLabel}</span>
          <kbd className="cmdk-trigger-kbd">K</kbd>
        </button>

        <nav className="appshell-nav" aria-label={t.workspace}>
          <span className="appshell-nav-label">{t.workspace}</span>
          {links.map((link) => {
            const active = isRouteActive(currentPath, link.to, link.exact)
            return (
              <a
                key={link.to}
                aria-current={active ? 'page' : undefined}
                className={`appshell-link${active ? ' is-active' : ''}`}
                href={routeHref(link.to)}
              >
                <span className="appshell-link-glyph" aria-hidden>{link.glyph}</span>
                <span className="appshell-link-label">{labels[link.labelKey]}</span>
                {link.badge && <span className="appshell-link-badge">{link.badge}</span>}
              </a>
            )
          })}
        </nav>

        <div className="appshell-foot">
          <a
            className="appshell-link appshell-link-quiet"
            href={routeHref('/')}
          >
            <span className="appshell-link-glyph" aria-hidden>↗</span>
            <span className="appshell-link-label">{t.publicSite}</span>
          </a>
          <div className="appshell-account">
            <div className="appshell-avatar" aria-hidden>
              {sessionLabel.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <div className="appshell-account-copy">
              <strong>{sessionLabel}</strong>
              <small>{sessionMeta}</small>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
            <LanguageToggle variant="compact" />
            <button
              className="button button-ghost appshell-signout"
              onClick={onSignOut}
              type="button"
            >
              {t.signOut}
            </button>
          </div>
        </div>
      </aside>

      <div className="appshell-main">
        <header className="appshell-topbar">
          <div className="appshell-topbar-trail">
            <span className="appshell-trail-tag">{variant === 'company' ? t.companyOs : t.studio}</span>
            <span className="appshell-trail-sep">/</span>
            <span className="appshell-trail-current">{title}</span>
          </div>
          <div className="appshell-topbar-actions">
            <button
              className="appshell-cmdk-pill"
              onClick={onOpenPalette}
              type="button"
            >
              <span aria-hidden>⌘</span>
              <span>{t.quick}</span>
              <kbd>K</kbd>
            </button>
          </div>
        </header>

        <main className="appshell-content" id="main-content">
          <motion.section
            animate={{ opacity: 1, y: 0 }}
            className="appshell-hero"
            initial={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <span className="eyebrow">{variant === 'company' ? t.companyEyebrow : t.studentEyebrow}</span>
              <h1>{title}</h1>
              <p className="page-intro">{subtitle}</p>
            </div>
          </motion.section>

          {children}
        </main>
      </div>
    </div>
  )
}

export default AppShell
