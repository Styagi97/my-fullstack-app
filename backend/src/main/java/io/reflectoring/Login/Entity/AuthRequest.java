package io.reflectoring.Login.Entity;

import java.util.Set;
import lombok.Data;
 
@Data
public class AuthRequest {

    private String username;
    private String email;
    private String password; 
    private Set<String> roles;

    public AuthRequest(String username, String email, String password, Set<String> roles) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }
    
}
