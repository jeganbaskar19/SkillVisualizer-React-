import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { SkillsProvider } from './contexts/SkillsContext';
import Header from './components/Header';
import SkillDashboard from './components/SkillDashboard';
import './styles/App.css';

function App() {
  return (
    <ThemeProvider>
      <SkillsProvider>
        <div className="app">
          <Header />
          <main className="main-content">
            <SkillDashboard />
          </main>
        </div>
      </SkillsProvider>
    </ThemeProvider>
  );
}

export default App;
