package io.reflectoring.Login.Service;

import io.reflectoring.Login.Entity.AuthRequest;
import io.reflectoring.Login.Entity.ForgotPasswordRequest;
import io.reflectoring.Login.Entity.LoginResponse;
import io.reflectoring.Login.Entity.User;
import io.reflectoring.Login.Repository.UserRepository;
import org.springframework.stereotype.Service;
import io.reflectoring.Login.Entity.RegisterRequest;
import io.reflectoring.Login.Entity.ResetPasswordRequest;
import io.reflectoring.Login.Entity.UserUpdateRequest;
import io.reflectoring.Login.Security.JwtUtil; // Import JWT utility
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public String registerUser(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Email already exists!";
        }

        if (request.getPassword().length() < 6) {
            return "Password must be at least 6 characters long.";
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRoles(request.getRoles());

        userRepository.save(user);
        return "User registered successfully!";
    }
//Login

    public LoginResponse loginUser(AuthRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isEmpty()) {
            return new LoginResponse(null, null, "User not found. Please check your email.", null, null);
        }

        User user = userOpt.get();
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return new LoginResponse(null, null, "Incorrect password. Please try again.", null, null);
        }

        String token = jwtUtil.generateToken(user.getUsername());
        return new LoginResponse(user.getId(), user.getUsername(), "Login successful", token, user.getRoles());
    }

    //Update user
//    public User updateUser(Long userId, UserUpdateRequest updatedUser) {
//        return userRepository.findById(userId).map(user -> {
//            user.setUsername(updatedUser.getUsername());
//            user.setEmail(updatedUser.getEmail());
//            user.setPassword(updatedUser.getEmail());
//            user.setRoles(updatedUser.getRoles());
//            return userRepository.save(user);
//        }).orElseThrow(() -> new RuntimeException("User not found with Id" + userId));
//    }
    public User updateUser(Long userId, UserUpdateRequest updatedUser) {
    return userRepository.findById(userId).map(user -> {
        // Update only non-null fields
        if (updatedUser.getUsername() != null) {
            user.setUsername(updatedUser.getUsername());
        }
        if (updatedUser.getEmail() != null) {
            user.setEmail(updatedUser.getEmail());
        }
        if (updatedUser.getRoles() != null) {
            user.setRoles(updatedUser.getRoles());
        }
        return userRepository.save(user);
    }).orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
}

    //Delete user
    public void deleteUser(long userId) {
        userRepository.deleteById(userId);
    }

    //get user according to user
    public List<User> getUsersByRole(String role) {
        return userRepository.findByRolesContaining(role); // Call the correct method
    }

}
