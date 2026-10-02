package com.personalwebsite.profileservice.repository;

import com.personalwebsite.profileservice.entity.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AchievementRepository extends JpaRepository<Achievement, UUID> {
}