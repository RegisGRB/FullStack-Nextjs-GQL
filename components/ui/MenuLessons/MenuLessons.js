import React from "react";
import styled from "styled-components";

import { ThemeContext } from "../../../context";
import Chapter from "./SubComponents/Chapter";
import Lessons from "./SubComponents/Lessons";
import { motion } from "framer-motion";
import { AiOutlineOrderedList } from "react-icons/ai";

const MenuLessons = ({DATA,setLessons,selected}) => {
  const ThemeContextx = React.useContext(ThemeContext);
  const [Open, setOpen] = React.useState(false);

  return (
    <Container
      className="MenuRef"
      initial={{
        x:
          window.innerWidth <= ThemeContextx.breakpointsValue.md
            ? "80vw"
            : "20vw",
      }}
      animate={{
        x: Open
          ? 0
          : window.innerWidth <= ThemeContextx.breakpointsValue.md
          ? "80vw"
          : "20vw",
      }}
    >
      <ToggleButton onClick={() => setOpen(!Open)}  Open={Open}><ToggleText Open={Open}><AiOutlineOrderedList></AiOutlineOrderedList></ToggleText></ToggleButton>
      <MenuContainer>
        {DATA.map((e, i) => {
          return (
            <Chapter
              key={`chapter${i}`}
              difficulty={e.Chapter.difficulty}
              index={i + 1}
              title={e.Chapter.name}
              progress={countProgress(e.Chapter.Lessons)}
            >
              <LessonsContainer>
                {e.Chapter.Lessons.map((obj, i) => {
                  return (
                    <Lessons
                      key={`lessons${i}`}
                      obj={obj}
                      selected={selected}
                      setLessons={setLessons}
                      index={i + 1}
                    ></Lessons>
                  );
                })}
              </LessonsContainer>
            </Chapter>
          );
        })}
      </MenuContainer>
    </Container>
  );
};
const countProgress = (Lessons) => {
  var Total = Lessons.length;
  var x = 0;

  Lessons.map((e) => {
    if (e.check) x++;
  });

  return Math.round((100 * x) / Total);
};

const Container = styled(motion.div)`
width: 20vw;
position: fixed;
right: 0px;
top: 0;
z-index:9999;
}
`;
const ToggleText = styled.h3`
  color: ${(props) => props.Open ? props.theme.colors.third : props.theme.colors.fontprimary};
  opacity: 0.5;

`;
const MenuContainer = styled.div`
  background-color: ${(props) => props.theme.colors.secondary};
  height: 100vh;
  overflow-y: scroll;
  width: 20vw;
  @media (max-width: 768px) {
    width: 80vw;
  }
  position: fixed;
  right: 0px;
  top: 0;
  box-shadow: 0 14px 10px rgb(255 255 255 / 5%);
  ::-webkit-scrollbar {
    width: 0px;
  }
`;
const ToggleButton = styled.div`
  background-color: #262b2e;
  height: 50px;
  width: 50px;
  border-radius: 0px;
  position: absolute;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  right: 20vw;
  display:flex;
  justify-content:center;
  align-items:center;
  @media (max-width: 768px) {
    right: 80vw;
  }
  top: 50px;
  cursor: pointer;
  overflow: hidden;
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
    transform: translate3d(100%, 0, 0);
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
const LessonsContainer = styled.ul`
  width: 100%;
`;
export default MenuLessons;
