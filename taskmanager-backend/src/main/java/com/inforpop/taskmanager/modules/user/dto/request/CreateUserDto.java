package com.inforpop.taskmanager.modules.user.dto.request;

import com.inforpop.taskmanager.modules.user.domain.Role;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;

public record CreateUserDto(
        @NotBlank(message = "Email é obrigatório.")
        @Email(message = "Email inválido.")
        @Schema(
                description = "Email do usuário.",
                example = "User123@gmail.com"
        )
        String email,
        @NotBlank(message = "Senha é obrigatória.")
        @Size(min = 8, message = "A senha deve ter no mínimo 8 caracteres.")
        @Pattern(
                regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=!]).*$",
                message = "A senha deve conter letra maiúscula, minúscula, " +
                        "número e caractere especial."
        )
        @Schema(
                description = "Senha do usuário.",
                example = "user@123"
        )
        String password,
        @NotBlank(message = "O nome é obrigatório.")
        @Size(min = 3, message = "O nome deve ter no mínimo 3 caracteries.")
        String name,
        @NotNull(message = "O tipo do usuário é obrigatório.")
        Role role
) {}
