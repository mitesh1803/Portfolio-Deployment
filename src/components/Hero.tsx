'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowDown, FiCloud } from 'react-icons/fi';
import { SiDocker, SiKubernetes, SiReact, SiNextdotjs, SiTerraform } from 'react-icons/si';
import styles from './Hero.module.css';

const roles = [
  'Full-Stack Developer',
  'DevOps Enthusiast',
  'Cloud Learner',
  'Open Source Contributor',
];

const floatingIcons = [
  { icon: <SiReact size={28} />, delay: 0, duration: 6, x: '10%', y: '20%' },
  { icon: <SiDocker size={24} />, delay: 1, duration: 7, x: '80%', y: '15%' },
  { icon: <SiKubernetes size={26} />, delay: 2, duration: 8, x: '70%', y: '75%' },
  { icon: <SiNextdotjs size={22} />, delay: 0.5, duration: 5, x: '15%', y: '70%' },
  { icon: <SiTerraform size={24} />, delay: 1.5, duration: 6.5, x: '85%', y: '50%' },
  { icon: <FiCloud size={22} />, delay: 3, duration: 7.5, x: '50%', y: '85%' },
];

const titleText = 'Mitesh';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const typeSpeed = isDeleting ? 40 : 80;

  const tick = useCallback(() => {
    const currentRole = roles[roleIndex];
    if (!isDeleting) {
      setDisplayText(currentRole.substring(0, displayText.length + 1));
      if (displayText === currentRole) {
        setTimeout(() => setIsDeleting(true), 2000);
        return;
      }
    } else {
      setDisplayText(currentRole.substring(0, displayText.length - 1));
      if (displayText === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
        return;
      }
    }
  }, [displayText, isDeleting, roleIndex]);

  useEffect(() => {
    const timer = setTimeout(tick, typeSpeed);
    return () => clearTimeout(timer);
  }, [tick, typeSpeed]);

  return (
    <section className={styles.hero} id="hero" ref={ref}>
      {/* Background effects */}
      <div className={styles.bgGradient} />
      <div className={styles.gridOverlay} />

      {/* Animated blobs */}
      <motion.div className={`${styles.blob} ${styles.blob1}`} style={{ y }} />
      <motion.div className={`${styles.blob} ${styles.blob2}`} style={{ y }} />
      <motion.div className={`${styles.blob} ${styles.blob3}`} style={{ y }} />

      {/* Floating tech icons */}
      {floatingIcons.map((item, i) => (
        <motion.div
          key={i}
          className={styles.floatingIcon}
          style={{ left: item.x, top: item.y }}
          animate={{
            y: [0, -25, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {item.icon}
        </motion.div>
      ))}

      <motion.div className={styles.content} style={{ y, opacity, scale }}>
        {/* Status badge */}
        <motion.div
          className={styles.statusBadge}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        >
          <span className={styles.statusDot} />
          Looking for Internships
        </motion.div>

        {/* Animated title — letter by letter */}
        <h1 className={styles.title}>
          <motion.span
            className={styles.greeting}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            Hi, I&apos;m
          </motion.span>
          <span className={styles.name}>
            {titleText.split('').map((char, i) => (
              <motion.span
                key={i}
                className={`gradient-text ${styles.letter}`}
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  delay: 0.6 + i * 0.08,
                  type: 'spring',
                  stiffness: 150,
                  damping: 12,
                }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Typewriter subtitle */}
        <motion.div
          className={styles.typewriter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className={styles.typewriterText}>{displayText}</span>
          <span className={styles.typewriterCursor}>|</span>
        </motion.div>

        {/* Description */}
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          Passionate fresher building modern web applications and learning DevOps practices.
          Eager to bring ideas to life with clean code and robust infrastructure.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className={styles.ctas}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
        >
          <motion.a
            href="#projects"
            className="btn btn--primary"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
            <FiArrowDown />
          </motion.a>
          <motion.a
            href="#contact"
            className="btn btn--secondary"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>
        </motion.div>

        {/* Social links */}
        <motion.div
          className={styles.socials}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          {[
            { icon: <FiGithub size={20} />, href: 'https://github.com/mitesh1803', label: 'GitHub' },
            { icon: <FiLinkedin size={20} />, href: 'https://www.linkedin.com/in/mitesh-patil-242b67258', label: 'LinkedIn' },
            { icon: <FiMail size={20} />, href: 'mailto:patilmitesh1801@gmail.com', label: 'Email' },
          ].map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.3 + i * 0.15 }}
              whileHover={{ y: -4, scale: 1.15, color: '#6c63ff' }}
              whileTap={{ scale: 0.9 }}
            >
              {s.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Terminal snippet */}
        <motion.div
          className={styles.terminal}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 2.0, duration: 0.6, type: 'spring' }}
        >
          <div className={styles.terminalHeader}>
            <span className={styles.terminalDot} style={{ background: '#ff5f57' }} />
            <span className={styles.terminalDot} style={{ background: '#ffbd2e' }} />
            <span className={styles.terminalDot} style={{ background: '#28c840' }} />
            <span className={styles.terminalTitle}>~/ portfolio</span>
          </div>
          <div className={styles.terminalBody}>
            <span className={styles.terminalPrompt}>$</span>
            <span className={styles.terminalCmd}> whoami</span>
            <br />
            <span className={styles.terminalOutput}>Fresher | Aspiring Developer | DevOps Enthusiast</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
      >
        <motion.div
          className={styles.scrollText}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span>Scroll Down</span>
          <FiArrowDown size={14} />
        </motion.div>
        <motion.div
          className={styles.scrollLine}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
