package pt.ipp.isep.dei.desofsnews.model;

import java.util.Calendar;

import jakarta.persistence.Entity;

@Entity
public class Like {
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
