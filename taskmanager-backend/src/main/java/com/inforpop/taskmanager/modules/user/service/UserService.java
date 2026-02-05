package com.inforpop.taskmanager.modules.user.service;

import com.inforpop.taskmanager.exceptions.ResourceConflictException;
import com.inforpop.taskmanager.modules.user.domain.User;
import com.inforpop.taskmanager.modules.user.dto.mapper.UserMapper;
import com.inforpop.taskmanager.modules.user.dto.request.CreateUserDto;
import com.inforpop.taskmanager.modules.user.dto.response.ResponseUserDto;
import com.inforpop.taskmanager.modules.user.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public ResponseUserDto save(CreateUserDto createUserDTO){

        if(userRepository.findByEmail(createUserDTO.email()) != null){
            throw new ResourceConflictException("Email já cadastrado.");
        }

        User user = userMapper.dtoCreateToEntity(createUserDTO);

        user.setPasswordHash(bCryptPasswordEncoder.encode(user.getPasswordHash()));
        user.setEnabled(true);

        return userMapper.entityToDto(userRepository.save(user));
    }
}
