package com.example.modules.property.repository;

import com.example.modules.property.model.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
interface PropertyRepository extends JpaRepository<Property, Long> {
    Optional<List<Property>> findByAgentEmail(String agentEmail);

    Optional<Property> findById(long id);

    Optional<Property> findByName(String name);
}