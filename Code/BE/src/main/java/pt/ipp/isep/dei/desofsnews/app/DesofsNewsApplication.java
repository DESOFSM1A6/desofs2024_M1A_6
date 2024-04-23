package pt.ipp.isep.dei.desofsnews.app;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ImportResource;
import org.springframework.web.bind.annotation.RequestMapping;

@SpringBootApplication
@ImportResource("classpath:beans.xml")
@ComponentScan(basePackages = "pt.ipp.isep.dei.desofsnews")
@RequestMapping("api/v1")
public class DesofsNewsApplication {

	private static String message;

	public static String getMessage() {
		return message;
	}

	public static void setMessage(String message) {
		DesofsNewsApplication.message = message;
	}

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
