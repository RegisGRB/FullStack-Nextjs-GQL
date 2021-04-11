import React from "react";
import useSize from "../../Hooks/useSize";
import { ThemeContext } from "../../context";
import styled from "styled-components";
const HorizontalContainer = ({ children }) => {
  const screenWidth = useSize().width;
  const ThemeContextx = React.useContext(ThemeContext);
  const list = React.useRef(null);
  const [active, setactive] = React.useState(false);

  React.useEffect(() => {
    if (screenWidth <= ThemeContextx.breakpointsValue.md) {
      TouchScreen();
    } else {
      MouseScreen();
    }
  }, [screenWidth]);

  const MouseScreen = () => {
    let startX;
    let scrollLeft;
    let isDown = false;
    list.current.addEventListener("mousedown", (e) => {
      isDown = true;
      setactive(true);
      startX = e.pageX - list.current.offsetLeft;
      scrollLeft = list.current.scrollLeft;
    });
    list.current.addEventListener("mouseleave", () => {
      isDown = false;
      setactive(false);
    });
    list.current.addEventListener("mouseup", () => {
      isDown = false;
      setactive(false);
    });
    list.current.addEventListener("mousemove", (e) => {
      console.log(e);
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - list.current.offsetLeft;
      const walk = (x - startX) * 1; //scroll-fast
      list.current.scrollLeft = scrollLeft - walk;
      console.log(walk);
    });
  };

  const TouchScreen = () => {
    list.current.addEventListener("touchstart", (e) => {
      setactive(true);
    });
    list.current.addEventListener("touchleave", () => {
      setactive(false);
    });
    list.current.addEventListener("touchend", () => {
      setactive(false);
    });
  };

  return (
    <StyledlList ref={list} active={active}>
      {children}
    </StyledlList>
  );
};
const StyledlList = styled.div`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  transition: all 0.2s;
  transform: scale(0.98);
  will-change: transform;
  user-select: none;
  cursor: pointer;

  background: ${(props) => (props.active ? "" : "")};
  cursor: ${(props) => (props.active ? "grabbing" : "")};
  cursor: ${(props) => (props.active ? "-webkit-grabbing" : "")};
  transform: ${(props) => (props.active ? "scale(1.1)" : "")};
  &::-webkit-scrollbar {
    width: 0;
  }
`;
export default HorizontalContainer;
