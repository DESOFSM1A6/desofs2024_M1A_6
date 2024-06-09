package pt.ipp.isep.dei.desofsnews.repositories;

import java.util.Calendar;
import java.util.List;
import java.util.Optional;

import org.slf4j.LoggerFactory;

import ch.qos.logback.classic.Logger;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import pt.ipp.isep.dei.desofsnews.DTO.NewsDTO;
import pt.ipp.isep.dei.desofsnews.model.News;
import pt.ipp.isep.dei.desofsnews.model.Status;

public class NewsRepository implements INewsRepository {
    private static Logger logger = (Logger) LoggerFactory.getLogger(NewsRepository.class);

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public <S extends News> S save(S entity) {
        entityManager.persist(entity);
        return entity;
    }

    @Override
    public <S extends News> Iterable<S> saveAll(Iterable<S> entities) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'saveAll'");
    }

    @Override
    public Optional<News> findById(String id) {
        News news = entityManager.find(News.class, id);
        return Optional.ofNullable(news);
    }

    @Override
    public boolean existsById(String id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'existsById'");
    }

    @Override
    public Iterable<News> findAll() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAll'");
    }

    @Override
    public Iterable<News> findAllById(Iterable<String> ids) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAllById'");
    }

    @Override
    public long count() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'count'");
    }

    @Override
    public void deleteById(String id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteById'");
    }

    @Override
    public void delete(News entity) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'delete'");
    }

    @Override
    public void deleteAllById(Iterable<? extends String> ids) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteAllById'");
    }

    @Override
    public void deleteAll(Iterable<? extends News> entities) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteAll'");
    }

    @Override
    public void deleteAll() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteAll'");
    }

    @Override
    public List<News> getAllNews() {
        logger.info("Getting all news from the database");
        List<News> resultList = entityManager.createQuery("SELECT n FROM News n", News.class)
                .getResultList();
        return resultList;
    }

    @Override
    public List<News> getPendingNews() {
        // Get pending status
        return entityManager.createQuery("SELECT n FROM News n WHERE n.status = " + Status.PENDING.ordinal(), News.class)
                .getResultList();
    }

    @Override
    public NewsDTO getNewsOfTheDay(Calendar calendar) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getNewsOfTheDay'");
    }
}
