package com.example.modules.property;

import com.example.modules.property.model.Property;
import com.example.modules.property.service.PropertyService;

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
    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    @Override
    public List<Property> getPropertyByAgentEmail(String agentEmail) {
        return propertyRepository.findByAgentEmail(agentEmail).orElseThrow(
                () -> new RuntimeException("This agent doesn't have property: " + agentEmail));
    }

    @Override
    public Property getPropertyById(Long id) {
        return propertyRepository.findById(id).orElseThrow(
                () -> new RuntimeException("This id doesn't have property: " + id));
    }

    @Override
    public Property saveProperty(Property property) {

        return propertyRepository.save(property);
    }

    @Override
    public void deleteProperty(Long id) {
        propertyRepository.deleteById(id);
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
