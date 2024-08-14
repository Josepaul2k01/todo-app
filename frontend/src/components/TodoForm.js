// src/components/TodoForm.js
import React, { useState } from 'react';

const TodoForm = ({ onSave }) => {
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (description.trim()) {
            onSave({ description, status: 'PENDING', createdDate: new Date(), updatedDate: new Date() });
            setDescription(''); // Clear input after saving
        }
    };

    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <input
                type="text"
                placeholder="Add a new todo..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <button type="submit">Add Todo</button>
        </form>
    );
};

export default TodoForm;
