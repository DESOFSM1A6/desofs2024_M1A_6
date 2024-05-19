package pt.ipp.isep.dei.DesofsNews.model;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

import pt.ipp.isep.dei.desofsnews.app.DesofsNewsApplication;
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
        assertEquals(pictures.get(0).getCaption(), "description1");

        // Act
        News news = new News("text", "sdds", new User("username", "email"));

        // Assert
        assertEquals(news.getText(), "sdds"); // asset that the date is today
        assertEquals(news.getDateTime().get(Calendar.DAY_OF_MONTH), Calendar.getInstance().get(Calendar.DAY_OF_MONTH));
        // assert that it was created with 0 comments and 0 likes
        assertEquals(news.getComments().size(), 0);
        assertEquals(news.getLikes().size(), 0);
        assertEquals(news.getWriter().getUsername(), "username");
        assertEquals(news.getWriter().getEmail(), "email");
    }

    @Test
    void editNewsTest() {
        News news = new News("text", "sdds", new User("username", "email"));
        assertEquals("sdds", news.getText());
        news.editText("dfsdjfsd");
        assertEquals("dfsdjfsd", news.getText());
    }

}