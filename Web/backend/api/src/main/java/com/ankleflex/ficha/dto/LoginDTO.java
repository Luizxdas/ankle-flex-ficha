package com.ankleflex.ficha.dto;

import jakarta.validation.constraints.NotBlank;

public record LoginDTO(

        @NotBlank(message = "O nome de usuário não pode estar em branco.")
        String username,

        @NotBlank(message = "A senha não pode estar em branco.")
        String password) {
}
