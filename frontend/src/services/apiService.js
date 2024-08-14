// src/services/apiService.js
import { getAuthHeader } from './authService';

export const fetchProjects = async () => {
    const response = await fetch('/api/projects', {
        headers: getAuthHeader(),
    });
    if (!response.ok) {
        throw new Error('Failed to fetch projects');
    }
    return response.json();
};

export const fetchProjectById = async (id) => {
    const response = await fetch(`/api/projects/${id}`, {
        headers: getAuthHeader(),
    });
    if (!response.ok) {
        throw new Error('Failed to fetch project by ID');
    }
    return response.json();
};

export const createProject = async (project) => {
    const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader(),
        },
        body: JSON.stringify(project),
    });
    if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Error creating project:', errorMessage);
        throw new Error('Failed to create project');
    }
    return response.json();
};

export const updateProject = async (id, project) => {
    const response = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader(),
        },
        body: JSON.stringify(project),
    });
    if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Error updating project:', errorMessage);
        throw new Error('Failed to update project');
    }
    return response.json();
};

export const deleteProject = async (id) => {
    const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: getAuthHeader(),
    });
    if (!response.ok) {
        throw new Error('Failed to delete project');
    }
};

export const addTodoToProject = async (projectId, todo) => {
    const response = await fetch(`/api/projects/${projectId}/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader(),
        },
        body: JSON.stringify(todo),
    });
    if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Error adding todo:', errorMessage);
        throw new Error('Failed to add todo to project');
    }
    return response.json(); // This should return the entire updated project
};

export const updateTodoInProject = async (projectId, todoId, updatedTodo) => {
    const response = await fetch(`/api/projects/${projectId}/todos/${todoId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader(),
        },
        body: JSON.stringify(updatedTodo),
    });
    if (!response.ok) {
        throw new Error('Failed to update todo in project');
    }
    return response.json();
};

export const removeTodoFromProject = async (projectId, todoId) => {
    const response = await fetch(`/api/projects/${projectId}/todos/${todoId}`, {
        method: 'DELETE',
        headers: getAuthHeader(),
    });

    if (!response.ok) {
        throw new Error('Failed to remove todo from project');
    }

    // Handle cases where the response is empty (e.g., a 204 No Content response)
    if (response.status === 204) {
        return; // No content, so nothing to return
    }

    return response.json(); // This will only be called if the response has JSON data
};
