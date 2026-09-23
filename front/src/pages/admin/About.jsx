import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { getAbout, createAbout, updateAbout, deleteAbout } from '@/api/about'

function AdminAbout() {
  const [paragraphs, setParagraphs] = useState([])
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm()
  const watchType = watch('type', 'paragraph')

  async function refreshAbout() {
    try {
      const response = await getAbout()
      setParagraphs(response.data.paragraphs)
      setStats(response.data.stats)
    } catch {
      setError('Impossible de charger le contenu.')
    }
  }

  useEffect(() => {
    async function fetchAbout() {
      try {
        const response = await getAbout()
        setParagraphs(response.data.paragraphs)
        setStats(response.data.stats)
      } catch {
        setError('Impossible de charger le contenu.')
      } finally {
        setLoading(false)
      }
    }
    fetchAbout()
  }, [])

  function handleAdd() {
    setEditingItem(null)
    reset()
    setShowForm(true)
  }

  function handleEdit(item) {
    setEditingItem(item)
    setValue('type', item.type)
    setValue('content', item.content)
    setValue('label', item.label || '')
    setValue('order', item.order)
    setShowForm(true)
  }

  function handleCancel() {
    setShowForm(false)
    setEditingItem(null)
    reset()
  }

  async function handleDelete(id) {
    if (!confirm('Supprimer cet élément ?')) return
    try {
      await deleteAbout(id)
      await refreshAbout()
    } catch {
      alert('Une erreur est survenue.')
    }
  }

  async function onSubmit(data) {
    const payload = {
      ...data,
      order: parseInt(data.order) || 0,
    }

    try {
      if (editingItem) {
        await updateAbout(editingItem.id, payload)
      } else {
        await createAbout(payload)
      }
      await refreshAbout()
      handleCancel()
    } catch {
      alert('Une erreur est survenue.')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h1 className="font-heading font-extrabold text-2xl text-[var(--color-text-primary)]">
          About
        </h1>
        {!showForm && (
          <button
            onClick={handleAdd}
            className="bg-[var(--color-accent)] hover:bg-transparent text-white hover:text-[var(--color-accent)] border border-[var(--color-accent)] font-heading font-semibold text-xs tracking-widest uppercase px-6 py-3 transition-colors duration-300"
          >
            Ajouter un élément
          </button>
        )}
      </div>

      {loading && <p className="text-[var(--color-text-secondary)]">Chargement...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="flex flex-col gap-8">

          {/* Paragraphes */}
          {paragraphs.length > 0 && (
            <div>
              <h2 className="font-heading font-bold text-lg text-[var(--color-text-primary)] mb-4 pb-2 border-b border-[var(--color-accent)]/30">
                Paragraphes
              </h2>
              <div className="flex flex-col gap-3">
                {paragraphs.map((item) => (
                  <div key={item.id} className="border border-[var(--color-border)]/30 p-4 flex flex-col gap-3">
                    <p className="text-[var(--color-text-primary)] text-sm leading-relaxed">
                      {item.content}
                    </p>
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-xs text-[var(--color-text-secondary)] hover:text-red-500 transition-colors duration-300"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stats */}
          {stats.length > 0 && (
            <div>
              <h2 className="font-heading font-bold text-lg text-[var(--color-text-primary)] mb-4 pb-2 border-b border-[var(--color-accent)]/30">
                Statistiques
              </h2>
              <div className="flex flex-col gap-3">
                {stats.map((item) => (
                  <div key={item.id} className="border border-[var(--color-border)]/30 p-4 flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex flex-col gap-1">
                      <span className="font-heading font-bold text-[var(--color-accent)]">
                        {item.content}
                      </span>
                      <span className="text-[var(--color-text-secondary)] text-sm">
                        {item.label}
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-xs text-[var(--color-text-secondary)] hover:text-red-500 transition-colors duration-300"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {paragraphs.length === 0 && stats.length === 0 && !showForm && (
            <p className="text-[var(--color-text-secondary)]">Aucun contenu pour le moment.</p>
          )}

          {/* Formulaire */}
          {showForm && (
            <div className="border border-[var(--color-accent)]/30 p-6">
              <h2 className="font-heading font-bold text-lg text-[var(--color-text-primary)] mb-6">
                {editingItem ? 'Modifier l\'élément' : 'Ajouter un élément'}
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

                <div className="flex flex-col gap-2">
                  <label className="text-sm text-[var(--color-text-secondary)]">Type</label>
                  <select
                    {...register('type')}
                    className="bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text-primary)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors duration-300"
                  >
                    <option value="paragraph">Paragraphe</option>
                    <option value="stat">Statistique</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm text-[var(--color-text-secondary)]">
                    {watchType === 'stat' ? 'Valeur (ex: 2024, RNCP 5)' : 'Contenu'}
                  </label>
                  {watchType === 'paragraph' ? (
                    <textarea
                      {...register('content', { required: 'Le contenu est requis' })}
                      rows={4}
                      className="bg-transparent border border-[var(--color-border)] text-[var(--color-text-primary)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors duration-300 resize-none"
                    />
                  ) : (
                    <input
                      {...register('content', { required: 'La valeur est requise' })}
                      className="bg-transparent border border-[var(--color-border)] text-[var(--color-text-primary)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors duration-300"
                    />
                  )}
                  {errors.content && <span className="text-red-500 text-xs">{errors.content.message}</span>}
                </div>

                {watchType === 'stat' && (
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-[var(--color-text-secondary)]">Label (ex: Début de la reconversion)</label>
                    <input
                      {...register('label', { required: watchType === 'stat' ? 'Le label est requis pour une stat' : false })}
                      className="bg-transparent border border-[var(--color-border)] text-[var(--color-text-primary)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors duration-300"
                    />
                    {errors.label && <span className="text-red-500 text-xs">{errors.label.message}</span>}
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <label className="text-sm text-[var(--color-text-secondary)]">Ordre d'affichage</label>
                  <input
                    type="number"
                    {...register('order')}
                    className="bg-transparent border border-[var(--color-border)] text-[var(--color-text-primary)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors duration-300 w-32"
                  />
                </div>

                <div className="flex gap-4 mt-2">
                  <button
                    type="submit"
                    className="bg-[var(--color-accent)] hover:bg-transparent text-white hover:text-[var(--color-accent)] border border-[var(--color-accent)] font-heading font-semibold text-xs tracking-widest uppercase px-6 py-3 transition-colors duration-300"
                  >
                    Enregistrer
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] font-heading font-semibold text-xs tracking-widest uppercase px-6 py-3 transition-colors duration-300"
                  >
                    Annuler
                  </button>
                </div>

              </form>
            </div>
          )}

        </div>
      )}
    </div>
  )
}

export default AdminAbout