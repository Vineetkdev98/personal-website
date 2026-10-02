package com.personalwebsite.profileservice.controller;

import com.personalwebsite.profileservice.entity.Profile;
import com.personalwebsite.profileservice.service.ProfileService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public ResponseEntity<List<Profile>> getAllProfiles() {
        return ResponseEntity.ok(profileService.getAllProfiles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Profile> getProfile(@PathVariable UUID id) {
        return ResponseEntity.ok(profileService.getProfile(id));
    }

    @PostMapping
    public ResponseEntity<Profile> createProfile(
            @RequestBody Profile profile) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(profileService.createProfile(profile));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Profile> updateProfile(
            @PathVariable UUID id,
            @RequestBody Profile profile) {

        return ResponseEntity.ok(
                profileService.updateProfile(id, profile)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfile(
            @PathVariable UUID id) {

        profileService.deleteProfile(id);

        return ResponseEntity.noContent().build();
    }
}