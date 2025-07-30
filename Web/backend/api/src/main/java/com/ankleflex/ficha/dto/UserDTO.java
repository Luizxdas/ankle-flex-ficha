package com.ankleflex.ficha.dto;

public record UserDTO(Long id, String username, String email, String role, Boolean enabled) {
}
