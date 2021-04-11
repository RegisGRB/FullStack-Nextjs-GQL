import React from "react";
import ReactPlayer from "react-player";
import { motion } from "framer-motion";
import styled from "styled-components";

const Player = ({ url }) => {
  const [loaded, setloaded] = React.useState(false);
  return (
    <>
      <PlayerContainer
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: loaded ? 1 : 0,

          height: loaded ? "100%" : "0px",
          duration: 1,
        }}
      >
        <ReactPlayer
          url={url}
          onReady={() => setloaded(true)}
          width="100%"
          height="100%"
        />
      </PlayerContainer>

        <Wrapper initial={{
          opacity: 1,
        }}
        animate={{
          opacity: loaded ? 0 : 1,
          height: loaded ? "0%" : "100%",
          duration: 0.6,
        }}>
          <Cardloader></Cardloader>
        </Wrapper>

    </>
  );
};

export default Player;
const PlayerContainer = styled(motion.div)`
  width: 100%;
  height: 0%;
  position: relative;
  display: block;

`;
const Wrapper = styled(motion.div)`
  width: 100%;
  height: 100%;

`;
const Cardloader = styled(motion.div)`
  box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.08),
    0 -1px 3px 0 rgba(0, 0, 0, 0.06);
  padding: 8px;
  position: relative;
  border-radius: 2px;
  margin-bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  &:only-child {
    margin-top: 0;
  }

  &:before {
    content: "";
    width: 100%;
    height: 100%;
    display: block;
     background-color:#32ffce;
 
  }

  &:after {
    content: "";
    background-color: #333;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    animation-duration: 0.6s;
    animation-iteration-count: infinite;
    animation-name: loader-animate;
    animation-timing-function: linear;
    background: -webkit-linear-gradient(
      left,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.6) 30%,
      rgba(255, 255, 255, 0) 81%
    );
    background: -o-linear-gradient(
      left,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.6) 30%,
      rgba(255, 255, 255, 0) 81%
    );
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.6) 30%,
      rgba(255, 255, 255, 0) 81%
    );
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#00ffffff',GradientType=1 );
  }
`;

// Loader animation
