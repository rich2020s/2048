import styled from "styled-components";
import { Grid } from "./Grid";
const BoardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
  background-color: #776e65;
  width: 480px;
  height: 480px;
  justify-content: space-around;
  align-items: center;
  border-radius: 3px;
  position: relative;
`;
export const Board = ({ size }) => {
  // function renderGrid() {
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
    </BoardContainer>
  );
};
