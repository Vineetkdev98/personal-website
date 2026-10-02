package com.personalwebsite.profileservice.repository;

import com.personalwebsite.profileservice.entity.Career;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CareerRepository extends JpaRepository<Career, UUID> {
}