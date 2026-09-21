import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { login } from '@/api/auth'
import { ADMIN_ROUTES } from '@/config/admin'

function Login() {
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm()

  async function onSubmit(data) {
    setLoading(true)
    setError(null)

    try {
      const response = await login(data)
      localStorage.setItem('admin_token', response.data.token)
      navigate(ADMIN_ROUTES.dashboard)
    } catch {
      setError('Identifiants incorrects.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[var(--color-background)]">
      <div className="w-full max-w-md">

        <h1 className="font-heading font-extrabold text-2xl text-[var(--color-accent)] mb-8">
          Connexion
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[var(--color-text-secondary)]">
              Email
            </label>
            <input
              type="email"
              {...register('email', { required: "L'email est requis" })}
              className="bg-transparent border border-[var(--color-border)] text-[var(--color-text-primary)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors duration-300"
              autoComplete="email"
            />
            {errors.email && (
              <span className="text-red-500 text-xs">{errors.email.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[var(--color-text-secondary)]">
              Mot de passe
            </label>
            <input
              type="password"
              {...register('password', { required: 'Le mot de passe est requis' })}
              className="bg-transparent border border-[var(--color-border)] text-[var(--color-text-primary)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors duration-300"
              autoComplete="current-password"
            />
            {errors.password && (
              <span className="text-red-500 text-xs">{errors.password.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[var(--color-accent)] hover:bg-transparent text-white hover:text-[var(--color-accent)] border border-[var(--color-accent)] font-heading font-semibold text-sm tracking-widest uppercase px-10 py-4 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>

        </form>
      </div>
    </div>
  )
}

export default Login