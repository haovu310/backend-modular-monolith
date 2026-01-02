package com.example.modules.property.service;

import com.example.modules.property.model.Property;
import java.util.List;
import java.util.Optional;

public interface PropertyService {
    List<Property> getAllProperties();

    List<Property> getPropertyByAgentEmail(String agentEmail);

    Property getPropertyById(Long id);

    Property saveProperty(Property property);

    void deleteProperty(Long id);

    boolean existsById(Long id);

    boolean existsByName(String name);
}
