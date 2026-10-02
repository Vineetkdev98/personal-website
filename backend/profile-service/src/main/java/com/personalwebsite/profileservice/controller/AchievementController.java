package com.personalwebsite.profileservice.controller;

import com.personalwebsite.profileservice.entity.Achievement;
import com.personalwebsite.profileservice.service.AchievementService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/achievements")
public class AchievementController {

    private final AchievementService service;

    public AchievementController(AchievementService service) {
        this.service = service;
    }

    @GetMapping
    public List<Achievement> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Achievement getById(@PathVariable UUID id) {
        return service.getById(id);
    }

    @PostMapping
    public Achievement create(@RequestBody Achievement achievement) {
        return service.create(achievement);
    }

    @PutMapping("/{id}")
    public Achievement update(
            @PathVariable UUID id,
            @RequestBody Achievement achievement) {
        return service.update(id, achievement);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        service.delete(id);
    }
}