package com.ankleflex.ficha;

import com.ankleflex.ficha.entity.User;
import com.ankleflex.ficha.entity.UserRole;
import com.ankleflex.ficha.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            String adminUsername = System.getenv().getOrDefault("ADMIN_USERNAME", "admin");
            String adminPassword = System.getenv().getOrDefault("ADMIN_PASSWORD", "admin123");

            if (userRepository.findByUsername(adminUsername).isEmpty()) {
                User admin = new User();
                admin.setUsername(adminUsername);
                admin.setPassword(passwordEncoder.encode(adminPassword));
                admin.setEmail(adminUsername);
                admin.setRole(UserRole.ADMIN);
                admin.setEnabled(true);
                userRepository.save(admin);
            }
        };
    }
}
