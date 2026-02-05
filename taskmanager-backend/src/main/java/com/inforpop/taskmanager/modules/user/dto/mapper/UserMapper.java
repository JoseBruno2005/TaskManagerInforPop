package com.inforpop.taskmanager.modules.user.dto.mapper;

import com.inforpop.taskmanager.modules.user.domain.User;
import com.inforpop.taskmanager.modules.user.dto.request.CreateUserDto;
import com.inforpop.taskmanager.modules.user.dto.response.ResponseUserDto;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User dtoCreateToEntity(CreateUserDto createUserDto){
        return User.builder()
                .email(createUserDto.email())
                .passwordHash(createUserDto.password())
                .name(createUserDto.name())
                .role(createUserDto.role())
                .build();
    }

    public ResponseUserDto entityToDto(User user){
        return ResponseUserDto.builder()
                .publicId(user.getPublic_id())
                .name(user.getName())
                .role(user.getRole().toString())
                .build();
    }

}
