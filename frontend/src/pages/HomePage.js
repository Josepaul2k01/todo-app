// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProjects, createProject } from '../services/apiService';
import ProjectList from '../components/ProjectList';
import ProjectForm from '../components/ProjectForm';

const HomePage = () => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadProjects = async () => {
            const projectsData = await fetchProjects();
            setProjects(projectsData);
        };
        loadProjects();
    }, []);

    const handleCreateProject = async (project) => {
        const newProject = await createProject(project);
        setProjects([...projects, newProject]);
    };

    return (
        <div>
            <h1>Project Management</h1>
            <ProjectForm onSave={handleCreateProject} />
            <ProjectList projects={projects} onSelect={(id) => navigate(`/projects/${id}`)} />
        </div>
    );
};

export default HomePage;
