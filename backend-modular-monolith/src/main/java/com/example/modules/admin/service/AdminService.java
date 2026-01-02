package com.example.modules.admin.service;

import com.example.modules.admin.model.Admin;
import java.util.Optional;

public interface AdminService {
    Admin registerAdmin(Admin admin);

    Optional<Admin> login(String email, String password);
}
