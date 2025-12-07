import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin } from 'lucide-react';

export const Hero: React.FC = () => {
    return (
        <section className="hero">
            <div className="hero-bg-blob hero-bg-blob-1" />
            <div className="hero-bg-blob hero-bg-blob-2" />

            <div className="container">
                <div className="hero-content">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="hero-badge">
                            STAJYER POZİSYONLARINA AÇIK
                        </span>
                        <h1 className="hero-title">
                            Merhaba, Ben <br />
                            <span className="text-gradient">
                                Doğanay Kanbur.
                            </span>
                        </h1>
                        <p className="hero-subtitle">
                            Kişisel portfolyo siteme hoş geldiniz. Aşağıda projelerimi ve yetkinliklerimi inceleyebilirsiniz.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="hero-cta-group"
                    >
                        <a href="#projects" className="btn btn-primary">
                            Projeleri Gör
                            <ArrowRight size={18} />
                        </a>
                        <a href="#contact" className="btn btn-secondary">
                            İletişime Geç
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="hero-socials"
                    >
                        <a href="https://github.com/doganaykanbur" target="_blank" rel="noopener noreferrer">
                            <Github size={24} />
                        </a>
                        <a href="https://www.linkedin.com/in/do%C4%9Fanay-kanbur-412b58253/" target="_blank" rel="noopener noreferrer">
                            <Linkedin size={24} />
                        </a>
                    </motion.div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="scroll-indicator"
            >
                <div className="scroll-line" />
                <span>Scroll</span>
            </motion.div>
        </section>
    );
};
