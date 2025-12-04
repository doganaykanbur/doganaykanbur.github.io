import React from 'react';
import { motion } from 'framer-motion';
import { about } from '../data/content';

export const About: React.FC = () => {
    return (
        <section id="about" className="section-padding">
            <div className="container">
                <div className="about-grid">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="about-text"
                    >
                        <h2 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Hakkımda</h2>
                        <div>
                            <p>{about.paragraph1}</p>
                            <p>{about.paragraph2}</p>
                            <p>{about.paragraph3}</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        style={{ position: 'relative' }}
                    >
                        <div className="about-visual">
                            <div style={{ textAlign: 'center', padding: '2rem' }}>
                                <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1rem' }}>👨‍💻</span>
                                <p style={{ color: 'var(--text-secondary)', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Developer</p>
                            </div>
                        </div>
                        {/* Decorative elements */}
                        <div style={{ position: 'absolute', zIndex: -1, top: '2.5rem', right: '-2.5rem', width: '100%', height: '100%', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '1rem' }} />
                        <div style={{ position: 'absolute', zIndex: -1, bottom: '-2.5rem', left: '-2.5rem', width: '100%', height: '100%', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '1rem' }} />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
