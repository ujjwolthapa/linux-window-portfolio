// src/components/Desktop.jsx
import React from 'react';
import DesktopIcon from './DesktopIcon';

const Desktop = ({ onOpenWindow }) => {
  return (
    <div className="desktop">
      <div className="desktop-icons-container">
        <DesktopIcon
          icon="∞"
          label="My Folder"
          onClick={() => onOpenWindow('main')}
        />
        
        <DesktopIcon
          icon="✉️"
          label="Contact"
          onClick={() => onOpenWindow('contact')}
        />
        
        {/* Add more icons here later if needed */}
      </div>
    </div>
  );
};

export default Desktop;