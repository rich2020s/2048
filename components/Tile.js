import styled from "styled-components";
import { Children, useEffect, useState } from "react";
import { usePrevProps } from "../hook/usePreProps";
export const TileContainer = styled.div`
  height: 100px;
  width: 100px;
  line-height: 100px;
  font-size: 36px;
  top: ${(props) => props.position.top}px;
  left: ${(props) => props.position.left}px;
  border-radius: 3px;
  transition-property: left, top, transform;
  transition-duration: 250ms, 250ms, 100ms;
  transform: ${(props) => `scale(${props.scale})`};
  z-index: 1;
  color: #776e65;
  ${(props) => {
    switch (props.className) {
      case 2:
        return ` background: #eee4da;
        box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0),
        inset 0 0 0 1px rgba(255, 255, 255, 0);`;
      case 4:
        return `background: #ede0c8;
        box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0),
          inset 0 0 0 1px rgba(255, 255, 255, 0);`;
      case 8:
        return `color: #f9f6f2;
        background: #f2b179;`;
      case 16:
        return `color: #f9f6f2;
        background: #f59563;`;
      case 32:
        return ` color: #f9f6f2;
        background: #f67c5f;`;
      case 64:
        return ` color: #f9f6f2;
        background: #f65e3b;`;
      case 128:
        return ` color: #f9f6f2;
        background: #edcf72;
        box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.2381),
          inset 0 0 0 1px rgba(255, 255, 255, 0.14286);`;
      case 256:
        return ` color: #f9f6f2;
        background: #edcc61;
        box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.31746),
          inset 0 0 0 1px rgba(255, 255, 255, 0.19048);`;
      case 512:
        return ` color: #f9f6f2;
        background: #edc850;
        box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.39683),
          inset 0 0 0 1px rgba(255, 255, 255, 0.2381);`;
      case 1024:
        return ` font-size:30px;
        color: #f9f6f2;
        background: #edc53f;
        box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.47619),
          inset 0 0 0 1px rgba(255, 255, 255, 0.28571);`;
      case 2048:
        return ` font-size:30px;
        color: #f9f6f2;
        background: #edc22e;
        box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.55556),
          inset 0 0 0 1px rgba(255, 255, 255, 0.33333);`;
    }
  }};

  font-weight: bold;
  text-align: center;
  position: absolute;
`;
export function Tile({ tile }) {
  const { id, value, position } = tile;
  const preValue = usePrevProps(tile.value);
  let testIsNew = preValue === undefined;
  let hasChanged = preValue !== value;
  let shallHighLight = hasChanged || testIsNew;
  const [scale, setScale] = useState(1);
  const positionOnBoard = {
    top: position[0] * 16 + position[0] * 100 + 16,
    left: position[1] * 16 + position[1] * 100 + 16,
  };
  useEffect(() => {
    if (shallHighLight) {
      setTimeout(() => {
        setScale(1.1);
      }, 100);
      setTimeout(() => {
        setScale(1);
      }, 200);
    }
  }, [shallHighLight, id]);
  return (
    <TileContainer
      className={value}
      key={id}
      position={positionOnBoard}
      scale={scale}
    >
      {tile.value}
    </TileContainer>
  );
}
