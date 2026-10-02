package com.personalwebsite.profileservice.controller;

import com.personalwebsite.profileservice.entity.Skill;
import com.personalwebsite.profileservice.service.SkillService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillService service;

    public SkillController(SkillService service) {
        this.service = service;
    }

    @GetMapping
    public List<Skill> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Skill getById(@PathVariable UUID id) {
        return service.getById(id);
    }

    @PostMapping
    public Skill create(@RequestBody Skill skill) {
        return service.create(skill);
    }

    @PutMapping("/{id}")
    public Skill update(
            @PathVariable UUID id,
            @RequestBody Skill skill) {
        return service.update(id, skill);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        service.delete(id);
    }
}