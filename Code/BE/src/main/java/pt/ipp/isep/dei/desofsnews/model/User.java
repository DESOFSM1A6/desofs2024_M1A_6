package pt.ipp.isep.dei.desofsnews.model;

import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class User {

    @Id
    @UuidGenerator
    private String id;
    private String username;
    private String email;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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
