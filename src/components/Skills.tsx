'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiNodedotjs,
  SiPython, SiDocker, SiKubernetes, SiTerraform, SiAnsible,
  SiJenkins, SiGithubactions, SiLinux,
  SiNginx, SiPostgresql, SiMongodb, SiRedis, SiGit,
  SiPrometheus, SiGrafana
} from 'react-icons/si';
import { FiCloud } from 'react-icons/fi';
import styles from './Skills.module.css';

const skillCategories = [
  {
    title: 'Frontend',
    color: '#6c63ff',
    skills: [
      { name: 'React', icon: <SiReact />, level: 85 },
      { name: 'Next.js', icon: <SiNextdotjs />, level: 80 },
      { name: 'TypeScript', icon: <SiTypescript />, level: 80 },
      { name: 'JavaScript', icon: <SiJavascript />, level: 90 },
    ],
  },
  {
    title: 'Backend',
    color: '#00d4aa',
    skills: [
      { name: 'Node.js', icon: <SiNodedotjs />, level: 80 },
      { name: 'Python', icon: <SiPython />, level: 70 },
      { name: 'PostgreSQL', icon: <SiPostgresql />, level: 70 },
      { name: 'MongoDB', icon: <SiMongodb />, level: 75 },
      { name: 'Redis', icon: <SiRedis />, level: 60 },
    ],
  },
  {
    title: 'DevOps',
    color: '#ff6b9d',
    skills: [
      { name: 'Docker', icon: <SiDocker />, level: 80 },
      { name: 'Kubernetes', icon: <SiKubernetes />, level: 65 },
      { name: 'AWS', icon: <FiCloud />, level: 70 },
      { name: 'Terraform', icon: <SiTerraform />, level: 60 },
      { name: 'Linux', icon: <SiLinux />, level: 85 },
      { name: 'Nginx', icon: <SiNginx />, level: 70 },
    ],
  },
  {
    title: 'CI/CD & Tools',
    color: '#ffbd2e',
    skills: [
      { name: 'Git', icon: <SiGit />, level: 90 },
      { name: 'GitHub Actions', icon: <SiGithubactions />, level: 75 },
      { name: 'Jenkins', icon: <SiJenkins />, level: 60 },
      { name: 'Ansible', icon: <SiAnsible />, level: 55 },
      { name: 'Prometheus', icon: <SiPrometheus />, level: 50 },
      { name: 'Grafana', icon: <SiGrafana />, level: 55 },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section" id="skills" ref={ref}>
      <div className={styles.bgAccent} />
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section__label">Skills</span>
          <h2 className="section__title">
            Technologies I{' '}
            <span className="gradient-text">Work With</span>
          </h2>
          <p className="section__subtitle">
            My toolkit spans across the full development lifecycle — from crafting UIs to managing
            cloud infrastructure.
          </p>
        </motion.div>

        <motion.div
          className={styles.skillsGrid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {skillCategories.map((cat) => (
            <motion.div
              key={cat.title}
              className={`card ${styles.categoryCard}`}
              variants={cardVariants}
              whileHover={{ y: -8 }}
            >
              <div className={styles.categoryHeader}>
                <span
                  className={styles.categoryDot}
                  style={{ background: cat.color, boxShadow: `0 0 12px ${cat.color}40` }}
                />
                <h3 className={styles.categoryTitle}>{cat.title}</h3>
              </div>
              <div className={styles.skillsList}>
                {cat.skills.map((skill, j) => (
                  <motion.div
                    key={skill.name}
                    className={styles.skillItem}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: j * 0.08 + 0.3 }}
                  >
                    <div className={styles.skillInfo}>
                      <motion.span
                        className={styles.skillIcon}
                        whileHover={{ scale: 1.3, rotate: 15 }}
                        style={{ color: cat.color }}
                      >
                        {skill.icon}
                      </motion.span>
                      <span className={styles.skillName}>{skill.name}</span>
                      <span className={styles.skillLevel}>{skill.level}%</span>
                    </div>
                    <div className={styles.skillBar}>
                      <motion.div
                        className={styles.skillBarFill}
                        style={{ background: cat.color }}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ delay: j * 0.1 + 0.5, duration: 1, ease: 'easeOut' }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
