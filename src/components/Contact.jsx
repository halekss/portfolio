function Contact() {
  return (
    <section id="contact" className="section">
      <h2 className="section-title">
        <span className="section-number">06 /</span> Contact
      </h2>
      <div className="contact-card">
        <p className="contact-text">
          Intéressé par mon profil ? N&apos;hésitez pas à me contacter pour discuter
          d&apos;opportunités d&apos;alternance.
        </p>
        <ul className="contact-list">
          <li>
            <span className="contact-label">mail</span>
            <a href="mailto:alex_2c@hotmail.fr">alex_2c@hotmail.fr</a>
          </li>
          <li>
            <span className="contact-label">linkedin</span>
            <a href="https://www.linkedin.com/in/alex-cattelin/" target="_blank" rel="noreferrer">
              /in/alex-cattelin
            </a>
          </li>
          <li>
            <span className="contact-label">cv</span>
            <a href="Alex_Cattelin_CV_Epitech_Alt.pdf" target="_blank" rel="noreferrer">
              télécharger le CV
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Contact
