import React from 'react';
import DesktopIcon from './DesktopIcon';

const Desktop = ({ onOpenWindow }) => {
  return (
    <div className="desktop">
      <DesktopIcon
        icon="∞"
        label="DevOps"
        onClick={() => onOpenWindow('main')}
      />
    </div>
  );
};

export default Desktop;