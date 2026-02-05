package com.inforpop.taskmanager.modules.user.dto.response;

import lombok.Builder;

import java.util.UUID;

@Builder
public record ResponseUserDto(
        UUID publicId,
        String name,
        String role
) {}
