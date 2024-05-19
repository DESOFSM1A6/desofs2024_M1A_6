package pt.ipp.isep.dei.desofsnews.repositories;

import java.util.List;
import java.util.Optional;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import pt.ipp.isep.dei.desofsnews.model.User;

public class UserRepository implements IUserRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public long count() {
        Long singleResult = entityManager.createQuery("SELECT COUNT(u) FROM User u", Long.class).getSingleResult();
        return singleResult;
    }

    @Override
    public void delete(User entity) {
        entityManager.remove(entity);
    }

    @Override
    public void deleteAll() {
        int executeUpdate = entityManager.createQuery("DELETE FROM User u").executeUpdate();

        if (executeUpdate == 0) {
            throw new IllegalArgumentException("No user with the given id exists");
        }
    }

    @Override
    public void deleteAll(Iterable<? extends User> entities) {
        int executeUpdate = entityManager.createQuery("DELETE FROM User u WHERE u IN :entities")
                .setParameter("entities", entities)
                .executeUpdate();

        if (executeUpdate == 0) {
            throw new IllegalArgumentException("No user with the given id exists");
        }
    }

    @Override
    public void deleteAllById(Iterable<? extends String> ids) {
        int executeUpdate = entityManager.createQuery("DELETE FROM User u WHERE u.id IN :ids")
                .setParameter("ids", ids)
                .executeUpdate();

        if (executeUpdate == 0) {
            throw new IllegalArgumentException("No user with the given id exists");
        }
    }

    @Override
    public void deleteById(String id) {
        entityManager.remove(entityManager.find(User.class, id));
    }

    @Override
    public boolean existsById(String id) {
        User user = entityManager.find(User.class, id);
        return user != null;
    }

    @Override
    public Iterable<User> findAll() {
        List<User> resultList = entityManager.createQuery("SELECT u FROM User u", User.class).getResultList();
        return resultList;
    }

    @Override
    public Iterable<User> findAllById(Iterable<String> ids) {
        TypedQuery<User> setParameter = entityManager.createQuery("SELECT u FROM User u WHERE u.id IN :ids", User.class)
                .setParameter("ids", ids);
        return setParameter.getResultList();
    }

    @Override
    public Optional<User> findById(String id) {
        User user = entityManager.find(User.class, id);
        return Optional.ofNullable(user);
    }

    @Override
    @Transactional
    public <S extends User> S save(S entity) {
        entityManager.persist(entity);
        return entity;
    }

    @Override
    public <S extends User> Iterable<S> saveAll(Iterable<S> entities) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'saveAll'");
    }

}
