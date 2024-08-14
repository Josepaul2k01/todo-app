package org.example.todoapp.service;


import org.example.todoapp.model.Project;
import org.example.todoapp.model.Todo;
import org.example.todoapp.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Optional<Project> getProjectById(String id) {
        return projectRepository.findById(id);
    }


    public Project createProject(Project project) {
        project.setCreatedDate(new Date());
        if (project.getTodos() != null) {
            for (Todo todo : project.getTodos()) {
                todo.setId(UUID.randomUUID().toString());
                todo.setCreatedDate(new Date());
                todo.setUpdatedDate(new Date());
                if (todo.getStatus() == null) {
                    todo.setStatus(Todo.TodoStatus.PENDING);
                }
            }
        }
        return projectRepository.save(project);
    }

    public Project updateProject(String id, Project updatedProject) {
        Optional<Project> existingProject = projectRepository.findById(id);
        if (existingProject.isPresent()) {
            Project project = existingProject.get();
            project.setTitle(updatedProject.getTitle());
            return projectRepository.save(project);
        }
        return null;
    }

    public void deleteProject(String id) {
        projectRepository.deleteById(id);
    }

    public Project addTodoToProject(String projectId, Todo todo) {
        Optional<Project> existingProject = projectRepository.findById(projectId);
        if (existingProject.isPresent()) {
            Project project = existingProject.get();
            todo.setId(UUID.randomUUID().toString()); // Ensure a unique ID is generated
            todo.setCreatedDate(new Date());
            todo.setUpdatedDate(new Date());
            project.getTodos().add(todo);
            return projectRepository.save(project);
        }
        return null;
    }


    public Project updateTodoInProject(String projectId, String todoId, Todo updatedTodo) {
        Optional<Project> existingProject = projectRepository.findById(projectId);
        if (existingProject.isPresent()) {
            Project project = existingProject.get();
            List<Todo> todos = project.getTodos();
            for (Todo todo : todos) {
                if (todo.getId().equals(todoId)) {
                    todo.setDescription(updatedTodo.getDescription());
                    todo.setStatus(updatedTodo.getStatus());
                    todo.setUpdatedDate(new Date());
                    break;
                }
            }
            return projectRepository.save(project);
        }
        return null;
    }

    public void removeTodoFromProject(String projectId, String todoId) {
        Optional<Project> existingProject = projectRepository.findById(projectId);
        if (existingProject.isPresent()) {
            Project project = existingProject.get();
            project.getTodos().removeIf(todo -> todo.getId().equals(todoId));
            projectRepository.save(project);
        }
    }

}
