package com.inforpop.taskmanager.modules.user.controllers;

import com.inforpop.taskmanager.modules.user.dto.request.CreateUserDto;
import com.inforpop.taskmanager.modules.user.dto.response.ResponseUserDto;
import com.inforpop.taskmanager.modules.user.service.UserService;
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
@RequestMapping("users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    @Operation(
            summary = "Realizar cadastro do usuário.",
            description = "Cadastrar o usuário com seus devidos atributos."
    )
    public ResponseEntity<ResponseUserDto> save(
            @RequestBody @Valid CreateUserDto createUserDto
    ){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(userService.save(createUserDto));
    }

    @GetMapping
    @Operation(
            summary = "Realizar a listagem dos usuários."
    )
    public ResponseEntity<List<ResponseUserDto>> getAll() {
        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping("/{id}")
    @Operation(
            summary = "Realizar a busca do usuário.",
            description = "Busca o usuário pelo publicId."
    )
    public ResponseEntity<ResponseUserDto> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(userService.findByPublicId(id));
    }

}
