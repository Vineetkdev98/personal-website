package com.personalwebsite.profileservice.repository;

import com.personalwebsite.profileservice.entity.Education;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface EducationRepository extends JpaRepository<Education, UUID> {
}