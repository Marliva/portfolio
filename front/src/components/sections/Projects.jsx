import { motion } from 'framer-motion'
import { projectsData } from '@/data/projects'
import ProjectCard from '@/components/ui/ProjectCard'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' }
  })
}

function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <motion.h2
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="font-heading font-extrabold text-[clamp(2rem,4vw,3rem)] text-[var(--color-accent)] mb-12"
        >
          Projets
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project, i) => (
            <motion.div
              key={project.id}
              custom={i + 1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="h-full"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Projects