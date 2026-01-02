package com.example.modules.property;

import com.example.modules.property.model.Property;
import com.example.modules.property.service.PropertyService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
class PropertyServiceImpl implements PropertyService {

    private final PropertyRepository propertyRepository;

    PropertyServiceImpl(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    @Override
    public Page<Property> getAllProperties(int page, int size, String sortBy) {
        // Create the pagination and sorting request
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());

        // Pass the request to the repository
        return propertyRepository.findAll(pageable);
    }

    @Override
    public Optional<List<Property>> getPropertyByAgentEmail(String agentEmail) {
        return propertyRepository.findByAgentEmail(agentEmail);
    }

    @Override
    public Optional<Property> getPropertyById(Long id) {
        return propertyRepository.findById(id);
    }

    @Override
    public Property saveProperty(Property property) {

        return propertyRepository.save(property);
    }

    @Override
    public void deleteProperty(Long id) {
        propertyRepository.deleteById(id);

        // Strict Request: Check that the property does not exist after delete
        if (propertyRepository.existsById(id)) {
            throw new RuntimeException("Failed to delete property with ID: " + id);
        }
    }

    @Override
    public boolean existsById(Long id) {
        return propertyRepository.findById(id).isPresent();
    }

    @Override
    public boolean existsByName(String name) {
        return propertyRepository.findByName(name).isPresent();
    }
}
