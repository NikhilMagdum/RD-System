package Com.cs.Repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import Com.cs.Entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {

    Optional<Admin> findByPhone(String phone);
}