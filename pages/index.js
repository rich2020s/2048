import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect, useState, useMemo, useCallback } from "react";
import { Tile, Board, Wrapper, Title, Row, Block } from "../components";
import { moveUp, moveDown, moveLeft, moveRight } from "../moveMethod";
export default function Game2048() {
  const size = 4;
  let counter = 0;
  const arr = useMemo(() => {
    let arr = [];
    for (let i = 0; i < size; i++) {
      arr.push([]);
      for (let j = 0; j < size; j++) {
        arr[i].push({
          id: ++counter,
          value: 0,
          position: [8, 8],
          isHighLight: false,
        });
      }
      // arr.push(
      //   new Array(size).fill({
      //     id: ++counter,
      //     value: 0,
      //     position: [0, 0],
      //     isHighLight: false,
      //   })
      // );
    }

    return arr;
  }, []);
  const [board, setBoard] = useState(arr);
  const [test, setTest] = useState("");

  function getBlankCoordinate() {
    let blankArr = [];
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (board[i][j] === 0) {
          blankArr.push([i, j]);
        }
      }
    }
    return blankArr[Math.floor(Math.random() * blankArr.length)];
  }
  const generateRandomNumber = useCallback(() => {
    const arr = [2, 2, 4];
    return arr[Math.floor(Math.random() * arr.length)];
  }, []);
  function placeRandomTile(board) {
    if (isFull(board)) return board;
    const newBoard = [...board];
    const blankCoordinate = getBlankCoordinate();
    newBoard[blankCoordinate[0]][blankCoordinate[1]] = generateRandomNumber();
    return newBoard;
  }
  function isFull(board) {
    for (let row of board) {
      for (let ele of row) {
        if (ele === 0) return false;
      }
    }
    return true;
  }
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
    const right = 39;
    const down = 40;
    const left = 37;
    if (e.keyCode === up) {
      console.log("up");
      setBoard(moveUp(board));
      // setBoard(placeRandomTile(placeRandomTile(moveUp(board))));
    } else if (e.keyCode === right) {
      setBoard(moveRight(board));
      console.log("right");
    } else if (e.keyCode === down) {
      console.log("down");
      setBoard(moveDown(board, setBoard));
    } else if (e.keyCode === left) {
      setBoard(moveLeft(board));
      console.log("left");
    }
  }, []);
  useEffect(() => {
    document.addEventListener("keydown", handelKeydown);
    setBoard(placeRandomTile(placeRandomTile(board)));
    // setBoard([
    //   [0, 0, 0, 0],
    //   [0, 1, 2, 3],
    //   [0, 1, 0, 0],
    //   [0, 1, 2, 3],
    // ]);
    console.log(board);
    return () => {
      document.removeEventListener("keydown", handelKeydown);
    };
  }, []);
  useEffect(() => {
    // setBoard(placeRandomTile(placeRandomTile(board)));
  }, [board]);
  const style = {
    position: "absolute",
    top: "0px",
    left: "30px",
    // transform: "1.1",
    transitionProperty: "left, top, transform",
    transitionDuration: "250ms, 250ms, 100ms",
    transform: "scale(1)",
    // zIndex,
  };
  return (
    <Wrapper>
      <Title>Game 2048</Title>
      <button
        onClick={() => {
          setBoard(placeRandomTile(placeRandomTile(board)));
        }}
      >
        new tiles
      </button>
      <button
        onClick={() => {
          if (atLeastOneMoveExists(board)) {
            console.log("not over");
          } else {
            console.log("it's over");
          }
        }}
      >
        check if it is over
      </button>
      <Board size={size} />
      {/* <Board>
        {board.map((row, index) => {
          // row.map()
          return <Grid key={index} />;
        })}
      </Board> */}
    </Wrapper>
  );
}
