package com.example.modules.property.controller;

import com.example.modules.property.model.Property;
import com.example.modules.property.service.PropertyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "*")
class PropertyController {

    private final PropertyService propertyService;

    PropertyController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    // Return the list of available properties
    @GetMapping
    public ResponseEntity<List<Property>> getAllProperties() {
        return ResponseEntity.ok(propertyService.getAllProperties());
    }

    // Create a new property
    @PostMapping
    public ResponseEntity<Property> createProperty(@RequestBody Property property) {
        if (propertyService.existsByName(property.getName())) {
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok(propertyService.saveProperty(property));
    }

    // Get properties by agent email
    @GetMapping("/agent/{agentEmail}")
    public ResponseEntity<List<Property>> getPropertyByAgentEmail(@PathVariable String agentEmail) {
        return ResponseEntity.ok(propertyService.getPropertyByAgentEmail(agentEmail));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Property> getPropertyById(@PathVariable Long id) {
        return ResponseEntity.ok(propertyService.getPropertyById(id));
    }

    // Delete a property by its ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable Long id) {
        if (!propertyService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        propertyService.deleteProperty(id);
        return ResponseEntity.ok().build();
    }

    // Update a property by its ID
    @PutMapping("/{id}")
    public ResponseEntity<Property> updateProperty(@PathVariable Long id, @RequestBody Property property) {
        if (!propertyService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        property.setId(id);
        return ResponseEntity.ok(propertyService.saveProperty(property));
    }
}
