import React from 'react';

const DesktopIcon = ({ icon, label, onClick, className = '' }) => {
  return (
    <div 
      className={`desktop-icon ${className}`} 
      onDoubleClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
    >
      <div className="icon-symbol">{icon}</div>
      <div className="icon-label">{label}</div>
    </div>
  );
};

export default DesktopIcon;