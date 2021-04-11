import styled from "styled-components";

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width:100%;
  @media screen and (max-width: 700px) {
    flex-direction: column;
  }
`;

const FlexRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width:100%;
  @media screen and (max-width: 700px) {
    flex-direction: column;
  }
`;

const FlexLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width:100%;
  @media screen and (max-width: 700px) {
    flex-direction: column;
  }
`;

export {FlexLeft,FlexRight,Flex };