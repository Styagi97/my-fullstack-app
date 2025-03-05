 
package io.reflectoring.Login.Entity;

import lombok.Data;
 

@Data
public class ResetPasswordRequest {
    private String token;
    private String newPassword;
}