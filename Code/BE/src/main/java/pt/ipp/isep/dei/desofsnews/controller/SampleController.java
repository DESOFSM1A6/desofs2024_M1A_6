package pt.ipp.isep.dei.desofsnews.controller;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pt.ipp.isep.dei.desofsnews.app.DesofsNewsApplication;

@RestController
@EnableAutoConfiguration
@Component
@RequestMapping("/object")
public class SampleController {

 // endpoint that returns simple string
    @GetMapping("/message")
    public String getMessage() {
        return DesofsNewsApplication.getMessage();
    }

}
