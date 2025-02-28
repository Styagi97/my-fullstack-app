/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package io.reflectoring.Login.Entity;

/**
 *
 * @author uday enter
 */
import java.util.Set;
import lombok.Data;

@Data
public class LoginResponse {
     private Long userId; // Add this field
    private String username;
    private String message;
    private String token;
    private Set<String> roles; 

    public LoginResponse(Long userId, String username, String message, String token, Set<String> roles) {
        this.userId = userId;
        this.username = username;
        this.message = message;
        this.token = token;
        this.roles = roles;
    }
    
}
