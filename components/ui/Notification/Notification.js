import React from "react";
import styled from "styled-components";
import MotionBox from "../../Motion/MotionBox";
import {motion } from "framer-motion";
const Notification = ({ controller=false, setController,Notiftype=true,children }) => {

React.useEffect(()=>{
    if(controller==true){
    setTimeout(() => {
        setController(false);
     
    }, 2000);
}

})
  return (
    <MotionBox variants={variantsUp} controller={controller} key="xd">
      <NotifContainer Notiftype={Notiftype}>
        <Title>{children}</Title>
      </NotifContainer>
    </MotionBox>
  );
};
const transition = { duration: 0.3, ease: [0.6, 0.01, -0.05, 0.9] };
const variantsUp = {
  show: { y: 0, opacity: 1, transition},
  hidden: { y: 100, opacity: 0, transition },
  key: "up",
};
const NotifContainer = styled(motion.div)`
width:30vw;
min-height:10vh;
background:${(props)=> props.Notiftype ? props.theme.colors.success : props.theme.colors.error};
position:relative;
display:flex;
justify-content:center;
align-items:center;
z-index:9999999999;
position:absolute;
bottom:0;
right:0;
`;
const Title = styled.span`
color:${(props)=>props.theme.colors.secondary}
`;
export default Notification;
