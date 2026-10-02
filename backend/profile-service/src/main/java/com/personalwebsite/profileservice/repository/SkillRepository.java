package com.personalwebsite.profileservice.repository;

import com.personalwebsite.profileservice.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SkillRepository extends JpaRepository<Skill, UUID> {
}