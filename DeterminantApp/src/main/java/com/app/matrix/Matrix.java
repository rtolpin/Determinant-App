package com.app.matrix;

import java.util.*;

import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

public class Matrix {
	int[][] matrix;
	int rows;
	int columns;
	int rowCounter;

	public Matrix(int d) {
		this.matrix = new int[d][d];
		this.rows = d;
		this.columns = d;
		this.rowCounter = 0;
	}
	
	public int getRows() {
		return rows;
	}
	
	public int getColumns() {
		return columns;
	}
	
	public int getElement(int row, int col) {
		return matrix[row][col];
	}
	
	public boolean isEmpty() {
		if(rowCounter == 0)
			return true;
		return false;
	}
	
	public void addRow(int[] newRow) throws Exception {
		if(newRow.length != columns)
			throw new Exception("Error: Row must be of length " + columns);
		if(rowCounter == 0) { 
			matrix[0] = newRow;
			++rowCounter;
		}else if(rowCounter == rows) {
			throw new Exception("Error: matrix is full, cannot append row");
		}else {
			matrix[rowCounter] = newRow;
			++rowCounter;
		}
	}
	
	public void addColumn(int[] newCol, int colNum) throws Exception {
		if(newCol.length != rows)
			throw new Exception("Error: Column must be of length " + rows);
		if(colNum > (columns - 1)) {
			throw new Exception("Error: column number is out of bounds " + colNum);
		}
		for(int i = 0; i < rows; ++i) {
			matrix[i][colNum] = newCol[i];
		}
	}
	
	public void printMatrix() {
		for(int[] row: matrix) {
			System.out.print(Arrays.toString(row) + "\n");
		}
	}
	
}
