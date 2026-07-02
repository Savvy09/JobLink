package com.joblink.application.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "job-posting-service")
public interface JobPostingClient {

    @GetMapping("/api/jobs/{id}")
    JobPostingDTO getJobById(@PathVariable String id);

    class JobPostingDTO {
        private String id;
        private String title;
        private String companyId;
        private String status;

        public JobPostingDTO() {}

        public String getId() { return id; }
        public void setId(String id) { this.id = id; }

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }

        public String getCompanyId() { return companyId; }
        public void setCompanyId(String companyId) { this.companyId = companyId; }

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
    }
}