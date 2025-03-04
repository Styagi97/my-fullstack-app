package io.reflectoring.Login.Entity;
 
import java.util.Set;
import jakarta.persistence.*; 
import lombok.AllArgsConstructor; 
import lombok.Data;
import lombok.NoArgsConstructor;
 
@Entity
@Table(name = "user_Table")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String email;
    private String password;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "role")
    private Set<String> roles;
//   private String resetToken; 
} 