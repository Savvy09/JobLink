package com.joblink.profile.repository;

import com.joblink.profile.entity.Education;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EducationRepository extends JpaRepository<Education, String> {
	List<Education> findByProfileId(String profileId);
}