import styled from "styled-components";
import { RestartBtn } from "./RestartBtn";
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Title = styled.h1`
  margin: 20px 0 40px 0;
  color: #776e65;
`;
const FlexContainer = styled.div`
  display: flex;
  width: 460px;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const Score = styled.div`
  color: #776e65;
`;
export function Container({ children, score, restart }) {
  return (
    <Wrapper>
      <Title>Game 2048</Title>
      <FlexContainer>
        <RestartBtn onClick={restart}>Restart</RestartBtn>
        <Score>{score}</Score>
      </FlexContainer>
      {children}
    </Wrapper>
  );
}
