import styled from "styled-components";
import { Grid } from "./Grid";
const BoardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
  background-color: #bbada0;
  width: 480px;
  height: 480px;
  justify-content: space-around;
  align-items: center;
  border-radius: 3px;
  position: relative;
  margin-bottom: 20px;
`;
export const Board = ({ size, children }) => {
  const count = size * size;
  const grids = [];
  for (let i = 0; i < count; i++) {
    grids.push(<Grid key={`${i}`} />);
  }
  return (
    <BoardContainer>
      {grids.map((ele) => {
        return ele;
      })}
      {children}
    </BoardContainer>
  );
};
