import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 50, borderBottom: '1px solid rgba(0,128,128,0.2)', backdropFilter: 'blur(8px)' }}>
      <nav style={{ maxWidth: '1152px', margin: '0 auto', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        <a href="#hero" style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.25rem', fontWeight: 700, color: '#008080', textDecoration: 'none' }}>
          C.
        </a>

        {/* Desktop menu */}
        <ul style={{ display: 'flex', alignItems: 'center', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }} className="desktop-nav">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, transition: 'color 0.3s' }}
                onMouseEnter={e => e.target.style.color = '#008080'}
                onMouseLeave={e => e.target.style.color = '#94a3b8'}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger button */}
        <button
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: '#008080', padding: 0 }}
          className="hamburger-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </nav>

      {/* Mobile menu */}
      <div style={{ maxHeight: isOpen ? '16rem' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease' }} className="mobile-nav">
        <ul style={{ display: 'flex', flexDirection: 'column', padding: '0 1.5rem 1.5rem', gap: '1rem', listStyle: 'none', margin: 0 }}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setIsOpen(false)}
                style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}

export default Navbar