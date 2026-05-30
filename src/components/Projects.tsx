'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import { FiGithub, FiExternalLink, FiFolder } from 'react-icons/fi';
import styles from './Projects.module.css';

const projects = [
  {
    title: 'Cloud Deploy Platform',
    description: 'A self-hosted PaaS built with Docker that automates containerized app deployments with CI/CD pipeline integration.',
    tags: ['Docker', 'Node.js', 'GitHub Actions', 'Nginx'],
    category: 'devops',
    emoji: '🚀',
    github: '#',
    live: '#',
    color: '#6c63ff',
  },
  {
    title: 'DevChat — Real-Time Messenger',
    description: 'Full-stack chat app with WebSocket-based real-time messaging, auth, typing indicators, and file sharing.',
    tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    category: 'fullstack',
    emoji: '💬',
    github: '#',
    live: '#',
    color: '#00d4aa',
  },
  {
    title: 'InfraWatch Dashboard',
    description: 'Server monitoring dashboard with Prometheus metrics visualization, alerting, and resource tracking.',
    tags: ['React', 'Grafana', 'Prometheus', 'Docker'],
    category: 'devops',
    emoji: '📊',
    github: '#',
    color: '#ff6b9d',
  },
  {
    title: 'TaskFlow — Project Manager',
    description: 'Kanban-style project management tool with drag-and-drop, team collaboration, and sprint tracking.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma'],
    category: 'fullstack',
    emoji: '📋',
    github: '#',
    live: '#',
    color: '#ffbd2e',
  },
  {
    title: 'K8s Cluster Provisioner',
    description: 'Terraform + Ansible automation for spinning up production-ready Kubernetes clusters on AWS.',
    tags: ['Terraform', 'Ansible', 'AWS', 'Kubernetes'],
    category: 'devops',
    emoji: '⚙️',
    github: '#',
    color: '#6c63ff',
  },
  {
    title: 'Portfolio Website',
    description: 'This very site! Built with Next.js, Framer Motion, and CSS modules. Performance-optimized and fully responsive.',
    tags: ['Next.js', 'Framer Motion', 'TypeScript', 'CSS Modules'],
    category: 'fullstack',
    emoji: '🌐',
    github: '#',
    live: '#',
    color: '#00d4aa',
  },
];

const filters = ['All', 'Full-Stack', 'DevOps'];

function TiltCard({ children, color }: { children: React.ReactNode; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
        boxShadow: `0 8px 30px ${color}10`,
      }}
      whileHover={{
        boxShadow: `0 20px 60px ${color}20`,
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const filtered = projects.filter((p) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Full-Stack') return p.category === 'fullstack';
    return p.category === 'devops';
  });

  return (
    <section className="section" id="projects" ref={ref}>
      <div className={styles.bgLine} />
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section__label">Projects</span>
          <h2 className="section__title">
            Things I&apos;ve{' '}
            <span className="gradient-text">Built</span>
          </h2>
          <p className="section__subtitle">
            A collection of projects that showcase my skills in full-stack development and DevOps.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className={styles.filters}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          {filters.map((f) => (
            <motion.button
              key={f}
              className={`${styles.filterBtn} ${activeFilter === f ? styles.filterActive : ''}`}
              onClick={() => setActiveFilter(f)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {f}
              {activeFilter === f && (
                <motion.span className={styles.filterIndicator} layoutId="filterIndicator" />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Project grid */}
        <motion.div className={styles.projectGrid} layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -30 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                <TiltCard color={project.color}>
                  <div className={`card ${styles.projectCard}`}>
                    {/* Header */}
                    <div className={styles.projectHeader}>
                      <motion.span
                        className={styles.projectEmoji}
                        whileHover={{ scale: 1.3, rotate: 15 }}
                      >
                        {project.emoji}
                      </motion.span>
                      <div className={styles.projectLinks}>
                        {project.github && (
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.projectLink}
                            whileHover={{ scale: 1.15, y: -2, color: '#6c63ff' }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <FiGithub size={18} />
                          </motion.a>
                        )}
                        {project.live && (
                          <motion.a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.projectLink}
                            whileHover={{ scale: 1.15, y: -2, color: '#00d4aa' }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <FiExternalLink size={18} />
                          </motion.a>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className={styles.projectContent}>
                      <div className={styles.projectFolder}>
                        <FiFolder size={16} style={{ color: project.color }} />
                      </div>
                      <h3 className={styles.projectTitle}>{project.title}</h3>
                      <p className={styles.projectDesc}>{project.description}</p>
                    </div>

                    {/* Tags */}
                    <div className={styles.projectTags}>
                      {project.tags.map((tag, i) => (
                        <motion.span
                          key={tag}
                          className="tag"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 + 0.2 }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
