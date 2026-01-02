package com.example.modules.admin;

import com.example.modules.admin.model.Admin;
import com.example.modules.admin.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admins")
@CrossOrigin(origins = "*")
class AdminController {

    private final AdminService adminService;

    AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/register")
    public ResponseEntity<Admin> register(@RequestBody Admin admin) {
        return ResponseEntity.ok(adminService.registerAdmin(admin));
    }

    @PostMapping("/login")
    public ResponseEntity<Admin> login(@RequestBody Admin loginRequest) {
        return adminService.login(loginRequest.getEmail(), loginRequest.getPassword())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(401).build());
    }
}
