package com.inforpop.taskmanager.modules.user.service;

import com.inforpop.taskmanager.exceptions.ResourceConflictException;
import com.inforpop.taskmanager.modules.user.domain.User;
import com.inforpop.taskmanager.modules.user.dto.mapper.UserMapper;
import com.inforpop.taskmanager.modules.user.dto.request.CreateUserDto;
import com.inforpop.taskmanager.modules.user.dto.response.ResponseUserDto;
import com.inforpop.taskmanager.modules.user.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.management.RuntimeErrorException;
import java.util.List;
import java.util.UUID;

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

    public User getUserByPublicId(UUID public_id){
        return userRepository.findByPublic_id(public_id).orElseThrow(
                () -> new RuntimeException("Usuário não encontrado para id:")
        );
    }

    public List<ResponseUserDto> findAll(){
        return userRepository.findAll()
                .stream()
                .map(userMapper::entityToDto)
                .toList();
    }

    public ResponseUserDto findByPublicId(UUID publicId) {
        User user = userRepository.findByPublic_id(publicId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));

        return userMapper.entityToDto(user);
    }

    public User getAuthenticatedUser(){
        return (User) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
    }
}
