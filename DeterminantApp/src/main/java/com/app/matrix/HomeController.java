package com.app.matrix;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.PathVariable;

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
			int[] matRow = Arrays.stream(row).mapToInt(Integer::parseInt).toArray();
			m.addRow(matRow);
		}
		
		MatrixView mV = new MatrixView(m);
		Calculations c = new Calculations();
		int determinant = c.calculateDeterminant(mV);
		
		String resObj = "{\"success\":true, \"determinant\":" + Integer.toString(determinant) + "}";
		return ResponseEntity.status(200).body(resObj);
	}
	
	
}
