import React from 'react';
import { Folder, Terminal } from 'lucide-react';

const Dock = ({ activeWindows, onOpenWindow }) => {
  return (
    <div className="dock">
      <div
        className={`dock-icon ${activeWindows.find(w => w.id === 'main') ? 'active' : ''}`}
        onClick={() => onOpenWindow('main')}
      >
        <Folder size={24} />
      </div>
      <div 
        className={`dock-icon ${activeWindows.find(w => w.id === 'terminal') ? 'active' : ''}`}
        onClick={() => onOpenWindow('terminal')}
      >
        <Terminal size={24} />
      </div>
    </div>
  );
};

export default Dock;