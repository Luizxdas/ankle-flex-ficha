package com.ankleflex.ficha.service;

import com.ankleflex.ficha.dto.LoginDTO;
import com.ankleflex.ficha.dto.RegisterDTO;
import com.ankleflex.ficha.entity.User;
import com.ankleflex.ficha.repository.UserRepository;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void register(RegisterDTO registerDTO) {

    }

    public User login(LoginDTO loginDTO) {
        Optional<User> existingUser = userRepository.findByUsername(loginDTO.username());

        if (existingUser.isEmpty()) {
            throw new UsernameNotFoundException("Usuário não encontrado.");
        }

        User user = existingUser.get();

        if (!passwordEncoder.matches(loginDTO.password(), user.getPassword())) {
            throw new BadCredentialsException("Senha incorreta.");
        }

        return user;
    }
}
