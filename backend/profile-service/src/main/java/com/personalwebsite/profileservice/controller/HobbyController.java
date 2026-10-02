package com.personalwebsite.profileservice.controller;

import com.personalwebsite.profileservice.entity.Hobby;
import com.personalwebsite.profileservice.service.HobbyService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/hobbies")
public class HobbyController {

    private final HobbyService service;

    public HobbyController(HobbyService service) {
        this.service = service;
    }

    @GetMapping
    public List<Hobby> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Hobby getById(@PathVariable UUID id) {
        return service.getById(id);
    }

    @PostMapping
    public Hobby create(@RequestBody Hobby hobby) {
        return service.create(hobby);
    }

    @PutMapping("/{id}")
    public Hobby update(
            @PathVariable UUID id,
            @RequestBody Hobby hobby) {
        return service.update(id, hobby);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        service.delete(id);
    }
}