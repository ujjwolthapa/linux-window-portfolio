import React from 'react';
import { qualificationsData } from '../../data/qualifications';

const QualificationsWindow = () => {
  return (
    <div className="content-section">
      <h2>Certifications & Training</h2>
      {qualificationsData.map((qual, index) => (
        <div key={index} className="qual-item">
          <div className="qual-title">{qual.title}</div>
          <div className="qual-issuer">{qual.issuer}</div>
          <div className="edu-year">{qual.year}</div>
        </div>
      ))}
    </div>
  );
};

export default QualificationsWindow;