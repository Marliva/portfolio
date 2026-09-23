import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { getProjects, createProject, updateProject, deleteProject } from '@/api/projects'

function AdminProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState(null)

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm()

  async function refreshProjects() {
    try {
      const response = await getProjects()
      setProjects(response.data)
    } catch {
      setError('Impossible de charger les projets.')
    }
  }

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await getProjects()
        setProjects(response.data)
      } catch {
        setError('Impossible de charger les projets.')
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  function handleAdd() {
    setEditingProject(null)
    reset()
    setShowForm(true)
  }

  function handleEdit(project) {
    setEditingProject(project)
    setValue('title', project.title)
    setValue('description', project.description)
    setValue('stack', project.stack.join(', '))
    setValue('github', project.github || '')
    setValue('live', project.live || '')
    setValue('status', project.status)
    setValue('order', project.order)
    setShowForm(true)
  }

  function handleCancel() {
    setShowForm(false)
    setEditingProject(null)
    reset()
  }

  async function handleDelete(id) {
    if (!confirm('Supprimer ce projet ?')) return
    try {
      await deleteProject(id)
      await refreshProjects()
    } catch {
      alert('Une erreur est survenue.')
    }
  }

  async function onSubmit(data) {
    const payload = {
      ...data,
      stack: data.stack.split(',').map(s => s.trim()).filter(Boolean),
      order: parseInt(data.order) || 0,
    }

    try {
      if (editingProject) {
        await updateProject(editingProject.id, payload)
      } else {
        await createProject(payload)
      }
      await refreshProjects()
      handleCancel()
    } catch {
      alert('Une erreur est survenue.')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h1 className="font-heading font-extrabold text-2xl text-[var(--color-text-primary)]">
          Projects
        </h1>
        {!showForm && (
          <button
            onClick={handleAdd}
            className="bg-[var(--color-accent)] hover:bg-transparent text-white hover:text-[var(--color-accent)] border border-[var(--color-accent)] font-heading font-semibold text-xs tracking-widest uppercase px-6 py-3 transition-colors duration-300"
          >
            Ajouter un projet
          </button>
        )}
      </div>

      {loading && <p className="text-[var(--color-text-secondary)]">Chargement...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="flex flex-col gap-8">

          {/* Liste des projets */}
          {projects.length === 0 && !showForm && (
            <p className="text-[var(--color-text-secondary)]">Aucun projet pour le moment.</p>
          )}

          {projects.map((project) => (
            <div key={project.id} className="border border-[var(--color-border)]/30 p-6 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex flex-col gap-1">
                  <span className="font-heading font-bold text-[var(--color-text-primary)]">
                    {project.title}
                  </span>
                  <span className={`text-xs px-2 py-1 border w-fit ${
                    project.status === 'completed'
                      ? 'border-emerald-500 text-emerald-500'
                      : 'border-[var(--color-accent)] text-[var(--color-accent)]'
                  }`}>
                    {project.status === 'completed' ? 'Terminé' : 'En cours'}
                  </span>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleEdit(project)}
                    className="text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="text-xs text-[var(--color-text-secondary)] hover:text-red-500 transition-colors duration-300"
                  >
                    Supprimer
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span key={tech} className="text-xs border border-[var(--color-border)] text-[var(--color-text-secondary)] px-2 py-1">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Formulaire */}
          {showForm && (
            <div className="border border-[var(--color-accent)]/30 p-6">
              <h2 className="font-heading font-bold text-lg text-[var(--color-text-primary)] mb-6">
                {editingProject ? 'Modifier le projet' : 'Ajouter un projet'}
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-[var(--color-text-secondary)]">Titre</label>
                    <input
                      {...register('title', { required: 'Le titre est requis' })}
                      className="bg-transparent border border-[var(--color-border)] text-[var(--color-text-primary)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors duration-300"
                    />
                    {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-[var(--color-text-secondary)]">Statut</label>
                    <select
                      {...register('status', { required: 'Le statut est requis' })}
                      className="bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text-primary)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors duration-300"
                    >
                      <option value="completed">Terminé</option>
                      <option value="in_progress">En cours</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm text-[var(--color-text-secondary)]">Description</label>
                  <textarea
                    {...register('description', { required: 'La description est requise' })}
                    rows={3}
                    className="bg-transparent border border-[var(--color-border)] text-[var(--color-text-primary)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors duration-300 resize-none"
                  />
                  {errors.description && <span className="text-red-500 text-xs">{errors.description.message}</span>}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm text-[var(--color-text-secondary)]">Stack (séparée par des virgules)</label>
                  <input
                    {...register('stack', { required: 'La stack est requise' })}
                    placeholder="Laravel, React, MySQL"
                    className="bg-transparent border border-[var(--color-border)] text-[var(--color-text-primary)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors duration-300"
                  />
                  {errors.stack && <span className="text-red-500 text-xs">{errors.stack.message}</span>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-[var(--color-text-secondary)]">GitHub</label>
                    <input
                      {...register('github')}
                      placeholder="https://github.com/..."
                      className="bg-transparent border border-[var(--color-border)] text-[var(--color-text-primary)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors duration-300"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-[var(--color-text-secondary)]">Lien live</label>
                    <input
                      {...register('live')}
                      placeholder="https://..."
                      className="bg-transparent border border-[var(--color-border)] text-[var(--color-text-primary)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors duration-300"
                    />
                  </div>
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

export default AdminProjects