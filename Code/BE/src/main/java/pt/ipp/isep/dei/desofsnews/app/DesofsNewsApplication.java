package pt.ipp.isep.dei.desofsnews.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ImportResource;
import org.springframework.web.bind.annotation.RequestMapping;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@SpringBootApplication
@ImportResource("classpath:beans.xml")
@EntityScan("pt.ipp.isep.dei.desofsnews.model")
@RequestMapping("api/v1")
public class DesofsNewsApplication {

	public static void main(String[] args) {

		SpringApplication.run(DesofsNewsApplication.class, args);
	}

	@Bean
	public OpenAPI openAPI() {
		return new OpenAPI().info(new Info().title("SpringDoc example")
				.description("SpringDoc application")
				.version("v0.0.1"));
	}
}
