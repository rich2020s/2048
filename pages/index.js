import { useThrottledCallback } from "use-debounce";
import { GlobalStyle } from "../constant";
import { useEffect, useState } from "react";
import { Tile, Board, Wrapper } from "../components";
import { useGame } from "../hook/useGame.js/index.js";
import size from "../constant/boardSize";
export default function Game2048() {
  const [board, moveUp, moveRight, moveDown, moveLeft, restart] = useGame();
  const [isLoading, setIsLoading] = useState(true);
  const handelKeyDown = (e) => {
    e.preventDefault();
    const up = 38;
    const right = 39;
    const down = 40;
    const left = 37;
    if (board.inMotion) return;
    if (e.keyCode === up) {
      moveUp();
    } else if (e.keyCode === right) {
      moveRight();
    } else if (e.keyCode === down) {
      moveDown();
    } else if (e.keyCode === left) {
      moveLeft();
    }
  };
  const throttledHandleKeyDown = useThrottledCallback(handelKeyDown, 250, {
    leading: true,
    trailing: false,
  });
  useEffect(() => {
    setIsLoading(false);
  }, []);
  useEffect(() => {
    document.addEventListener("keydown", throttledHandleKeyDown);
    return () => {
      document.removeEventListener("keydown", throttledHandleKeyDown);
    };
  }, [throttledHandleKeyDown]);
  useEffect(() => {
    if (board.isGameOver) {
      setTimeout(() => {
        alert(`Game over! Your score is ${board.score}`);
      }, 250);
    }
  }, [board.isGameOver]);
  if (isLoading) return "";
  return (
    <>
      <GlobalStyle />
      <Wrapper score={board.score} restart={restart}>
        <Board size={size}>
          {board.tiles.map(
            (tile, index) => tile.value && <Tile tile={tile} key={index} />
          )}
        </Board>
      </Wrapper>
    </>
  );
}
