import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const Title = styled.h1`
  margin: 40px 0;
`;
export const Tile = styled.div`
  height: 80px;
  width: 80px;
  background: rgba(238, 228, 218, 0.35);
  border-radius: 3px;
  display: flex;
  text-align: center;
`;
export const Row = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin: 10px 0;
`;
export const Board = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  background-color: #776e65;
  width: 420px;
  height: 420px;
  justify-content: space-between;
  align-items: center;
  border-radius: 3px;
`;
