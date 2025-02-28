/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package io.reflectoring.Login.Entity;
import lombok.Data;
import java.util.Set;
import java.util.stream.Collectors;
/**
 *
 * @author uday enter
 */ 
@Data
public class RegisterRequest {
    private String username;
    private String email;
    private String password;
    private Set<String> roles;

    public void setRoles(Set<String> roles) {
        if (roles != null && !roles.isEmpty()) {
            this.roles = roles.stream()
                .filter(role -> role.equals("USER") || role.equals("ADMIN")) // Validate roles
                .collect(Collectors.toSet());
        } else {
            this.roles = Set.of("USER"); // Default role
        }
    }
}