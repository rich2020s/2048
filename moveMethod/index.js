export const moveUp = (board, setBoard) => {
  //[0,0 ][0,1][0,2][0,3]
  const size = board.length;
  let newBoard = [...board];
  for (let i = 0; i < size; i++) {
    let counter = 0;
    for (let j = 1; j < size; j++) {
      if (newBoard[j][i] === 0) continue;
      else if (newBoard[counter][i] === 0) {
        newBoard[counter][i] = newBoard[j][i];
        newBoard[j][i] = 0;
      } else if (newBoard[j][i] === newBoard[counter][i]) {
        newBoard[counter][i] = newBoard[counter][i] * 2;
        newBoard[j][i] = 0;
        counter++;
      } else if (newBoard[j][i] !== newBoard[counter][i]) {
        counter++;
        if (counter === j) continue;
        j = j - 1;
        console.log(`${j}`);
      } else {
        console.log("err");
      }
    }
  }
  return newBoard;
};

export const moveDown = (board, setBoard) => {
  const size = board.length;
  let newBoard = [...board];
  for (let i = 0; i < size; i++) {
    let counter = size - 1;
    for (let j = size - 2; j >= 0; j--) {
      if (newBoard[j][i] === 0) continue;
      else if (newBoard[counter][i] === 0) {
        newBoard[counter][i] = newBoard[j][i];
        newBoard[j][i] = 0;
      } else if (newBoard[j][i] === newBoard[counter][i]) {
        newBoard[counter][i] = newBoard[counter][i] * 2;
        newBoard[j][i] = 0;
        counter--;
      } else if (newBoard[j][i] !== newBoard[counter][i]) {
        counter--;
        if (counter === j) continue;
        j++;
      } else {
        console.log("err");
      }
      console.log(j);
    }
    console.log(counter, i);
  }
  return newBoard;
};

export const moveLeft = (board) => {
  const size = board.length;
  let newBoard = [...board];
  for (let i = 0; i < size; i++) {
    let counter = 0;
    for (let j = 1; j < size; j++) {
      if (newBoard[i][j] === 0) continue;
      else if (newBoard[i][counter] === 0) {
        newBoard[i][counter] = newBoard[i][j];
        newBoard[i][j] = 0;
      } else if (newBoard[i][j] === newBoard[i][counter]) {
        newBoard[i][counter] = newBoard[i][counter] * 2;
        newBoard[i][j] = 0;
        counter++;
      } else if (newBoard[i][j] !== newBoard[i][counter]) {
        counter++;
        if (counter === j) continue;
        j--;
      } else {
        console.log("err");
      }
      console.log(j);
    }
    // console.log(counter, i);
  }
  return newBoard;
};

export const moveRight = (board) => {
  const size = board.length;
  let newBoard = [...board];
  for (let i = 0; i < size; i++) {
    let counter = size - 1;
    for (let j = size - 2; j >= 0; j--) {
      if (newBoard[i][j] === 0) continue;
      else if (newBoard[i][counter] === 0) {
        newBoard[i][counter] = newBoard[i][j];
        newBoard[i][j] = 0;
      } else if (newBoard[i][j] === newBoard[i][counter]) {
        newBoard[i][counter] = newBoard[i][counter] * 2;
        newBoard[i][j] = 0;
        counter--;
      } else if (newBoard[i][j] !== newBoard[i][counter]) {
        counter--;
        if (counter === j) continue;
        j++;
      } else {
        console.log("err");
      }
      console.log(j);
    }
    // console.log(counter, i);
  }
  return newBoard;
};
