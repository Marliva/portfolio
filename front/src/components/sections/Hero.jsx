import { motion } from 'framer-motion'
import GithubIcon from '@/components/ui/icons/GithubIcon'
import LinkedinIcon from '@/components/ui/icons/LinkedinIcon'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' }
  })
}

function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl w-full">

        <motion.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-heading font-extrabold text-sm tracking-widest uppercase text-[var(--color-accent)] mb-8"
        >
          Développeur web full-stack
        </motion.p>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-heading font-extrabold text-[clamp(2rem,5vw,4rem)] text-[var(--color-text-primary)] leading-tight mb-10"
        >
          <span className="block">Cédric</span>
          <span className="block">Levasseur</span>
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-[var(--color-text-primary)] text-lg leading-relaxed mb-6 max-w-2xl"
        >
          J'ai choisi de tout recommencer pour faire quelque chose qui me passionne vraiment. Chaque projet est une nouvelle occasion d'aller plus loin.
        </motion.p>

        <motion.p
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-[var(--color-text-secondary)] text-base leading-relaxed italic mb-16 max-w-2xl"
        >
          I chose to start over to do something I'm truly passionate about. Every project is a new opportunity to go further.
        </motion.p>

        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex items-center gap-10 flex-wrap"
        >
          <a
            href="#projects"
            className="bg-[var(--color-accent)] hover:bg-transparent text-white hover:text-[var(--color-accent)] border border-[var(--color-accent)] font-heading font-semibold text-sm tracking-widest uppercase px-10 py-4 transition-colors duration-300 whitespace-nowrap"
          >
            Voir mes projets
          </a>

          <div className="flex gap-8">
            <a
              href="https://github.com/Marliva"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300"
            >
              <GithubIcon size={24} />
            </a>
            <a
              href="https://linkedin.com/in/c-levasseur76/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300"
            >
              <LinkedinIcon size={24} />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default Hero