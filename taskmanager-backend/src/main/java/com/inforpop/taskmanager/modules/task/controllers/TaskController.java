package com.inforpop.taskmanager.modules.task.controllers;

import com.inforpop.taskmanager.modules.task.dto.request.CreateTaskDto;
import com.inforpop.taskmanager.modules.task.dto.response.ResponseTaskDto;
import com.inforpop.taskmanager.modules.task.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("task")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping("/register")
    @Operation(
            summary = "Realizar cadastro da tarefa.",
            description = "Cadastrar a tarefa com seus devidos atributos."
    )
    public ResponseEntity<ResponseTaskDto> save(
            @RequestBody @Valid CreateTaskDto createTaskDto
    ){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(taskService.save(createTaskDto));
    }

}
