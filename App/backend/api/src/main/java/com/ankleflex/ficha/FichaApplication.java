package com.ankleflex.ficha;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.web.config.EnableSpringDataWebSupport;

@SpringBootApplication
@EnableSpringDataWebSupport
public class FichaApplication {

	public static void main(String[] args) {
		SpringApplication.run(FichaApplication.class, args);
	}

}
