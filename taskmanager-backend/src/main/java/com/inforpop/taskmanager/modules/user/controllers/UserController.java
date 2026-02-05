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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

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

}
