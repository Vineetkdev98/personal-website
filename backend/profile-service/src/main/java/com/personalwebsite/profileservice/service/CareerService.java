package com.personalwebsite.profileservice.service;

import com.personalwebsite.profileservice.entity.Career;
import com.personalwebsite.profileservice.repository.CareerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CareerService {

    private final CareerRepository repository;

    public CareerService(CareerRepository repository) {
        this.repository = repository;
    }

    public List<Career> getAll() {
        return repository.findAll();
    }

    public Career getById(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Career not found"));
    }

    public Career create(Career career) {
        return repository.save(career);
    }

    public Career update(UUID id, Career updated) {
        Career existing = getById(id);

        existing.setCompany(updated.getCompany());
        existing.setRole(updated.getRole());
        existing.setLocation(updated.getLocation());
        existing.setStartDate(updated.getStartDate());
        existing.setEndDate(updated.getEndDate());
        existing.setCurrent(updated.isCurrent());
        existing.setDescription(updated.getDescription());

        return repository.save(existing);
    }

    public void delete(UUID id) {
        repository.deleteById(id);
    }
}