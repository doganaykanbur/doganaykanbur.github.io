import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../data/content';

const SkillCategory: React.FC<{ title: string; items: string[]; context: string }> = ({ title, items, context }) => (
    <div style={{ marginBottom: '3rem' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#fff' }}>{title}</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>{context}</p>
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
                        <SkillCategory title="Diller" items={skills.languages.items} context={skills.languages.context} />
                        <SkillCategory title="Backend" items={skills.backend.items} context={skills.backend.context} />
                        <SkillCategory title="AI & ML" items={skills.ai_ml.items} context={skills.ai_ml.context} />
                    </div>
                    <div>
                        <SkillCategory title="Frontend" items={skills.frontend.items} context={skills.frontend.context} />
                        <SkillCategory title="Araçlar" items={skills.tools.items} context={skills.tools.context} />
                        <SkillCategory title="Gömülü Sistemler" items={skills.embedded.items} context={skills.embedded.context} />
                    </div>
                </div>
            </div>
        </section>
    );
};
