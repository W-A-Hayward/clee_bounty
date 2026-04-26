import { motion } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import TiltCard from '../components/TiltCard'
import {
  getProjectBySlug,
  upcomingMilestones,
  type StudentApplication,
  type StudentMessage,
  type StudentProject,
} from '../data/studentPortal'
import { pick, useLang } from '../i18n/LanguageContext'
import type { MemberSession } from '../lib/demoSession'
import { routeHref } from '../lib/hashRouter'

type DashboardPageProps = {
  session: MemberSession
  projects: StudentProject[]
  applications: Array<StudentApplication & { project?: StudentProject }>
  messages: Array<StudentMessage & { project?: StudentProject }>
}

const copy = {
  en: {
    welcome: 'Welcome back',
    headlineTail: 'the marketplace pulses.',
    noApps: "You haven't applied to a brief yet. Browse the marketplace to start your pipeline.",
    appsActive: (n: number, plural: string) => `${n} application${plural} active.`,
    movingForward: (n: number) => `${n} moving forward, keep the momentum.`,
    staySharp: 'Stay sharp on replies and check the messages tab.',
    browseMarketplace: 'Browse the marketplace →',
    viewApplications: 'View applications',
    profileSnapshot: 'Profile snapshot',
    program: 'Program',
    availability: 'Availability',
    targetRate: 'Target rate',
    editProfile: 'Edit profile',
    pipeline: 'Pipeline',
    totalSubmitted: 'total applications submitted',
    submitted: 'Submitted',
    shortlisted: 'Shortlisted',
    accepted: 'Accepted',
    inbox: 'Inbox',
    unread: 'unread messages waiting',
    openInbox: 'Open inbox →',
    matchFeed: 'Match feed',
    liveBriefs: (n: number) => `live briefs · ${n}% top fit`,
    browse: 'Browse →',
    recentApps: 'Recent applications',
    seeAll: 'See all →',
    projectRemoved: 'Project removed',
    nothingYet: 'Nothing submitted yet. Find a brief that fits and apply.',
    browseMP: 'Browse marketplace',
    upcomingMilestones: 'Upcoming milestones',
    milestonesEmpty: 'Milestones appear here once you are matched to a project.',
    recommendedFor: 'Recommended for you',
    briefsTuned: 'Briefs tuned to',
    and: '&',
    allBriefs: 'All briefs →',
    fit: 'fit',
    openBrief: 'Open brief →',
    statusLabels: {
      submitted: 'submitted',
      shortlisted: 'shortlisted',
      interviewing: 'interviewing',
      accepted: 'accepted',
      pending: 'pending',
      in_progress: 'in progress',
      approved: 'approved',
    },
  },
  fr: {
    welcome: 'Bon retour',
    headlineTail: 'la plateforme bat.',
    noApps: 'Tu n’as pas encore postulé à un mandat. Explore la vitrine pour commencer ton pipeline.',
    appsActive: (n: number, plural: string) => `${n} candidature${plural} active${plural}.`,
    movingForward: (n: number) => `${n} en mouvement — garde le momentum.`,
    staySharp: 'Reste vif sur les réponses et regarde l’onglet messages.',
    browseMarketplace: 'Explorer la vitrine →',
    viewApplications: 'Voir les candidatures',
    profileSnapshot: 'Aperçu du profil',
    program: 'Programme',
    availability: 'Disponibilité',
    targetRate: 'Taux cible',
    editProfile: 'Modifier le profil',
    pipeline: 'Pipeline',
    totalSubmitted: 'candidatures totales soumises',
    submitted: 'Soumises',
    shortlisted: 'Shortlistées',
    accepted: 'Acceptées',
    inbox: 'Boîte de réception',
    unread: 'messages non lus en attente',
    openInbox: 'Ouvrir la boîte →',
    matchFeed: 'Fil de matchs',
    liveBriefs: (n: number) => `mandats actifs · ${n}% top match`,
    browse: 'Explorer →',
    recentApps: 'Candidatures récentes',
    seeAll: 'Tout voir →',
    projectRemoved: 'Projet retiré',
    nothingYet: 'Rien de soumis pour l’instant. Trouve un mandat qui colle et postule.',
    browseMP: 'Explorer la vitrine',
    upcomingMilestones: 'Prochaines étapes',
    milestonesEmpty: 'Les étapes apparaissent ici dès que tu es matchée à un projet.',
    recommendedFor: 'Recommandé pour toi',
    briefsTuned: 'Mandats ajustés à',
    and: '·',
    allBriefs: 'Tous les mandats →',
    fit: 'match',
    openBrief: 'Voir le mandat →',
    statusLabels: {
      submitted: 'soumise',
      shortlisted: 'shortlistée',
      interviewing: 'entrevue',
      accepted: 'acceptée',
      pending: 'à faire',
      in_progress: 'en cours',
      approved: 'approuvée',
    },
  },
}

function DashboardPage({ session, projects, applications, messages }: DashboardPageProps) {
  const lang = useLang()
  const t = copy[lang]
  const unread = messages.reduce((sum, m) => sum + m.unread, 0)
  const shortlisted = applications.filter((a) => a.status === 'shortlisted' || a.status === 'interviewing').length
  const submitted = applications.filter((a) => a.status === 'submitted').length
  const accepted = applications.filter((a) => a.status === 'accepted').length
  const recommended = projects.slice(0, 3)
  const recentApplications = applications.slice(0, 3)
  const dateLocale = lang === 'fr' ? 'fr-CA' : undefined

  return (
    <div className="bento-grid">
      <ScrollReveal className="bento bento-span-8">
        <div className="bento" style={{ all: 'unset', display: 'grid', gap: '0.6rem' }}>
          <span className="bento-eyebrow">{t.welcome} · {new Date().toLocaleDateString(dateLocale, { weekday: 'long', month: 'short', day: 'numeric' })}</span>
          <h2 className="bento-headline">
            <em>{session.name.split(' ')[0]},</em> {t.headlineTail}
          </h2>
          <p className="bento-meta">
            {applications.length === 0
              ? t.noApps
              : `${t.appsActive(applications.length, applications.length === 1 ? '' : 's')} ${shortlisted > 0 ? t.movingForward(shortlisted) : t.staySharp}`}
          </p>
          <div className="hero-actions" style={{ marginTop: '0.4rem' }}>
            <a className="button button-primary" href={routeHref('/projects')}>{t.browseMarketplace}</a>
            <a className="button button-ghost" href={routeHref('/applications')}>{t.viewApplications}</a>
          </div>
        </div>
        <div className="bento-pulse" aria-hidden />
      </ScrollReveal>

      <ScrollReveal className="bento bento-span-4" delay={0.05}>
        <div style={{ display: 'grid', gap: '0.6rem' }}>
          <span className="bento-eyebrow">{t.profileSnapshot}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div className="appshell-avatar" style={{ width: '2.6rem', height: '2.6rem', fontSize: '0.84rem' }}>
              {session.name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <div>
              <strong style={{ display: 'block', color: 'var(--ink-strong)' }}>{session.name}</strong>
              <span className="bento-meta">{session.school}</span>
            </div>
          </div>
          <div className="bento-divider" />
          <div style={{ display: 'grid', gap: '0.4rem', fontSize: '0.86rem', color: 'var(--ink-soft)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{t.program}</span><span style={{ color: 'var(--ink)' }}>{session.program}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{t.availability}</span><span style={{ color: 'var(--ink)' }}>{session.availability}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{t.targetRate}</span><span style={{ color: 'var(--accent-lime)' }}>{session.rate}</span>
            </div>
          </div>
          <a className="button button-ghost" href={routeHref('/profile')} style={{ width: '100%', justifyContent: 'center', marginTop: '0.3rem' }}>
            {t.editProfile}
          </a>
        </div>
      </ScrollReveal>

      <ScrollReveal className="bento bento-span-4" delay={0.08}>
        <div style={{ display: 'grid', gap: '0.4rem' }}>
          <span className="bento-eyebrow">{t.pipeline}</span>
          <motion.span
            animate={{ opacity: 1, y: 0 }}
            className="bento-headline"
            initial={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.15 }}
          >
            {applications.length}
          </motion.span>
          <span className="bento-meta">{t.totalSubmitted}</span>
          <div className="bento-divider" />
          <div style={{ display: 'grid', gap: '0.3rem' }}>
            <PipelineRow color="sky" label={t.submitted} value={submitted} />
            <PipelineRow color="lime" label={t.shortlisted} value={shortlisted} />
            <PipelineRow color="amber" label={t.accepted} value={accepted} />
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal className="bento bento-span-4" delay={0.1}>
        <div style={{ display: 'grid', gap: '0.4rem' }}>
          <span className="bento-eyebrow">{t.inbox}</span>
          <motion.span
            animate={{ opacity: 1, y: 0 }}
            className="bento-headline"
            initial={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.2 }}
          >
            {unread}
          </motion.span>
          <span className="bento-meta">{t.unread}</span>
          <a className="button button-ghost" href={routeHref('/messages')} style={{ marginTop: '0.5rem', justifyContent: 'center' }}>
            {t.openInbox}
          </a>
        </div>
      </ScrollReveal>

      <ScrollReveal className="bento bento-span-4" delay={0.12}>
        <div style={{ display: 'grid', gap: '0.4rem' }}>
          <span className="bento-eyebrow">{t.matchFeed}</span>
          <motion.span
            animate={{ opacity: 1, y: 0 }}
            className="bento-headline"
            initial={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.25 }}
          >
            {projects.length}
          </motion.span>
          <span className="bento-meta">{t.liveBriefs(recommended[0]?.matchScore ?? 0)}</span>
          <a className="button button-primary" href={routeHref('/projects')} style={{ marginTop: '0.5rem', justifyContent: 'center' }}>
            {t.browse}
          </a>
        </div>
      </ScrollReveal>

      <ScrollReveal className="bento bento-span-7" delay={0.14}>
        <div style={{ display: 'grid', gap: '0.85rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span className="bento-eyebrow">{t.recentApps}</span>
            <a className="bento-eyebrow" href={routeHref('/applications')} style={{ color: 'var(--accent-lime)', textDecoration: 'none' }}>
              {t.seeAll}
            </a>
          </div>
          {recentApplications.length > 0 ? (
            <div className="list-stack">
              {recentApplications.map((app) => (
                <article key={app.id} className="list-card">
                  <div>
                    <strong>{app.project ? pick(app.project.title, lang) : t.projectRemoved}</strong>
                    <p>{app.project?.company} · {pick(app.appliedLabel, lang)}</p>
                  </div>
                  <span className={`status-pill status-${app.status}`}>{t.statusLabels[app.status]}</span>
                </article>
              ))}
            </div>
          ) : (
            <div style={{ padding: '1rem 0' }}>
              <p style={{ color: 'var(--ink-soft)' }}>{t.nothingYet}</p>
              <a className="button button-primary" href={routeHref('/projects')} style={{ marginTop: '0.7rem' }}>
                {t.browseMP}
              </a>
            </div>
          )}
        </div>
      </ScrollReveal>

      <ScrollReveal className="bento bento-span-5" delay={0.16}>
        <div style={{ display: 'grid', gap: '0.85rem' }}>
          <span className="bento-eyebrow">{t.upcomingMilestones}</span>
          {upcomingMilestones.length > 0 ? (
            <div className="list-stack">
              {upcomingMilestones.slice(0, 3).map((milestone, idx) => {
                const project = getProjectBySlug(milestone.projectSlug)
                return (
                  <article key={`${milestone.projectSlug}-${idx}`} className="list-card">
                    <div>
                      <strong>{pick(milestone.title, lang)}</strong>
                      <p>{project ? pick(project.title, lang) : ''}</p>
                    </div>
                    <div className="status-column">
                      <span className={`status-pill status-${milestone.status}`}>{t.statusLabels[milestone.status]}</span>
                      <small>{pick(milestone.dueLabel, lang)}</small>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <p style={{ color: 'var(--ink-soft)' }}>{t.milestonesEmpty}</p>
          )}
        </div>
      </ScrollReveal>

      <ScrollReveal className="bento bento-span-12" delay={0.2}>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.6rem' }}>
            <div>
              <span className="bento-eyebrow">{t.recommendedFor}</span>
              <h3 className="bento-headline" style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)', marginTop: '0.4rem' }}>
                {t.briefsTuned} <em>{session.availability}</em> {t.and} <em>{session.rate}</em>.
              </h3>
            </div>
            <a className="button button-secondary" href={routeHref('/projects')}>{t.allBriefs}</a>
          </div>
          <div className="project-grid" style={{ marginTop: '0.4rem' }}>
            {recommended.map((project) => (
              <TiltCard key={project.slug} className={`project-card ${project.tone}`} href={routeHref(`/projects/${project.slug}`)} intensity={5}>
                <div className="project-card-topline">
                  <span className="card-kicker">{project.company}</span>
                  <span className="meta-chip">{pick(project.workMode, lang)}</span>
                </div>
                <h3>{pick(project.title, lang)}</h3>
                <p>{pick(project.summary, lang)}</p>
                <div className="project-card-meta">
                  <span>{project.budget}</span>
                  <span>{pick(project.duration, lang)}</span>
                </div>
                <div className="project-card-footer">
                  <div className="project-card-fit">
                    <strong>{project.matchScore}%</strong>
                    <small>{t.fit}</small>
                  </div>
                  <span className="project-card-cta">{t.openBrief}</span>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}

function PipelineRow({ color, label, value }: { color: 'sky' | 'lime' | 'amber'; label: string; value: number }) {
  const dotClass = `dot-${color === 'sky' ? 'blue' : color === 'lime' ? 'green' : 'orange'}`
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.86rem' }}>
      <span className={`highlight-bar-dot ${dotClass}`} aria-hidden style={{ flexShrink: 0 }} />
      <span style={{ color: 'var(--ink)' }}>{label}</span>
      <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      <strong style={{ color: 'var(--ink-strong)' }}>{value}</strong>
    </div>
  )
}

export default DashboardPage
