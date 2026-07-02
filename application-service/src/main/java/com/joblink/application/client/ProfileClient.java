package com.joblink.application.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "profile-service")
public interface ProfileClient {

    @GetMapping("/api/profiles/{userId}")
    ProfileDTO getProfile(@PathVariable String userId);

    class ProfileDTO {
        private String id;
        private String userId;
        private String skills;
        private String resumeUrl;

        public ProfileDTO() {}

        public String getId() { return id; }
        public void setId(String id) { this.id = id; }

        public String getUserId() { return userId; }
        public void setUserId(String userId) { this.userId = userId; }

        public String getSkills() { return skills; }
        public void setSkills(String skills) { this.skills = skills; }

        public String getResumeUrl() { return resumeUrl; }
        public void setResumeUrl(String resumeUrl) { this.resumeUrl = resumeUrl; }
    }
}