package com.taskmanager.controller;

import com.taskmanager.dto.*;
import com.taskmanager.model.User;
import com.taskmanager.service.AuthService;
import com.taskmanager.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TaskController {

    private final TaskService taskService;
    private final AuthService authService;

    @GetMapping
    public ResponseEntity<List<TaskResponse>> getTasks(Authentication authentication) {
        User user = authService.getUserByEmail(authentication.getName());
        List<TaskResponse> tasks = taskService.getUserTasks(user);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/paginated")
    public ResponseEntity<Page<TaskResponse>> getTasksPaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication authentication) {
        User user = authService.getUserByEmail(authentication.getName());
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<TaskResponse> tasks = taskService.getUserTasksPaginated(user, pageRequest);
        return ResponseEntity.ok(tasks);
    }

    @PostMapping
    public ResponseEntity<?> createTask(
            @Valid @RequestBody TaskRequest request,
            Authentication authentication) {
        try {
            User user = authService.getUserByEmail(authentication.getName());
            TaskResponse task = taskService.createTask(request, user);
            return ResponseEntity.ok(task);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTask(
            @PathVariable Long id,
            @Valid @RequestBody TaskRequest request,
            Authentication authentication) {
        try {
            User user = authService.getUserByEmail(authentication.getName());
            TaskResponse task = taskService.updateTask(id, request, user);
            return ResponseEntity.ok(task);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(
            @PathVariable Long id,
            Authentication authentication) {
        try {
            User user = authService.getUserByEmail(authentication.getName());
            taskService.deleteTask(id, user);
            return ResponseEntity.ok(new ApiResponse(true, "Task deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
}
