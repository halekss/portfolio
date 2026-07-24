import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Hero from './components/Hero'
import About from './components/About'
import ProjectsLog from './components/ProjectsLog'
import BusinessCase from './components/BusinessCase'
import Skills from './components/Skills'
import Tools from './components/Tools'
import Contact from './components/Contact'
import Footer from './components/Footer'
import navigation from './data/navigation'
import './styles/style.css'

function App() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const elements = navigation
      .map((item) => document.getElementById(item.id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -45% 0px' }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="app-shell">
      <Sidebar activeSection={activeSection} />
      <main className="content">
        <Hero />
        <About />
        <ProjectsLog />
        <BusinessCase />
        <Skills />
        <Tools />
        <Contact />
        <Footer />
      </main>
    </div>
  )
}

export default App
