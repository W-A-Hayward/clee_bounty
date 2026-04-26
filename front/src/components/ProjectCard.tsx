import type { StudentProject } from '../data/studentPortal'
import { pick, useLang } from '../i18n/LanguageContext'
import { routeHref } from '../lib/hashRouter'

type ProjectCardProps = {
  project: StudentProject
}

const copy = {
  en: { match: 'match', viewBrief: 'View full brief' },
  fr: { match: 'match', viewBrief: 'Voir le mandat complet' },
}

function ProjectCard({ project }: ProjectCardProps) {
  const lang = useLang()
  const t = copy[lang]
  return (
    <article className={`project-card ${project.tone}`}>
      <div className="project-card-topline">
        <span className="card-kicker">{project.company}</span>
        <span className="meta-chip">{pick(project.workMode, lang)}</span>
      </div>

      <h3>{pick(project.title, lang)}</h3>
      <p>{pick(project.summary, lang)}</p>

      <div className="project-card-meta">
        <span>{project.budget}</span>
        <span>{pick(project.duration, lang)}</span>
        <span>{pick(project.experienceLevel, lang)}</span>
        <span>{pick(project.deadlineLabel, lang)}</span>
      </div>

      <div className="tag-row">
        {project.skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>

      <div className="project-card-footer">
        <div className="project-card-fit">
          <strong>{project.matchScore}%</strong>
          <small>{t.match}</small>
        </div>

        <a className="button button-secondary" href={routeHref(`/projects/${project.slug}`)}>
          {t.viewBrief}
        </a>
      </div>
    </article>
  )
}

export default ProjectCard
