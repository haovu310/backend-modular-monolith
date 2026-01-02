package com.example.modules.property;

import com.example.modules.property.model.Property;
import com.example.modules.property.service.PropertyService;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
    public ResponseEntity<Page<Property>> getAllProperties(
            // The default page is 0, 4 properties per page, sorted by id descending order
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "4") int size,
            @RequestParam(defaultValue = "id") String sortBy) {
        return ResponseEntity.ok(propertyService.getAllProperties(page, size, sortBy));
    }

    // Create a new property
    @PostMapping
    public ResponseEntity<Property> createProperty(@RequestBody Property property) {
        // Check if the property name has already exist
        if (propertyService.existsByName(property.getName())) {
            return ResponseEntity.badRequest().build();
        }

        // Handle validation rule for the property creation
        if (property.getPrice() < 0 || property.getPrice() > 2000000000) {
            return ResponseEntity.badRequest().build(); // Reject invalid price
        }

        if (property.getAgentEmail() == null || !property.getAgentEmail().endsWith(".com")) {
            return ResponseEntity.badRequest().build(); // Reject invalid email domain
        }

        return ResponseEntity.ok(propertyService.saveProperty(property));
    }

    // Get properties by agent email, return not found if not found (use Optional)
    @GetMapping("/agent/{agentEmail}")
    public ResponseEntity<List<Property>> getPropertyByAgentEmail(@PathVariable String agentEmail) {
        return propertyService.getPropertyByAgentEmail(agentEmail)
                .filter(list -> !list.isEmpty()) // Only proceed if the list has properties
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Get a property by its ID, return not found if not found (use Optional)
    @GetMapping("/{id}")
    public ResponseEntity<Property> getPropertyById(@PathVariable Long id) {
        return propertyService.getPropertyById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
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

    // Update a property by its ID using Optional
    @PutMapping("/{id}")
    public ResponseEntity<Property> updateProperty(@PathVariable Long id, @RequestBody Property property) {
        return propertyService.getPropertyById(id) // 1. Find the Optional
                .map(existingProperty -> {
                    // 2. Map/Update the fields
                    existingProperty.setName(property.getName());
                    existingProperty.setAgentEmail(property.getAgentEmail());
                    existingProperty.setPrice(property.getPrice());
                    return propertyService.saveProperty(existingProperty); // 3. Save the updated information
                })
                .map(ResponseEntity::ok) // 4. Return 200 OK
                .orElse(ResponseEntity.notFound().build()); // Return 404 if missing or
    }
}
