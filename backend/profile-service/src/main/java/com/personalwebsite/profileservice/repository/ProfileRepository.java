package com.personalwebsite.profileservice.repository;

import com.personalwebsite.profileservice.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ProfileRepository extends JpaRepository<Profile, UUID> {
}