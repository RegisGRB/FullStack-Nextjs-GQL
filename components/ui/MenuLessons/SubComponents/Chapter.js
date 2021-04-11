import React from "react";
import styled from "styled-components";
import { helpers } from "../../../../utils";


const Chapter = ({ difficulty, title, index, children, progress }) => {
  return (
    <>
      <ChapterContainer>
        <ChapterProgression progress={progress}>
          <Progression>{progress}</Progression>
        </ChapterProgression>
        <ChapterTitleContainer>
          <ChapterSubTitle>Chapter {index}</ChapterSubTitle>
          <ChapterTitle
            title="Basics"
            difficulty={helpers.ColorDifficulty(difficulty)}
          >
            {title}
          </ChapterTitle>
        </ChapterTitleContainer>
      </ChapterContainer>
      {children}
    </>
  );
};

export default Chapter;

const ChapterContainer = styled.div`
  background-color: ${(props) => props.theme.colors.fontsecondary};
  width: 100%;
  height: 80px;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
`;
const ChapterProgression = styled.div`
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  position: relative;
  width: 40px;
  overflow: hidden;
  height: 40px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 50%;

  &:after {
    content: "";
    position: absolute;
    padding: 2px;
    background: ${(props) => props.theme.colors.third};
    width: 100%;
    height: ${(props) => props.progress}%;
    opacity: 0.3;
    bottom: 0;
  }
`;
const Progression = styled.span`
  font-size: 15px;
  font-weight: bold;
  letter-spacing: 1px;
  color: ${(props) => props.theme.colors.third};
`;

const ChapterTitleContainer = styled.div`
  position: relative;
  width: 66%;
  margin-right: 10%;
`;
const ChapterSubTitle = styled.h3`
  font-size: 15px;
  font-weight: bold;
  letter-spacing: 1px;
  color: ${(props) => props.theme.colors.primary};
`;
const ChapterTitle = styled.h2`
  font-family: "Greycliff", sans-serif;
  font-weight: 700;
  font-size: 1.75rem;
  color: ${(props) => props.difficulty};
  line-height: 1em;
  margin-bottom: 0.15em;

  white-space: nowrap;
  overflow: hidden;
  margin-bottom: 0.15em;
  text-overflow: ellipsis;
`;

