'use client';

import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiHeart } from 'react-icons/fi';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <motion.a
              href="#"
              className={styles.logo}
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.05 }}
            >
              <span className={styles.logoAccent}>&lt;</span>
              Mitesh
              <span className={styles.logoAccent}>/&gt;</span>
            </motion.a>
            <p className={styles.footerDesc}>
              Aspiring Developer & DevOps Engineer, building cool things with code.
            </p>
          </div>

          <div className={styles.footerLinks}>
            <h4 className={styles.footerHeading}>Quick Links</h4>
            <nav className={styles.linkList}>
              <a href="#about" onClick={(e) => { e.preventDefault(); document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }); }}>About</a>
              <a href="#skills" onClick={(e) => { e.preventDefault(); document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' }); }}>Skills</a>
              <a href="#projects" onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}>Projects</a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>Contact</a>
            </nav>
          </div>

          <div className={styles.footerSocials}>
            <h4 className={styles.footerHeading}>Connect</h4>
            <div className={styles.socialIcons}>
              {[
                { icon: <FiGithub size={18} />, href: 'https://github.com/mitesh1803', label: 'GitHub' },
                { icon: <FiLinkedin size={18} />, href: 'https://www.linkedin.com/in/mitesh-patil-242b67258', label: 'LinkedIn' },
                { icon: <FiTwitter size={18} />, href: 'https://x.com/miteshpatil1803', label: 'X' },
              ].map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={styles.socialIcon}
                  whileHover={{ y: -4, color: '#6c63ff' }}
                  whileTap={{ scale: 0.9 }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Mitesh. Built with{' '}
            <motion.span
              style={{ display: 'inline-block', color: '#ff6b9d' }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FiHeart size={14} style={{ verticalAlign: 'middle' }} />
            </motion.span>
            {' '}using Next.js & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
