import { useThrottledCallback } from "use-debounce";
import { GlobalStyle } from "../constant";
import {
  CREATE_NEW_TILE,
  END_MOVE,
  MOVE_UP,
  START_MOVE,
  UPDATE_TILE,
  RESET_BOARD,
  MOVE_LEFT,
  MOVE_DOWN,
  MOVE_RIGHT,
} from "../actionType";
import { Container } from "../components/Wrapper";
import { useEffect, useState, useCallback, useReducer } from "react";
import { Title, Tile, Board, Wrapper } from "../components";
import { useGame } from "../movingMethod";
import { initialState, reducer } from "../reducer";
import size from "../boardSize";
export default function Game2048() {
  // const [board, dispatch] = useReducer(reducer, initialState);

  const [board, moveUp, moveRight, moveDown, moveLeft] = useGame();
  // const [isLoading, setIsLoading] = useState(true);
  console.log(board);
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
  useEffect(() => {}, []);
  useEffect(() => {
    document.addEventListener("keydown", throttledHandleKeyDown);
    return () => {
      document.removeEventListener("keydown", throttledHandleKeyDown);
    };
  }, [throttledHandleKeyDown]);
  useEffect(() => {
    console.log(board);
  }, [board]);
  // if (isLoading) return "";
  return (
    <>
      <GlobalStyle />
      <Container
        score={board.score}
        restart={() => {
          dispatch({ type: RESET_BOARD });
        }}
      >
        <Board size={size}>
          {board.tiles.map(
            (tile, index) => tile.value && <Tile tile={tile} key={index} />
          )}
        </Board>
      </Container>
    </>
  );
}
