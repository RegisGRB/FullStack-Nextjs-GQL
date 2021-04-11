import React from "react";

import styled from "styled-components";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import Sign from "../ui/Sign/Sign";
import { useAuth, SignForm } from "../../context/AuthContext";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import CartModal from "../ui/CartModal/CartModal";
const Navbar = () => {

  const { authToken, signOut, Cart, userdata } = useAuth();
  const [OpenSign, setOpenSign] = React.useState(false);
  const [OpenCart, setOpenCart] = React.useState(false);
  const [CartNumber, setCartNumber] = React.useState(0);
  const router = useRouter();
  React.useEffect(() => {
    if (authToken != null) {
      setOpenSign(false);
    }
  }, [authToken, userdata]);
  React.useEffect(() => {
    if (Cart) {
      var x = 0;
      Cart.forEach((element) => {
        x += element.qty;
      });
      setCartNumber(x);
    }
  }, [Cart]);

  return (
    <>
      <Header>
        <Nav>
          <LinkContainer>
            {authToken != null && userdata?.IsAdmin && (
              <MLink onClick={() => router.push("/AdminOrder")}>
               AdminOrder
              </MLink>
            )}
            {authToken != null && userdata?.IsAdmin && (
              <MLink onClick={() => router.push("/AdminUser")}>
                AdminUser
              </MLink>
            )}

            {authToken != null && userdata?.IsAdmin && (
              <MLink onClick={() => router.push("/AdminProduct")}>
               AdminProduct
              </MLink>
            )}
          {authToken != null && userdata?.IsAdmin && (
              <MLink onClick={() => router.push("/AdminCategorie")}>
               AdminCategorie
              </MLink>
            )}
            <MLink>
              <a href="/">Home</a>
            </MLink>
            <MLink
              onClick={() => {
                authToken != null ? router.push("/Account") : setOpenSign(true);
              }}
            >
              Account
            </MLink>
            {Cart && (
              <MLink
                onClick={() => {
                  authToken != null ? setOpenCart(true) : setOpenSign(true);
                }}
              >
                {CartNumber}
              </MLink>
            )}
            {authToken != null && (
              <MLink onClick={() => signOut()}>LogOut</MLink>
            )}
          </LinkContainer>
          <Bar></Bar>
        </Nav>
      </Header>
      <Sign controller={OpenSign} CloseAction={setOpenSign}></Sign>
      <CartModal controller={OpenCart} setController={setOpenCart}></CartModal>
    </>
  );
};

const Header = styled(motion.header)`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  top: 0;
  left: 0;
  width: 100%;
  cubic-bezier(.4,0,.2,1);
  z-index: 99;
  position: absolute;
`;
const Nav = styled(motion.nav)`
  padding: 1.5rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
`;
const LinkContainer = styled.ul`
  display: flex;
`;
const MLink = styled.li`
  margin-bottom: 10px;
  margin: 10px;
  list-style-type: none;
  cursor: pointer;
  color: ${(props) => props.theme.colors.primary};
`;
const Bar = styled(motion.div)`
  height: 3px;
  width: 100%;
  background: ${(props) => props.theme.colors.primary}; ;
`;
export default Navbar;
