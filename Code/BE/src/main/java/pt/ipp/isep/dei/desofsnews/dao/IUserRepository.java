package pt.ipp.isep.dei.desofsnews.dao;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

public interface IUserRepository extends CrudRepository<User, UUID> {

}
