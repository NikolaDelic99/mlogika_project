package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;


@SpringBootApplication
@EntityScan("com.example.demo.model")
public class MlogikaSpringApplication extends SpringBootServletInitializer {
	
	public static void main(String[] args) {
		SpringApplication.run(MlogikaSpringApplication.class, args);
	}

}
