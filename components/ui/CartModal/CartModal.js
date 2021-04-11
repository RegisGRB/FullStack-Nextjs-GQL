import React from "react";
import Form from "../Form/Form";
import styled from "styled-components";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import MotionBox from "../../Motion/MotionBox";
import { useAuth } from "../../../context/AuthContext";
import * as Product from "../../../Apollo/Query/Product";
import * as elements from "../../elements";
import Notification from "../Notification/Notification";
import { AiOutlineDelete, AiFillCloseCircle } from "react-icons/ai";
import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client";
import * as OrderQuery from "../../../Apollo/Query/Order";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const CartModal = ({ controller, setController }) => {
  const stripePromise = loadStripe(
    "pk_test_51IdKa0EWLULmTbAKGBKjf8qY2qlJ966Q7Icsnb18lx9XGecW6BMhfZGmDct1EvySAnuhBGi7Ejuat8P2Q1Tk5crL00HEfwebtZ"
  );
  const { Cart, AddCart, removeCart, GetCookies, deleteCart } = useAuth();
  const [StripeIn, setStripeIn] = React.useState(false);
  const [CartModaldata, setCartModaldata] = React.useState([]);
  const [CartCheckout, setCartCheckout] = React.useState([]);
  const [total, settotal] = React.useState(0);
  const [Notif, setNotif] = React.useState(false);
  const [GetProducts, { loading, data, error }] = useLazyQuery(
    Product.default.Products
  );

  React.useEffect(() => {
    GetProducts();
    if (data?.products) {

      let x = [];
      let z = [];
      let totalx = 0;
      Cart.forEach((element) => {
        const isId = (e) => e.id === element.id;
        let w = data.products.findIndex(isId);
        if (w != -1) {
          z.push(data.products[w].id);
          totalx += data.products[w].Price * element.qty;
          x.push({ ...data.products[w], qty: element.qty });
        }
      });
      setCartModaldata(x);
      setCartCheckout(z);
      settotal((Math.round(totalx * 100) / 100).toFixed(2));
    }
  }, [data, Cart, total]);

  if (loading) return <h1>loading</h1>;

  return (
    <>
      <Elements stripe={stripePromise}>
        <CheckoutForm
          controller={StripeIn}
          CloseAction={setStripeIn}
          Price={total}
          cart={CartCheckout}
        ></CheckoutForm>
      </Elements>
      <MotionBox controller={controller} variants={variantsUp}>
        <RightModal>
          <CloseControllerContainer onClick={() => setController(false)}>
            <AiFillCloseCircle></AiFillCloseCircle>
          </CloseControllerContainer>
          <ContentContainer>
            {CartModaldata.map((e, i) => {
              return (
                <elements.FlexLeft key={i}>
                  <elements.Title>{e.Title}</elements.Title>
                  <elements.Title as="h3">X{e.qty}</elements.Title>
                  <GridImgContainer>
                    <elements.GRIDCard background={e.Url}></elements.GRIDCard>
                  </GridImgContainer>
                  <DeleteContainer onClick={() => removeCart(e)}>
                    <AiOutlineDelete></AiOutlineDelete>
                  </DeleteContainer>
                </elements.FlexLeft>
              );
            })}
          </ContentContainer>

          <ChekoutContainer>
            <elements.Button
              onClick={() => {
                if (CartCheckout.length > 0) {
                  setStripeIn(true);
                  setController(false);
                }else{
                    setNotif(true);
                }
              }}
            >
              Checkout
            </elements.Button>
            <h1>{total}€</h1>
          </ChekoutContainer>
        </RightModal>
      </MotionBox>
      <Notification
          Notiftype={false}
          controller={Notif}
          setController={setNotif}
        >
          Vous devez ajouter des produits à votre panier
        </Notification>
    </>
  );
};
const RightModal = styled(motion.div)`
  position: fixed;
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.secondary};
  top: 0;
  right: 0;
  z-index: 9999;
  width: 30vw;
  height: 100vh;
`;
const ContentContainer = styled(motion.div)`
  height: 80%;
  overflow: auto;
  width: 100%;
`;

const DeleteContainer = styled(motion.div)`
  font-size: 30px;
  color: red;
  margin: 30px;
  cursor: pointer;
`;
const CloseControllerContainer = styled(motion.div)`
  font-size: 30px;
  color: ${(props) => props.theme.colors.secondary};
  margin: 30px;
  cursor: pointer;
`;
const ChekoutContainer = styled(motion.div)`
  color: ${(props) => props.theme.colors.secondary};
  margin-bottom: 60px;
  display: flex;
  width: 80%;
  justify-content: space-around;
`;
const GridImgContainer = styled(motion.div)`
  width: 60px;
  height: 60px;
`;
const transition = { duration: 1.2 };
const variantsUp = {
  show: { x: 0, transition: { ...transition } },
  hidden: { x: 1000, transition },
  key: "up",
};
export default CartModal;
