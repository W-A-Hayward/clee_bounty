import type { StudentProject } from '../data/studentPortal'
import { routeHref } from '../lib/hashRouter'

type ProjectCardProps = {
  project: StudentProject
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className={`project-card ${project.tone}`}>
      <div className="project-card-topline">
        <span className="card-kicker">{project.company}</span>
        <span className="meta-chip">{project.workMode}</span>
      </div>

      <h3>{project.title}</h3>
      <p>{project.summary}</p>

      <div className="project-card-meta">
        <span>{project.budget}</span>
        <span>{project.duration}</span>
        <span>{project.experienceLevel}</span>
        <span>{project.deadlineLabel}</span>
      </div>

      <div className="tag-row">
        {project.skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>

      <div className="project-card-footer">
        <div className="project-card-fit">
          <strong>{project.matchScore}%</strong>
          <small>match</small>
        </div>

        <a className="button button-secondary" href={routeHref(`/projects/${project.slug}`)}>
          View full brief
        </a>
      </div>
    </article>
  )
}

export default ProjectCard
