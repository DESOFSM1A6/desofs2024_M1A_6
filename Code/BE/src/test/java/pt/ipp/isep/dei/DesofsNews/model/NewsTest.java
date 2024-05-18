package pt.ipp.isep.dei.DesofsNews.model;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

import pt.ipp.isep.dei.desofsnews.app.DesofsNewsApplication;
import pt.ipp.isep.dei.desofsnews.model.Comment;
import pt.ipp.isep.dei.desofsnews.model.Like;
import pt.ipp.isep.dei.desofsnews.model.News;
import pt.ipp.isep.dei.desofsnews.model.Picture;
import pt.ipp.isep.dei.desofsnews.model.User;

@SpringBootTest
@ContextConfiguration(classes = { DesofsNewsApplication.class })
public class NewsTest {

    @Test
    void createNewsTest() {
        // Arrange
        List<Picture> pictures = new ArrayList<>();
        Picture picture = new Picture("urlPic1", "description1");
        pictures.add(picture);

        // Act
        News news = new News("text", pictures);

        // Assert
        assert (news.getText().equals("text"));
        assert (news.getPictures().size() == 1);
        assert (news.getPictures().get(0).getUrl().equals("urlPic1"));
        // asset that the date is today
        assert (news.getDateTime().get(Calendar.DAY_OF_MONTH) == Calendar.getInstance().get(Calendar.DAY_OF_MONTH));
        // assert that it was created with 0 comments and 0 likes
        assert (news.getComments().size() == 0);
        assert (news.getLikes().size() == 0);
    }

    @Test
    void addCommentAndRemoveTest() {
        // Arrange
        List<Picture> pictures = new ArrayList<>();
        Picture picture = new Picture("urlPic1", "description1");
        pictures.add(picture);
        News news = new News("text", pictures);

        // Act
        User user = new User();
        user.setUsername("username");
        user.setEmail("email");
        user.setId("id");
        Comment comment = new Comment(user, "text");
        news.addComment(comment);

        // Assert
        assert (news.countComments() == 1);
        assert (news.getComments().get(0).getText().equals("text"));

        // Act
        news.removeCommentByUserAndTime(user, comment.getDateTime());
        // Assert
        assert (news.getComments().size() == 0);
    }

    @Test
    void addUserAndRemoveLike() {
        // Arrange
        List<Picture> pictures = new ArrayList<>();
        Picture picture = new Picture("urlPic1", "description1");
        pictures.add(picture);
        News news = new News("text", pictures);

        // Act
        User user = new User();
        user.setUsername("username");
        user.setEmail("email");
        user.setId("id");
        news.addLike(user);

        // Assert
        assert (news.countLikes() == 1);
        assert (news.getLikes().get(0).getUser().equals(user));

        // Act
        news.removeLikeByUser(user);
        // Assert
        assert (news.getLikes().size() == 0);
    }

    @Test
    void editNewsTest() {
        // Arrange
        List<Picture> pictures = new ArrayList<>();
        Picture picture = new Picture("urlPic1", "description1");
        pictures.add(picture);
        News news = new News("text", pictures);

        // Act
        news.editText("newText");
        news.addPicture(new Picture("urlPic2", "description2"));

        // Assert
        assert (news.getText().equals("newText"));
        assert (news.getPictures().size() == 2);
        assert (news.getPictures().get(1).getUrl().equals("urlPic2"));
    }

    @Test
    void removeImageTest() {
        // Arrange
        List<Picture> pictures = new ArrayList<>();
        Picture picture = new Picture("urlPic1", "description1");
        pictures.add(picture);
        News news = new News("text", pictures);

        // Act
        news.removePictureByCaption("description1");
        // Assert
        assert (news.getPictures().size() == 0);
    }

    @Test
    void editCommentTest() {
        // Arrange
        List<Picture> pictures = new ArrayList<>();
        Picture picture = new Picture("urlPic1", "description1");
        pictures.add(picture);
        News news = new News("text", pictures);

        // Act
        User user = new User();
        user.setUsername("username");
        user.setEmail("email");
        user.setId("id");
        Comment comment = new Comment(user, "text");
        news.addComment(comment);
        news.getComments().get(0).editText("newText");


        // Assert
        assert (news.getComments().get(0).getText().equals("newText"));
        // assert that the date was updated
        assert (news.getComments().get(0).getDateTime().get(Calendar.DAY_OF_MONTH) == Calendar.getInstance().get(Calendar.DAY_OF_MONTH));
    }


    @Test
    void addLikeToComment(){
        // Arrange
        List<Picture> pictures = new ArrayList<>();
        Picture picture = new Picture("urlPic1", "description1");
        pictures.add(picture);
        News news = new News("text", pictures);

        // Act
        User user = new User();
        user.setUsername("username");
        user.setEmail("email");
        user.setId("id");
        Comment comment = new Comment(user, "text");
        news.addComment(comment);
        news.getComments().get(0).addLike(new Like(user));

        // Assert
        assert (news.getComments().get(0).getLikes().size() == 1);
    }

    @Test
    void removeLikeFromComment(){
        // Arrange
        List<Picture> pictures = new ArrayList<>();
        Picture picture = new Picture("urlPic1", "description1");
        pictures.add(picture);
        News news = new News("text", pictures);

        // Act
        User user = new User();
        user.setUsername("username");
        user.setEmail("email");
        user.setId("id");
        Comment comment = new Comment(user, "text");
        news.addComment(comment);
        news.getComments().get(0).addLike(new Like(user));
        news.getComments().get(0).removeLikeByUser(user);

        // Assert
        assert (news.getComments().get(0).getLikes().size() == 0);
    }
}
