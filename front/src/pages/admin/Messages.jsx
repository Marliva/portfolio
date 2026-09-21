import { useState, useEffect } from 'react'
import { getMessages, markAsRead, deleteMessage } from '@/api/messages'

function Messages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function refreshMessages() {
    try {
      const response = await getMessages()
      setMessages(response.data)
    } catch {
      setError('Impossible de charger les messages.')
    }
  }

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await getMessages()
        setMessages(response.data)
      } catch {
        setError('Impossible de charger les messages.')
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [])

  async function handleMarkAsRead(id) {
    try {
      await markAsRead(id)
      await refreshMessages()
    } catch {
      alert('Une erreur est survenue.')
    }
  }

  async function handleDelete(id) {
    if (!confirm('Supprimer ce message ?')) return
    try {
      await deleteMessage(id)
      await refreshMessages()
    } catch {
      alert('Une erreur est survenue.')
    }
  }

  return (
    <div>
      <h1 className="font-heading font-extrabold text-2xl text-[var(--color-text-primary)] mb-8">
        Messages
      </h1>

      {loading && (
        <p className="text-[var(--color-text-secondary)]">Chargement...</p>
      )}

      {error && (
        <p className="text-red-500">{error}</p>
      )}

      {!loading && !error && messages.length === 0 && (
        <p className="text-[var(--color-text-secondary)]">Aucun message reçu.</p>
      )}

      {!loading && !error && messages.length > 0 && (
        <div className="flex flex-col gap-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`border p-6 flex flex-col gap-3 ${
                message.is_read
                  ? 'border-[var(--color-border)]/30'
                  : 'border-[var(--color-accent)]'
              }`}
            >
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex flex-col gap-1">
                  <span className="font-heading font-bold text-[var(--color-text-primary)]">
                    {message.name}
                  </span>
                  <span className="text-[var(--color-text-secondary)] text-sm">
                    {message.email}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[var(--color-text-secondary)] text-xs">
                    {new Date(message.created_at).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                  {!message.is_read && (
                    <span className="text-xs border border-[var(--color-accent)] text-[var(--color-accent)] px-2 py-1">
                      Non lu
                    </span>
                  )}
                </div>
              </div>

              <p className="text-[var(--color-text-primary)] text-sm leading-relaxed">
                {message.message}
              </p>

              <div className="flex gap-4 mt-2">
                {!message.is_read && (
                  <button
                    onClick={() => handleMarkAsRead(message.id)}
                    className="text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300"
                  >
                    Marquer comme lu
                  </button>
                )}
                <button
                  onClick={() => handleDelete(message.id)}
                  className="text-xs text-[var(--color-text-secondary)] hover:text-red-500 transition-colors duration-300"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Messages