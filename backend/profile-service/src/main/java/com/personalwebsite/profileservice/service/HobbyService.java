package com.personalwebsite.profileservice.service;

import com.personalwebsite.profileservice.entity.Hobby;
import com.personalwebsite.profileservice.repository.HobbyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class HobbyService {

    private final HobbyRepository repository;

    public HobbyService(HobbyRepository repository) {
        this.repository = repository;
    }

    public List<Hobby> getAll() {
        return repository.findAll();
    }

    public Hobby getById(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hobby not found"));
    }

    public Hobby create(Hobby hobby) {
        return repository.save(hobby);
    }

    public Hobby update(UUID id, Hobby updated) {
        Hobby existing = getById(id);

        existing.setName(updated.getName());
        existing.setDescription(updated.getDescription());

        return repository.save(existing);
    }

    public void delete(UUID id) {
        repository.deleteById(id);
    }
}