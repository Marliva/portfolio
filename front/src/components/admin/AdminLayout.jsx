import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { ADMIN_ROUTES } from '@/config/admin'
import { logout } from '@/api/auth'

const navLinks = [
  { label: 'Dashboard',  to: ADMIN_ROUTES.dashboard },
  { label: 'Messages',   to: ADMIN_ROUTES.messages },
  { label: 'Projects',   to: ADMIN_ROUTES.projects },
  { label: 'Skills',     to: ADMIN_ROUTES.skills },
  { label: 'About',      to: ADMIN_ROUTES.about },
]

function AdminLayout() {
  const navigate = useNavigate()

  async function handleLogout() {
    try {
      await logout()
    } finally {
      localStorage.removeItem('admin_token')
      navigate(ADMIN_ROUTES.login)
    }
  }

  return (
    <div className="min-h-screen flex bg-[var(--color-background)]">

      {/* Sidebar */}
      <aside className="w-64 border-r border-[var(--color-accent)]/20 flex flex-col">
        <div className="p-6 border-b border-[var(--color-accent)]/20">
          <span className="font-heading font-bold text-[var(--color-accent)] text-xl">Dashboard</span>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-4 py-3 text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)] border-l-2 border-[var(--color-accent)]'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-[var(--color-accent)]/20">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 text-sm font-medium text-[var(--color-text-secondary)] hover:text-red-500 transition-colors duration-300 text-left"
          >
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>

    </div>
  )
}

export default AdminLayout