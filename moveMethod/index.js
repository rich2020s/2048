import { useCallback } from "react";
import { useIds } from "../hook/useIds";
export const moveUp = (board, setBoard) => {
  //[0,0 ][0,1][0,2][0,3]
  const size = board.length;
  let newBoard = [...board];
  for (let i = 0; i < size; i++) {
    let counter = 0;
    for (let j = 1; j < size; j++) {
      if (newBoard[j][i].value === 0) continue;
      else if (newBoard[counter][i].value === 0) {
        newBoard[counter][i].value = newBoard[j][i].value;
        newBoard[counter][i].isBeenMerge = true;
        newBoard[j][i].position = newBoard[counter][i].position;
        // newBoard[j][i] = 0;
      } else if (newBoard[j][i].value === newBoard[counter][i].value) {
        newBoard[counter][i].value = newBoard[counter][i].value * 2;
        newBoard[j][i].position = newBoard[counter][i].position;
        // newBoard[j][i] = 0;
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

// export const moveUp = (board, setBoard) => {
//   //[0,0 ][0,1][0,2][0,3]
//   const size = board.length;
//   let newBoard = [...board];
//   for (let i = 0; i < size; i++) {
//     let counter = 0;
//     for (let j = 1; j < size; j++) {
//       if (newBoard[j][i].value === 0) continue;
//       else if (newBoard[counter][i].value === 0) {
//         newBoard[counter][i].value = newBoard[j][i].value;
//         newBoard[j][i].position = newBoard[counter][i].position;
//         // newBoard[j][i] = 0;
//       } else if (newBoard[j][i] === newBoard[counter][i]) {
//         newBoard[counter][i] = newBoard[counter][i] * 2;
//         newBoard[j][i] = 0;
//         counter++;
//       } else if (newBoard[j][i] !== newBoard[counter][i]) {
//         counter++;
//         if (counter === j) continue;
//         j = j - 1;
//         console.log(`${j}`);
//       } else {
//         console.log("err");
//       }
//     }
//   }
//   return newBoard;
// };
export const moveDown = (board, setBoard) => {
  const size = board.length;
  let newBoard = [...board];
  for (let i = 0; i < size; i++) {
    let counter = size - 1;
    for (let j = size - 2; j >= 0; j--) {
      if (newBoard[j][i].value === 0) continue;
      else if (newBoard[counter][i].value === 0) {
        newBoard[counter][i].value = newBoard[j][i].value;
        newBoard[j][i].position;
        // newBoard[j][i] = 0;
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
// export const moveDown = (board, setBoard) => {
//   const size = board.length;
//   let newBoard = [...board];
//   for (let i = 0; i < size; i++) {
//     let counter = size - 1;
//     for (let j = size - 2; j >= 0; j--) {
//       if (newBoard[j][i] === 0) continue;
//       else if (newBoard[counter][i] === 0) {
//         newBoard[counter][i] = newBoard[j][i];
//         newBoard[j][i] = 0;
//       } else if (newBoard[j][i] === newBoard[counter][i]) {
//         newBoard[counter][i] = newBoard[counter][i] * 2;
//         newBoard[j][i] = 0;
//         counter--;
//       } else if (newBoard[j][i] !== newBoard[counter][i]) {
//         counter--;
//         if (counter === j) continue;
//         j++;
//       } else {
//         console.log("err");
//       }
//       console.log(j);
//     }
//     console.log(counter, i);
//   }
//   return newBoard;
// };

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
export function generateNewTile(tiles) {
  let board = tileOnBoard(tiles);
  const newId = useIds;
  console.log(newId);
  if (isFull(board)) return board;
  let newBoard = [];
  board.map((rows, x) =>
    rows.map((tile, y) => {
      if (tile.value !== 0) return;
      newBoard.push([x, y]);
    })
  );
  const coordinate = newBoard[Math.floor(Math.random() * newBoard.length)];

  const newTile = {
    id: newId,
    value: generateRandomNumber(),
    position: [coordinate[0], coordinate[1]],
    isHighLight: true,
  };
  return newTile;
}
function createNewTile(newTiles) {
  let tiles = [...board.tiles];
  tiles.push(newTiles);
  setBoard({ ...board, tiles: tiles });
}
function isFull(board) {
  for (let row of board) {
    for (let ele of row) {
      if (ele.value === 0) return false;
    }
  }
  return true;
}
function generateRandomNumber() {
  const arr = [2, 2, 4];
  return arr[Math.floor(Math.random() * arr.length)];
}
function tileOnBoard(tiles) {
  let arr = createEmptyBoard();
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i].value) {
      let [x, y] = tiles[i].position;
      arr[x][y] = {
        ...tiles[i],
        value: tiles[i].value,
      };
    }
  }
  return arr;
}
function createEmptyBoard() {
  let arr = [];
  const size = 4;
  for (let i = 0; i < size; i++) {
    arr.push([]);
    for (let j = 0; j < size; j++) {
      arr[i].push({
        id: null,
        value: 0,
        position: [i, j],
        // isHighLight: false,
        // isBeenMerge: false,
      });
    }
  }
  return arr;
}
