package pt.ipp.isep.dei.desofsnews.model;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.hibernate.annotations.Cascade;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.NoArgsConstructor;

//TODO: add persistence to the now transient fields
@Entity
@NoArgsConstructor
@Table(name = "news")
public class News {
    @Id
    private String id;
    public String getId() {
        return id;
    }

    private String title;
    public String getTitle() {
        return title;
    }

    private String text;
    @OneToMany
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private List<Picture> picture;
    public List<Picture> getPicture() {
        return picture;
    }

    public void setPicture(List<Picture> picture) {
        this.picture = picture;
    }

    @Transient
    private List<Comment> comments;
    @Transient
    private List<Like> likes;
    private Calendar dateTime;
    @OneToOne
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private User author;
    private Status status;

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public News(String title, String text, User author, List<Picture> picture, Status status) {
        java.security.SecureRandom random = new java.security.SecureRandom();
        this.id = String.valueOf((int) (random.nextDouble()*1000));
        this.title = title;
        this.text = text;
        this.picture = picture;
        this.comments = new ArrayList<>();
        this.likes = new ArrayList<>();
        this.dateTime = Calendar.getInstance();
        this.author = author;
        this.status = status;
    }

    public String getText() {
        return this.text;
    }


    public List<Comment> getComments() {
        return this.comments;
    }

    public List<Like> getLikes() {
        return this.likes;
    }

    public Calendar getDateTime() {
        return this.dateTime;
    }

    public String editText(String text) {
        this.text = text;
        // update the date time
        this.dateTime = Calendar.getInstance();
        return this.text;
    }

    public User getWriter() {
        return this.author;
    }

}