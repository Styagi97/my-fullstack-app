package io.reflectoring.Login.Repository;

import io.reflectoring.Login.Entity.User; 
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository; 

/**
 *
 * @author uday enter
 */  
public interface UserRepository  extends JpaRepository<User,Long>{
    
     Optional<User> findByEmail(String email);
      
//     Optional<User> findByResetToken(String resetToken);

      List<User> findByRolesContaining(String role); 
}
