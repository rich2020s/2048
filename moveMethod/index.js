import { idCounter } from "../hook/useIds";

import size from "../boardSize";
export const moveUp = (board) => {
  const newId = idCounter();
  let isChanged = false;
  let nextTilesArr = createEmptyTilesArr();
  let newTilesAfterMerged = [];
  let newBoard = [...board];

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
  for (let rows of newBoard) {
    for (let tile of rows) {
      const { id, value, position, isMerged } = tile;
      if (value) {
        nextTilesArr[tile.indexInArr] = { id, value, position, isMerged };
      }
    }
  }
  return [nextTilesArr, newTilesAfterMerged, isChanged];
};

export const moveDown = (board) => {
  const newId = idCounter();
  let isChanged = false;
  let nextTilesArr = createEmptyTilesArr();
  let newTilesAfterMerged = [];
  const size = board.length;
  let newBoard = [...board];

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
  for (let rows of newBoard) {
    for (let tile of rows) {
      const { id, value, position, isMerged } = tile;
      if (value) {
        nextTilesArr[tile.indexInArr] = { id, value, position, isMerged };
      }
    }
  }
  return [nextTilesArr, newTilesAfterMerged, isChanged];
};

export const moveLeft = (board) => {
  const newId = idCounter();
  let isChanged = false;
  let nextTilesArr = createEmptyTilesArr();
  let newTilesAfterMerged = [];
  const size = board.length;
  let newBoard = [...board];

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
  for (let rows of newBoard) {
    for (let tile of rows) {
      const { id, value, position, isMerged } = tile;
      if (value) {
        nextTilesArr[tile.indexInArr] = { id, value, position, isMerged };
      }
    }
  }
  return [nextTilesArr, newTilesAfterMerged, isChanged];
};

export const moveRight = (board) => {
  const newId = idCounter();
  let isChanged = false;
  let nextTilesArr = createEmptyTilesArr();
  let newTilesAfterMerged = [];
  const size = board.length;
  let newBoard = [...board];

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
  for (let rows of newBoard) {
    for (let tile of rows) {
      const { id, value, position, isMerged } = tile;
      if (value) {
        nextTilesArr[tile.indexInArr] = { id, value, position, isMerged };
      }
    }
  }
  return [nextTilesArr, newTilesAfterMerged, isChanged];
};
export function generateNewTile(tiles) {
  let board = tileOnBoard(tiles);
  const newId = idCounter();
  let newBoard = [];
  board.map((rows, x) =>
    rows.map((tile, y) => {
      if (tile.value !== null) return;
      newBoard.push([x, y]);
    })
  );
  const coordinate = newBoard[Math.floor(Math.random() * newBoard.length)];

  const newTile = {
    id: newId(),
    value: generateRandomNumber(),
    position: [coordinate[0], coordinate[1]],
  };
  return newTile;
}
export function isFull(tiles) {
  console.log(tiles);
  for (let tile of tiles) {
    if (tile.value === null) return false;
  }
  return true;
}
function generateRandomNumber() {
  const arr = [2, 2, 4];
  return arr[Math.floor(Math.random() * arr.length)];
}
export function tileOnBoard(tiles) {
  const newBoard = createEmptyBoard();
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i].value) {
      let [x, y] = tiles[i].position;
      newBoard[x][y] = {
        ...tiles[i],
        id: tiles[i].id,
        value: tiles[i].value,
        indexInArr: i,
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
function createEmptyTilesArr() {
  let emptyArr = [];
  for (let i = 0; i < size * size; i++) {
    emptyArr.push({ id: null, value: null });
  }
  return emptyArr;
}
export function insertNewTile(originArr, newTile) {
  let nextArr = [...originArr];
  for (let i = 0; i < nextArr.length; i++) {
    if (nextArr[i].value === null) {
      nextArr[i] = {
        ...newTile,
      };
      break;
    }
  }
  return nextArr;
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
