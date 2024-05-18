package pt.ipp.isep.dei.desofsnews.service;

import java.util.List;

import pt.ipp.isep.dei.desofsnews.DTO.NewsDTO;
import pt.ipp.isep.dei.desofsnews.model.News;

public interface INewsService {

    String getNewsOfTheDay();

    List<News> getAllNews();

    News getNewsById(int id);

    void addNews(NewsDTO article);

    void updateNews(int id, News article);

    void deleteNews(int id);

}
