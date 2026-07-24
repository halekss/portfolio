import { useState } from 'react'

function ProjectRow({ project }) {
  const [open, setOpen] = useState(false)

  return (
    <li className="project-row">
      <button
        type="button"
        className="project-row-header"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="project-number">{project.number}</span>
        <span className="project-name">{project.name}</span>
        <span className="project-tags">
          {project.tags.map((tag) => (
            <span className="project-tag" key={tag}>{tag}</span>
          ))}
        </span>
        <span className="project-status">{project.status}</span>
        <span className="project-toggle" aria-hidden="true">{open ? 'v' : '>'}</span>
      </button>
      <div className={`project-row-body ${open ? 'is-open' : ''}`}>
        <div className="project-row-body-inner">
          <div
            className="project-visual"
            style={{ backgroundImage: `url('${project.image}')` }}
          />
          <div className="project-details">
            <h3 className="card-title">{project.title}</h3>
            <p className="card-desc">{project.description}</p>
            <a
              href={project.link.url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              {project.link.label} &rarr;
            </a>
          </div>
        </div>
      </div>
    </li>
  )
}

export default ProjectRow
