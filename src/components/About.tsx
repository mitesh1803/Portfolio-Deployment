'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiCode, FiServer, FiCloud, FiTerminal } from 'react-icons/fi';
import styles from './About.module.css';

const highlights = [
  {
    icon: <FiCode size={24} />,
    title: 'Full-Stack Development',
    description: 'Learning and building web apps with React, Next.js, TypeScript, and Node.js.',
  },
  {
    icon: <FiServer size={24} />,
    title: 'DevOps Enthusiast',
    description: 'Exploring Docker, Kubernetes, CI/CD pipelines, and infrastructure automation.',
  },
  {
    icon: <FiCloud size={24} />,
    title: 'Cloud Learner',
    description: 'Getting hands-on with AWS, cloud services, and scalable architecture patterns.',
  },
  {
    icon: <FiTerminal size={24} />,
    title: 'Automation Lover',
    description: 'Scripting solutions with Bash and Python to streamline workflows.',
  },
];

const stats = [
  { value: 10, suffix: '+', label: 'Personal Projects' },
  { value: 15, suffix: '+', label: 'Technologies Learned' },
  { value: 100, suffix: '%', label: 'Curiosity & Drive' },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = value / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: 60, rotateY: 15 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: {
      delay: i * 0.15,
      type: 'spring',
      stiffness: 80,
      damping: 15,
    },
  }),
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section" id="about" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section__label">About Me</span>
          <h2 className="section__title">
            Passionate Learner &{' '}
            <span className="gradient-text">Aspiring Engineer</span>
          </h2>
        </motion.div>

        <motion.div
          className={styles.aboutGrid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div className={styles.aboutText} variants={itemVariants}>
            <p>
              I&apos;m a passionate fresher who loves building things for the web. My journey started
              with curiosity about how websites work, and it has evolved into a deep interest in
              both development and DevOps practices.
            </p>
            <p>
              I enjoy the entire process of bringing ideas to life — from designing intuitive
              interfaces with React and Next.js to exploring containerization with Docker and
              orchestration with Kubernetes. Currently seeking internship opportunities to learn,
              grow, and contribute to real-world projects.
            </p>

            <div className={styles.statsRow}>
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className={styles.stat}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -4 }}
                >
                  <span className={styles.statValue}>
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className={styles.highlights}>
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                className={`card ${styles.highlightCard}`}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                whileHover={{ scale: 1.03, x: 8 }}
              >
                <div className={styles.highlightContent}>
                  <motion.div
                    className={styles.highlightIcon}
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                  >
                    {item.icon}
                  </motion.div>
                  <div>
                    <h4 className={styles.highlightTitle}>{item.title}</h4>
                    <p className={styles.highlightDesc}>{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
