package com.ankleflex.ficha.controller;

import com.ankleflex.ficha.dto.AuthResponseDTO;
import com.ankleflex.ficha.dto.LoginDTO;
import com.ankleflex.ficha.dto.RegisterDTO;
import com.ankleflex.ficha.entity.User;
import com.ankleflex.ficha.jwt.JwtUtils;
import com.ankleflex.ficha.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    UserService userService;
    JwtUtils  jwtUtils;

    public AuthController(UserService userService, JwtUtils  jwtUtils) {
        this.userService = userService;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody RegisterDTO registerDTO) {
        userService.register(registerDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginDTO loginDTO, HttpServletResponse response) {
        User authenticatedUser = userService.login(loginDTO);

        String accessToken = jwtUtils.generateAccessToken(authenticatedUser.getUsername());
        String refreshToken = jwtUtils.generateRefreshToken(authenticatedUser.getUsername());

        Cookie refreshCookie = new Cookie("refreshToken", refreshToken);
        refreshCookie.setHttpOnly(true);
        refreshCookie.setSecure(false); // true em produção
        refreshCookie.setPath("/");
        refreshCookie.setMaxAge(14 * 24 * 60 * 60); // 14 dias
        response.addCookie(refreshCookie);

        return ResponseEntity.ok(new AuthResponseDTO(accessToken));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        Cookie expiredCookie = new Cookie("refreshToken", null);
        expiredCookie.setHttpOnly(true);
        expiredCookie.setSecure(false); // true em produção
        expiredCookie.setPath("/");
        expiredCookie.setMaxAge(0);
        response.addCookie(expiredCookie);

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(HttpServletRequest request) {
        String refreshToken = null;
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("refreshToken".equals(cookie.getName())) {
                    refreshToken = cookie.getValue();
                    break;
                }
            }
        }

        if (refreshToken == null || !jwtUtils.validateToken(refreshToken)) {
            return ResponseEntity.status(401).body("Refresh token faltando ou inválido.");
        }

        String username = jwtUtils.extractUsername(refreshToken);
        String accessToken = jwtUtils.generateAccessToken(username);

        return ResponseEntity.ok(new AuthResponseDTO(accessToken));
    }
}
