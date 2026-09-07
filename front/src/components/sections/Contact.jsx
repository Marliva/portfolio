import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
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

function sanitizeInput(value) {
    return value
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
}

function Contact() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    function onSubmit(data) {
        if (data.honeypot) return

        const sanitizedData = {
            name: sanitizeInput(data.name),
            email: sanitizeInput(data.email),
            message: sanitizeInput(data.message),
        }

        // TODO: envoyer sanitizedData à l'API Laravel via Axios
        console.log('Données prêtes à envoyer :', sanitizedData)
        reset()
    }

    return (
        <section id="contact" className="py-24 px-6">
            <div className="max-w-2xl mx-auto">

                <motion.h2
                    custom={0}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="font-heading font-extrabold text-[clamp(2rem,4vw,3rem)] text-[var(--color-accent)] mb-6"
                >
                    Contact
                </motion.h2>

                <motion.p
                    custom={1}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="text-[var(--color-text-secondary)] text-lg leading-relaxed mb-12"
                >
                    Un projet, une opportunité, ou simplement envie d'échanger ? N'hésitez pas à me contacter.
                </motion.p>

                <motion.form
                    custom={2}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-6"
                >

                    {/* Honeypot — invisible pour l'utilisateur, piège pour les bots */}
                    <input
                        type="text"
                        {...register('honeypot')}
                        style={{ display: 'none' }}
                        tabIndex={-1}
                        autoComplete="off"
                    />

                    {/* Name */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-[var(--color-text-secondary)]">
                            Nom
                        </label>
                        <input
                            {...register('name', {
                                required: 'Le nom est requis',
                                minLength: { value: 2, message: 'Le nom doit faire au moins 2 caractères' },
                                maxLength: { value: 100, message: 'Le nom ne peut pas dépasser 100 caractères' },
                                pattern: { value: /^[a-zA-ZÀ-ÿ\s\-']+$/, message: 'Le nom contient des caractères invalides' }
                            })}
                            className="bg-transparent border border-[var(--color-border)] text-[var(--color-text-primary)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors duration-300"
                            placeholder="Votre nom"
                            autoComplete="name"
                        />
                        {errors.name && (
                            <span className="text-red-500 text-xs">{errors.name.message}</span>
                        )}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-[var(--color-text-secondary)]">
                            Email
                        </label>
                        <input
                            {...register('email', {
                                required: "L'email est requis",
                                maxLength: { value: 254, message: "L'email ne peut pas dépasser 254 caractères" },
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "L'email n'est pas valide"
                                }
                            })}
                            className="bg-transparent border border-[var(--color-border)] text-[var(--color-text-primary)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors duration-300"
                            placeholder="votre@email.com"
                            autoComplete="email"
                        />
                        {errors.email && (
                            <span className="text-red-500 text-xs">{errors.email.message}</span>
                        )}
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-[var(--color-text-secondary)]">
                            Message
                        </label>
                        <textarea
                            {...register('message', {
                                required: 'Le message est requis',
                                minLength: { value: 10, message: 'Le message doit faire au moins 10 caractères' },
                                maxLength: { value: 2000, message: 'Le message ne peut pas dépasser 2000 caractères' }
                            })}
                            className="bg-transparent border border-[var(--color-border)] text-[var(--color-text-primary)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)] transition-colors duration-300 resize-none"
                            placeholder="Votre message..."
                            rows={6}
                        />
                        {errors.message && (
                            <span className="text-red-500 text-xs">{errors.message.message}</span>
                        )}
                    </div>

                    {/* Captcha placeholder — sera remplacé par reCAPTCHA ou hCaptcha */}
                    <div id="captcha-placeholder" className="text-[var(--color-text-secondary)] text-xs border border-dashed border-[var(--color-border)] px-4 py-3">
                        Captcha à intégrer lors du branchement avec le back-end
                    </div>

                    <button
                        type="submit"
                        className="bg-[var(--color-accent)] hover:bg-transparent text-white hover:text-[var(--color-accent)] border border-[var(--color-accent)] font-heading font-semibold text-sm tracking-widest uppercase px-10 py-4 transition-colors duration-300 w-fit"
                    >
                        Envoyer
                    </button>

                </motion.form>

                {/* Links */}
                <motion.div
                    custom={3}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="flex gap-6 mt-16"
                >
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
                </motion.div>

            </div>
        </section>
    )
}

export default Contact