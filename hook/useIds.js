import { useEffect, useRef } from "react";
let seqId = 3;
export const useIds = () => {
  const nextId = () => seqId++;
  return nextId();
};
// export const useIds = () => {
//   // const nextId = () => {
//   //   return seqId++;
//   // };

//   // return nextId();
// };
