import {
  CREATE_NEW_TILE,
  MOVE_TILE,
  START_MOVE,
  UPDATE_TILE,
  END_MOVE,
  RESET_BOARD,
  IS_OVER,
} from "./actionType";
import { createInitialTilesArr } from "../index.js";

export const initialState = {
  tiles: [...createInitialTilesArr()],
  inMotion: false,
  isChanged: false,
  score: 0,
  isGameOver: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case CREATE_NEW_TILE:
      return {
        ...state,
        tiles: action.tiles,
      };
    case MOVE_TILE:
      return {
        ...state,
        tiles: action.tiles,
        isChanged: action.isChanged,
      };
    case UPDATE_TILE:
      return {
        ...state,
        tiles: action.tiles,
        score: action.score,
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
      const { isOver } = action;
      if (isOver(state.tiles)) {
        return {
          ...state,
          isGameOver: true,
        };
      }
      return {
        ...state,
      };
  }
};
