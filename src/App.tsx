import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { GameModal } from './components/GameModal';
import { Terminal } from 'lucide-react';

function App() {
  const [isGameOpen, setIsGameOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)', color: 'white' }}>
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />

      {/* Game Trigger */}
      <button
        className="game-trigger"
        onClick={() => setIsGameOpen(true)}
        title="Mini CLI Challenge"
      >
        <Terminal size={24} />
      </button>

      <GameModal isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} />
    </div>
  );
}

export default App;
