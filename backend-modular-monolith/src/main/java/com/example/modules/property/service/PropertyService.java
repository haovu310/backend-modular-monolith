package com.example.modules.property.service;

import com.example.modules.property.model.Property;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;

public interface PropertyService {
    Page<Property> getAllProperties(int page, int size, String sortBy);

    Optional<List<Property>> getPropertyByAgentEmail(String agentEmail);

    Optional<Property> getPropertyById(Long id);

    Property saveProperty(Property property);

    void deleteProperty(Long id);

    boolean existsById(Long id);

    boolean existsByName(String name);
}
