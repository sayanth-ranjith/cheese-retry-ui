import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { ThemeMode } from '../../types/theme';
import './ThemeToggle.css';

interface ThemeToggleProps {
  mode: ThemeMode;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ mode, onToggle }) => (
  <button
    className="theme-toggle"
    onClick={onToggle}
    aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
    title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
  >
    {mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
  </button>
);

export default ThemeToggle;
