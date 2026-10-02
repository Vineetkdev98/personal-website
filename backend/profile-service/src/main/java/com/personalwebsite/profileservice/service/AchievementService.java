package com.personalwebsite.profileservice.service;

import com.personalwebsite.profileservice.entity.Achievement;
import com.personalwebsite.profileservice.repository.AchievementRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class AchievementService {

    private final AchievementRepository repository;

    public AchievementService(AchievementRepository repository) {
        this.repository = repository;
    }

    public List<Achievement> getAll() {
        return repository.findAll();
    }

    public Achievement getById(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Achievement not found"));
    }

    public Achievement create(Achievement achievement) {
        return repository.save(achievement);
    }

    public Achievement update(UUID id, Achievement updated) {
        Achievement existing = getById(id);

        existing.setTitle(updated.getTitle());
        existing.setDescription(updated.getDescription());
        existing.setAchievementDate(updated.getAchievementDate());

        return repository.save(existing);
    }

    public void delete(UUID id) {
        repository.deleteById(id);
    }
}