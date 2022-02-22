import styled from "styled-components";
export { Board } from "./Board";
export { Tile } from "./Tile";
export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Title = styled.h1`
  margin: 40px 0;
`;
// export const Row = styled.div`
//   display: flex;
//   justify-content: space-around;
//   width: 100%;
//   margin: 10px 0;
// `;

// export const Block = styled.div`
//   height: 80px;
//   width: 80px;
//   background: rgba(238, 228, 218, 0.35);
//   border-radius: 3px;
//   display: flex;
//   text-align: center;
// `;
