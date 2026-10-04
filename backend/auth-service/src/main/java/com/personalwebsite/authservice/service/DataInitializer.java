package com.personalwebsite.authservice.service;

import com.personalwebsite.authservice.entity.User;
import com.personalwebsite.authservice.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initializeAdminUser(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        return args -> {

            String username = "admin";

            if (!userRepository.existsByUsername(username)) {

                User admin = new User();

                admin.setUsername(username);
                admin.setPassword(
                        passwordEncoder.encode("admin123")
                );
                admin.setRole("ADMIN");
                admin.setEnabled(true);

                userRepository.save(admin);

                System.out.println(
                        "=========================================="
                );
                System.out.println(
                        "Initial ADMIN user created successfully"
                );
                System.out.println(
                        "Username: admin"
                );
                System.out.println(
                        "Password: admin123"
                );
                System.out.println(
                        "=========================================="
                );

            } else {

                System.out.println(
                        "ADMIN user already exists. Skipping creation."
                );
            }
        };
    }
}