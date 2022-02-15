import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect, useState, useMemo, useCallback } from "react";
import { Tile, Board, Wrapper, Title, Row } from "../components";
import { moveUp, moveDown, moveLeft, moveRight } from "../moveMethod";
export default function Game2048() {
  const size = 4;
  const arr = useMemo(() => {
    let arr = [];
    for (let i = 0; i < size; i++) {
      arr.push(new Array(size).fill(0));
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
    const newBoard = [...board];
    const blankCoordinate = getBlankCoordinate();
    newBoard[blankCoordinate[0]][blankCoordinate[1]] = generateRandomNumber();
    return newBoard;
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
    return () => {
      document.removeEventListener("keydown", handelKeydown);
    };
  }, []);
  useEffect(() => {
    // setBoard(placeRandomTile(placeRandomTile(board)));
  }, [board]);

  return (
    <Wrapper>
      <Title>Game 2048{test}</Title>
      <button
        onClick={() => {
          setBoard(placeRandomTile(placeRandomTile(board)));
        }}
      >
        new tiles
      </button>
      <Board className="board">
        {board.map((row, index) => {
          return (
            <Row key={index}>
              {row.map((tile, index) => (
                <Tile key={index}>{tile !== 0 ? tile : ""}</Tile>
              ))}
            </Row>
          );
        })}
      </Board>
    </Wrapper>
  );
}
