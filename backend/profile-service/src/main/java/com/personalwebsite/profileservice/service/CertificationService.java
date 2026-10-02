package com.personalwebsite.profileservice.service;

import com.personalwebsite.profileservice.entity.Certification;
import com.personalwebsite.profileservice.repository.CertificationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CertificationService {

    private final CertificationRepository repository;

    public CertificationService(CertificationRepository repository) {
        this.repository = repository;
    }

    public List<Certification> getAll() {
        return repository.findAll();
    }

    public Certification getById(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Certification not found"));
    }

    public Certification create(Certification certification) {
        return repository.save(certification);
    }

    public Certification update(UUID id, Certification updated) {
        Certification existing = getById(id);

        existing.setName(updated.getName());
        existing.setIssuer(updated.getIssuer());
        existing.setIssueDate(updated.getIssueDate());
        existing.setCredentialUrl(updated.getCredentialUrl());

        return repository.save(existing);
    }

    public void delete(UUID id) {
        repository.deleteById(id);
    }
}