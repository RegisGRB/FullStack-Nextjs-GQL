import React from "react";
import MotionBox from "./MotionBox";

const MotionFade = ({ controller, children,show=[0,0,1],hidden=[100,0,0],duration=0.6 }) => {
  const transitionIn = { duration: duration, ease: [0.6, 0.01, -0.05, 0.9],delay:0.8 };
  const transitionOut = { duration: duration, ease: [0.6, 0.01, -0.05, 0.9],delay:0.2 };
  const variants = {
    show: { y: show[0], x: show[1], opacity: show[2], transitionIn},
    hidden: { y: hidden[0],x:hidden[1], opacity: hidden[2], transitionOut },
  };
  
  return (
    <MotionBox controller={controller} variants={variants}>
      {children}
    </MotionBox>
  );
};

export default MotionFade;
