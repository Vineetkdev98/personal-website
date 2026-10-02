package com.personalwebsite.profileservice.service;

import com.personalwebsite.profileservice.entity.Education;
import com.personalwebsite.profileservice.repository.EducationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class EducationService {

    private final EducationRepository repository;

    public EducationService(EducationRepository repository) {
        this.repository = repository;
    }

    public List<Education> getAll() {
        return repository.findAll();
    }

    public Education create(Education education) {
        return repository.save(education);
    }

    public Education getById(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Education not found"));
    }

    public Education update(UUID id, Education updated) {
        Education existing = getById(id);

        existing.setInstitution(updated.getInstitution());
        existing.setDegree(updated.getDegree());
        existing.setFieldOfStudy(updated.getFieldOfStudy());
        existing.setStartYear(updated.getStartYear());
        existing.setEndYear(updated.getEndYear());
        existing.setDescription(updated.getDescription());

        return repository.save(existing);
    }

    public void delete(UUID id) {
        repository.deleteById(id);
    }
}