package pt.ipp.isep.dei.desofsnews.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pt.ipp.isep.dei.desofsnews.DTO.NewsDTO;
import pt.ipp.isep.dei.desofsnews.model.News;
import pt.ipp.isep.dei.desofsnews.service.INewsService;
import pt.ipp.isep.dei.desofsnews.service.IllegalSaveOperation;
import pt.ipp.isep.dei.desofsnews.service.NewsService;

@RestController
@RequestMapping("/news")
@Component
public class NewsController {

    @Autowired
    private INewsService newsService;

    //service getter and setter
    public INewsService getNewsService() {
        return newsService;
    }

    public void setNewsService(INewsService newsService) {
        this.newsService = newsService;
    }

    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    @GetMapping
    public ResponseEntity<List<News>> getAllNews() {
        List<News> News = newsService.getAllNews();
        return new ResponseEntity<>(News, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<News> getNewsById(@PathVariable int id) {
        News News = newsService.getNewsById(id);
        if (News != null) {
            return new ResponseEntity<>(News, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Void> addNews(@RequestBody NewsDTO article) {
        try {
            newsService.addNews(article);
        } catch (IllegalSaveOperation e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateNews(@PathVariable int id, @RequestBody News article) {
        newsService.updateNews(id, article);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNews(@PathVariable int id) {
        newsService.deleteNews(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
