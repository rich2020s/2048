import {
  CREATE_NEW_TILE,
  MOVE_UP,
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  START_MOVE,
  UPDATE_TILE,
  END_MOVE,
  RESET_BOARD,
  CLEAR_EFFECT,
  REDO_BOARD,
} from "./actionType";
import { generateNewTile } from "./moveMethod";
import { idCounter } from "./hook/useIds";
const newId = idCounter();
let tmp;
export const initialState = {
  tiles: [
    { id: 1, value: 2, position: [2, 0], isHighLight: true },
    { id: 2, value: 2, position: [1, 2], isHighLight: true },
  ],
  newTiles: [],
  inMotion: false,
  score: 0,
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
      console.log(state.tiles);
      tmp = { ...state };
      const currentBoard = tileOnBoard(state.tiles);
      const [nextBoard, newTiles] = moveUp(currentBoard);
      return {
        ...state,
        tiles: nextBoard,
        newTiles,
      };
    case UPDATE_TILE:
      console.log("start update");
      // const score = state.newTiles.reducer(
      //   (pre, current) => pre.value + current.value,
      //   0
      // );
      let newScore = state.score;
      let updateTiles = state.tiles.filter((tile) => !tile.isMerged);
      console.log(state.newTiles);
      // console.log(state.newTiles);
      state.newTiles.forEach((tile) => {
        updateTiles.push(tile);
        if (tile.value !== null) newScore += tile.value;
      });
      updateTiles.sort((a, b) => a.id - b.id);
      console.log("end update");
      return {
        ...state,
        tiles: updateTiles,
        newTiles: [],
        score: newScore,
      };
    case CLEAR_EFFECT:
      let clearTilesEffect = state.tiles.map((tile) => {
        return {
          ...tile,
          isHighLight: false,
        };
      });
      return {
        ...state,
        tiles: clearTilesEffect,
      };
    case REDO_BOARD:
      return {
        ...tmp,
      };
    case RESET_BOARD:
      return {
        ...initialState,
      };

    case START_MOVE:
      console.log("start move");
      return {
        ...state,
        inMotion: true,
      };
    case END_MOVE:
      console.log("end move");
      return {
        ...state,
        inMotion: false,
      };
  }
};

const moveUp = (board) => {
  let tileContainer = [];
  let tileBeenMerged = [];
  const size = board.length;
  let newBoard = [...board];

  for (let i = 0; i < size; i++) {
    let counter = 0;
    for (let j = 1; j < size; j++) {
      const { id, value } = newBoard[j][i];
      if (newBoard[j][i].value === null) continue;
      else if (newBoard[counter][i].value === null) {
        console.log(newBoard[j][i], newBoard[counter][i]);
        // newBoard[j][i].position = [counter, i];
        newBoard[counter][i] = {
          ...newBoard[j][i],
          position: [counter, i],
          isHighLight: false,
        };
        newBoard[j][i] = { id: null, value: null };
        console.log(newBoard[j][i], newBoard[counter][i]);
      } else if (newBoard[j][i].value === newBoard[counter][i].value) {
        tileContainer.push({
          id,
          value,
          position: [counter, i],
          isMerged: true,
        });
        tileBeenMerged.push({
          id: newId(),
          value: value * 2,
          position: [counter, i],
          isHighLight: true,
        });
        newBoard[j][i] = { value: null };
        newBoard[counter][i].isMerged = true;
        console.log(newBoard[j][i], newBoard[counter][i]);
        counter++;
      } else if (newBoard[j][i].value !== newBoard[counter][i].value) {
        counter++;
        if (counter === j) continue;
        j = j - 1;
        console.log(`${j}`);
      } else {
        console.log("err");
      }
    }
  }
  for (let rows of newBoard) {
    for (let tile of rows) {
      if (tile.value) tileContainer.push(tile);
    }
  }
  tileContainer.sort((a, b) => {
    return a.id - b.id;
  });
  console.log(tileContainer);
  return [tileContainer, tileBeenMerged];
};

function tileOnBoard(tiles) {
  const newBoard = createEmptyBoard();
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i].value) {
      let [x, y] = tiles[i].position;
      newBoard[x][y] = {
        ...tiles[i],
        id: tiles[i].id,
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
        value: null,
      });
    }
  }
  return arr;
}
function createNewTile(newTiles) {
  let tiles = [...board.tiles];
  tiles.push(newTiles);
  setBoard({ ...board, tiles: tiles });
}
