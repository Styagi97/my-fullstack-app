package io.reflectoring.Login.Service;

import io.reflectoring.Login.Entity.AuthRequest;
import io.reflectoring.Login.Entity.LoginResponse;
import io.reflectoring.Login.Entity.User;
import io.reflectoring.Login.Repository.UserRepository;
import org.springframework.stereotype.Service;
import io.reflectoring.Login.Entity.RegisterRequest;
import io.reflectoring.Login.Entity.UserUpdateRequest;
import io.reflectoring.Login.Exception.InvalidPasswordException;
import io.reflectoring.Login.Exception.UserAlreadyExistsException;
import io.reflectoring.Login.Exception.UserNotFoundException;
import io.reflectoring.Login.Security.JwtUtil; 
import java.util.List;
import java.util.Optional;
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
            throw new UserAlreadyExistsException("Email already exists!");
        }

        if (request.getPassword().length() < 6) {
           throw new InvalidPasswordException("Password must be at least 6 characters long."); 
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
throw new UserNotFoundException("User not found. Please Check your email .");
        }

        User user = userOpt.get();
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
           throw new InvalidPasswordException("Incorrect Password. Please try again."); 
        }

        String token = jwtUtil.generateToken(user.getUsername());
        return new LoginResponse(user.getId(),user.getUsername(),"Login Successful ", token, user.getRoles());
    }

    //Update user
     public User updateUser(Long userId, UserUpdateRequest updatedUser) {
    return userRepository.findById(userId).map(user -> {
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
    }).orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));
}

    //Delete user
    public void deleteUser(long userId) {
        userRepository.deleteById(userId);
    }

    //get user according to user
    public List<User> getUsersByRole(String role) {
        return userRepository.findByRolesContaining(role);  
    }

}
