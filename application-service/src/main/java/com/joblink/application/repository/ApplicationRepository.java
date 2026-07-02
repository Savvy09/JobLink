package com.joblink.application.repository;

import com.joblink.application.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, String> {
    List<Application> findByCandidateId(String candidateId);
    List<Application> findByJobId(String jobId);
    boolean existsByCandidateIdAndJobId(String candidateId, String jobId);
}