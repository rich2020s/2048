import { isFull, tileOnBoard } from "./movingMethod";
export function isOver(tiles) {
  if (!isFull(tiles)) return false;
  let currentBoard = tileOnBoard(tiles);
  if (!atLeastOneMoveExists(currentBoard)) return true;
  return false;
}
function atLeastOneMoveExists(board) {
  const size = board.length;
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
  return false;
}
