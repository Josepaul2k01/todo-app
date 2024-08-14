// src/components/ProjectForm.js
import React, { useState } from 'react';

const ProjectForm = ({ onSave }) => {
    const [title, setTitle] = useState('');
    const [todos, setTodos] = useState([{ description: '', status: 'PENDING' }]);

    const handleAddTodo = () => {
        setTodos([...todos, { description: '', status: 'PENDING' }]);
    };

    const handleTodoChange = (index, value) => {
        const newTodos = todos.slice();
        newTodos[index].description = value;
        setTodos(newTodos);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const project = { title, todos: todos.filter(todo => todo.description.trim()) };  // Only include non-empty todos
        onSave(project);
        setTitle('');
        setTodos([{ description: '', status: 'PENDING' }]);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Project Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Todos (Optional)</label>
                {todos.map((todo, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            placeholder="Todo Description"
                            value={todo.description}
                            onChange={(e) => handleTodoChange(index, e.target.value)}
                        />
                    </div>
                ))}
                <button type="button" onClick={handleAddTodo}>Add Todo</button>
            </div>
            <button type="submit">Create Project</button>
        </form>
    );
};

export default ProjectForm;
