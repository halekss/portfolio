import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { businessCases } from '../data/businessCases'

function BusinessCase() {
  const [ref, visible] = useReveal()
  const [index, setIndex] = useState(0)

  const isFirst = index === 0
  const isLast = index === businessCases.length - 1

  const goPrev = () => {
    if (!isFirst) setIndex((prev) => prev - 1)
  }

  const goNext = () => {
    if (!isLast) setIndex((prev) => prev + 1)
  }

  return (
    <section id="business-case" className="section">
      <h2 className="section-title">Business Case</h2>

      <div ref={ref} className={`business-carousel reveal ${visible ? 'is-visible' : ''}`}>
        <div
          className="business-carousel-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {businessCases.map((businessCase) => (
            <div className="business-carousel-slide" key={businessCase.id}>
              <article className="business-card">
                <div className="business-visual-frame">
                  <div
                    className="business-visual"
                    style={{ backgroundImage: `url('${businessCase.image}')` }}
                  />
                </div>
                <div className="business-content">
                  <h3 className="card-title">{businessCase.title}</h3>
                  <p className="card-desc">{businessCase.description}</p>
                  <div className="btn-group">
                    {businessCase.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className={`btn ${link.variant === 'primary' ? 'btn-primary' : 'btn-outline'}`}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-nav">
        <button
          type="button"
          className="carousel-arrow"
          onClick={goPrev}
          disabled={isFirst}
          aria-label="Business case précédent"
        >
          &larr;
        </button>
        <div className="carousel-dots">
          {businessCases.map((businessCase, i) => (
            <button
              key={businessCase.id}
              type="button"
              className={`carousel-dot ${i === index ? 'is-active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Aller au business case ${i + 1}`}
              aria-current={i === index}
            />
          ))}
        </div>
        <button
          type="button"
          className="carousel-arrow"
          onClick={goNext}
          disabled={isLast}
          aria-label="Business case suivant"
        >
          &rarr;
        </button>
      </div>
    </section>
  )
}

export default BusinessCase
