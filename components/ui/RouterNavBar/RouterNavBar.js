import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { helpers } from "../../../utils";
const RouterNavBar = ({ routes }) => {
  const router = useRouter();
  const GetHome = () => {
    var Home = [];
    routes.map((route) => {
      if (route.path == "/") {
        Home.push(route);
      }
    });
    return Home;
  };
  const GetLink = () => {
    var link = [];
    routes.map((route) => {
      if (route.path != "/") {
        link.push(route);
      }
    });
    return link;
  };

  return (
    <NavContainer>
      <List direction={true}>
        {GetHome().map((route, index) => {
          return (
            <NavLink
              route={route}
              index={index}
              location={router}
              key={"NavLink" + index}
            ></NavLink>
          );
        })}
      </List>
      <List direction={false}>
        {GetLink().map((route, index) => {
          return (
            <NavLink
              route={route}
              index={index}
              location={router}
              key={"NavLink" + index}
            ></NavLink>
          );
        })}
      </List>
    </NavContainer>
  );
};

const NavLink = ({ route, index, location, base }) => {


  if (!route.nav.show) return <></>;

  return (
    <ListItem
      base={base}
      initial={{ y: 0 }}
      animate={{
        y: location.pathname === route.path ? -5 : 0,
        transition: { ...transition, delay: 0.2 * (index + 1) },
      }}
    >
      <ListItemLink href={route.path}>
        <>
          {route.nav.icon}
          <ListItemTitle>{route.nav.name}</ListItemTitle>
        </>
      </ListItemLink>
    </ListItem>
  );
};
const transition = { duration: 1, ease: [0.6, 0.01, -0.05, 0.9] };
const variant = {
  Logoinitial: { opacity: 0 },
  Logoshow: { opacity: 1, transition: { ...transition, delay: 0 } },
};
const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 10%;
  z-index: 5;
  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    top: unset;
    bottom: 0;
    height: 7%;
  }
`;
const List = styled.ul`
  margin-right: 10%;
  display: flex;
  width:100%;
  height:100%;
  align-items:center;
  justify-content: ${(props) => (props.direction ? "flex-start" : "flex-end")};
  list-style-type:none;
`;
const ListItem = styled(motion.li)`
  margin-left: 5%;


`;

const ListItemLink = styled.a`
  display: flex;
  color: ${(props) => props.theme.colors.secondary};
  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
  }
`;
const ListItemTitle = styled.span`
  margin-left: 5px;
  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    margin-top: 5px;
    font-size: 0.7rem;
  }
`;

export default RouterNavBar;
