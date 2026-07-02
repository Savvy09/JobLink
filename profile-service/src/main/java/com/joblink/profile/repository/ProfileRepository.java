package com.joblink.profile.repository;

import com.joblink.profile.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, String> {
	Optional<Profile> findByUserId(String userId);

	boolean existsByUserId(String userId);

	List<Profile> findBySkillsContainingIgnoreCase(String skill);
}