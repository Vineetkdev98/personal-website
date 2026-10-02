package com.personalwebsite.profileservice.repository;

import com.personalwebsite.profileservice.entity.Hobby;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface HobbyRepository extends JpaRepository<Hobby, UUID> {
}