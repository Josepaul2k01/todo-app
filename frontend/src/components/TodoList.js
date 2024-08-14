// src/components/TodoList.js
import React, { useState } from 'react';

const TodoList = ({ todos, onTodoUpdate, onTodoDelete }) => {
    const [editingTodo, setEditingTodo] = useState(null);
    const [updatedDescription, setUpdatedDescription] = useState('');

    const handleEditClick = (todo) => {
        setEditingTodo(todo.id);
        setUpdatedDescription(todo.description);
    };

    const handleUpdateClick = (todo) => {
        onTodoUpdate(todo.id, { ...todo, description: updatedDescription });
        setEditingTodo(null);
    };

    const handleStatusChange = (todo) => {
        onTodoUpdate(todo.id, {
            ...todo,
            status: todo.status === 'PENDING' ? 'COMPLETED' : 'PENDING',
        });
    };

    return (
        <div className="todo-list">
            {todos.map((todo) => (
                <div key={todo.id} className="todo-item">
                    {editingTodo === todo.id ? (
                        <input
                            type="text"
                            value={updatedDescription}
                            onChange={(e) => setUpdatedDescription(e.target.value)}
                        />
                    ) : (
                        <span>{todo.description}</span>
                    )}
                    <div>
                        <span>Created: {new Date(todo.createdDate).toLocaleString()}</span>
                        <span>Updated: {new Date(todo.updatedDate).toLocaleString()}</span>
                        <span>Status: {todo.status}</span>
                    </div>
                    <div>
                        <button onClick={() => handleStatusChange(todo)}>
                            {todo.status === 'PENDING' ? 'Mark Complete' : 'Mark Pending'}
                        </button>
                        <button onClick={() => onTodoDelete(todo.id)}>Delete</button>
                        {editingTodo === todo.id ? (
                            <button onClick={() => handleUpdateClick(todo)}>Save</button>
                        ) : (
                            <button onClick={() => handleEditClick(todo)}>Edit</button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TodoList;