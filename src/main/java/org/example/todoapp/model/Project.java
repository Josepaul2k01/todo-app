package org.example.todoapp.model;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "projects")
public class Project {

    @Id
    private String id;
    private String title;
    private Date createdDate;
    private List<Todo> todos;

    public Project(String title) {
        this.title = title;
        this.createdDate = new Date();
    }

    public void addTodo(Todo todo) {
        if (this.todos == null) {
            this.todos = new ArrayList<>();
        }
        this.todos.add(todo);
    }
}