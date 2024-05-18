package pt.ipp.isep.dei.desofsnews.model;

import java.util.Calendar;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

@Entity
@Table(name = "likes")
public class Like {
    @Id
    
    private Long id;
    @Transient
    private User user;
    private Calendar date;

    public Like(User user) {
        this.user = user;
        this.date = Calendar.getInstance();
    }

    public User getUser() {
        return this.user;
    }

    public Calendar getDate() {
        return this.date;
    }

}
