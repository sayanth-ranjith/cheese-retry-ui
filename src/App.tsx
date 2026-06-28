import React from 'react';
import { useTheme } from './hooks/useTheme';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import FeaturesSection from './components/sections/FeaturesSection';
import QuickStartSection from './components/sections/QuickStartSection';
import SimulatorSection from './components/sections/SimulatorSection';
import BackoffSection from './components/sections/BackoffSection';
import './styles/globals.css';

const App: React.FC = () => {
  const [theme, toggleTheme] = useTheme();

  return (
    <div data-theme={theme}>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <HeroSection theme={theme} />
        <FeaturesSection />
        <QuickStartSection theme={theme} />
        <SimulatorSection />
        <BackoffSection theme={theme} />
      </main>
      <Footer />
    </div>
  );
};

export default App;
