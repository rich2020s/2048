import styled from "styled-components";
export const TileContainer = styled.div`
  transition-property: left, top, transform;
  transition-duration: 250ms, 250ms, 100ms;
  transform: scale(1);
`;
export const Tile = ({ tileData }) => {
  const [scale, setScale] = useState(1);
  // const isHighLight =
  return <TileContainer>{tileData.value}</TileContainer>;
};
