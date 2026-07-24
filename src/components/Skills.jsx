import { useReveal } from '../hooks/useReveal'

const SKILL_GROUPS = [
  { title: 'Langages & Outils', tags: ['Python', 'SQL'] },
  { title: 'Data Analysis & Viz', tags: ['Pandas', 'NumPy', 'Power BI', 'Seaborn', 'Plotly'] },
  { title: 'Data Engineering & ML', tags: ['Scikit-learn', 'API & WebScraping', 'Docker', 'Airflow'] },
]

function Skills() {
  const [ref, visible] = useReveal()

  return (
    <section id="skills" className="section">
      <h2 className="section-title">
        <span className="section-number">04 /</span> Compétences
      </h2>
      <div ref={ref} className={`skills-grid reveal ${visible ? 'is-visible' : ''}`}>
        {SKILL_GROUPS.map((group) => (
          <div className="skill-card" key={group.title}>
            <h3 className="skill-title">{group.title}</h3>
            <div className="skill-tags">
              {group.tags.map((tag) => (
                <span className="skill-tag" key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
