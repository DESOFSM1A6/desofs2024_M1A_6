package pt.ipp.isep.dei.DesofsNews.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.util.Calendar;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

import pt.ipp.isep.dei.desofsnews.DTO.NewsDTO;
import pt.ipp.isep.dei.desofsnews.app.DesofsNewsApplication;
import pt.ipp.isep.dei.desofsnews.repositories.NewsRepository;
import pt.ipp.isep.dei.desofsnews.service.IllegalSaveOperation;
import pt.ipp.isep.dei.desofsnews.service.NewsService;

@SpringBootTest
@ContextConfiguration(classes = {DesofsNewsApplication.class})
public class NewsServiceTest {

    @Test
    void addNewsTest() {
        //mocks the repository
        NewsRepository newsRepository = mock(NewsRepository.class);
        Mockito.when(newsRepository.save(any())).thenReturn(null);
        //creates the service
        NewsService newsService = new NewsService();

        //create th newsDTO
        Calendar now = Calendar.getInstance();
        NewsDTO newsDTO = new NewsDTO("News123","asdhdfhkdshfds",now,"Jose");

        assertEquals("News123", newsDTO.getTitle());
        assertEquals("asdhdfhkdshfds", newsDTO.getContent());
        assertEquals(now, newsDTO.getDateTime());
        assertEquals("Jose", newsDTO.getWriter());
        //calls the method to be tested

        newsService.setNewsRepository(newsRepository);
        try {
            newsService.addNews(newsDTO);
        } catch (IllegalSaveOperation e) {
            //fails the test if an exception is thrown
            assert(false);
        }
    }

    @Test
    void addNewsTestWithException() {
        //mocks the repository
        NewsRepository newsRepository = mock(NewsRepository.class);
        Mockito.when(newsRepository.save(any())).thenThrow(RuntimeException.class);
        //creates the service
        NewsService newsService = new NewsService();

        //create th newsDTO
        // Calendar now = Calendar.getInstance();
        NewsDTO newsDTO = new NewsDTO("News123","asdhdfhkdshfds",null,"Jose");
        //calls the method to be tested

        newsService.setNewsRepository(newsRepository);
        try {
            newsService.addNews(newsDTO);
            //fails the test if an exception is not thrown
            assert(false);
        } catch (IllegalSaveOperation e) {
            //fails the test if an exception is thrown
            assert(true);
        }
    }

    @Test
    void getNewsTest() {
        //mocks the repository
        NewsRepository newsRepository = mock(NewsRepository.class);
        Mockito.when(newsRepository.getNewsOfTheDay(any())).thenReturn(null);
        //creates the service
        NewsService newsService = new NewsService();

        //calls the method to be tested
        //expects an not implemented exception
        newsService.setNewsRepository(newsRepository);
        try {
            newsService.getNewsOfTheDay();
            //fails the test if an exception is not thrown
            assert(false);
        } catch (UnsupportedOperationException e) {
            //fails the test if an exception is thrown
            assert(true);
        }
    }

    @Test
    void getAllNewsTest() {
        //mocks the repository
        NewsRepository newsRepository = mock(NewsRepository.class);
        Mockito.when(newsRepository.getAllNews()).thenReturn(null);
        //creates the service
        NewsService newsService = new NewsService();

        //calls the method to be tested

        newsService.setNewsRepository(newsRepository);
        newsService.getAllNews();
        assert(true);
    }

    @Test
    void addNewsWithLikes(){
        //mocks the repository
        NewsRepository newsRepository = mock(NewsRepository.class);
        Mockito.when(newsRepository.save(any())).thenReturn(null);
        //creates the service
        NewsService newsService = new NewsService();

        //todays date
        Calendar now = Calendar.getInstance();
        //create th newsDTO
        NewsDTO newsDTO = new NewsDTO("News123","asdhdfhkdshfds",now,"Jose");
        //calls the method to be tested

        newsService.setNewsRepository(newsRepository);
        try {
            newsService.addNews(newsDTO);
        } catch (IllegalSaveOperation e) {
            //fails the test if an exception is thrown
            assert(false);
        }
    }
    
    @Test
    void updateNewsTest(){
        //mocks the repository
        NewsRepository newsRepository = mock(NewsRepository.class);
        Mockito.when(newsRepository.save(any())).thenReturn(null);
        //creates the service
        NewsService newsService = new NewsService();

        try{
            newsService.updateNews(0, null);
            assert(false);
        }catch(UnsupportedOperationException e){
            assert(true);
        }
    }

    @Test
    void deleteNewsTest(){
        //mocks the repository
        NewsRepository newsRepository = mock(NewsRepository.class);
        Mockito.when(newsRepository.save(any())).thenReturn(null);
        //creates the service
        NewsService newsService = new NewsService();

        try{
            newsService.deleteNews(0);
            assert(false);
        }catch(UnsupportedOperationException e){
            assert(true);
        }
    }
    @Test
    void getNewsByIdTest(){
        //mocks the repository
        NewsRepository newsRepository = mock(NewsRepository.class);
        Mockito.when(newsRepository.save(any())).thenReturn(null);
        //creates the service
        NewsService newsService = new NewsService();

        try{
            newsService.getNewsById(0);
            assert(false);
        }catch(UnsupportedOperationException e){
            assert(true);
        }
    }
}
