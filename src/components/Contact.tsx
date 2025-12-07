import React from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';

export const Contact: React.FC = () => {
    return (
        <section id="contact" className="section-padding contact-section">
            <div className="contact-glow" />

            <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                <h2 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Birlikte Çalışalım</h2>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', marginInline: 'auto' }}>
                    Aktif olarak staj ve iş fırsatlarını değerlendiriyorum. Projeler, iş birlikleri veya sorularınız için benimle iletişime geçebilirsiniz.
                </p>

                <a
                    href="mailto:hello@example.com"
                    className="btn btn-primary"
                    style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}
                >
                    <Mail size={20} />
                    Merhaba De
                </a>

                <div className="contact-socials">
                    {[
                        { icon: Github, href: "https://github.com/doganaykanbur" },
                        { icon: Linkedin, href: "https://www.linkedin.com/in/do%C4%9Fanay-kanbur-412b58253/" },
                    ].map((item, index) => (
                        <a
                            key={index}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon"
                        >
                            <item.icon size={24} />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};
