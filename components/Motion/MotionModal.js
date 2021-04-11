import React from "react";
import MotionFade from "./MotionFade";
import { motion } from "framer-motion";
import styled from "styled-components";
import StyledTheme from "../StyledComponents/StyledTheme";
import MotionBox from "./MotionBox";

const MotionModal = ({ controller, children ,variants}) => {

  return (
    <MotionBox controller={controller} exitbeforeenter={true} variants={variants}>
      <StyledModal as={motion.div} backgroundcolor="true" >
        {children}
      </StyledModal>
    </MotionBox>
  );
};



const StyledModal = styled(StyledTheme)`
position:absolute;
overflow:hidden;
top:0;
left:0;
width:fit-content;
height:fit-content;
z-index:9999
`;


export default MotionModal;
