import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const EMAIL = 'alex_2c@hotmail.fr'

function Contact() {
  const [ref, visible] = useReveal()
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = async (event) => {
    event.preventDefault()
    try {
      await navigator.clipboard.writeText(EMAIL)
    } catch {
      window.location.href = `mailto:${EMAIL}`
      return
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="section">
      <h2 className="section-title">
        <span className="section-number">06 /</span> Contact
      </h2>
      <div ref={ref} className={`contact-card reveal ${visible ? 'is-visible' : ''}`}>
        <p className="contact-text">
          Intéressé par mon profil ? N&apos;hésitez pas à me contacter pour discuter
          d&apos;opportunités d&apos;alternance.
        </p>
        <ul className="contact-list">
          <li>
            <span className="contact-label">Mail</span>
            <a href={`mailto:${EMAIL}`} onClick={handleCopyEmail}>{EMAIL}</a>
          </li>
          <li>
            <span className="contact-label">Linkedin</span>
            <a href="https://www.linkedin.com/in/alex-cattelin/" target="_blank" rel="noreferrer">
              /in/alex-cattelin
            </a>
          </li>
          <li>
            <span className="contact-label">CV</span>
            <a href="CV_alex_cattelin_Epitech.pdf" target="_blank" rel="noreferrer">
              télécharger le CV
            </a>
          </li>
        </ul>
      </div>
      <div className={`toast ${copied ? 'is-visible' : ''}`} role="status" aria-live="polite">
        Email copié dans le presse-papiers
      </div>
    </section>
  )
}

export default Contact
