import React from 'react';
import FolderIcon from '../FolderIcon';

const MainWindow = ({ onOpenWindow }) => {
  return (
    <div className="folder-grid">
      <FolderIcon label="Projects" onClick={() => onOpenWindow('projects')} />
      <FolderIcon label="Skills" onClick={() => onOpenWindow('skills')} />
      <FolderIcon label="Qualifications" onClick={() => onOpenWindow('qualifications')} />
      <FolderIcon label="Education" onClick={() => onOpenWindow('education')} />
      <FolderIcon label="Experience" onClick={() => onOpenWindow('experience')} />
    </div>
  );
};

export default MainWindow;