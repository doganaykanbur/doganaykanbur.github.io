import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { projects, type Project } from '../data/content';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';

export const Projects: React.FC = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <section id="projects" className="section-padding">
            <div className="container">
                <div style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Seçilmiş Projeler</h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', fontSize: '1.125rem' }}>
                        Farklı teknolojiler kullanarak geliştirdiğim, teknik yetkinliklerimi yansıtan projelerim.
                    </p>
                </div>

                <div className="projects-grid">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onClick={setSelectedProject}
                        />
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};
