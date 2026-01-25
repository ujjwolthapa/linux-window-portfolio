import React from 'react';

const DesktopIcon = ({ icon, label, onClick }) => {
  return (
    <div className="desktop-icon" onDoubleClick={onClick}>
      <div className="icon-symbol">{icon}</div>
      <div className="icon-label">{label}</div>
    </div>
  );
};

export default DesktopIcon;