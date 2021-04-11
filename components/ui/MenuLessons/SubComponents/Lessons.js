import React from "react";
import styled from "styled-components";

import { AiOutlineCheck } from "react-icons/ai";
const Lessons = ({ obj,setLessons, index,selected }) => {
    return (
      <LessonsItem onClick={()=>setLessons(obj)} selected={obj.id === selected}>
        <LessonsSubContainer>
          <CompleteContainer check={obj.check}>
            <AiOutlineCheck></AiOutlineCheck>
          </CompleteContainer>
          <LessonsTitle check={obj.check}>
            {index}. {obj.name}
          </LessonsTitle>
        </LessonsSubContainer>
        <LessonsTime check={obj.check}>{obj.time}</LessonsTime>
      </LessonsItem>
    );
  };

const LessonsItem = styled.li`
  margin: 15px 5px;
  height: 45px;
  border-radius: 20px;
  color: ${(props) => props.theme.colors.third};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  &:before {
    content: "";
    background: white;
    transition: transform 0.3s cubic-bezier(0.7, 0, 0.2, 1);
    position: absolute;
    top: 0;
    opacity: 0.03;
    border-radius: 10px;
    left: 0;
    width: 100%;
    height: 100%;
    transform: scale3d(0, 0, 1);
  }

  &:hover:before {
    transform: scale3d(1, 1, 1);
  }

  &:before{
    transform: ${(props) => props.selected ? "scale3d(1, 1, 1)" : ""};
  }
`;
const LessonsSubContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;
const CompleteContainer = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid
    ${(props) =>
      props.check ? props.theme.colors.succes : props.theme.colors.error};
  display: flex;
  justify-content: center;
  align-items: center;
  & svg {
    display: ${(props) => (props.check ? "block" : "none")};
  }
  white-space: nowrap;
`;

const LessonsTitle = styled.h4`
  margin-left: 10px;
  color: ${(props) =>
    props.check ? props.theme.colors.third : props.theme.colors.primary};
  opacity: ${(props) => (props.check ? 0.9 : 0.3)};

  white-space: nowrap;
  overflow: hidden;
  margin-bottom: 0.15em;
`;
const LessonsTime = styled.span`
  color: ${(props) =>
    props.check ? props.theme.colors.third : props.theme.colors.primary};
  opacity: ${(props) => (props.check ? 0.9 : 0.3)};
  margin-right: 20px;
`;

export default Lessons;