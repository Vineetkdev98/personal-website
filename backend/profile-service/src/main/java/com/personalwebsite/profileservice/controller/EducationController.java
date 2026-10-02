package com.personalwebsite.profileservice.controller;

import com.personalwebsite.profileservice.entity.Education;
import com.personalwebsite.profileservice.service.EducationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/education")
public class EducationController {

    private final EducationService service;

    public EducationController(EducationService service) {
        this.service = service;
    }

    @GetMapping
    public List<Education> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Education getById(@PathVariable UUID id) {
        return service.getById(id);
    }

    @PostMapping
    public Education create(@RequestBody Education education) {
        return service.create(education);
    }

    @PutMapping("/{id}")
    public Education update(
            @PathVariable UUID id,
            @RequestBody Education education) {
        return service.update(id, education);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        service.delete(id);
    }
}