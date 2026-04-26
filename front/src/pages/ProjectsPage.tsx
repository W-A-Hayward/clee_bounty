import { useDeferredValue, useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import SectionHeading from '../components/SectionHeading'
import { marketplaceNotes, type StudentProject } from '../data/studentPortal'
import { pick, useLang } from '../i18n/LanguageContext'
import { routeHref } from '../lib/hashRouter'

const filterDefs = [
  { value: 'All', en: 'All', fr: 'Tous' },
  { value: 'Remote', en: 'Remote', fr: 'À distance' },
  { value: 'Hybrid', en: 'Hybrid', fr: 'Hybride' },
  { value: 'React', en: 'React', fr: 'React' },
  { value: 'Accessibility', en: 'Accessibility', fr: 'Accessibilité' },
  { value: 'Analytics', en: 'Analytics', fr: 'Analytique' },
  { value: 'Design systems', en: 'Design systems', fr: 'Design systems' },
  { value: 'UX writing', en: 'UX writing', fr: 'UX writing' },
] as const

const copy = {
  en: {
    eyebrow: 'Marketplace',
    title: 'Browse the live brief feed.',
    desc: 'Filter by skill or work mode. Every brief shows budget, timeline, and scope before you click through.',
    searchLabel: 'Search',
    searchPlaceholder: 'Search by company, title, or skill',
    briefSingular: 'brief',
    briefPlural: 'briefs',
    noMatches: 'No matches',
    nothingFits: 'Nothing fits those filters yet.',
    nothingHint: 'Try a broader keyword or switch back to',
    nothingAll: 'All',
    nothingHintEnd: 'to review the full opportunity set.',
    reset: 'Reset filters',
    howBoardWorks: 'How the board works',
    howRead: 'How to read the board',
    howReadIntro: 'Use these cues to decide quickly whether a project deserves a real application.',
    tipKicker: 'Tip · ⌘K',
    tipBody: 'anywhere to jump straight to a brief, your inbox, or apply form.',
    tipBodyPre: 'Press',
  },
  fr: {
    eyebrow: 'Vitrine',
    title: 'Explore le fil des mandats actifs.',
    desc: 'Filtre par compétence ou mode de travail. Chaque mandat montre budget, échéance et scope avant le clic.',
    searchLabel: 'Recherche',
    searchPlaceholder: 'Cherche par entreprise, titre ou compétence',
    briefSingular: 'mandat',
    briefPlural: 'mandats',
    noMatches: 'Aucun résultat',
    nothingFits: 'Rien ne colle à ces filtres pour l’instant.',
    nothingHint: 'Essaie un mot-clé plus large ou reviens à',
    nothingAll: 'Tous',
    nothingHintEnd: 'pour voir tout le set d’opportunités.',
    reset: 'Réinitialiser',
    howBoardWorks: 'Comment lire le tableau',
    howRead: 'Comment lire le tableau',
    howReadIntro: 'Utilise ces repères pour décider vite si un projet mérite une vraie candidature.',
    tipKicker: 'Astuce · ⌘K',
    tipBody: 'partout pour sauter à un mandat, ta boîte de réception ou un formulaire.',
    tipBodyPre: 'Appuie sur',
  },
}

type ProjectsPageProps = {
  projects: StudentProject[]
}

function ProjectsPage({ projects }: ProjectsPageProps) {
  const lang = useLang()
  const t = copy[lang]
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<string>('All')
  const deferredQuery = useDeferredValue(query)

  const filteredProjects = projects.filter((project) => {
    const title = pick(project.title, lang)
    const summary = pick(project.summary, lang)
    const workMode = pick(project.workMode, lang)
    const matchesQuery =
      deferredQuery.trim() === '' ||
      `${title} ${project.company} ${project.skills.join(' ')} ${summary}`
        .toLowerCase()
        .includes(deferredQuery.toLowerCase())

    const matchesFilter =
      activeFilter === 'All' ||
      pick(project.workMode, 'en') === activeFilter ||
      workMode === activeFilter ||
      project.skills.some((skill) => skill.toLowerCase() === activeFilter.toLowerCase())

    return matchesQuery && matchesFilter
  })

  return (
    <>
      <section className="section-block portal-section-tight">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          description={t.desc}
        />

        <div className="marketplace-toolbar">
          <label className="search-shell" htmlFor="project-search">
            <span className="mini-label">{t.searchLabel}</span>
            <input
              id="project-search"
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t.searchPlaceholder}
              type="search"
              value={query}
            />
          </label>

          <div className="filter-row">
            {filterDefs.map((filter) => (
              <button
                key={filter.value}
                className={`filter-chip${activeFilter === filter.value ? ' is-active' : ''}`}
                onClick={() => setActiveFilter(filter.value)}
                type="button"
              >
                {filter[lang]}
              </button>
            ))}
          </div>

          <div className="marketplace-result-count" aria-live="polite">
            <strong>{filteredProjects.length}</strong>
            <span>{filteredProjects.length === 1 ? t.briefSingular : t.briefPlural}</span>
          </div>
        </div>
      </section>

      <section className="section-block marketplace-results">
        <div className="marketplace-results-main">
          {filteredProjects.length > 0 ? (
            <div className="project-grid">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          ) : (
            <article className="panel-card marketplace-empty">
              <span className="card-kicker">{t.noMatches}</span>
              <h2>{t.nothingFits}</h2>
              <p>{t.nothingHint} <strong>{t.nothingAll}</strong> {t.nothingHintEnd}</p>
              <div className="hero-actions">
                <button
                  className="button button-secondary"
                  onClick={() => {
                    setQuery('')
                    setActiveFilter('All')
                  }}
                  type="button"
                >
                  {t.reset}
                </button>
                <a className="button button-ghost" href={routeHref('/how-it-works')}>
                  {t.howBoardWorks}
                </a>
              </div>
            </article>
          )}
        </div>

        <aside className="marketplace-aside" aria-label={t.howRead}>
          <article className="aside-card">
            <span className="card-kicker">{t.howRead}</span>
            <p>{t.howReadIntro}</p>
            <ul className="point-list">
              {marketplaceNotes.map((note, idx) => (
                <li key={idx}>{pick(note, lang)}</li>
              ))}
            </ul>
          </article>
          <article className="aside-card aside-card-tight">
            <span className="card-kicker">{t.tipKicker}</span>
            <p>{t.tipBodyPre} <kbd className="aside-kbd">⌘</kbd><kbd className="aside-kbd">K</kbd> {t.tipBody}</p>
          </article>
        </aside>
      </section>
    </>
  )
}

export default ProjectsPage
