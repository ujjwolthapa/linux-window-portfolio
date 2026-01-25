import React from 'react';
import { educationData } from '../../data/education';

const EducationWindow = () => {
  return (
    <div className="content-section">
      <h2>Academic Background</h2>
      {educationData.map((edu, index) => (
        <div key={index} className="edu-item">
          <div className="edu-title">{edu.degree}</div>
          <div className="edu-institution">{edu.institution}</div>
          <div className="edu-year">{edu.year}</div>
        </div>
      ))}
    </div>
  );
};

export default EducationWindow;