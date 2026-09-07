function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-[var(--color-accent)]/20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

        <span className="font-heading font-bold text-[var(--color-accent)]">C.</span>

        <ul className="flex gap-8 list-none">
          <li><a href="#about" className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300 text-sm">About</a></li>
          <li><a href="#stack" className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300 text-sm">Stack</a></li>
          <li><a href="#projects" className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300 text-sm">Projects</a></li>
          <li><a href="#contact" className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300 text-sm">Contact</a></li>
        </ul>

        <span className="text-[var(--color-text-secondary)] text-sm">
          © {new Date().getFullYear()} Cédric Levasseur
        </span>

      </div>
    </footer>
  )
}

export default Footer