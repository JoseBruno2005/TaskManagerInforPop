package com.inforpop.taskmanager.modules.task.controllers;

import com.inforpop.taskmanager.modules.task.dto.request.CreateTaskDto;
import com.inforpop.taskmanager.modules.task.dto.request.UpdateTaskDto;
import com.inforpop.taskmanager.modules.task.dto.response.ResponseTaskDto;
import com.inforpop.taskmanager.modules.task.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

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

    @DeleteMapping("/{id}")
    @Operation(
            summary = "Remover tarefa.",
            description = "Marca a tarefa como excluída sem removê-la fisicamente do banco de dados."
    )
    public ResponseEntity<Void> delete(
            @PathVariable UUID id
    ){
        taskService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    @Operation(
            summary = "Buscar tarefa por public_id.",
            description = "Buscar tarefa não excluída, por public_Id."
    )
    public ResponseEntity<ResponseTaskDto> findTask(
            @PathVariable UUID id
    ) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(taskService.findByPublicId(id));
    }

    @GetMapping
    @Operation(
            summary = "Listar tarefas com filtros.",
            description = "Lista tarefas não excluídas, podendo filtrar por título e status."
    )
    public ResponseEntity<List<ResponseTaskDto>> findAll(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String status
    ) {
        return ResponseEntity.ok(taskService.findAll(title, status));
    }

    @GetMapping("/my-tasks")
    @Operation(
            summary = "Listar tarefas de um User.",
            description = "Lista tarefas não excluídas associadas a um determinando usuário do tipo USER."
    )
    public ResponseEntity<List<ResponseTaskDto>> findMyAssignedTasks(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String status
    ) {
        return ResponseEntity.ok(
                taskService.findByAssignedUser(title, status)
        );
    }

    @PutMapping("/{id}")
    @Operation(
            summary = "Atualizar tarefa.",
            description = "Atualiza os dados de uma tarefa existente."
    )
    public ResponseEntity<ResponseTaskDto> update(
            @PathVariable UUID id,
            @RequestBody @Valid UpdateTaskDto updateDto
    ) {
        return ResponseEntity.ok(taskService.update(id, updateDto));
    }

}
