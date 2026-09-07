import useTilt from '@/hooks/useTilt'
import { ExternalLink, Clock } from 'lucide-react'
import GithubIcon from '@/components/ui/icons/GithubIcon'

function ProjectCard({ project }) {
  const { ref, handleMouseMove, handleMouseLeave, handleMouseEnter } = useTilt()

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className="border border-[var(--color-accent)] p-6 flex flex-col gap-4 cursor-default h-full"
      style={{ boxShadow: '0 0 20px rgba(0, 128, 128, 0.15)' }}
    >

      {/* Media zone */}
      {project.video && (
        <video
          src={project.video}
          className="w-full h-48 object-cover"
          muted
          loop
          playsInline
          onMouseEnter={e => e.target.play()}
          onMouseLeave={e => e.target.pause()}
        />
      )}
      {project.image && !project.video && (
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover"
        />
      )}
      {!project.image && !project.video && (
        <div className="w-full h-48 bg-[#0f172a] flex items-center justify-center">
          <span className="text-[var(--color-text-secondary)] text-sm">En cours de développement</span>
        </div>
      )}

      {/* Status badge */}
      <div className="flex items-center gap-2">
        {project.status === 'completed' ? (
          <span className="text-xs font-medium px-3 py-1 border border-emerald-500 text-emerald-500">
            Terminé
          </span>
        ) : (
          <span className="text-xs font-medium px-3 py-1 border border-[var(--color-accent)] text-[var(--color-accent)] flex items-center gap-1">
            <Clock size={12} />
            En cours
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="font-heading font-bold text-xl text-[var(--color-text-primary)]">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed flex-1">
        {project.description}
      </p>

      {/* Stack badges */}
      <div className="flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="text-xs border border-[var(--color-border)] text-[var(--color-text-secondary)] px-2 py-1"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-4 mt-auto">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300"
          >
            <GithubIcon size={16} />
            GitHub
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300"
          >
            <ExternalLink size={16} />
            Voir le site
          </a>
        )}
      </div>

    </div>
  )
}

export default ProjectCard