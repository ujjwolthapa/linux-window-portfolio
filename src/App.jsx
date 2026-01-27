import React, { useEffect, useState } from 'react';
import TopBar from './components/TopBar';
import Desktop from './components/Desktop';
import Dock from './components/Dock';
import Window from './components/Window';
import MainWindow from './components/windows/MainWindow';
import ProjectsWindow from './components/windows/ProjectsWindow';
import SkillsWindow from './components/windows/SkillsWindow';
import QualificationsWindow from './components/windows/QualificationsWindow';
import EducationWindow from './components/windows/EducationWindow';
import ExperienceWindow from './components/windows/ExperienceWindow';
import TerminalWindow from './components/windows/TerminalWindow';
import useWindowManager from './hooks/useWindowManager';
import ContactWindow from './components/windows/ContactWindow';
import './styles/App.css';

function App() {
  const {
    activeWindows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    handleMouseDown,
    playSound
  } = useWindowManager();
  
  const [isLoading, setIsLoading] = useState(true);

  // Loading animation and sound
  useEffect(() => {
    const loadSound = async () => {
      try {
        // Play boot sound
        playSound('open');
      } catch (e) {
        console.log("Audio not available");
      }
      
      // Simulate loading time
      setTimeout(() => {
        setIsLoading(false);
        // Open main window automatically
        setTimeout(() => openWindow('main'), 500);
      }, 1500);
    };
    
    loadSound();
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-logo">∞</div>
          <div className="loading-text">SYS Admin's Portfolio</div>
          <div className="loading-progress">
            <div className="loading-bar"></div>
          </div>
          <div className="loading-subtext">Initializing  Environment...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <TopBar />
      <Desktop onOpenWindow={openWindow} />
      
      {activeWindows.map((windowState) => (
        <Window
          key={windowState.id}
          windowState={windowState}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onMaximize={maximizeWindow}
          onMouseDown={handleMouseDown}
        >
          {windowState.id === 'main' && <MainWindow onOpenWindow={openWindow} />}
          {windowState.id === 'projects' && <ProjectsWindow />}
          {windowState.id === 'skills' && <SkillsWindow />}
          {windowState.id === 'qualifications' && <QualificationsWindow />}
          {windowState.id === 'education' && <EducationWindow />}
          {windowState.id === 'experience' && <ExperienceWindow />}
          {windowState.id === 'terminal' && <TerminalWindow />}
          {windowState.id === 'contact' && <ContactWindow />}
        </Window>
      ))}

      <Dock activeWindows={activeWindows} onOpenWindow={openWindow} />
    </div>
  );
}

export default App;