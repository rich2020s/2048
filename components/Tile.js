import styled from "styled-components";
import { useEffect, useState } from "react";
export const TileContainer = styled.div`
  height: 100px;
  width: 100px;
  line-height: 2.1;
  top: ${(props) => (props.position ? props.position.top : "16")}px;
  left: ${(props) => (props.position ? props.position.left : "16")}px;
  border-radius: 3px;
  transition-property: left, top, transform;
  transition-duration: 250ms, 250ms, 100ms;
  transform: ${(props) => `scale(${props.scale})`};
  z-index: 2;
  background-color: #eee4da;
  color: #776e65;
  font-weight: bold;
  text-align: center;
  position: absolute;
  display: ${(props) => (props.isHidden ? "none" : "")};
`;
export function Tile({ tileData }) {
  const [isHidden, setIsHidden] = useState(true);
  const [scale, setScale] = useState(1);
  console.log(tileData.position[0] * 16 + tileData.position[0] * 100 + 16);
  console.log(tileData.position[1]);
  const position = {
    top: tileData.position[0] * 16 + tileData.position[0] * 100 + 16,
    left: tileData.position[1] * 16 + tileData.position[1] * 100 + 16,
  };

  useEffect(() => {
    setTimeout(() => {
      setIsHidden(false);
    }, 250);
    if (tileData.isHighLight) {
      setTimeout(() => {
        setScale(1.1);
      }, 350);
      setTimeout(() => {
        setScale(1);
      }, 450);
    }
  }, []);

  return (
    <TileContainer position={position} isHidden={isHidden} scale={scale}>
      {tileData.value}
    </TileContainer>
  );
}
