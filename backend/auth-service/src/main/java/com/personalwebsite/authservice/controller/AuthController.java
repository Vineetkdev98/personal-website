package com.personalwebsite.authservice.controller;

import com.personalwebsite.authservice.entity.User;
import com.personalwebsite.authservice.service.AuthenticationService;
import com.personalwebsite.authservice.service.JwtService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationService authenticationService;
    private final JwtService jwtService;

    public AuthController(
            AuthenticationService authenticationService,
            JwtService jwtService
    ) {
        this.authenticationService = authenticationService;
        this.jwtService = jwtService;
    }

    @GetMapping("/health")
    public Map<String, String> health() {

        return Map.of(
                "service", "auth-service",
                "status", "UP"
        );
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request
    ) {

        User user = authenticationService.authenticate(
                request.getUsername(),
                request.getPassword()
        );

        String token = jwtService.generateToken(
                user.getUsername(),
                user.getRole()
        );

        LoginResponse response = new LoginResponse(
                "Login successful",
                user.getUsername(),
                user.getRole(),
                token
        );

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }
}