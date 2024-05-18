package pt.ipp.isep.dei.desofsnews.model;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

@Entity
public class Comment {
    private User user;
    private String text;
    private List<Comment> responses;
    @OneToMany
    private List<Like> likes;
    private Calendar dateTime;

    public Comment(User user, String text) {
        this.user = user;
        this.text = text;
        this.responses = new ArrayList<>();
        this.likes = new ArrayList<>();
        this.dateTime = Calendar.getInstance();
    }

    public boolean addResponse(Comment response) {
        return this.responses.add(response);
    }

    public boolean addLike(Like like) {
        return this.likes.add(like);
    }

    public boolean removeLikeByUser(User user) {
        return this.likes.removeIf(like -> like.getUser().equals(user));
    }

    public User getUser() {
        return this.user;
    }

    public String getText() {
        return this.text;
    }

    public String editText(String text) {
        this.text = text;
        // update the date time
        this.dateTime = Calendar.getInstance();
        return this.text;
    }

    public List<Comment> getResponses() {
        return this.responses;
    }

    public List<Like> getLikes() {
        return this.likes;
    }

    public Calendar getDateTime() {
        return this.dateTime;
    }

    public int countLikes() {
        return this.likes.size();
    }

    public boolean removeResponseByUserAndTime(User user, Calendar dateTime) {
        return this.responses.removeIf(c -> c.getUser().equals(user) && c.getDateTime().equals(dateTime));
    }

    public int countResponses() {
        return this.responses.size();
    }
}
