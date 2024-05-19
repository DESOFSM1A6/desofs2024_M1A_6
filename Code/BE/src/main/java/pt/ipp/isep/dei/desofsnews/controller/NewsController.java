package pt.ipp.isep.dei.desofsnews.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pt.ipp.isep.dei.desofsnews.DTO.NewsDTO;
import pt.ipp.isep.dei.desofsnews.service.INewsService;
import pt.ipp.isep.dei.desofsnews.service.IllegalSaveOperation;
import pt.ipp.isep.dei.desofsnews.service.NewsService;

@RestController
@RequestMapping("/news")
@Component
public class NewsController {

    @Autowired
    private INewsService newsService;

    // service getter and setter
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
    public ResponseEntity<List<NewsDTO>> getAllNews() {
        List<NewsDTO> news = newsService.getAllNews();
        return new ResponseEntity<>(news, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Void> addNews(@RequestBody NewsDTO article) {
        try {
            newsService.addNews(article);
        } catch (IllegalSaveOperation e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
