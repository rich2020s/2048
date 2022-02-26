import {
  CREATE_NEW_TILE,
  MOVE_UP,
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  START_MOVE,
  END_MOVE,
} from "./actionType";
import { generateNewTile } from "./moveMethod";

export const initialState = {
  tiles: [
    { id: 1, value: 2, position: [1, 0], isHighLight: true },
    { id: 2, value: 2, position: [0, 0], isHighLight: true },
  ],
  inMotion: false,
};
export const reducer = (state, action) => {
  switch (action.type) {
    case CREATE_NEW_TILE:
      const newTile = generateNewTile(state.tiles);
      return {
        ...state,
        tiles: [...state.tiles, newTile],
      };
    case MOVE_UP:
      const currentBoard = tileOnBoard(state.tiles);
      const newBoard = moveUp(currentBoard);
      return {
        ...state,
        tiles: newTiles,
      };
    case START_MOVE:
      return {
        ...state,
        inMotion: true,
      };
    case END_MOVE:
      return {
        ...state,
        inMotion: false,
      };
  }
};

export const moveUp = (board) => {
  //[0,0 ][0,1][0,2][0,3]
  const size = board.length;
  let newBoard = [...board];
  for (let i = 0; i < size; i++) {
    let counter = 0;
    for (let j = 1; j < size; j++) {
      if (newBoard[j][i].value === 0) continue;
      else if (newBoard[counter][i].value === 0) {
        newBoard[counter][i].value = newBoard[j][i].value;
        // newBoard[counter][i].isBeenMerge = true;
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

function tileOnBoard(tiles) {
  const newBoard = createEmptyBoard();
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i].value) {
      let [x, y] = tiles[i].position;
      newBoard[x][y] = {
        ...tiles[i],
        id: tiles.id,
        value: tiles[i].value,
      };
    }
  }
  return newBoard;
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
