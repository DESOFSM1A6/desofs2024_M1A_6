package pt.ipp.isep.dei.desofsnews.repositories;

import org.springframework.data.repository.CrudRepository;

import pt.ipp.isep.dei.desofsnews.model.User;

public interface IUserRepository extends CrudRepository<User, String> {

}
