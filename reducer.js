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
} from "./actionType";
import {
  generateNewTile,
  createInitialTilesArr,
  insertNewTile,
  tileOnBoard,
  moveUp,
  moveLeft,
  moveDown,
  moveRight,
} from "./moveMethod";
import { idCounter } from "./hook/useIds";
import { interpolateAs } from "next/dist/shared/lib/router/router";

const initialArr = createInitialTilesArr();
export const initialState = {
  tiles: [...initialArr],
  newTiles: [],
  inMotion: false,
  score: 0,
};
export const reducer = (state, action) => {
  const currentBoard = tileOnBoard(state.tiles);
  let newTiles;
  switch (action.type) {
    case CREATE_NEW_TILE:
      const newTile = generateNewTile(state.tiles);
      const { tiles } = state;
      const nextArr = insertNewTile(tiles, newTile);
      return {
        ...state,
        tiles: [...nextArr],
      };
    case MOVE_UP:
      console.log(state.tiles);
      let boardAfterMoveUp;
      [boardAfterMoveUp, newTiles] = moveUp(currentBoard);
      return {
        ...state,
        tiles: boardAfterMoveUp,
        newTiles,
      };
    case MOVE_LEFT:
      // const currentBoard = tileOnBoard(state.tiles);
      let boardAfterMoveLeft;
      [boardAfterMoveLeft, newTiles] = moveLeft(currentBoard);
      return {
        ...state,
        tiles: boardAfterMoveLeft,
        newTiles,
      };
    case MOVE_DOWN:
      let boardAfterMoveDown;
      [boardAfterMoveDown, newTiles] = moveDown(currentBoard);
      return {
        ...state,
        tiles: boardAfterMoveDown,
        newTiles,
      };
    case MOVE_RIGHT:
      let boardAfterMoveRight;
      [boardAfterMoveRight, newTiles] = moveRight(currentBoard);
      return {
        ...state,
        tiles: boardAfterMoveRight,
        newTiles,
      };
    case UPDATE_TILE:
      console.log("start update");
      // const score = state.newTiles.reducer(
      //   (pre, current) => pre.value + current.value,
      //   0
      // );
      let { score } = state;
      let updateTiles = state.tiles.map((tile) => {
        if (tile.isMerged) {
          return {
            id: null,
            value: null,
          };
        }
        return tile;
      });
      // console.log(state.newTiles);
      console.log(updateTiles);
      const newTilesAfterMerged = state.newTiles;
      console.log(newTilesAfterMerged);
      for (let i = 0; i < newTilesAfterMerged.length; i++) {
        for (let j = 0; j < updateTiles.length; j++) {
          if (updateTiles[j].value === null) {
            // console.log(newTilesAfterMerged[i]);
            updateTiles[j] = {
              ...newTilesAfterMerged[i],
            };
            if (newTilesAfterMerged[i]) score += newTilesAfterMerged[i].value;
            i++;
          }
          if (i >= newTilesAfterMerged.length) break;
        }
      }
      console.log("end update");
      return {
        ...state,
        tiles: updateTiles,
        newTiles: [],
        score,
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

// function tileOnBoard(tiles) {
//   const newBoard = createEmptyBoard();
//   for (let i = 0; i < tiles.length; i++) {
//     if (tiles[i].value) {
//       let [x, y] = tiles[i].position;
//       newBoard[x][y] = {
//         ...tiles[i],
//         id: tiles[i].id,
//         value: tiles[i].value,
//         indexInArr: i,
//       };
//     }
//   }
//   return newBoard;
// }
// function createEmptyBoard() {
//   let arr = [];
//   const size = 4;
//   for (let i = 0; i < size; i++) {
//     arr.push([]);
//     for (let j = 0; j < size; j++) {
//       arr[i].push({
//         id: null,
//         value: null,
//       });
//     }
//   }
//   return arr;
// }
// function createEmptyTilesArr() {
//   let emptyArr = [];
//   for (let i = 0; i < 16; i++) {
//     emptyArr.push({ id: null, value: null });
//   }
//   return emptyArr;
// }
// function insertNewTile(originArr, newTile) {
//   let nextArr = [...originArr];
//   for (let i = 0; i < nextArr.length; i++) {
//     // console.log(ele);
//     // console.log(newTile);
//     if (nextArr[i].value === null) {
//       nextArr[i] = {
//         ...newTile,
//       };
//       break;
//     }
//   }
//   return nextArr;
// }
// function createInitialTilesArr() {
//   let initialArr = createEmptyTilesArr();
//   initialArr[0] = {
//     id: 4,
//     value: 2,
//     position: [2, 0],
//   };
//   initialArr[4] = {
//     id: 1,
//     value: 2,
//     position: [0, 0],
//   };
//   initialArr[8] = {
//     id: 2,
//     value: 2,
//     position: [1, 0],
//   };
//   initialArr[12] = {
//     id: 3,
//     value: 2,
//     position: [3, 0],
//   };
//   return initialArr;
// }
