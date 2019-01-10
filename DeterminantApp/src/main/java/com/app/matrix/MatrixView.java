package com.app.matrix;

import java.util.*;

public class MatrixView {
	final Matrix matrix;
	ArrayList<Integer> RIndex;
	ArrayList<Integer> CIndex;

	public MatrixView(Matrix matrix) throws Exception {
		if(matrix.isEmpty())
			throw new Exception("Error: Cannot parse Empty Matrix");
		this.RIndex = new ArrayList<Integer>(matrix.getRows());
		this.CIndex = new ArrayList<Integer>(matrix.getColumns());
		for(int i = 0; i < matrix.getRows(); ++i) {
			this.RIndex.add(i);
		}
		for(int i = 0; i < matrix.getColumns(); ++i) {
			this.CIndex.add(i);
		}
		this.matrix = matrix;
	}
	public MatrixView(MatrixView that) {
		this.matrix = that.matrix;
		this.RIndex = new ArrayList<Integer>(that.RIndex);
		this.CIndex = new ArrayList<Integer>(that.CIndex);
	}
	public MatrixView subMatrix(int rIndex, int cIndex) {
		MatrixView copyView = new MatrixView(this);
		copyView.RIndex.remove(rIndex);
		copyView.CIndex.remove(cIndex);
		return copyView;
	}
	
	public double getElement(int row, int col) {
		return matrix.getElement(RIndex.get(row), CIndex.get(col));
	}
	
	public int getRows() {
		return RIndex.size();
	}
	
	public int getColumns() {
		return CIndex.size();
	}
	
	
}
