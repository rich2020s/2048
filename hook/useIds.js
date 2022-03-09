let seqId = 5;
export const idCounter = () => {
  const nextId = () => {
    return seqId++;
  };

  return nextId;
};
