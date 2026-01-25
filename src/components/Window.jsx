import React, { useState, useEffect } from 'react';
import { X, Minimize2, Maximize2, Square, Minus } from 'lucide-react';

const Window = ({ 
  windowState, 
  children, 
  onClose, 
  onMinimize, 
  onMaximize, 
  onMouseDown 
}) => {
  const { id, position, zIndex, maximized, minimized } = windowState;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animation effect when window opens
    setIsVisible(true);
  }, []);

  if (minimized) return null;

  const windowStyle = maximized
    ? { 
        width: '100vw', 
        height: 'calc(100vh - 32px)', // Subtract top bar height
        top: '32px', // Start below top bar
        left: 0, 
        borderRadius: 0,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.95)',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }
    : {
        width: '800px',
        left: `${position.x}px`,
        top: `${position.y}px`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
      };

  const getTitle = () => {
    const titles = {
      main: 'DevOps Directory',
      projects: 'Projects',
      skills: 'Skills',
      qualifications: 'Qualifications',
      education: 'Education',
      experience: 'Experience',
      terminal: 'Terminal'
    };
    return titles[id] || 'Window';
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(id), 300);
  };

  return (
    <div className="window" style={{ ...windowStyle, zIndex }}>
      <div className="window-header" onMouseDown={(e) => onMouseDown(e, id)}>
        <div className="window-title">{getTitle()}</div>
        <div className="window-controls">
          <button 
            className="window-button minimize-btn" 
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => onMinimize(id), 300);
            }}
          >
            <Minus size={12} />
          </button>
          <button className="window-button maximize-btn" onClick={() => onMaximize(id)}>
            {maximized ? <Square size={10} /> : <Maximize2 size={12} />}
          </button>
          <button className="window-button close-btn" onClick={handleClose}>
            <X size={12} />
          </button>
        </div>
      </div>
      <div className="window-content">{children}</div>
    </div>
  );
};

export default Window;