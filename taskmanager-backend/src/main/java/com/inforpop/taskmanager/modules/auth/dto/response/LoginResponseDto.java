package com.inforpop.taskmanager.modules.auth.dto.response;

import com.inforpop.taskmanager.modules.user.dto.response.ResponseUserDto;

public record LoginResponseDto(
        String token,
        ResponseUserDto userDto
) {}
