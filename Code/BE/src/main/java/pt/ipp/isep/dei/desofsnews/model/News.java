package pt.ipp.isep.dei.desofsnews.model;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

@Entity
@Table(name = "news")
public class News {
    @Id
    @UuidGenerator
    private String id;

    private String text;
    @Transient
    private List<Picture> picture;
    @Transient
    private List<Comment> comments;
    @Transient
    private List<Like> likes;
    private Calendar dateTime;

    public News(String text, List<Picture> picture) {
        this.text = text;
        this.picture = picture;
        this.comments = new ArrayList<>();
        this.likes = new ArrayList<>();
        this.dateTime = Calendar.getInstance();
    }

    public boolean addComment(Comment comment) {
        return this.comments.add(comment);
    }

    public boolean addLike(User user) {
        return this.likes.add(new Like(user));
    }
    
    public boolean removeLikeByUser(User user) {
        return this.likes.removeIf(like -> like.getUser().equals(user));
    }

    public String getText() {
        return this.text;
    }

    public List<Picture> getPictures() {
        return this.picture;
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

    public boolean addPicture(Picture picture) {
        return this.picture.add(picture);
    }

    public boolean removePictureByCaption(String caption) {
        return this.picture.removeIf(p -> p.getCaption().equals(caption));
    }

    public boolean removeCommentByUserAndTime(User user, Calendar dateTime) {
        return this.comments.removeIf(c -> c.getUser().equals(user) && c.getDateTime().equals(dateTime));
    }

    public int countLikes() {
        return this.likes.size();
    }

    public int countComments() {
        return this.comments.size();
    }



}