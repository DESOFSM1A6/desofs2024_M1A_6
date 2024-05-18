package pt.ipp.isep.dei.DesofsNews.service;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

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
    void addNews() {
        //mocks the repository
        NewsRepository newsRepository = mock(NewsRepository.class);
        Mockito.when(newsRepository.save(any())).thenReturn(null);
        //creates the service
        NewsService newsService = new NewsService();

        //create th newsDTO
        // Calendar now = Calendar.getInstance();
        NewsDTO newsDTO = new NewsDTO("asafadf",null, 0);
        //calls the method to be tested

        newsService.setNewsRepository(newsRepository);
        try {
            newsService.addNews(newsDTO);
        } catch (IllegalSaveOperation e) {
            //fails the test if an exception is thrown
            assert(false);
        }
    }
    
}