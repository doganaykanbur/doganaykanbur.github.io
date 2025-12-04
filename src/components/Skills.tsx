import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../data/content';

const SkillCategory: React.FC<{ title: string; items: string[] }> = ({ title, items }) => (
    <div style={{ marginBottom: '3rem' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: '#d1d5db' }}>{title}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {items.map((skill, index) => (
                <motion.div
                    key={skill}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="skill-tag"
                >
                    {skill}
                </motion.div>
            ))}
        </div>
    </div>
);

export const Skills: React.FC = () => {
    return (
        <section id="skills" className="section-padding" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <div className="container">
                <div style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Teknik Yetenekler</h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', fontSize: '1.125rem' }}>
                        Projelerimde aktif olarak kullandığım teknoloji yığınları.
                    </p>
                </div>

                <div className="skills-grid">
                    <div>
                        <SkillCategory title="Diller" items={skills.languages} />
                        <SkillCategory title="Backend" items={skills.backend} />
                        <SkillCategory title="AI & ML" items={skills.ai_ml} />
                    </div>
                    <div>
                        <SkillCategory title="Frontend" items={skills.frontend} />
                        <SkillCategory title="Araçlar" items={skills.tools} />
                        <SkillCategory title="Gömülü Sistemler" items={skills.embedded} />
                    </div>
                </div>
            </div>
        </section>
    );
};
