import { useReveal } from '../hooks/useReveal'

function Footer() {
  const [ref, visible] = useReveal({ threshold: 0.3 })

  return (
    <footer ref={ref} className={`footer reveal ${visible ? 'is-visible' : ''}`}>
      <p>&copy; 2025 Alex Cattelin. Portfolio Data Analyst.</p>
    </footer>
  )
}

export default Footer
