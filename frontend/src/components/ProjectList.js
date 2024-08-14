// src/components/ProjectList.js
import React from 'react';

const ProjectList = ({ projects, onSelect }) => {
    return (
        <div className="list-container">
            <h2>Your Projects</h2>
            <ul>
                {projects.map((project) => (
                    <li key={project.id} className="list-item" onClick={() => onSelect(project.id)}>
                        <h3>{project.title}</h3>
                        <p>Created: {new Date(project.createdDate).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectList;