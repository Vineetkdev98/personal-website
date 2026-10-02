package com.personalwebsite.profileservice.service;

import com.personalwebsite.profileservice.entity.Project;
import com.personalwebsite.profileservice.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project getProject(UUID id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found: " + id));
    }

    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    public Project updateProject(UUID id, Project project) {

        Project existingProject = getProject(id);

        existingProject.setName(project.getName());
        existingProject.setTitle(project.getTitle());
        existingProject.setDescription(project.getDescription());
        existingProject.setTechnologies(project.getTechnologies());
        existingProject.setRole(project.getRole());
        existingProject.setStartDate(project.getStartDate());
        existingProject.setEndDate(project.getEndDate());
        existingProject.setGithubUrl(project.getGithubUrl());
        existingProject.setDemoUrl(project.getDemoUrl());
        existingProject.setImageUrl(project.getImageUrl());
        existingProject.setFeatured(project.isFeatured());
        existingProject.setDisplayOrder(project.getDisplayOrder());

        return projectRepository.save(existingProject);
    }

    public void deleteProject(UUID id) {
        projectRepository.deleteById(id);
    }
}