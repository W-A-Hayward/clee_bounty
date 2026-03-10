import { useDeferredValue, useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import SectionHeading from '../components/SectionHeading'
import { marketplaceNotes, type StudentProject } from '../data/studentPortal'

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

  return (
    <>
      <section className="section-block portal-section-tight">
        <SectionHeading
          eyebrow="Project marketplace"
          title="Browse high-signal freelance opportunities with context up front."
          description="This page behaves like a usable marketplace: searchable briefs, clearer result counts, and guidance on what good project cards should tell you."
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
      </section>

      <section className="section-block portal-two-column">
        <article className="panel-card">
          <div className="card-topline">
            <span className="mini-label">Results</span>
            <span className="status-pill status-live">{resultLabel}</span>
          </div>

          <p className="page-intro">
            Projects surface budget, duration, experience level, work mode, and a short scope
            summary before you open the full brief.
          </p>
        </article>

        <article className="panel-card">
          <SectionHeading
            eyebrow="How to read the board"
            title="Good briefs reduce guesswork."
            description="Use these cues to decide quickly whether a project deserves a real application."
          />

          <ul className="point-list">
            {marketplaceNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="section-block">
        {filteredProjects.length > 0 ? (
          <div className="project-grid">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <article className="panel-card">
            <h2>No matching projects yet.</h2>
            <p>Try a broader search or switch back to `All` to review the full opportunity set.</p>
          </article>
        )}
      </section>
    </>
  )
}

export default ProjectsPage
