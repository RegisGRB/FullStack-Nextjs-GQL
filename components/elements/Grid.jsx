import styled from "styled-components";


const GRID = styled.div`
  width: 100%;
  display: grid;
  gap: 1rem;

  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-auto-rows: 240px;
`;

export default GRID