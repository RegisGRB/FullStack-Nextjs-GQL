import React from "react";
import styled from "styled-components";

import cat1 from "../../assets/type/chat1.png";
import cat2 from "../../assets/type/chat2.png";
import cat3 from "../../assets/type/chat3.png";

import dog1 from "../../assets/type/dog1.png";
import dog2 from "../../assets/type/dog2.png";
import dog3 from "../../assets/type/dog3.png";

import rabbit1 from "../../assets/type/rabbit1.png";
import rabbit2 from "../../assets/type/rabbit2.png";
import rabbit3 from "../../assets/type/rabbit3.png";

import bird1 from "../../assets/type/bird1.png";
import bird2 from "../../assets/type/bird2.png";
import bird3 from "../../assets/type/bird3.png";

 // de base je voulais faire de la 3d j'ai vu le temps j'avais pas le temps j'ai pris les model 3d en image png sans background a la place
 const ImgAnimal = {
  cat: {
    1: cat1,
    2: cat2,
    3: cat3,
  },
  dog: {
    1: dog1,
    2: dog2,
    3: dog3,
  },
  bird: {
    1: bird1,
    2: bird2,
    3: bird3,
  },
  rabbit: {
    1: rabbit1,
    2: rabbit2,
    3: rabbit3,
  },
};
const ProfileAnimal = React.memo(({ type,as,exit,transition,style,variants,initial,animate }) => {
 
  return (
  <StyledImg as={as} exit={exit} initial={initial} animate={animate} variants={variants} transition={transition} style={style}  src={ImgAnimal[type][1]}/>);
});

const StyledImg = styled.img`
pointer-events: none;
width:100%;
position:absolute;
@media (max-width: ${(props) => props.theme.breakpoints.md}) {
  width:unset;
  height:50%;
}
`;

export default ProfileAnimal;
