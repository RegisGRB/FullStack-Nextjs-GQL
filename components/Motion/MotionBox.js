import React from "react";
import { AnimatePresence,motion } from "framer-motion";
import { helpers } from "../../utils";
const MotionBox = ({ controller, variants,exitBeforeEnter=false,initial=false, ...props }) => {

  return (
    <AnimatePresence exitBeforeEnter={exitBeforeEnter} initial={initial}>
      {controller && (
          React.cloneElement(props.children, {
            initial: "hidden",
            key:"box"+variants.key,
            animate: "show" ,
            exit: "hidden",
            variants: variants,
          })
      )}
      </AnimatePresence>
  );
};

export default MotionBox;
