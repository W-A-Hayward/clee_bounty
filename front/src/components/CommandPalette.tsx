import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import type { DemoSession } from '../lib/demoSession'
import { routeHref } from '../lib/hashRouter'

export type CommandItem = {
  id: string
  label: string
  hint?: string
  group: string
  keywords?: string
  shortcut?: string
  action: () => void
}

type CommandPaletteProps = {
  open: boolean
  onClose: () => void
  session: DemoSession
  onSignOut?: () => void
}

const copy = {
  en: {
    placeholder: 'Search anything · jump to a page · take action…',
    empty: 'No results, try another keyword.',
    foot: { navigate: 'navigate', open: 'open', close: 'close' },
    groups: {
      navigate: 'Navigate',
      apply: 'Apply',
      account: 'Account',
      marketplace: 'Marketplace',
      language: 'Language',
    },
    items: {
      home: { label: 'Home', hint: 'Public landing' },
      projects: { label: 'Browse all projects', hint: 'Public marketplace' },
      how: { label: 'How it works', hint: 'Platform overview' },
      students: { label: 'For students', hint: 'Student value prop' },
      companies: { label: 'For companies', hint: 'Company value prop' },
      about: { label: 'About Legend', hint: 'Mission & team' },
      dash: { label: 'Dashboard', hint: 'Your activity overview' },
      apps: { label: 'Applications', hint: 'Track active applications' },
      msgs: { label: 'Messages', hint: 'Open conversations' },
      profile: { label: 'Edit profile', hint: 'Skills, rate, availability' },
      applyFast: { label: 'Apply to a project', hint: 'Jump to the marketplace' },
      cdash: { label: 'Company dashboard', hint: 'Workspace overview' },
      cprojects: { label: 'Manage projects', hint: 'Live & draft briefs' },
      capplicants: { label: 'Review applicants', hint: 'Pipeline view' },
      cmsgs: { label: 'Company messages', hint: 'Reply to candidates' },
      cnew: { label: 'Post a new project', hint: 'Open the brief editor' },
      signStudent: { label: 'Sign in as student', hint: undefined as string | undefined },
      signCompany: { label: 'Sign in as company', hint: undefined as string | undefined },
      createStudent: { label: 'Create student account', hint: undefined as string | undefined },
      createCompany: { label: 'Create company account', hint: undefined as string | undefined },
      logout: { label: 'Sign out', hint: 'End your session' },
      switchFr: { label: 'Switch to French · Passer en français', hint: 'Toggle the interface language' },
      switchEn: { label: 'Switch to English · Passer à l’anglais', hint: 'Toggle the interface language' },
    },
  },
  fr: {
    placeholder: 'Cherche partout · saute à une page · agis…',
    empty: 'Aucun résultat. Essaie un autre mot-clé.',
    foot: { navigate: 'naviguer', open: 'ouvrir', close: 'fermer' },
    groups: {
      navigate: 'Naviguer',
      apply: 'Postuler',
      account: 'Compte',
      marketplace: 'Projets',
      language: 'Langue',
    },
    items: {
      home: { label: 'Accueil', hint: 'Page d’atterrissage' },
      projects: { label: 'Voir tous les projets', hint: 'Vitrine publique' },
      how: { label: 'Comment ça marche', hint: 'Vue d’ensemble' },
      students: { label: 'Pour les étudiants', hint: 'Proposition étudiante' },
      companies: { label: 'Pour les entreprises', hint: 'Proposition entreprise' },
      about: { label: 'À propos de Legend', hint: 'Mission et équipe' },
      dash: { label: 'Tableau de bord', hint: 'Aperçu de ton activité' },
      apps: { label: 'Candidatures', hint: 'Suivi des candidatures' },
      msgs: { label: 'Messages', hint: 'Conversations en cours' },
      profile: { label: 'Modifier le profil', hint: 'Compétences, taux, disponibilité' },
      applyFast: { label: 'Postuler à un projet', hint: 'Va aux projets' },
      cdash: { label: 'Tableau entreprise', hint: 'Aperçu de l’espace' },
      cprojects: { label: 'Gérer les projets', hint: 'Mandats actifs et brouillons' },
      capplicants: { label: 'Voir les candidats', hint: 'Vue pipeline' },
      cmsgs: { label: 'Messages entreprise', hint: 'Répondre aux candidats' },
      cnew: { label: 'Publier un nouveau projet', hint: 'Ouvrir l’éditeur de mandat' },
      signStudent: { label: 'Connexion étudiant', hint: undefined as string | undefined },
      signCompany: { label: 'Connexion entreprise', hint: undefined as string | undefined },
      createStudent: { label: 'Créer un compte étudiant', hint: undefined as string | undefined },
      createCompany: { label: 'Créer un compte entreprise', hint: undefined as string | undefined },
      logout: { label: 'Déconnexion', hint: 'Termine ta session' },
      switchFr: { label: 'Passer en français · Switch to French', hint: 'Changer la langue de l’interface' },
      switchEn: { label: 'Passer à l’anglais · Switch to English', hint: 'Changer la langue de l’interface' },
    },
  },
}

function CommandPalette({ open, onClose, session, onSignOut }: CommandPaletteProps) {
  const { lang, setLang } = useLanguage()
  const t = copy[lang]
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      window.requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  const navigate = (path: string) => {
    window.location.hash = routeHref(path)
    onClose()
  }

  const items = useMemo<CommandItem[]>(() => {
    const isMember = session?.role === 'member'
    const isCompany = session?.role === 'company'
    const list: CommandItem[] = [
      { id: 'home', ...t.items.home, group: t.groups.navigate, shortcut: 'G H', action: () => navigate('/') },
      { id: 'projects', ...t.items.projects, group: t.groups.marketplace, shortcut: 'G P', keywords: 'jobs work mandats', action: () => navigate('/projects') },
      { id: 'how', ...t.items.how, group: t.groups.navigate, action: () => navigate('/how-it-works') },
      { id: 'students', ...t.items.students, group: t.groups.navigate, action: () => navigate('/students') },
      { id: 'companies', ...t.items.companies, group: t.groups.navigate, action: () => navigate('/companies') },
      { id: 'about', ...t.items.about, group: t.groups.navigate, action: () => navigate('/about') },
    ]
    if (isMember) {
      list.push(
        { id: 'dash', ...t.items.dash, group: t.groups.account, shortcut: 'G D', action: () => navigate('/dashboard') },
        { id: 'apps', ...t.items.apps, group: t.groups.account, action: () => navigate('/applications') },
        { id: 'msgs', ...t.items.msgs, group: t.groups.account, action: () => navigate('/messages') },
        { id: 'profile', ...t.items.profile, group: t.groups.account, action: () => navigate('/profile') },
        { id: 'apply-fast', ...t.items.applyFast, group: t.groups.apply, action: () => navigate('/projects') },
      )
    }
    if (isCompany) {
      list.push(
        { id: 'cdash', ...t.items.cdash, group: t.groups.account, shortcut: 'G D', action: () => navigate('/company/dashboard') },
        { id: 'cprojects', ...t.items.cprojects, group: t.groups.account, action: () => navigate('/company/projects') },
        { id: 'capplicants', ...t.items.capplicants, group: t.groups.account, action: () => navigate('/company/applicants') },
        { id: 'cmsgs', ...t.items.cmsgs, group: t.groups.account, action: () => navigate('/company/messages') },
        { id: 'cnew', ...t.items.cnew, group: t.groups.apply, action: () => navigate('/company/post-project') },
      )
    }
    if (!session) {
      list.push(
        { id: 'sign-student', ...t.items.signStudent, group: t.groups.account, action: () => navigate('/students/sign-in') },
        { id: 'sign-company', ...t.items.signCompany, group: t.groups.account, action: () => navigate('/companies/sign-in') },
        { id: 'create-student', ...t.items.createStudent, group: t.groups.account, action: () => navigate('/students/create-account') },
        { id: 'create-company', ...t.items.createCompany, group: t.groups.account, action: () => navigate('/companies/create-account') },
      )
    } else {
      list.push({
        id: 'logout',
        ...t.items.logout,
        group: t.groups.account,
        action: () => {
          onSignOut?.()
          onClose()
        },
      })
    }

    if (lang === 'en') {
      list.push({
        id: 'lang-fr',
        ...t.items.switchFr,
        group: t.groups.language,
        keywords: 'language français francais fr en',
        action: () => {
          setLang('fr')
          onClose()
        },
      })
    } else {
      list.push({
        id: 'lang-en',
        ...t.items.switchEn,
        group: t.groups.language,
        keywords: 'language anglais english fr en',
        action: () => {
          setLang('en')
          onClose()
        },
      })
    }
    return list
  }, [session, onSignOut, lang, t, setLang, onClose])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter((item) => {
      return (
        item.label.toLowerCase().includes(q) ||
        item.hint?.toLowerCase().includes(q) ||
        item.keywords?.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q)
      )
    })
  }, [items, query])

  const grouped = useMemo(() => {
    const map = new Map<string, CommandItem[]>()
    for (const item of filtered) {
      if (!map.has(item.group)) map.set(item.group, [])
      map.get(item.group)!.push(item)
    }
    return Array.from(map.entries())
  }, [filtered])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      } else if (event.key === 'ArrowDown') {
        event.preventDefault()
        setActive((prev) => Math.min(prev + 1, filtered.length - 1))
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        setActive((prev) => Math.max(prev - 1, 0))
      } else if (event.key === 'Enter') {
        event.preventDefault()
        const item = filtered[active]
        if (item) item.action()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose, filtered, active])

  useEffect(() => {
    if (active >= filtered.length) {
      setActive(Math.max(0, filtered.length - 1))
    }
  }, [filtered.length, active])

  let runningIndex = 0

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          aria-modal="true"
          animate={{ opacity: 1 }}
          className="cmdk-overlay"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          transition={{ duration: 0.18 }}
        >
          <motion.div
            animate={{ y: 0, opacity: 1, scale: 1 }}
            className="cmdk-panel"
            exit={{ y: -16, opacity: 0, scale: 0.98 }}
            initial={{ y: -16, opacity: 0, scale: 0.98 }}
            onClick={(event) => event.stopPropagation()}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="cmdk-input-row">
              <span className="cmdk-glyph" aria-hidden>⌘</span>
              <input
                ref={inputRef}
                className="cmdk-input"
                onChange={(event) => {
                  setQuery(event.target.value)
                  setActive(0)
                }}
                placeholder={t.placeholder}
                value={query}
              />
              <kbd className="cmdk-kbd">ESC</kbd>
            </div>

            <div className="cmdk-results" role="listbox">
              {grouped.length === 0 && (
                <div className="cmdk-empty">{t.empty}</div>
              )}
              {grouped.map(([group, list]) => (
                <div key={group} className="cmdk-group">
                  <div className="cmdk-group-label">{group}</div>
                  {list.map((item) => {
                    const idx = runningIndex
                    runningIndex += 1
                    return (
                      <button
                        key={item.id}
                        className={`cmdk-item${idx === active ? ' is-active' : ''}`}
                        onClick={item.action}
                        onMouseEnter={() => setActive(idx)}
                        type="button"
                      >
                        <span className="cmdk-item-label">{item.label}</span>
                        {item.hint && <span className="cmdk-item-hint">{item.hint}</span>}
                        {item.shortcut && <kbd className="cmdk-shortcut">{item.shortcut}</kbd>}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>

            <div className="cmdk-foot">
              <span><kbd>↑</kbd><kbd>↓</kbd> {t.foot.navigate}</span>
              <span><kbd>↵</kbd> {t.foot.open}</span>
              <span><kbd>esc</kbd> {t.foot.close}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CommandPalette
