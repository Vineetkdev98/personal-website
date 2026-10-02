package com.personalwebsite.profileservice.controller;

import com.personalwebsite.profileservice.entity.Certification;
import com.personalwebsite.profileservice.service.CertificationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/certifications")
public class CertificationController {

    private final CertificationService service;

    public CertificationController(CertificationService service) {
        this.service = service;
    }

    @GetMapping
    public List<Certification> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Certification getById(@PathVariable UUID id) {
        return service.getById(id);
    }

    @PostMapping
    public Certification create(@RequestBody Certification certification) {
        return service.create(certification);
    }

    @PutMapping("/{id}")
    public Certification update(
            @PathVariable UUID id,
            @RequestBody Certification certification) {
        return service.update(id, certification);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        service.delete(id);
    }
}