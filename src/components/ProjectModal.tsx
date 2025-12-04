import React from 'react';
import { motion } from 'framer-motion';
import type { Project } from '../data/content';
import { X, Github } from 'lucide-react';

interface ProjectModalProps {
    project: Project;
    onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
    return (
        <div className="modal-overlay">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                style={{ position: 'absolute', inset: 0 }}
            />

            <motion.div
                layoutId={`card-${project.id}`}
                className="modal-content"
            >
                <button onClick={onClose} className="modal-close">
                    <X size={20} />
                </button>

                <div className="modal-hero">
                    <motion.img
                        layoutId={`image-${project.id}`}
                        src={project.imageUrl}
                        alt={project.title}
                    />
                    <div className="modal-hero-overlay" />

                    <div className="modal-title-area">
                        <motion.h2
                            layoutId={`title-${project.id}`}
                            style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}
                        >
                            {project.title}
                        </motion.h2>
                        <p style={{ fontSize: '1.125rem', color: '#d1d5db' }}>{project.summary}</p>
                    </div>
                </div>

                <div className="modal-body">
                    <div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>About the Project</h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
                            {project.description}
                        </p>

                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Key Features</h3>
                        <ul className="feature-list">
                            {project.features.map((feature, i) => (
                                <li key={i} className="feature-item">
                                    <div className="feature-dot" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div>
                            <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>Technologies</h3>
                            <div className="tech-grid">
                                {project.technologies.map((tech) => (
                                    <span key={tech} className="tag">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="link-btn link-btn-secondary"
                                >
                                    <Github size={20} />
                                    View Source
                                </a>
                            )}

                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
