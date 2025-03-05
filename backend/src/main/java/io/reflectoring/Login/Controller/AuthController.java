 
package io.reflectoring.Login.Controller;

import io.reflectoring.Login.Entity.AuthRequest;
import io.reflectoring.Login.Entity.LoginResponse;
import io.reflectoring.Login.Entity.RegisterRequest;
import io.reflectoring.Login.Entity.User;
import io.reflectoring.Login.Entity.UserUpdateRequest;
import org.springframework.web.bind.annotation.*;
import io.reflectoring.Login.Service.AuthService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
 
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    //Save user
    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) throws InterruptedException {
        Thread.sleep(2000);
        return authService.registerUser(request);
    }
    
    //Login User
    @PostMapping("/login")
    public LoginResponse login(@RequestBody AuthRequest request) throws InterruptedException {
        System.out.println(request);
        Thread.sleep(2000);
        return authService.loginUser(request);
    }

    //get User
    @GetMapping("/users")
    public List<User> getUsersByRole(@RequestParam String role) {
        return authService.getUsersByRole(role);  
    }
// Update User

    @PutMapping("/users/{userId}")
    public ResponseEntity<?> updateUser(@PathVariable Long userId, @Valid @RequestBody UserUpdateRequest updatedUser) {
        try {
            User user = authService.updateUser(userId, updatedUser);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update user");
        }
    }

    @DeleteMapping("/users/{userId}")
    public String deleteUser(@PathVariable long userId) {
        authService.deleteUser(userId);
        return "User deleted successfully!";

    }
}
