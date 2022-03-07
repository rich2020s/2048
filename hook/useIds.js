let seqId = 5;
// export const useIds = () => {
//   const nextId = () => seqId++;
//   return nextId();
// };
export const idCounter = () => {
  const nextId = () => {
    return seqId++;
  };

  return nextId;
};
