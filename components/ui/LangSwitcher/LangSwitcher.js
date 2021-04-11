import React from "react";
import Switch from "../../elements/Switch";
import styled from "styled-components";
import { motion } from "framer-motion";
import { LangContext } from "../../../context";
import SpanText from "../../elements/SpanText";
const LangSwitcher = () => {
  const LangContextx = React.useContext(LangContext);

  return (
    <ThemeSwitchContainer>
      <SpanText>EN</SpanText>
      <Switch
        dotSize="10px"
        switchWidth="30px"
        isOn={LangContextx.getTranslation() === "en" ? true : false}
        FalseAction={() => LangContextx.updateTranslation("en")}
        TrueAction={()=>LangContextx.updateTranslation("fr")}
      ></Switch>
      <SpanText>FR</SpanText>
    </ThemeSwitchContainer>
  );
};
const ThemeSwitchContainer = styled(motion.div)`
  top: 55px;
  right: 70px;
  cursor: pointer;
  opacity: 0.7;
  position: absolute;
  display: flex;
  z-index: 2;
  align-items: center;
  justify-content: center;
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    top: unset;
    left: 25px;
    bottom:4vh;
  }
  pointer-events: all;
  transition: all 0.6s ease-out;
  &:hover {
    opacity: 1;
  }
`;
export default LangSwitcher;
