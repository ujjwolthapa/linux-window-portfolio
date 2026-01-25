import React from 'react';
import { projectsData } from '../../data/projects';

const ProjectsWindow = () => {
  return (
    <div className="content-section">
      <h2>DevOps Projects</h2>
      {projectsData.map((project, index) => (
        <div key={index} className="project-card">
          <div className="project-title">{project.title}</div>
          <div className="project-desc">{project.description}</div>
          <div className="tags">
            {project.tags.map((tag, i) => (
              <span key={i} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsWindow;