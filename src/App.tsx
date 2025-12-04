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

      <Navbar onOpenTerminal={() => setIsGameOpen(true)} />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />

      <GameModal
        isOpen={isGameOpen}
        onClose={() => setIsGameOpen(false)}
        onCrash={handleCrash}
      />
    </div>
  );
}

export default App;
