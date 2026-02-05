package com.inforpop.taskmanager.modules.user.repository;

import com.inforpop.taskmanager.modules.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    UserDetails findByEmail(String email);
    @Query("SELECT u FROM User u WHERE u.public_id = :public_id")
    Optional<User> findByPublic_id(@Param("public_id") UUID public_id);
}
