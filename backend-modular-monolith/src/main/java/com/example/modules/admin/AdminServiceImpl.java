package com.example.modules.admin;

import com.example.modules.admin.model.Admin;
import com.example.modules.admin.service.AdminService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;

    AdminServiceImpl(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @Override
    public Admin registerAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    @Override
    public Optional<Admin> login(String email, String password) {
        return adminRepository.findByEmail(email)
                .filter(a -> a.getPassword().equals(password)); // Simple password check (plaintext for lab)
    }
}
