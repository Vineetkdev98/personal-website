package com.personalwebsite.profileservice.service;

import com.personalwebsite.profileservice.entity.Profile;
import com.personalwebsite.profileservice.repository.ProfileRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;

    public ProfileService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    public List<Profile> getAllProfiles() {
        return profileRepository.findAll();
    }

    public Profile getProfile(UUID id) {
        return profileRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Profile not found: " + id));
    }

    public Profile createProfile(Profile profile) {
        return profileRepository.save(profile);
    }

    public Profile updateProfile(UUID id, Profile profile) {

        Profile existingProfile = getProfile(id);

        existingProfile.setName(profile.getName());
        existingProfile.setHeadline(profile.getHeadline());
        existingProfile.setBio(profile.getBio());
        existingProfile.setLocation(profile.getLocation());
        existingProfile.setEmail(profile.getEmail());
        existingProfile.setLinkedinUrl(profile.getLinkedinUrl());
        existingProfile.setGithubUrl(profile.getGithubUrl());
        existingProfile.setWebsiteUrl(profile.getWebsiteUrl());
        existingProfile.setProfileImageUrl(profile.getProfileImageUrl());

        return profileRepository.save(existingProfile);
    }

    public void deleteProfile(UUID id) {

        if (!profileRepository.existsById(id)) {
            throw new RuntimeException("Profile not found: " + id);
        }

        profileRepository.deleteById(id);
    }
}