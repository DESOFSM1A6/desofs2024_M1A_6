package pt.ipp.isep.dei.desofsnews.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import pt.ipp.isep.dei.desofsnews.dao.IUserRepository;
import pt.ipp.isep.dei.desofsnews.dao.User;

@RestController
@Component
public class SampleController {

    @Autowired
    private IUserRepository userRepository;

    public IUserRepository getUserRepository() {
        return userRepository;
    }

    public void setUserRepository(IUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping(path = "/addUsers") // Map ONLY POST Requests
    public @ResponseBody String addNewUserOp(@RequestParam String name, @RequestParam String email) {

        User n = new User();
        n.setUsername(name);
        n.setEmail(email);
        User save = userRepository.save(n);

        // return the object saved
        return save.toString();
    }

    @GetMapping(path = "/allUsers")
    public @ResponseBody Iterable<User> getAllUsersOp() {
        // This returns a JSON or XML with the users
        return userRepository.findAll();
    }

}
