import projects from '../data/projects'
import ProjectRow from './ProjectRow'

function ProjectsLog() {
  return (
    <section id="projects" className="section">
      <h2 className="section-title">
        <span className="section-number">03 /</span> Projets
      </h2>
      <ul className="projects-log">
        {projects.map((project) => (
          <ProjectRow project={project} key={project.id} />
        ))}
      </ul>
    </section>
  )
}

export default ProjectsLog
