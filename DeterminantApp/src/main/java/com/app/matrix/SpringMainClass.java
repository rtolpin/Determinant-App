package com.app.matrix;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class SpringMainClass {
	public static void main(String[] args) throws Exception {
		SpringApplication.run(SpringMainClass.class, args);
	}
//		ApplicationContext context = new ClassPathXmlApplicationContext("Beans.xml");
//
//		Matrix m = (Matrix)context.getBean("Matrix");
//		
//		int[] r1 = {2,3};
//		int[] r2 = {4,5};
//		m.addRow(r1);
//		m.addRow(r2);
//		
//		m.printMatrix();

}
