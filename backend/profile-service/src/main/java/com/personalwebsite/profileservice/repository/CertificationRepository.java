package com.personalwebsite.profileservice.repository;

import com.personalwebsite.profileservice.entity.Certification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CertificationRepository extends JpaRepository<Certification, UUID> {
}