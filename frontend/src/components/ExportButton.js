// src/components/ExportButton.js
import React from 'react';

const ExportButton = ({ project }) => {
    const handleExport = () => {
        const pendingTodos = project.todos.filter(todo => todo.status === 'PENDING');
        const completedTodos = project.todos.filter(todo => todo.status === 'COMPLETED');

        const content = `# ${project.title}\n\n` +
            `**Summary**: ${completedTodos.length} / ${project.todos.length} completed\n\n` +
            `## Pending Todos\n` +
            pendingTodos.map(todo =>
                `- [ ] ${todo.description} (Created: ${new Date(todo.createdDate).toLocaleString()}, Updated: ${new Date(todo.updatedDate).toLocaleString()})`
            ).join('\n') +
            `\n\n## Completed Todos\n` +
            completedTodos.map(todo =>
                `- [x] ${todo.description} (Created: ${new Date(todo.createdDate).toLocaleString()}, Updated: ${new Date(todo.updatedDate).toLocaleString()})`
            ).join('\n');

        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${project.title.replace(/\s+/g, '_')}.md`;
        link.click();
    };

    return (
        <button onClick={handleExport}>Export Summary</button>
    );
};

export default ExportButton;
