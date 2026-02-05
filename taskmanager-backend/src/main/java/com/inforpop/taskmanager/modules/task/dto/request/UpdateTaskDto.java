package com.inforpop.taskmanager.modules.task.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public record UpdateTaskDto(
        @Size(min = 3, message = "O título deve ter no mínimo 3 caracteries.")
        String title,
        String status,
        @Size(min = 10, message = "Adicione uma descrição de no mínimo 10 caracteries.")
        String description,
        UUID assignedUser
) {}
