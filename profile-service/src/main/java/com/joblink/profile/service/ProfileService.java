package com.joblink.profile.service;

import com.joblink.profile.dto.ProfileRequest;
import com.joblink.profile.dto.ProfileResponse;
import com.joblink.profile.entity.Education;
import com.joblink.profile.entity.Experience;
import com.joblink.profile.entity.Profile;
import com.joblink.profile.repository.EducationRepository;
import com.joblink.profile.repository.ExperienceRepository;
import com.joblink.profile.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfileService {

	@Autowired
	private ProfileRepository profileRepository;

	@Autowired
	private ExperienceRepository experienceRepository;

	@Autowired
	private EducationRepository educationRepository;

	public ProfileResponse createProfile(ProfileRequest request) {
		if (profileRepository.existsByUserId(request.getUserId())) {
			throw new RuntimeException("Profile already exists for this user");
		}
		Profile profile = new Profile();
		profile.setUserId(request.getUserId());
		profile.setBio(request.getBio());
		profile.setLocation(request.getLocation());
		profile.setSkills(request.getSkills());
		Profile saved = profileRepository.save(profile);
		return mapToResponse(saved);
	}

	public ProfileResponse getProfileByUserId(String userId) {
		Profile profile = profileRepository.findByUserId(userId)
				.orElseThrow(() -> new RuntimeException("Profile not found"));
		return mapToResponse(profile);
	}

	public ProfileResponse updateProfile(String userId, ProfileRequest request) {
		Profile profile = profileRepository.findByUserId(userId)
				.orElseThrow(() -> new RuntimeException("Profile not found"));
		profile.setBio(request.getBio());
		profile.setLocation(request.getLocation());
		profile.setSkills(request.getSkills());
		Profile updated = profileRepository.save(profile);
		return mapToResponse(updated);
	}

	public List<ProfileResponse> searchBySkill(String skill) {
		List<Profile> profiles = profileRepository.findBySkillsContainingIgnoreCase(skill);
		return profiles.stream().map(this::mapToResponse).toList();
	}

	public void addExperience(String userId, Experience experience) {
		Profile profile = profileRepository.findByUserId(userId)
				.orElseThrow(() -> new RuntimeException("Profile not found"));
		experience.setProfile(profile);
		experienceRepository.save(experience);
	}

	public void addEducation(String userId, Education education) {
		Profile profile = profileRepository.findByUserId(userId)
				.orElseThrow(() -> new RuntimeException("Profile not found"));
		education.setProfile(profile);
		educationRepository.save(education);
	}

	private ProfileResponse mapToResponse(Profile profile) {
		ProfileResponse response = new ProfileResponse();
		response.setId(profile.getId());
		response.setUserId(profile.getUserId());
		response.setBio(profile.getBio());
		response.setLocation(profile.getLocation());
		response.setSkills(profile.getSkills());
		response.setResumeUrl(profile.getResumeUrl());
		response.setCreatedAt(profile.getCreatedAt());
		return response;
	}
}