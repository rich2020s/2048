import Head from "next/head";
import Image from "next/image";
import {
  CREATE_NEW_TILE,
  END_MOVE,
  MOVE_UP,
  START_MOVE,
  UPDATE_TILE,
  RESET_BOARD,
  CLEAR_EFFECT,
  REDO_BOARD,
} from "../actionType";
import { useEffect, useState, useMemo, useCallback, useReducer } from "react";
import { Title, Tile, Board, Wrapper, Row, Block } from "../components";
import { moveUp, moveDown, moveLeft, moveRight } from "../moveMethod";
import { initialState, reducer } from "../reducer";
export default function Game2048() {
  const size = 4;
  const [board, dispatch] = useReducer(reducer, initialState);

  function atLeastOneMoveExists(board) {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        let value = board[i][j];
        if (i - 1 > 0) {
          if (value === board[i - 1][j]) return true;
        }
        if (i + 1 < size) {
          if (value === board[i + 1][j]) return true;
        }
        if (j - 1 > 0) {
          if (value === board[i][j - 1]) return true;
        }
        if (j + 1 < size) {
          if (value === board[i][j + 1]) return true;
        }
      }
    }
    return false;
  }
  function isWon(board) {
    for (let row of board) {
      for (let ele of row) {
        if (ele === 2048) return true;
      }
    }
    return false;
  }
  const handelKeydown = useCallback((e) => {
    const up = 38;
    // const right = 39;
    // const down = 40;
    // const left = 37;
    if (board.inMotion) return;
    if (e.keyCode === up) {
      dispatch({ type: START_MOVE });
      dispatch({ type: MOVE_UP });
      setTimeout(() => {
        dispatch({ type: UPDATE_TILE });
        dispatch({ type: CLEAR_EFFECT });
        dispatch({ type: END_MOVE });
      }, 250);
    }
    //   console.log("up");
    //   setBoard(moveUp(board));
    // } else if (e.keyCode === right) {
    //   setBoard(moveRight(board));
    //   console.log("right");
    // } else if (e.keyCode === down) {
    //   console.log("down");
    //   setBoard(moveDown(board, setBoard));
    // } else if (e.keyCode === left) {
    //   setBoard(moveLeft(board));
    //   console.log("left");
    // }
  }, []);
  useEffect(() => {
    document.addEventListener("keydown", handelKeydown);
    return () => {
      document.removeEventListener("keydown", handelKeydown);
    };
  }, []);
  // useEffect(() => {
  // }, [board]);
  return (
    <Wrapper>
      <Title>Game 2048</Title>
      <div>{board.score}</div>
      <button
        onClick={() => {
          dispatch({ type: CREATE_NEW_TILE });
        }}
      >
        new tiles
      </button>
      <button
        onClick={() => {
          dispatch({ type: RESET_BOARD });
        }}
      >
        new board
      </button>
      <button
        onClick={() => {
          dispatch({ type: REDO_BOARD });
        }}
      >
        last board
      </button>
      <Board size={size}>
        {board.tiles.map((tile, index) => (
          <Tile tileData={tile} key={index} />
        ))}
      </Board>
    </Wrapper>
  );
}
