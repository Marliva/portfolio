import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getStats } from '@/api/stats'
import { ADMIN_ROUTES } from '@/config/admin'

function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await getStats()
        setStats(response.data)
      } catch {
        setError('Impossible de charger les statistiques.')
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  return (
    <div>
      <h1 className="font-heading font-extrabold text-2xl text-[var(--color-text-primary)] mb-8">
        Dashboard
      </h1>

      {loading && <p className="text-[var(--color-text-secondary)]">Chargement...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div
            onClick={() => navigate(ADMIN_ROUTES.messages)}
            className={`border p-6 flex flex-col gap-2 cursor-pointer transition-colors duration-300 hover:border-[var(--color-accent)] ${
              stats.unread_messages > 0
                ? 'border-[var(--color-accent)]'
                : 'border-[var(--color-border)]/30'
            }`}
          >
            <span className="font-heading font-extrabold text-3xl text-[var(--color-accent)]">
              {stats.unread_messages}
            </span>
            <span className="text-[var(--color-text-secondary)] text-sm">
              Message{stats.unread_messages > 1 ? 's' : ''} non lu{stats.unread_messages > 1 ? 's' : ''}
            </span>
            <span className="text-[var(--color-text-secondary)] text-xs mt-1">
              {stats.total_messages} au total
            </span>
          </div>

          <div
            onClick={() => navigate(ADMIN_ROUTES.projects)}
            className="border border-[var(--color-border)]/30 p-6 flex flex-col gap-2 cursor-pointer transition-colors duration-300 hover:border-[var(--color-accent)]"
          >
            <span className="font-heading font-extrabold text-3xl text-[var(--color-accent)]">
              {stats.total_projects}
            </span>
            <span className="text-[var(--color-text-secondary)] text-sm">
              Projet{stats.total_projects > 1 ? 's' : ''}
            </span>
          </div>

          <div
            onClick={() => navigate(ADMIN_ROUTES.skills)}
            className="border border-[var(--color-border)]/30 p-6 flex flex-col gap-2 cursor-pointer transition-colors duration-300 hover:border-[var(--color-accent)]"
          >
            <span className="font-heading font-extrabold text-3xl text-[var(--color-accent)]">
              {stats.total_skills}
            </span>
            <span className="text-[var(--color-text-secondary)] text-sm">
              Technologie{stats.total_skills > 1 ? 's' : ''}
            </span>
          </div>

          <div
            onClick={() => navigate(ADMIN_ROUTES.about)}
            className="border border-[var(--color-border)]/30 p-6 flex flex-col gap-2 cursor-pointer transition-colors duration-300 hover:border-[var(--color-accent)]"
          >
            <span className="font-heading font-extrabold text-3xl text-[var(--color-accent)]">
              About
            </span>
            <span className="text-[var(--color-text-secondary)] text-sm">
              Gérer le contenu
            </span>
          </div>

        </div>
      )}
    </div>
  )
}

export default Dashboard