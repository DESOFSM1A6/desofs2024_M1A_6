package pt.ipp.isep.dei.desofsnews.model;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.NoArgsConstructor;

@Entity
@Embeddable
@NoArgsConstructor
public class User {

    @Id
    //@UuidGenerator
    private String id;
    private String username;
    private String email;

    public User(String username, String email) {
        this.id = String.valueOf((int) (Math.random() * 1000));
        this.username = username;
        this.email = email;
    }

    public String getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        // json format
        return "{\"id\":" + id + ",\"username\":\"" + username + "\",\"email\":\"" + email + "\"}";
    }

}
