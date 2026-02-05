package com.inforpop.taskmanager.modules.task.dto.response;

import com.inforpop.taskmanager.modules.user.dto.response.ResponseUserDto;
import lombok.Builder;

import java.util.UUID;

@Builder
public record ResponseTaskDto(
        UUID publicId,
        String title,
        ResponseUserDto creator,
        String status,
        String description,
        ResponseUserDto assignedUser
) {}
