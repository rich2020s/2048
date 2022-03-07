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
  IS_OVER,
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
  isFull,
} from "./moveMethod";
import { isOver } from "./checkIsOver";
const initialArr = createInitialTilesArr();
export const initialState = {
  tiles: [...initialArr],
  newTiles: [],
  inMotion: false,
  isChanged: false,
  score: 0,
  isGameOver: false,
};

export const reducer = (state, action) => {
  const { tiles } = state;
  const currentBoard = tileOnBoard(tiles);
  let newTiles;
  let isChanged;
  switch (action.type) {
    case CREATE_NEW_TILE:
      if (state.isChanged !== true || isFull(state.tiles))
        return {
          ...state,
        };
      let oneNewTile = generateNewTile(state.tiles);
      let nextArr = insertNewTile(tiles, oneNewTile);

      return {
        ...state,
        tiles: [...nextArr],
      };
    case MOVE_UP:
      let boardAfterMoveUp;
      [boardAfterMoveUp, newTiles, isChanged] = moveUp(currentBoard);
      return {
        ...state,
        tiles: boardAfterMoveUp,
        newTiles,
        isChanged,
      };
    case MOVE_LEFT:
      let boardAfterMoveLeft;
      [boardAfterMoveLeft, newTiles, isChanged] = moveLeft(currentBoard);
      return {
        ...state,
        tiles: boardAfterMoveLeft,
        newTiles,
        isChanged,
      };
    case MOVE_DOWN:
      let boardAfterMoveDown;
      [boardAfterMoveDown, newTiles, isChanged] = moveDown(currentBoard);
      return {
        ...state,
        tiles: boardAfterMoveDown,
        newTiles,
        isChanged,
      };
    case MOVE_RIGHT:
      let boardAfterMoveRight;
      [boardAfterMoveRight, newTiles, isChanged] = moveRight(currentBoard);
      return {
        ...state,
        tiles: boardAfterMoveRight,
        newTiles,
        isChanged,
      };
    case UPDATE_TILE:
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
      const newTilesAfterMerged = state.newTiles;
      for (let i = 0; i < newTilesAfterMerged.length; i++) {
        for (let j = 0; j < updateTiles.length; j++) {
          if (updateTiles[j].value === null) {
            updateTiles[j] = {
              ...newTilesAfterMerged[i],
            };
            if (newTilesAfterMerged[i]) score += newTilesAfterMerged[i].value;
            i++;
          }
          if (i >= newTilesAfterMerged.length) break;
        }
      }
      return {
        ...state,
        tiles: updateTiles,
        newTiles: [],
        score,
      };
    case RESET_BOARD:
      return {
        ...initialState,
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
    case IS_OVER:
      if (isOver(state.tiles))
        return {
          ...state,
          isGameOver: true,
        };
      return {
        ...state,
      };
  }
};
