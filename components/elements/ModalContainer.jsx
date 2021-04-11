import styled from "styled-components";
import { motion } from "framer-motion";
const ModalContainer = styled(motion.div)`
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index:99999999;
  top:0;
  left:0;
  &:before{
    content:"";
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    left:0;
    background: ${(props) => props.theme.colors.primary};
    opacity:0.5;
  }
`;
const ModalContainerBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40vw;
  height: 80vh;
  position: fixed;
  top: 10vh;
  left: 30vw;
  background: ${(props) => props.theme.colors.secondary};
  overflow: hidden;
  @media (max-width: 768px) {
    width: 80vw;
    left: 10vw;
  }
`;
export default {ModalContainer,ModalContainerBox};