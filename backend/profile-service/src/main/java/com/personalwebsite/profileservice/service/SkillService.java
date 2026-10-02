package com.personalwebsite.profileservice.service;

import com.personalwebsite.profileservice.entity.Skill;
import com.personalwebsite.profileservice.repository.SkillRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class SkillService {

    private final SkillRepository repository;

    public SkillService(SkillRepository repository) {
        this.repository = repository;
    }

    public List<Skill> getAll() {
        return repository.findAll();
    }

    public Skill getById(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Skill not found"));
    }

    public Skill create(Skill skill) {
        return repository.save(skill);
    }

    public Skill update(UUID id, Skill updated) {
        Skill existing = getById(id);

        existing.setName(updated.getName());
        existing.setCategory(updated.getCategory());
        existing.setProficiency(updated.getProficiency());

        return repository.save(existing);
    }

    public void delete(UUID id) {
        repository.deleteById(id);
    }
}