import React from 'react';
import { skillsData } from '../../data/skills';

const SkillsWindow = () => {
  return (
    <div className="content-section">
      <h2>Technical Skills</h2>
      {skillsData.map((category, index) => (
        <div key={index} className="skill-category">
          <h3>{category.category}</h3>
          <div className="skill-list">
            {category.skills.map((skill, i) => (
              <span key={i} className="skill-item">{skill}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsWindow;