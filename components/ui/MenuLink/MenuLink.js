import React from "react";
import styled from "styled-components";
import { ThemeContext } from "../../../context";
import { AiOutlineLink } from "react-icons/ai";
import LessonsLink from "./SubComponents/LessonsLink";
import { motion } from "framer-motion";

const MenuLink = ({DATA}) => {
  const ThemeContextx = React.useContext(ThemeContext);
  const [Open, setOpen] = React.useState(false);

  return (
    <Container
      className="MenuLink"
      initial={{
        height:"50px"
      }}
      animate={{
        height: Open
          ? window.innerWidth <= ThemeContextx.breakpointsValue.md
          ? "80vh"
          : "40vh"
          : "50px"
      }}
    >
      <ToggleButton onClick={() => setOpen(!Open)} Open={Open}>
        <ToggleText Open={Open}>
          <AiOutlineLink></AiOutlineLink>
        </ToggleText>
      </ToggleButton>
      <MenuContainer>
        {DATA[0].Chapter.Lessons[0].Utils.map((e, i) => {
          return (
            <LessonsLink
              key={`link${i}`}
              name={e.name}
              links={e.utilsLink}
            ></LessonsLink>
          );
        })}
      </MenuContainer>
    </Container>
  );
};

const MenuContainer = styled.div`
  background-color: ${(props) => props.theme.colors.secondary};
  height: 100%;
  width: 100%;
  ::-webkit-scrollbar {
    width: 0px;
  }
  overflow-y: scroll;
  box-shadow: 0 14px 40px rgb(255 255 255 / 5%);
`;
const Container = styled(motion.div)`
  position: fixed;
  left: 2vw;
  bottom: 0;
  height: 50px;
  width: 20vw;
  @media (max-width: 768px) {
    width: 95vw;
    left: 2vw;
  }
  z-index:9999;
`;
const ToggleButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #262b2e;
  height: 50px;
  border-radius: 0px;
  border-top-left-radius: 10px;
  box-shadow: 0 -4px 30px rgb(0 0 0 / 47%);
  border-top-right-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  width: 50px;
  left: 0;
  &:before {
    content: "";
    background: white;
    transition: transform 0.3s cubic-bezier(0.7, 0, 0.2, 1);
    position: absolute;
    top: 0;
    opacity: 0.08;
    left: 0;
    width: 100%;
    height: 100%;
    transform: translate3d(0, 100%, 0);
  }
  &:hover:before {
    transform: translate3d(0, 0, 0);
  }
  &:before{
    transform:${(props) => props.Open ? "translate3d(0, 0, 0)" : ""};
  }

  &:hover h3{
    color: ${(props) => props.theme.colors.third};
  }
`;
const ToggleText = styled.h3`
color: ${(props) => props.Open ? props.theme.colors.third : props.theme.colors.fontprimary};
  opacity: 0.5;
`;

export default MenuLink;
