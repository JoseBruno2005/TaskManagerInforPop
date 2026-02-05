package com.inforpop.taskmanager.modules.auth.controller;

import com.inforpop.taskmanager.modules.auth.dto.request.LoginDto;
import com.inforpop.taskmanager.modules.auth.dto.response.LoginResponseDto;
import com.inforpop.taskmanager.modules.auth.service.TokenService;
import com.inforpop.taskmanager.modules.user.domain.User;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    @PostMapping("/login")
    @Operation(
            summary = "Realizar login do usuário.",
            description = "Deve retornar o token JWT."
    )
    public ResponseEntity<LoginResponseDto> login(@RequestBody @Valid LoginDto login){
        var userNamePassword = new UsernamePasswordAuthenticationToken(
                login.email(), login.password()
        );

        var auth = this.authenticationManager.authenticate(userNamePassword);

        var token = tokenService.generatedToken((User) auth.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDto(token));
    }

}
