package com.ankleflex.ficha.dto;

import com.ankleflex.ficha.entity.UserRole;
import jakarta.validation.constraints.*;

public record RegisterDTO(

        @NotBlank(message = "O nome de usuário não pode estar em branco.")
        @Size(min = 3, max = 50, message = "O nome de usuário deve ter entre 3 e 50 caracteres.")
        String username,

        @NotBlank(message = "O e-mail não pode estar em branco.")
        @Email(message = "O formato do e-mail é inválido.")
        @Size(max = 100, message = "O e-mail não pode exceder 100 caracteres.")
        String email,

        @NotBlank(message = "A senha não pode estar em branco.")
        @Size(min = 8, message = "A senha deve ter no mínimo 8 caracteres.")
        @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=])(?=\\S+$).{8,}$",
                  message = "A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial.")
        String password,

        @NotNull(message = "O papel do usuário não pode ser nulo.")
        UserRole role) {
}
