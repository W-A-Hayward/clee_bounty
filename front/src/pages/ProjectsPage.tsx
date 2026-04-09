import { useDeferredValue, useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import SectionHeading from '../components/SectionHeading'
import { marketplaceNotes, type StudentProject } from '../data/studentPortal'
import { routeHref } from '../lib/hashRouter'

const filters = ['All', 'Remote', 'Hybrid', 'React', 'Accessibility', 'Analytics', 'Design systems', 'UX writing']

type ProjectsPageProps = {
  projects: StudentProject[]
}

function ProjectsPage({ projects }: ProjectsPageProps) {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')
  const deferredQuery = useDeferredValue(query)

  const filteredProjects = projects.filter((project) => {
    const matchesQuery =
      deferredQuery.trim() === '' ||
      `${project.title} ${project.company} ${project.skills.join(' ')} ${project.summary}`
        .toLowerCase()
        .includes(deferredQuery.toLowerCase())

    const matchesFilter =
      activeFilter === 'All' ||
      project.workMode === activeFilter ||
      project.skills.some((skill) => skill.toLowerCase() === activeFilter.toLowerCase())

    return matchesQuery && matchesFilter
  })

  const resultLabel = `${filteredProjects.length} project${filteredProjects.length === 1 ? '' : 's'}`
  const isFiltered = activeFilter !== 'All' || query.trim() !== ''

  return (
    <>
      {/* ── TOOLBAR ─────────────────────────────────────────────────── */}
      <section className="section-block portal-section-tight">
        <SectionHeading
          eyebrow="Project marketplace"
          title="Browse high-signal freelance opportunities with context up front."
          description="Filter by skill or work mode. Every brief shows budget, timeline, and scope before you click through."
        />

        <div className="browse-toolbar">
          <label className="search-shell" htmlFor="project-search">
            <span className="mini-label">Search</span>
            <input
              id="project-search"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by company, title, or skill"
              type="search"
              value={query}
            />
          </label>

          <div className="filter-row">
            {filters.map((filter) => (
              <button
                key={filter}
                className={`filter-chip${activeFilter === filter ? ' is-active' : ''}`}
                onClick={() => setActiveFilter(filter)}
                type="button"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="results-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span className="status-pill status-live">{resultLabel}</span>
            {isFiltered && (
              <span>
                {activeFilter !== 'All' ? activeFilter : ''}
                {activeFilter !== 'All' && query.trim() ? ' · ' : ''}
                {query.trim() ? `"${query.trim()}"` : ''}
              </span>
            )}
            {!isFiltered && <span>All categories · all work modes</span>}
          </div>
          <span>Budget · duration · skills visible on every card</span>
        </div>
      </section>

      {/* ── PROJECT GRID ────────────────────────────────────────────── */}
      <section className="section-block">
        {filteredProjects.length > 0 ? (
          <div className="project-grid">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <article className="panel-card" style={{ textAlign: 'center', padding: '2.5rem 2rem' }}>
            <p className="eyebrow">No matches</p>
            <h2 style={{ margin: '0.5rem 0 0.75rem' }}>No projects match your current filters.</h2>
            <p style={{ color: 'var(--ink-soft)', maxWidth: '30rem', margin: '0 auto 1.5rem' }}>
              Try a broader search term or switch back to "All" to see every live brief.
            </p>
            <button
              className="button button-secondary"
              onClick={() => { setQuery(''); setActiveFilter('All') }}
              type="button"
            >
              Clear filters
            </button>
          </article>
        )}
      </section>

      {/* ── CONTEXT TIPS ────────────────────────────────────────────── */}
      {filteredProjects.length > 0 && (
        <section className="section-block portal-two-column">
          <article className="panel-card">
            <SectionHeading
              eyebrow="How to read the board"
              title="Good briefs reduce guesswork."
            />
            <div className="list-stack">
              {marketplaceNotes.map((note) => (
                <article key={note} className="list-card">
                  <strong>{note}</strong>
                </article>
              ))}
            </div>
          </article>

          <article className="panel-card tone-blue">
            <SectionHeading
              eyebrow="Ready to apply?"
              title="Sign in to apply directly from the brief page."
            />
            <p style={{ color: 'var(--ink-soft)', marginBottom: '1.1rem' }}>
              Create a free student account to submit targeted applications, track status, and message companies — all from one workspace.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href={routeHref('/students/create-account')}>
                Create student account
              </a>
              <a className="button button-secondary" href={routeHref('/students/sign-in')}>
                Sign in
              </a>
            </div>
          </article>
        </section>
      )}
    </>
  )
}

export default ProjectsPage
