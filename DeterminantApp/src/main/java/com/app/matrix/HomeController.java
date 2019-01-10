package com.app.matrix;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.Arrays;

import java.util.stream.Collectors;

import java.util.List;

@Controller
public class HomeController {
	
	@RequestMapping(value="/", method=RequestMethod.GET)
	String home() {
		return "index";
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping(value="/post/matrix", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<String> postMatrix(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		String matParam = request.getParameter("matrix");
		String size = request.getParameter("size");
		
		String matrixStr = matParam.replaceAll("\\]\\,\\[", ":");
		
		matrixStr = matrixStr.replace("[[", "");
		matrixStr = matrixStr.replace("]]", "");
		
		List<String[]> matrixArr = Arrays.asList(matrixStr.split(":")).stream().map(ele-> ele.split(",")).collect(Collectors.toList());
		
		Matrix m = new Matrix(Integer.parseInt(size));
		
		for(String[] row: matrixArr) {
			double[] matRow = Arrays.stream(row).mapToDouble(Double::parseDouble).toArray();
			m.addRow(matRow);
		}
		
		MatrixView mV = new MatrixView(m);
		Calculations c = new Calculations();
		double determinant = c.calculateDeterminant(mV);
		
		String resObj = "{\"success\":true, \"determinant\":" + Double.toString(determinant) + "}";
		return ResponseEntity.status(200).body(resObj);
	}
	
	
}
