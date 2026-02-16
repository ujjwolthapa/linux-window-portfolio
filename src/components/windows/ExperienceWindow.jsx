import React from 'react';
import { experienceData } from '../../data/experience';

const ExperienceWindow = () => {
  return (
    <div className="content-section">
      <h2>Professional Experience</h2>
      {experienceData.map((exp, index) => (
        <div key={index} className="project-card">
          <div className="project-title">{exp.title}</div>
          <div className="edu-institution">{exp.company}</div>
          <div className="edu-year">{exp.period}</div>
          <div className="project-desc">
  <ul>
    {exp.description.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
</div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceWindow;