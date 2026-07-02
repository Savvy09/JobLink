package com.joblink.company.repository;

import com.joblink.company.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, String> {
	Optional<Company> findByEmployerId(String employerId);

	boolean existsByEmployerId(String employerId);

	List<Company> findByNameContainingIgnoreCase(String name);

	List<Company> findByVerified(boolean verified);
}