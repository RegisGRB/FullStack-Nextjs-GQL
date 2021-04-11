import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const Switch = ({
  isOn=false,
  FalseAction = () => {},
  TrueAction = () => {},
  ...props
}) => {
  const [On, setOn] = React.useState(isOn);

  React.useEffect(() => {
    if (On) {
      TrueAction();
    } else {
      FalseAction();
    }
  }, [On]);

  return (
    <StyledSwitchContainer animate On={On} onClick={() => setOn(!On)} {...props}>
      <StyledSwitch animate {...props}/>
    </StyledSwitchContainer>
  );
};
const StyledSwitchContainer = styled(motion.div)`
  width: ${(props) =>props.switchWidth ? props.switchWidth: "50px"};;
  border-radius: 100px;
  padding: 10px;
  display: flex;
  margin:5px;
  cursor: pointer;
  transition: all 0.6s ease-in-out;
  ${(props) =>
    props.On
      ? "background-color: #22cc88;justify-content: flex-end;"
      : "background-color: #dddddd;justify-content: flex-start;"};
`;
const StyledSwitch = styled(motion.div)`
  width: ${(props) =>props.dotSize ? props.dotSize: "20px"};
  height: ${(props) =>props.dotSize ? props.dotSize: "20px"};
  background-color: #ffffff;
  border-radius: 200px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.02);
`;
export default Switch;
