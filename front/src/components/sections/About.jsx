import { motion } from 'framer-motion'
import { aboutData } from '@/data/about'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' }
  })
}

function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <motion.h2
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="font-heading font-extrabold text-[clamp(2rem,4vw,3rem)] text-[var(--color-accent)] mb-12"
        >
          À propos
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12">

          {/* Paragraphs */}
          <div className="flex flex-col gap-6">
            {aboutData.paragraphs.map((paragraph, i) => (
              <motion.p
                key={i}
                custom={i + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-[var(--color-text-primary)] text-lg leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {aboutData.stats.map((stat, i) => (
              <motion.div
                key={i}
                custom={i + 3}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="border-l-2 border-[var(--color-accent)] pl-4"
              >
                <p className="font-heading font-extrabold text-2xl text-[var(--color-accent)]">
                  {stat.value}
                </p>
                <p className="text-[var(--color-text-secondary)] text-sm mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

export default About