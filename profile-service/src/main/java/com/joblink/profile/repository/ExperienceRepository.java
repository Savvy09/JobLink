package com.joblink.profile.repository;

import com.joblink.profile.entity.Experience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ExperienceRepository extends JpaRepository<Experience, String> {
	List<Experience> findByProfileId(String profileId);
}