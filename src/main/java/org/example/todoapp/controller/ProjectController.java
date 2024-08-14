package org.example.todoapp.controller;

import org.example.todoapp.model.Project;
import org.example.todoapp.model.Todo;
import org.example.todoapp.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @GetMapping
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable String id) {
        Optional<Project> project = projectService.getProjectById(id);
        if (project.isPresent()) {
            return ResponseEntity.ok(project.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Project createProject(@RequestBody Project project) {
        return projectService.createProject(project);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable String id, @RequestBody Project updatedProject) {
        Project project = projectService.updateProject(id, updatedProject);
        if (project != null) {
            return ResponseEntity.ok(project);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable String id) {
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/todos")
    public ResponseEntity<Project> addTodoToProject(@PathVariable String id, @RequestBody Todo todo) {
        Project project = projectService.addTodoToProject(id, todo);
        if (project != null) {
            return ResponseEntity.ok(project);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/todos/{todoId}")
    public ResponseEntity<Project> updateTodoInProject(@PathVariable String id, @PathVariable String todoId, @RequestBody Todo updatedTodo) {
        Project project = projectService.updateTodoInProject(id, todoId, updatedTodo);
        if (project != null) {
            return ResponseEntity.ok(project);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}/todos/{todoId}")
    public ResponseEntity<Void> removeTodoFromProject(@PathVariable String id, @PathVariable String todoId) {
        projectService.removeTodoFromProject(id, todoId);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/public")
    public String publicEndpoint() {
        return "This is a public endpoint";
    }

}

