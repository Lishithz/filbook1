package com.SocialMedial.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SocialMedial.Entity.User;
import com.SocialMedial.Repository.UserRepository;

@RestController
@CrossOrigin(origins=" http://localhost:5175/")
@RequestMapping("/api/users")
public class UserController {

	@Autowired
    private UserRepository userRepository;

    // Create a new user
	// User Login
	// User Login
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody User loginData) {
	    List<User> users = userRepository.findAll();
	    for (User user : users) {
	        if (user.getEmail().equals(loginData.getEmail()) && user.getPassword().equals(loginData.getPassword())) {
	            return ResponseEntity.ok(user);
	        }
	    }
	    return ResponseEntity.status(401).body("Invalid credentials");
	}


    // Get all users
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get user by ID
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
    }

    // Update user
    @PutMapping("/{id}")
    public User updateUser(@RequestBody User updatedUser, @PathVariable Long id) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setUsername(updatedUser.getUsername());
                    user.setEmail(updatedUser.getEmail());
                    user.setPassword(updatedUser.getPassword());
                    return userRepository.save(user);
                }).orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
    }

    // Delete user
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found with ID: " + id);
        }
        userRepository.deleteById(id);
        return "User with ID " + id + " has been deleted successfully";
    }
}