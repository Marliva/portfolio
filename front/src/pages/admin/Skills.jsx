import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { getSkills, createSkill, updateSkill, deleteSkill } from '@/api/skills'

const CATEGORIES = ['Back-end', 'Front-end', 'Frameworks', 'Outils']

function AdminSkills() {
  const [skills, setSkills] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingSkill, setEditingSkill] = useState(null)

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm()

  async function refreshSkills() {
    try {
      const response = await getSkills()
      setSkills(response.data)
    } catch {
      setError('Impossible de charger les skills.')
    }
  }

  useEffect(() => {
    async function fetchSkills() {
      try {
        const response = await getSkills()
        setSkills(response.data)
      } catch {
        setError('Impossible de charger les skills.')
      } finally {
        setLoading(false)
      }
    }
    fetchSkills()
  }, [])

  function handleAdd() {
    setEditingSkill(null)
    reset()
    setShowForm(true)
  }

  function handleEdit(skill) {
    setEditingSkill(skill)
    setValue('name', skill.name)
    setValue('badge', skill.badge)
    setValue('category', skill.category)
    setValue('order', skill.order)
    setShowForm(true)
  }

  function handleCancel() {
    setShowForm(false)
    setEditingSkill(null)
    reset()
  }

  async function handleDelete(id) {
    if (!confirm('Supprimer cette technologie ?')) return
    try {
      await deleteSkill(id)
      await refreshSkills()
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
      if (editingSkill) {
        await updateSkill(editingSkill.id, payload)
      } else {
        await createSkill(payload)
      }
      await refreshSkills()
      handleCancel()
    } catch {
      alert('Une erreur est survenue.')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h1 className="font-heading font-extrabold text-2xl text-[var(--color-text-primary)]">
          Skills
        </h1>
        {!showForm && (
          <button
            onClick={handleAdd}
            className="bg-[var(--color-accent)] hover:bg-transparent text-white hover:text-[var(--color-accent)] border border-[var(--color-accent)] font-heading font-semibold text-xs tracking-widest uppercase px-6 py-3 transition-colors duration-300"
          >
            Ajouter une technologie
          </button>
        )}
      </div>

      {loading && <p className="text-[var(--color-text-secondary)]">Chargement...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="flex flex-col gap-8">

          {/* Liste des skills groupées par catégorie */}
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <h2 className="font-heading font-bold text-lg text-[var(--color-text-primary)] mb-4 pb-2 border-b border-[var(--color-accent)]/30">
                {category}
              </h2>
              <div className="flex flex-col gap-3">
                {items.map((skill) => (
                  <div key={skill.id} className="border border-[var(--color-border)]/30 p-4 flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-4">
                      <img src={skill.badge} alt={skill.name} className="h-7" />
                      <span className="text-[var(--color-text-secondary)] text-xs">
                        Ordre : {skill.order}
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleEdit(skill)}
                        className="text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(skill.id)}
                        className="text-xs text-[var(--color-text-secondary)] hover:text-red-500 transition-colors duration-300"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {Object.keys(skills).length === 0 && !showForm && (
            <p className="text-[var(--color-text-secondary)]">Aucune technologie pour le moment.</p>
          )}

          {/* Formulaire */}
          {showForm && (
            <div className="border border-[var(--color-accent)]/30 p-6">
              <h2 className="font-heading font-bold text-lg text-[var(--color-text-primary)] mb-6">
                {editingSkill ? 'Modifier la technologie' : 'Ajouter une technologie'}
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-[var(--color-text-secondary)]">Nom</label>
                    <input
                      {...register('name', { required: 'Le nom est requis' })}
                      className="bg-transparent border border-[var(--color-border)] text-[var(--color-text-primary)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors duration-300"
                    />
                    {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-[var(--color-text-secondary)]">Catégorie</label>
                    <select
                      {...register('category', { required: 'La catégorie est requise' })}
                      className="bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text-primary)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors duration-300"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    {errors.category && <span className="text-red-500 text-xs">{errors.category.message}</span>}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm text-[var(--color-text-secondary)]">URL du badge shields.io</label>
                  <input
                    {...register('badge', { required: "L'URL du badge est requise" })}
                    placeholder="https://img.shields.io/badge/..."
                    className="bg-transparent border border-[var(--color-border)] text-[var(--color-text-primary)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors duration-300"
                  />
                  {errors.badge && <span className="text-red-500 text-xs">{errors.badge.message}</span>}
                </div>

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

export default AdminSkills