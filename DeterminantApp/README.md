# Determinant App
Spring REST Backend and React Frontend for calculating determinant of a Matrix.

Frontend:
1. Enters size of square matrix
2. Matrix appears to fill in values for matrix. 
3. Matrix values stored as an Array of Arrays.
4. Send Matrix values to backend to calculate determinant.

Backend:
1. Gets Matrix and size of Matrix passed as parameters in POST request body 
2. Creates new Matrix Object
3. Creates new instances of MatrixView to calculate determinant recursively
4. Returns calculated Determinant in Response Body

Build:
1. Uses Webpack to build the application, and serve the dynamic JavaScript to load React
