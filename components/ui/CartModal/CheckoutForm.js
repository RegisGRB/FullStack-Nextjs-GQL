import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import MotionBox from "../../Motion/MotionBox";
import { useAuth } from "../../../context/AuthContext";
import Notification from "../Notification/Notification";
import * as element from "../../elements";
import { loadStripe } from "@stripe/stripe-js";
import db from "../../../config/db.config"
import axios from 'axios'
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client";
import * as OrderQuery from "../../../Apollo/Query/Order";
const CheckoutForm = ({ CloseAction, controller, Price,cart }) => {
  const [Notif, setNotif] = React.useState(false);
  const [Load, setLoad] = React.useState(false);
  const [NotifType, setNotifType] = React.useState(false);
  const [NotifMsg, setNotifMsg] = React.useState("");
  const { Getme, userdata,deleteCart,GetCookies } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [CreateOrder, Order] = useMutation(OrderQuery.default.CreateOrder);

  const Checkout = async () => {
    let user = GetCookies();
    const result = await CreateOrder({
      variables: {
        AmountTotal: parseFloat(Price),
        Products: cart,
        User: user.id,
        Statut:"Entrepot"
      },
    });

  };
  const handleSubmit = async (e) => {
    // Block native form submission.
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    setLoad(true);
    const billingInfo = {
      name: e.target.name.value,
      email: e.target.email.value,
      address: {
        line1: e.target.adress.value,
      },
    };
    const cardElement = elements.getElement(CardElement);

      const paymentIntent = await axios.post(
        `${process.env.NEXT_PUBLIC_GAID}/create-payment-intent`,
        {
          Price: Price,
          receipt_email: e.target.email.value,
        }
      );
      // // Create PaymentMethod Object
      const paymentMethodObj = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: billingInfo,
      });

      if (paymentMethodObj.error) {
        setNotifMsg(paymentMethodObj.error.message);
        setNotifType(false);
        setNotif(true);
        return;
      }

      // Confirm Payment Method
      const confirmPayment = await stripe.confirmCardPayment(
        paymentIntent.data.clientSecret,
        {
          payment_method: paymentMethodObj.paymentMethod.id,
        }
      );

      if (confirmPayment.error) {
        setNotifMsg(confirmPayment.error.message);
        setNotifType(false);
        setNotif(true);
        return;
      }
     



      if (confirmPayment.paymentIntent.status == "succeeded") {
        setNotifMsg("Votre paiement à été enregistré");
        setNotifType(true);
        setNotif(true);
        Checkout();
        setTimeout(()=>{
          deleteCart();
          setLoad(false);
          CloseAction(false);
        },2000)
       
      }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.


    // Use your card Element with other Stripe.js APIs
    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //   type: "card",
    //   card: cardElement,
    // });

    // if (error) {
    //   console.log("[error]", error);
    // } else {
    //   console.log("[PaymentMethod]", paymentMethod);
    // }
  };

  return (
    <MotionBox controller={controller} variants={variantsFade}>
      <Container>
        <SignContainer>
          <SignRight>
            <BoxSign>
              <Title>Commande</Title>
              <form onSubmit={handleSubmit}>
                <div className="inputFields">
                  <element.Input
                  as="input"
                    id="NamePay"
                    defaultValue={`${userdata?.Firstname} ${userdata?.Lastname}`}
                    type="text"
                    name="name"
                    required
                  ></element.Input>
                  <element.Label htmlFor="NamePay">Nom Prénom</element.Label>
                </div>

                <div className="inputFields">
                  <element.Input
                         as="input"
                    id="EmailPay"
                    defaultValue={userdata?.Email}
                    type="email"
                    name="email"
                    required
                  ></element.Input>
                  <element.Label htmlFor="EmailPay">Email</element.Label>
                </div>
                <div className="inputFields">
                  <element.Input
                    id="AdressPay"
                    as="input"
                    defaultValue={`${userdata?.Adress}`}
                    type="text"
                    name="adress"
                    required
                  ></element.Input>
                  <element.Label htmlFor="AdressPay">Adress</element.Label>
                </div>
                <FieldsConainer>
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#424770",
                          "::placeholder": {
                            color: "#aab7c4",
                          },
                        },
                        invalid: {
                          color: "#9e2146",
                        },
                      },
                    }}
                  />
                </FieldsConainer>
                <PayContainer>
                  <element.Button type="submit" disabled={Load}>
                    Pay
                  </element.Button>
                  {Price}€
                </PayContainer>
              </form>
            </BoxSign>
          </SignRight>
          <CloseContainer
            onClick={() => {
              if(!Load){
              CloseAction();
              }
            }}
          >
            <AiOutlineClose></AiOutlineClose>
          </CloseContainer>
        </SignContainer>
        <Notification
          Notiftype={NotifType}
          controller={Notif}
          setController={setNotif}
        >
          {NotifMsg}
        </Notification>
      </Container>
    </MotionBox>
  );
};

const transition = { duration: 0.6, ease: [0.6, 0.01, -0.05, 0.9] };

const variantsFade = {
  show: { opacity: 1, transition },
  hidden: { opacity: 0, transition },
  key: "downx",
};
const SignContainer = styled(motion.div)`
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
const CloseContainer = styled.div`
  cursor: pointer;
  top: 10%;
  right: 10%;
  position: absolute;
  z-index: 1;
  color: ${(props) => props.theme.colors.primary};
`;
const FieldsConainer = styled.div`
  margin-top: 30px;
`;
const PayContainer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Container = styled(motion.div)`
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 99999999;
  top: 0;
  left: 0;
  &:before {
    content: "";
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: ${(props) => props.theme.colors.primary};
    opacity: 0.5;
  }
`;
const BoxSign = styled(motion.div)`
  width: 60%;
  height: 60%;
  position: absolute;
  @media (max-width: 768px) {
    height: 80%;
    position: absolute;
    margin-left: 10%;
  }
}
`;
const Title = styled.h1`
  width: 100%;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 15%;
`;
const SignRight = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

export default CheckoutForm;
