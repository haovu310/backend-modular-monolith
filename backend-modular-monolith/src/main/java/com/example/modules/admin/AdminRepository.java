package com.example.modules.admin;

import com.example.modules.admin.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByEmail(String email);
}
