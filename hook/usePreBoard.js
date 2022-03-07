import { useEffect, useRef } from "react";
export const usePrevBoard = (board) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = [...board];
  });

  return ref.current;
};
