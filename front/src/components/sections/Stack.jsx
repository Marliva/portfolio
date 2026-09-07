import { motion } from 'framer-motion'
import { skillsData } from '@/data/skills'

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' }
    })
}

function Stack() {
    return (
        <section id="stack" className="py-24 px-6">
            <div className="max-w-6xl mx-auto">

                <motion.h2
                    custom={0}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="font-heading font-extrabold text-[clamp(2rem,4vw,3rem)] text-[var(--color-accent)] mb-12"
                >
                    Stack technique
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {skillsData.map((group, i) => (
                        <motion.div
                            key={group.category}
                            custom={i + 1}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            <h3 className="font-heading font-bold text-lg text-[var(--color-text-primary)] mb-6 pb-2 border-b border-[var(--color-accent)]">
                                {group.category}
                            </h3>

                            <div className="flex flex-wrap gap-3">
                                {group.skills.map((skill) => (
                                    <img
                                        key={skill.name}
                                        src={skill.badge}
                                        alt={skill.name}
                                        className="h-8"
                                    />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default Stack