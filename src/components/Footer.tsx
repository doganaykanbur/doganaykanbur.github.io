import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer style={{ padding: '2rem 0', borderTop: '1px solid var(--glass-border)', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            <div className="container">
                <p>&copy; {new Date().getFullYear()} Doğanay Kanbur. React & Framer Motion ile geliştirildi.</p>
            </div>
        </footer>
    );
};
