package com.joblink.application.service;

import com.joblink.application.client.JobPostingClient;
import com.joblink.application.client.ProfileClient;
import com.joblink.application.dto.ApplicationRequest;
import com.joblink.application.dto.ApplicationResponse;
import com.joblink.application.entity.Application;
import com.joblink.application.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private JobPostingClient jobPostingClient;

    @Autowired
    private ProfileClient profileClient;

    public ApplicationResponse apply(ApplicationRequest request) {
        if (applicationRepository.existsByCandidateIdAndJobId(
                request.getCandidateId(), request.getJobId())) {
            throw new RuntimeException("You have already applied for this job");
        }

        JobPostingClient.JobPostingDTO job = jobPostingClient.getJobById(request.getJobId());
        if (!job.getStatus().equals("OPEN")) {
            throw new RuntimeException("Job is not open for applications");
        }

        ProfileClient.ProfileDTO profile = profileClient.getProfile(request.getCandidateId());

        Application application = new Application();
        application.setCandidateId(request.getCandidateId());
        application.setJobId(request.getJobId());
        application.setCompanyId(job.getCompanyId());
        application.setResumeUrl(profile.getResumeUrl());

        return mapToResponse(applicationRepository.save(application));
    }

    public List<ApplicationResponse> getApplicationsByCandidate(String candidateId) {
        return applicationRepository.findByCandidateId(candidateId)
                .stream().map(this::mapToResponse).toList();
    }

    public List<ApplicationResponse> getApplicationsByJob(String jobId) {
        return applicationRepository.findByJobId(jobId)
                .stream().map(this::mapToResponse).toList();
    }

    public ApplicationResponse updateStatus(String id, String status) {
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        application.setStatus(Application.Status.valueOf(status.toUpperCase()));
        return mapToResponse(applicationRepository.save(application));
    }

    private ApplicationResponse mapToResponse(Application application) {
        ApplicationResponse response = new ApplicationResponse();
        response.setId(application.getId());
        response.setCandidateId(application.getCandidateId());
        response.setJobId(application.getJobId());
        response.setCompanyId(application.getCompanyId());
        response.setResumeUrl(application.getResumeUrl());
        response.setStatus(application.getStatus().name());
        response.setAppliedAt(application.getAppliedAt());
        return response;
    }
}