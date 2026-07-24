import { useReveal } from '../hooks/useReveal'

function About() {
  const [ref, visible] = useReveal()

  return (
    <section id="about" className="section">
      <h2 className="section-title">
        <span className="section-number">02 /</span> About
      </h2>
      <p ref={ref} className={`about-text reveal ${visible ? 'is-visible' : ''}`}>
        Actuellement en reconversion professionnelle vers les métiers de la data, je développe
        mes compétences en analyse de données, visualisation et machine learning. Je recherche
        une alternance en tant que <strong>Data Engineer</strong> ou <strong>Data Scientist</strong>{' '}
        pour approfondir mes connaissances et contribuer à des projets data ambitieux.
      </p>
    </section>
  )
}

export default About
