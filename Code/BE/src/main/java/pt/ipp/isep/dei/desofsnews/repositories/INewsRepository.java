package pt.ipp.isep.dei.desofsnews.repositories;

import java.util.Calendar;
import java.util.List;

import org.springframework.data.repository.CrudRepository;

import pt.ipp.isep.dei.desofsnews.DTO.NewsDTO;
import pt.ipp.isep.dei.desofsnews.model.News;

public interface INewsRepository extends CrudRepository<News, String>{

    NewsDTO getNewsOfTheDay(Calendar calendar);

    List<News> getAllNews();

}
