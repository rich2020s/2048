import { idCounter } from "../useIds";
import size from "../../constant/boardSize";
import { useCallback, useReducer } from "react";
import { initialState, reducer } from "./reducer/reducer";
import {
  CREATE_NEW_TILE,
  END_MOVE,
  MOVE_TILE,
  RESET_BOARD,
  START_MOVE,
  UPDATE_TILE,
  IS_OVER,
} from "./reducer/actionType";
export const useGame = () => {
  const [board, dispatch] = useReducer(reducer, initialState);
  const { tiles, score } = board;
  const moveUp = () => {
    dispatch({ type: START_MOVE });
    const newId = idCounter();
    let isChanged = false;
    let nextTilesArr = createEmptyTilesArr();
    let newTilesAfterMerged = [];
    let newBoard = tileOnBoard(tiles);

    for (let i = 0; i < size; i++) {
      let counter = 0;
      for (let j = 1; j < size; j++) {
        const currentTile = newBoard[j][i];
        const destination = newBoard[counter][i];
        const { value } = currentTile;
        if (value === null) continue;
        else if (destination.value === null) {
          newBoard[counter][i] = {
            ...currentTile,
            position: [counter, i],
          };
          newBoard[j][i] = { id: null, value: null };
          isChanged = true;
        } else if (value === destination.value) {
          newTilesAfterMerged.push({
            id: newId(),
            value: value * 2,
            position: [counter, i],
          });
          const { indexInArr } = currentTile;
          nextTilesArr[indexInArr] = {
            ...currentTile,
            isMerged: true,
            position: [counter, i],
          };
          newBoard[j][i] = { id: null, value: null };
          destination.isMerged = true;
          isChanged = true;
          counter++;
        } else if (value !== destination.value) {
          counter++;
          if (counter === j) continue;
          j--;
        }
      }
    }
    tilesAfterMoved(
      newBoard,
      isChanged,
      nextTilesArr,
      newTilesAfterMerged,
      score
    );
  };

  const moveDown = () => {
    dispatch({ type: START_MOVE });
    const newId = idCounter();
    let isChanged = false;
    let nextTilesArr = createEmptyTilesArr();
    let newTilesAfterMerged = [];
    let newBoard = tileOnBoard(tiles);

    for (let i = 0; i < size; i++) {
      let counter = size - 1;
      for (let j = size - 2; j >= 0; j--) {
        const currentTile = newBoard[j][i];
        const destination = newBoard[counter][i];
        const { value } = currentTile;
        if (value === null) continue;
        else if (destination.value === null) {
          newBoard[counter][i] = {
            ...currentTile,
            position: [counter, i],
          };
          newBoard[j][i] = { id: null, value: null };
          isChanged = true;
        } else if (value === destination.value) {
          newTilesAfterMerged.push({
            id: newId(),
            value: value * 2,
            position: [counter, i],
          });
          const { indexInArr } = currentTile;
          nextTilesArr[indexInArr] = {
            ...currentTile,
            isMerged: true,
            position: [counter, i],
          };
          newBoard[j][i] = { id: null, value: null };
          destination.isMerged = true;
          isChanged = true;
          counter--;
        } else if (value !== destination.value) {
          counter--;
          if (counter === j) continue;
          j++;
        }
      }
    }

    tilesAfterMoved(
      newBoard,
      isChanged,
      nextTilesArr,
      newTilesAfterMerged,
      score
    );
  };

  const moveLeft = () => {
    dispatch({ type: START_MOVE });
    const newId = idCounter();
    let isChanged = false;
    let nextTilesArr = createEmptyTilesArr();
    let newTilesAfterMerged = [];
    let newBoard = tileOnBoard(tiles);

    for (let i = 0; i < size; i++) {
      let counter = 0;
      for (let j = 1; j < size; j++) {
        const currentTile = newBoard[i][j];
        const destination = newBoard[i][counter];
        const { value } = currentTile;
        if (value === null) continue;
        else if (destination.value === null) {
          newBoard[i][counter] = {
            ...currentTile,
            position: [i, counter],
          };
          newBoard[i][j] = { id: null, value: null };
          isChanged = true;
        } else if (value === destination.value) {
          newTilesAfterMerged.push({
            id: newId(),
            value: value * 2,
            position: [i, counter],
          });
          const { indexInArr } = currentTile;
          nextTilesArr[indexInArr] = {
            ...currentTile,
            isMerged: true,
            position: [i, counter],
          };
          newBoard[i][j] = { id: null, value: null };
          destination.isMerged = true;
          isChanged = true;
          counter++;
        } else if (value !== destination.value) {
          counter++;
          if (counter === j) continue;
          j--;
        }
      }
    }
    tilesAfterMoved(
      newBoard,
      isChanged,
      nextTilesArr,
      newTilesAfterMerged,
      score
    );
  };

  const moveRight = () => {
    dispatch({ type: START_MOVE });
    const newId = idCounter();
    let isChanged = false;
    let nextTilesArr = createEmptyTilesArr();
    let newTilesAfterMerged = [];
    let newBoard = tileOnBoard(tiles);

    for (let i = 0; i < size; i++) {
      let counter = size - 1;
      for (let j = size - 2; j >= 0; j--) {
        const currentTile = newBoard[i][j];
        const destination = newBoard[i][counter];
        const { value } = currentTile;
        if (value === null) continue;
        else if (destination.value === null) {
          newBoard[i][counter] = {
            ...currentTile,
            position: [i, counter],
          };
          newBoard[i][j] = { id: null, value: null };
          isChanged = true;
        } else if (value === destination.value) {
          newTilesAfterMerged.push({
            id: newId(),
            value: value * 2,
            position: [i, counter],
          });
          const { indexInArr } = currentTile;
          nextTilesArr[indexInArr] = {
            ...currentTile,
            isMerged: true,
            position: [i, counter],
          };
          newBoard[i][j] = { id: null, value: null };
          destination.isMerged = true;
          isChanged = true;
          counter--;
        } else if (value !== destination.value) {
          counter--;
          if (counter === j) continue;
          j++;
        }
      }
    }
    tilesAfterMoved(
      newBoard,
      isChanged,
      nextTilesArr,
      newTilesAfterMerged,
      score
    );
  };
  const generateNewTile = (currentBoard) => {
    let board = tileOnBoard(currentBoard);
    const newId = idCounter();
    let possibleTiles = [];
    board.map((rows, x) =>
      rows.map((tile, y) => {
        if (tile.value !== null) return;
        possibleTiles.push([x, y]);
      })
    );
    const coordinate =
      possibleTiles[Math.floor(Math.random() * possibleTiles.length)];

    const newTile = {
      id: newId(),
      value: generateRandomNumber(),
      position: [coordinate[0], coordinate[1]],
    };
    let nextArr = [...currentBoard];
    for (let i = 0; i < nextArr.length; i++) {
      if (nextArr[i].value === null) {
        nextArr[i] = {
          ...newTile,
        };
        break;
      }
    }
    dispatch({ type: CREATE_NEW_TILE, tiles: nextArr });
  };
  function isFull(tilesArr) {
    for (let tile of tilesArr) {
      if (tile.value === null) return false;
    }
    return true;
  }
  function generateRandomNumber() {
    const arr = [2, 2, 4];
    return arr[Math.floor(Math.random() * arr.length)];
  }
  function tileOnBoard(tilesArr) {
    const newBoard = createEmptyBoard();
    for (let i = 0; i < tilesArr.length; i++) {
      if (tilesArr[i].value) {
        let [x, y] = tilesArr[i].position;
        newBoard[x][y] = {
          ...tilesArr[i],
          id: tilesArr[i].id,
          value: tilesArr[i].value,
          indexInArr: i,
        };
      }
    }
    return newBoard;
  }
  const createEmptyBoard = useCallback(() => {
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
  }, []);

  function createTile(currentBoard) {
    if (isFull(tiles)) return;
    generateNewTile(currentBoard);
  }
  function tilesAfterMoved(
    newBoard,
    isChanged,
    nextTilesArr,
    newTilesAfterMerged,
    score
  ) {
    for (let rows of newBoard) {
      for (let tile of rows) {
        const { id, value, position, isMerged } = tile;
        if (value) {
          nextTilesArr[tile.indexInArr] = { id, value, position, isMerged };
        }
      }
    }
    if (!isChanged) {
      dispatch({ type: END_MOVE });
      return;
    }
    dispatch({ type: MOVE_TILE, tiles: nextTilesArr, isChanged: isChanged });
    let updateTiles = nextTilesArr.map((tile) => {
      if (tile.isMerged) {
        return {
          id: null,
          value: null,
        };
      }
      return tile;
    });
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
    setTimeout(() => {
      dispatch({ type: UPDATE_TILE, tiles: updateTiles, score });
      createTile(updateTiles);
      dispatch({ type: IS_OVER, isOver: isOver });
      dispatch({ type: END_MOVE });
    }, 250);
  }
  function restart() {
    dispatch({ type: RESET_BOARD });
  }
  function isOver(tiles) {
    if (!isFull(tiles)) return false;
    let currentBoard = tileOnBoard(tiles);
    if (atLeastOneMoveExists(currentBoard)) return false;
    return true;
  }
  function atLeastOneMoveExists(board) {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const { value } = board[i][j];
        if (i - 1 > 0) {
          if (value === board[i - 1][j].value) return true;
        }
        if (i + 1 < size) {
          if (value === board[i + 1][j].value) return true;
        }
        if (j - 1 > 0) {
          if (value === board[i][j - 1].value) return true;
        }
        if (j + 1 < size) {
          if (value === board[i][j + 1].value) return true;
        }
      }
    }
    console.log(board);
    return false;
  }
  return [board, moveUp, moveRight, moveDown, moveLeft, restart];
};

function createEmptyTilesArr() {
  let emptyArr = [];
  for (let i = 0; i < size * size; i++) {
    emptyArr.push({ id: null, value: null });
  }
  return emptyArr;
}
export function createInitialTilesArr() {
  let initialArr = createEmptyTilesArr();
  initialArr[0] = {
    id: 1,
    value: 2,
    position: [0, 0],
  };
  initialArr[4] = {
    id: 2,
    value: 2,
    position: [1, 0],
  };
  return initialArr;
}
