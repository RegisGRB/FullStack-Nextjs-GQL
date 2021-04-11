import React from "react";
import styled from "styled-components";

const LessonsLink = ({ name, links }) => {
  return (
    <LinkList>
      <LinkSectionTitle>{name}</LinkSectionTitle>
      {links.map((e,i) => {
        return (
          <LinkItem  key={`linkItem${i}`} >
            <Link href={e.url} target="_blank">
              {e.name}
            </Link>
          </LinkItem>
        );
      })}
    </LinkList>
  );
};
const LinkSectionTitle = styled.h4`
  margin-left: 10px;
  color: ${(props) =>props.theme.colors.fontprimary};

`;
const Link = styled.a`
  margin-left: 10px;
  width:100%;
  pointer-events:all;
  color: ${(props) => props.theme.colors.third};
`;
const LinkItem = styled.li`
  margin: 5px 5px;
  margin-left: 35px;
  height: 30px;
  border-radius: 20px;
  color: ${(props) => props.theme.colors.third};
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events:none;
  cursor: pointer;
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
&:after{
    content: '';
    display: block;
    position: absolute;
    top: 45%;
    left: -20px;
    width: 4px;
    height: 4px;
    background: #fff;
    opacity: 0.2;
}
  &:hover:before {
    transform: scale3d(1, 1, 1);
  }
`;
const LinkList = styled.ul`
  list-style: square;
  color: ${(props) => props.theme.colors.succes};
  margin-left: 20%;
  margin-top: 30px; ;
`;
export default LessonsLink;