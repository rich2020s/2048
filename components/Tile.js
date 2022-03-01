import styled from "styled-components";
import { useEffect, useState } from "react";
import { usePrevProps } from "../hook/usePreProps";
export const TileContainer = styled.div`
  height: 100px;
  width: 100px;
  line-height: 2.1;
  top: ${(props) => props.position.top}px;
  left: ${(props) => props.position.left}px;
  border-radius: 3px;
  transition-property: left, top, transform;
  transition-duration: 250ms, 250ms, 100ms;
  transform: ${(props) => `scale(${props.scale})`};
  z-index: ${(props) => props.zIndex};
  background-color: #eee4da;
  color: #776e65;
  font-weight: bold;
  text-align: center;
  position: absolute;
  display: ${(props) => (props.isHidden ? "none" : "")};
`;
export function Tile({ tileData }) {
  // let initialZ = 1;
  // if (tileData.isHighLight) initialZ = 2;
  const { id, value, position, isHighLight } = tileData;
  const preValue = usePrevProps(tileData.value);
  let testIsNew = preValue === undefined;
  let hasChanged = preValue !== value;
  let shallHighLight = hasChanged || testIsNew;
  const [isHidden, setIsHidden] = useState(false);
  const [scale, setScale] = useState(1);
  const [zIndex, setZIndex] = useState(1);
  // const [position, setPosition] = useState({
  //   top: tileData.position[0] * 16 + tileData.position[0] * 100 + 16,
  //   left: tileData.position[1] * 16 + tileData.position[1] * 100 + 16,
  // });
  // console.log(tileData.position[0] * 16 + tileData.position[0] * 100 + 16);
  // console.log(tileData.position[1]);
  const positionOnBoard = {
    top: position[0] * 16 + position[0] * 100 + 16,
    left: position[1] * 16 + position[1] * 100 + 16,
  };
  useEffect(() => {
    // setTimeout(() => {
    //   setIsHidden(false);
    // }, 250);
    console.log(id, shallHighLight);
    if (shallHighLight) {
      setTimeout(() => {
        setScale(1.1);
      }, 100);
      setTimeout(() => {
        setScale(1);
      }, 200);
    }
    console.log("render");
  }, [shallHighLight, id]);
  return (
    <TileContainer
      key={id}
      position={positionOnBoard}
      isHidden={isHidden}
      scale={scale}
      zIndex={zIndex}
    >
      {`id:${tileData.id}, value:${tileData.value}`}
    </TileContainer>
  );
}
