package com.joblink.application.controller;

import com.joblink.application.dto.ApplicationRequest;
import com.joblink.application.dto.ApplicationResponse;
import com.joblink.application.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping
    public ResponseEntity<ApplicationResponse> apply(@RequestBody ApplicationRequest request) {
        return ResponseEntity.ok(applicationService.apply(request));
    }

    @GetMapping("/candidate/{candidateId}")
    public ResponseEntity<List<ApplicationResponse>> getByCandidate(@PathVariable String candidateId) {
        return ResponseEntity.ok(applicationService.getApplicationsByCandidate(candidateId));
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<ApplicationResponse>> getByJob(@PathVariable String jobId) {
        return ResponseEntity.ok(applicationService.getApplicationsByJob(jobId));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApplicationResponse> updateStatus(@PathVariable String id,
                                                            @RequestParam String status) {
        return ResponseEntity.ok(applicationService.updateStatus(id, status));
    }
}