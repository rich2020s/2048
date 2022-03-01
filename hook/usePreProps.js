import { useEffect, useRef } from "react";
export const usePrevProps = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};
