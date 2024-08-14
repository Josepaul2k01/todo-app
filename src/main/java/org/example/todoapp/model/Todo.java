package org.example.todoapp.model;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Todo {
    @Id
    private String id;
    private String description;
    private TodoStatus status;
    private Date createdDate;
    private Date updatedDate;

    public Todo(String description) {
        this.description = description;
        this.status = TodoStatus.PENDING;
        this.createdDate = new Date();
        this.updatedDate = new Date();
    }

    public enum TodoStatus {
        PENDING,
        COMPLETED
    }
}