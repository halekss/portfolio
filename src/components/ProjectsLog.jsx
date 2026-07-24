import projects from '../data/projects'
import ProjectRow from './ProjectRow'
import { useReveal } from '../hooks/useReveal'

function ProjectsLog() {
  const [ref, visible] = useReveal()

  return (
    <section id="projects" className="section">
      <h2 className="section-title">
        <span className="section-number">03 /</span> Projets
      </h2>
      <ul ref={ref} className={`projects-log reveal ${visible ? 'is-visible' : ''}`}>
        {projects.map((project) => (
          <ProjectRow project={project} key={project.id} />
        ))}
      </ul>
    </section>
  )
}

export default ProjectsLog
