 package io.reflectoring.Login.Entity;

import lombok.Data;
import java.util.Set;
import java.util.stream.Collectors;  
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