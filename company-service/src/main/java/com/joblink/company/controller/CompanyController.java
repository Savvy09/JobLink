package com.joblink.company.controller;

import com.joblink.company.dto.CompanyRequest;
import com.joblink.company.dto.CompanyResponse;
import com.joblink.company.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
public class CompanyController {

	@Autowired
	private CompanyService companyService;

	@PostMapping
	public ResponseEntity<CompanyResponse> createCompany(@RequestBody CompanyRequest request) {
		return ResponseEntity.ok(companyService.createCompany(request));
	}

	@GetMapping
	public ResponseEntity<List<CompanyResponse>> getAllCompanies() {
		return ResponseEntity.ok(companyService.getAllCompanies());
	}

	@GetMapping("/{id}")
	public ResponseEntity<CompanyResponse> getCompanyById(@PathVariable String id) {
		return ResponseEntity.ok(companyService.getCompanyById(id));
	}

	@GetMapping("/employer/{employerId}")
	public ResponseEntity<CompanyResponse> getCompanyByEmployerId(@PathVariable String employerId) {
		return ResponseEntity.ok(companyService.getCompanyByEmployerId(employerId));
	}

	@GetMapping("/search")
	public ResponseEntity<List<CompanyResponse>> searchByName(@RequestParam String name) {
		return ResponseEntity.ok(companyService.searchByName(name));
	}

	@PutMapping("/{id}")
	public ResponseEntity<CompanyResponse> updateCompany(@PathVariable String id, @RequestBody CompanyRequest request) {
		return ResponseEntity.ok(companyService.updateCompany(id, request));
	}

	@PatchMapping("/{id}/verify")
	public ResponseEntity<CompanyResponse> verifyCompany(@PathVariable String id) {
		return ResponseEntity.ok(companyService.verifyCompany(id));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteCompany(@PathVariable String id) {
		companyService.deleteCompany(id);
		return ResponseEntity.ok("Company deleted successfully");
	}
}