// src/pages/ProjectPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProjectById, deleteProject, removeTodoFromProject, updateTodoInProject, addTodoToProject } from '../services/apiService';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import ExportButton from '../components/ExportButton';

const ProjectPage = () => {
    const { id } = useParams(); // Project ID from the URL
    const [project, setProject] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadProject = async () => {
            try {
                const projectData = await fetchProjectById(id);
                setProject(projectData);
            } catch (error) {
                console.error('Error loading project:', error);
            }
        };
        loadProject();
    }, [id]);

    // Function to handle adding a new todo
    const handleAddTodo = async (newTodo) => {
        try {
            const updatedProject = await addTodoToProject(id, newTodo);
            setProject(updatedProject); // Use the entire updated project returned from the API
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    // Function to handle updating a todo
    const handleUpdateTodo = async (todoId, updatedTodo) => {
        try {
            const updatedProject = await updateTodoInProject(id, todoId, updatedTodo);
            setProject(prevProject => ({
                ...prevProject,
                todos: prevProject.todos.map(todo =>
                    todo.id === todoId ? updatedTodo : todo
                )
            }));
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };


    // Function to handle deleting a todo
// src/pages/ProjectPage.js
    const handleDeleteTodo = async (todoId) => {
        try {
            await removeTodoFromProject(id, todoId); // No need to assign a return value since it's a delete operation
            // Update the project state to remove the deleted todo locally
            setProject(prevProject => ({
                ...prevProject,
                todos: prevProject.todos.filter(todo => todo.id !== todoId)
            }));
        } catch (error) {
            console.error('Error removing todo:', error);
        }
    };


    // Function to handle deleting the entire project
    const handleDeleteProject = async () => {
        try {
            await deleteProject(id);
            navigate('/home');
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    if (!project) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{project.title}</h1>
            <p>Created Date: {new Date(project.createdDate).toLocaleString()}</p>
            <button onClick={handleDeleteProject}>Delete Project</button>
            <TodoForm onSave={handleAddTodo} /> {/* Pass the handler to TodoForm */}
            <TodoList
                todos={project.todos || []}
                onTodoUpdate={handleUpdateTodo}
                onTodoDelete={handleDeleteTodo}
            />
            <ExportButton project={project} />
            <button onClick={() => navigate('/home')}>Back to Projects</button>
        </div>
    );
};

export default ProjectPage;
