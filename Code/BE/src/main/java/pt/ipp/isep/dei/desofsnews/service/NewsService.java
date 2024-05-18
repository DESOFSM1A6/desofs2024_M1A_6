package pt.ipp.isep.dei.desofsnews.service;

import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import pt.ipp.isep.dei.desofsnews.DTO.NewsDTO;
import pt.ipp.isep.dei.desofsnews.model.News;
import pt.ipp.isep.dei.desofsnews.repositories.INewsRepository;

@Transactional
public class NewsService implements INewsService {
    @Autowired
    private INewsRepository newsRepository;

    public INewsRepository getNewsRepository() {
        return newsRepository;
    }

    public void setNewsRepository(INewsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }

    @Override
    public String getNewsOfTheDay() {
        //gets the date of the day
        Calendar calendar = Calendar.getInstance();
        
        newsRepository.getNewsOfTheDay(calendar);
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getNewsOfTheDay'");
    }

    @Override
    public List<News> getAllNews() {
        System.out.println("Getting all news");
        newsRepository.getAllNews();
        return null;
    }

    @Override
    public News getNewsById(int id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getNewsById'");
    }

    @Override
    public void addNews(NewsDTO article) {
       //print the content of the article
        System.out.println(article.getText());
        //create the news object
        News news = new News(article.getText(), null);
        addLikesToNews(article, news);


        //save the news object
        newsRepository.save(news);
    }

    private void addLikesToNews(NewsDTO article, News news) {
        for(int i =0; i < article.getLikes(); i++) {
            news.addLike(null);
        }
    }

    @Override
    public void updateNews(int id, News article) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateNews'");
    }

    @Override
    public void deleteNews(int id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteNews'");
    }

}
