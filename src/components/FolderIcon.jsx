import React from 'react';

const FolderIcon = ({ label, onClick }) => {
  return (
    <div className="folder" onDoubleClick={onClick}>
      <div className="folder-icon"></div>
      <div className="folder-label">{label}</div>
    </div>
  );
};

export default FolderIcon;