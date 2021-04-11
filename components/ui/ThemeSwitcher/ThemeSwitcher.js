import React from "react";
import Switch from "../../elements/Switch";
import { RiSunLine, RiMoonClearLine } from "react-icons/ri";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ThemeContext } from "../../../context";
const ThemeSwitcher = () => {
  const ThemeContextx = React.useContext(ThemeContext);

  return (
    <ThemeSwitchContainer>
      <RiSunLine></RiSunLine>
      <Switch
        dotSize="10px"
        switchWidth="30px"
        isOn={ThemeContextx.mode === "Black" ? true : false}
        FalseAction={() => ThemeContextx.updateTheme("White")}
        TrueAction={()=>ThemeContextx.updateTheme("Black")}
      ></Switch>
      <RiMoonClearLine></RiMoonClearLine>
    </ThemeSwitchContainer>
  );
};
const ThemeSwitchContainer = styled(motion.div)`
  top: 55px;
  left: 70px;
  cursor: pointer;
  opacity: 0.7;
  position: absolute;
  display: flex;
  z-index: 2;
  align-items: center;
  justify-content: center;
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    top: unset;
    left: unset;
    right:25px;
    bottom:4vh;
  }
  pointer-events: all;
  transition: all 0.6s ease-out;
  &:hover {
    opacity: 1;
  }
`;
export default ThemeSwitcher;
