import styled from "styled-components";

const Container = styled.div`
  padding: 5rem 15vw;
  display: flex;
  align-items: center;
  overflow-x: hidden;
  flex-direction: column;
  background: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.primary};
`;
export default Container;