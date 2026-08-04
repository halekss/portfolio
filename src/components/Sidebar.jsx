import navigation from '../data/navigation'

function Sidebar({ activeSection }) {
  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-logo">AC</div>
        <nav>
          <ul className="sidebar-nav">
            {navigation.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={activeSection === item.id ? 'active' : ''}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  <span className="nav-number">{item.number}</span>
                  <span className="nav-label">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="sidebar-footer">
        <a href="mailto:alex_2c@hotmail.fr" className="sidebar-link">Mail</a>
        <a
          href="https://www.linkedin.com/in/alex-cattelin/"
          target="_blank"
          rel="noreferrer"
          className="sidebar-link"
        >
          Linkedin
        </a>
      </div>
    </aside>
  )
}

export default Sidebar
