package com.SocialMedial.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.SocialMedial.Entity.User;

public interface UserRepository extends JpaRepository<User, Long> {} 
