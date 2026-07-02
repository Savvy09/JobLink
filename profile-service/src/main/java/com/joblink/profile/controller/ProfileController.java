package com.joblink.profile.controller;

import com.joblink.profile.dto.ProfileRequest;
import com.joblink.profile.dto.ProfileResponse;
import com.joblink.profile.entity.Education;
import com.joblink.profile.entity.Experience;
import com.joblink.profile.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/profiles")
public class ProfileController {

	@Autowired
	private ProfileService profileService;

	@PostMapping
	public ResponseEntity<ProfileResponse> createProfile(@RequestBody ProfileRequest request) {
		return ResponseEntity.ok(profileService.createProfile(request));
	}

	@GetMapping("/{userId}")
	public ResponseEntity<ProfileResponse> getProfile(@PathVariable String userId) {
		return ResponseEntity.ok(profileService.getProfileByUserId(userId));
	}

	@PutMapping("/{userId}")
	public ResponseEntity<ProfileResponse> updateProfile(@PathVariable String userId,
			@RequestBody ProfileRequest request) {
		return ResponseEntity.ok(profileService.updateProfile(userId, request));
	}

	@GetMapping("/search")
	public ResponseEntity<List<ProfileResponse>> searchBySkill(@RequestParam String skill) {
		return ResponseEntity.ok(profileService.searchBySkill(skill));
	}

	@PostMapping("/{userId}/experience")
	public ResponseEntity<String> addExperience(@PathVariable String userId, @RequestBody Experience experience) {
		profileService.addExperience(userId, experience);
		return ResponseEntity.ok("Experience added successfully");
	}

	@PostMapping("/{userId}/education")
	public ResponseEntity<String> addEducation(@PathVariable String userId, @RequestBody Education education) {
		profileService.addEducation(userId, education);
		return ResponseEntity.ok("Education added successfully");
	}
}