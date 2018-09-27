module.exports = function solveSudoku(matrix) {
  const BLANK = 0;
  const LEN = 9;
  const BOX = 3;

  let result = false;

  function isUsedInRow (matrix, row, num) {
    for (let col = 0; col < LEN; col++) {
      if (matrix[row][col] == num) {
        return true;
      }
    }
    return false;
  }

  function isUsedInCol (matrix, col, num) {
    for (let row = 0; row < LEN; row++) {
      if (matrix[row][col] == num) {
        return true;
      }
    }
    return false;
  }

  function isUsedInBox (matrix, rowBox, colBox, num) {
    for (let row = 0; row < BOX; row++) {
      for (let col = 0; col < BOX; col++) {
        if (matrix[colBox + col][rowBox + row] == num) {
          return true;
        }
      }
    }
    return false;
  }

  /*checks if first three functions isUsedInRow..etc. are valid
  and if it's available to assign a new num to the given row, col*/
  function isValid (matrix, row, col, num) {
    if (!isUsedInCol(matrix, col, num)
        && !isUsedInRow(matrix, row, num)
        && !isUsedInBox(matrix, col - col%BOX, row - row%BOX, num)) {
          return true;
        }
    return false;
  }

  function makePair (row , col) {
    let pos = new Array(2);
    pos[0] = row;
    pos[1] = col;
    return pos;
  }

  /*searches for unset position in the given matrix */
  function getUnsetPos(matrix) {
    for (let row = 0; row < LEN; row++) {
      for (let col = 0; col < LEN; col++) {
        if (matrix[row][col] == BLANK) {
          return makePair(row, col);
        }
      }
    }
    return true;
  }

  /*if the matrix is full return it*/
  if (getUnsetPos(matrix) == true) {
    return true;
  }

  let pos = getUnsetPos(matrix);

  let row = pos[0];
  let col = pos[1];

  for (let num = 1; num <= 9; num++) {
    if (isValid(matrix, row, col ,num)){
      matrix[row][col] = num;
      if (solveSudoku(matrix)) {
        return matrix;
      }
    }
    matrix[row][col] = BLANK;
  }
  return false;
}
