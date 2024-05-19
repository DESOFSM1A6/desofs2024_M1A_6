package pt.ipp.isep.dei.desofsnews.model;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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
    @UuidGenerator
    private String id;
    private String title;
    private String text;
    @Transient
    private List<Picture> picture;
    @Transient
    private List<Comment> comments;
    @Transient
    private List<Like> likes;
    private Calendar dateTime;
    @OneToOne
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private User author;

    public News(String title, String text, User author) {
        this.title = title;
        this.text = text;
        this.picture = new ArrayList<>();
        this.comments = new ArrayList<>();
        this.likes = new ArrayList<>();
        this.dateTime = Calendar.getInstance();
        this.author = author;
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