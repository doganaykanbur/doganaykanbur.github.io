import React from 'react';
import { motion } from 'framer-motion';
import type { Project } from '../data/content';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
    project: Project;
    onClick: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
    return (
        <motion.div
            layoutId={`card-${project.id}`}
            onClick={() => onClick(project)}
            className="project-card"
            whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
        >
            {/* Image Container */}
            <div className="project-image-container">
                <div className="project-overlay" />
                <motion.img
                    layoutId={`image-${project.id}`}
                    src={project.imageUrl}
                    alt={project.title}
                    className="project-image"
                />
            </div>

            {/* Content */}
            <div className="project-content">
                <div className="project-header">
                    <div>
                        <motion.h3
                            layoutId={`title-${project.id}`}
                            className="project-title"
                        >
                            {project.title}
                        </motion.h3>
                        <p className="project-summary">{project.summary}</p>
                    </div>
                    <div className="project-arrow">
                        <ArrowUpRight size={18} color="white" />
                    </div>
                </div>

                {/* Tags */}
                <div className="project-tags">
                    {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="tag">
                            {tech}
                        </span>
                    ))}
                    {project.technologies.length > 3 && (
                        <span className="tag" style={{ color: 'var(--text-secondary)' }}>+{project.technologies.length - 3}</span>
                    )}
                </div>
            </div>
        </motion.div>
    );
};
