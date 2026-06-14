'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiSend, FiMail, FiMapPin, FiGithub, FiLinkedin, FiTwitter, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import styles from './Contact.module.css';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 15 },
  },
};

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate form submission
    setTimeout(() => {
      setStatus('success');
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 1500);
  };

  return (
    <section className="section" id="contact" ref={ref}>
      <div className={styles.bgLine} />
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section__label">Contact</span>
          <h2 className="section__title">
            Let&apos;s{' '}
            <span className="gradient-text">Connect</span>
          </h2>
          <p className="section__subtitle">
            I&apos;m actively looking for internship opportunities. Whether you have an opening
            or just want to chat about tech, feel free to reach out!
          </p>
        </motion.div>

        <motion.div
          className={styles.contactGrid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Info column */}
          <motion.div className={styles.infoCol} variants={itemVariants}>
            <div className={styles.infoCards}>
              <motion.div
                className={styles.infoCard}
                whileHover={{ x: 6, boxShadow: '0 8px 25px rgba(108, 99, 255, 0.12)' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className={styles.infoIcon} style={{ background: 'rgba(108, 99, 255, 0.1)' }}>
                  <FiMail size={20} color="#6c63ff" />
                </div>
                <div>
                  <h4 className={styles.infoTitle}>Email</h4>
                  <p className={styles.infoValue}>patilmitesh1801@gmail.com</p>
                </div>
              </motion.div>
              <motion.div
                className={styles.infoCard}
                whileHover={{ x: 6, boxShadow: '0 8px 25px rgba(0, 212, 170, 0.12)' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className={styles.infoIcon} style={{ background: 'rgba(0, 212, 170, 0.1)' }}>
                  <FiMapPin size={20} color="#00d4aa" />
                </div>
                <div>
                  <h4 className={styles.infoTitle}>Location</h4>
                  <p className={styles.infoValue}>India</p>
                </div>
              </motion.div>
            </div>

            <div className={styles.socialGrid}>
              <h4 className={styles.socialTitle}>Find me on</h4>
              <div className={styles.socialLinks}>
                {[
                  { icon: <FiGithub size={20} />, label: 'GitHub', href: 'https://github.com/mitesh1803', color: '#f0f0f5' },
                  { icon: <FiLinkedin size={20} />, label: 'LinkedIn', href: 'https://linkedin.com/in/mitesh', color: '#0077b5' },
                  { icon: <FiTwitter size={20} />, label: 'X', href: 'https://twitter.com/mitesh', color: '#1da1f2' },
                ].map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    className={styles.socialCard}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -6, scale: 1.05, borderColor: s.color }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span style={{ color: s.color }}>{s.icon}</span>
                    <span className={styles.socialLabel}>{s.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form column */}
          <motion.form
            className={styles.form}
            onSubmit={handleSubmit}
            variants={itemVariants}
          >
            <motion.div
              className={styles.formGroup}
              whileFocus={{ scale: 1.01 }}
            >
              <label className={styles.label} htmlFor="contact-name">Name</label>
              <motion.input
                id="contact-name"
                type="text"
                className={styles.input}
                placeholder="Your name"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                required
                whileFocus={{ borderColor: '#6c63ff', boxShadow: '0 0 20px rgba(108, 99, 255, 0.1)' }}
              />
            </motion.div>
            <motion.div className={styles.formGroup}>
              <label className={styles.label} htmlFor="contact-email">Email</label>
              <motion.input
                id="contact-email"
                type="email"
                className={styles.input}
                placeholder="your@email.com"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                required
                whileFocus={{ borderColor: '#6c63ff', boxShadow: '0 0 20px rgba(108, 99, 255, 0.1)' }}
              />
            </motion.div>
            <motion.div className={styles.formGroup}>
              <label className={styles.label} htmlFor="contact-message">Message</label>
              <motion.textarea
                id="contact-message"
                className={styles.textarea}
                placeholder="Hi Mitesh, I'd like to..."
                rows={5}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                required
                whileFocus={{ borderColor: '#6c63ff', boxShadow: '0 0 20px rgba(108, 99, 255, 0.1)' }}
              />
            </motion.div>
            <motion.button
              type="submit"
              className={`btn btn--primary ${styles.submitBtn}`}
              disabled={status === 'sending'}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {status === 'sending' && (
                <motion.span
                  className={styles.spinner}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              )}
              {status === 'idle' && <><FiSend size={16} /> Send Message</>}
              {status === 'sending' && 'Sending...'}
              {status === 'success' && <><FiCheckCircle size={16} /> Sent Successfully!</>}
              {status === 'error' && <><FiAlertCircle size={16} /> Try Again</>}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
