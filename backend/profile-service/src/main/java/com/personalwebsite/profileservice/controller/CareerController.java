package com.personalwebsite.profileservice.controller;

import com.personalwebsite.profileservice.entity.Career;
import com.personalwebsite.profileservice.service.CareerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/career")
public class CareerController {

    private final CareerService service;

    public CareerController(CareerService service) {
        this.service = service;
    }

    @GetMapping
    public List<Career> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Career getById(@PathVariable UUID id) {
        return service.getById(id);
    }

    @PostMapping
    public Career create(@RequestBody Career career) {
        return service.create(career);
    }

    @PutMapping("/{id}")
    public Career update(
            @PathVariable UUID id,
            @RequestBody Career career) {
        return service.update(id, career);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        service.delete(id);
    }
}