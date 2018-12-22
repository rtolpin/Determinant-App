package com.app.matrix;

import java.util.*;
import java.io.*;

public class Calculations {
	
	public int calculateDeterminant(MatrixView mView) throws Exception {
		int numCols = mView.getColumns();
		int s = 1;
		int sum = 0;
		if(numCols == 1)
			sum = mView.getElement(0, 0);
		else {
			for(int i = 0; i < numCols; ++i) {
				sum += s * mView.getElement(0, i) * calculateDeterminant(mView.subMatrix(0, i));
				s = -s;
			}
		}
		return sum;
	}
	
}
