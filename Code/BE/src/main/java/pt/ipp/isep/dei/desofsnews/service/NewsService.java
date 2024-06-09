package pt.ipp.isep.dei.desofsnews.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import pt.ipp.isep.dei.desofsnews.DTO.NewsDTO;
import pt.ipp.isep.dei.desofsnews.model.News;
import pt.ipp.isep.dei.desofsnews.model.Picture;
import pt.ipp.isep.dei.desofsnews.model.Status;
import pt.ipp.isep.dei.desofsnews.model.User;
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
        throw new UnsupportedOperationException("Unimplemented method 'getNewsOfTheDay'");
    }

    @Override
    public List<NewsDTO> getAllNews() {

        List<News> allNews = newsRepository.getAllNews();
        // create a list of newsDTO
        List<NewsDTO> newsDTOList = new ArrayList<>();
        for (News news : allNews) {
            NewsDTO newsDTO = new NewsDTO(null, news.getText(), " ", news.getDateTime(), news.getWriter().getUsername(),
                    null, null);
            newsDTOList.add(newsDTO);
        }
        return newsDTOList;
    }

    @Override
    public News getNewsById(int id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getNewsById'");
    }

    @Override
    public News addNews(NewsDTO article) throws IllegalSaveOperation {

        // find the author of the news
        User author = new User(article.getWriter(), "dev@null.com");
        List<Picture> pictures = getPicturesFromDTO(article);
        // create the news object
        News news = new News(article.getTitle(), article.getContent(), author, pictures, article.getStatus());

        // save the news object
        try {
            newsRepository.save(news);
        } catch (Exception e) {
            throw new IllegalSaveOperation("Error saving news", e);
        }
        return news;
    }

    private List<Picture> getPicturesFromDTO(NewsDTO article) {
        List<Picture> pictures = new ArrayList<>();
        if (article.getImageUrl() != null && !article.getImageUrl().isEmpty()) {
            for (String image : article.getImageUrl()) {
                Picture picture = new Picture(image, article.getTitle());
                pictures.add(picture);
            }
        }
        return pictures;
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

    @Override
    public NewsDTO approveNews(String id) {
        // get news by id from DB
        Optional<News> original = this.newsRepository.findById(id);
        if (original.isPresent()) {
            News news = original.get();
            news.setStatus(Status.APPROVED);
            // save on db
            this.newsRepository.save(news);
            List<String> image = news.getPicture().stream().map(Picture::getUrl).collect(Collectors.toList());
            return new NewsDTO(Long.valueOf(news.getId()), news.getTitle(), news.getText(),
                    news.getDateTime(),
                    news.getWriter().getUsername(), news.getStatus(), image);
        }

        return null;
    }

    @Override
    public List<NewsDTO> getPendingNews() {
        List<News> pendingNews = this.newsRepository.getPendingNews();
        // maps the object to the dto
        List<NewsDTO> dtos = new ArrayList<>();
        for (News news : pendingNews) {
            List<String> image = news.getPicture().stream().map(Picture::getUrl).collect(Collectors.toList());
            NewsDTO dto = new NewsDTO(Long.valueOf(news.getId()), news.getTitle(), news.getText(),
                    news.getDateTime(),
                    news.getWriter().getUsername(), news.getStatus(), image);
            dtos.add(dto);
        }
        return dtos;
    }

}
