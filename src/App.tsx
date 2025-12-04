import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { GameModal } from './components/GameModal';
import { CrashOverlay } from './components/CrashOverlay';
import { Terminal } from 'lucide-react';

function App() {
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [isCrashed, setIsCrashed] = useState(false);

  const handleCrash = () => {
    setIsCrashed(true);
    document.body.classList.add('broken-site');
  };

  const handleRepair = () => {
    setIsCrashed(false);
    document.body.classList.remove('broken-site');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)', color: 'white' }}>
      {isCrashed && <CrashOverlay onRepair={handleRepair} />}

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
        aria-label="Open CLI Game"
      >
        <Terminal size={24} />
      </button>

      <GameModal
        isOpen={isGameOpen}
        onClose={() => setIsGameOpen(false)}
        onCrash={handleCrash}
      />
    </div>
  );
}

export default App;
