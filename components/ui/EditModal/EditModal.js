import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import MotionBox from "../../Motion/MotionBox";
import { useAuth } from "../../../context/AuthContext";
import Notification from "../Notification/Notification";
import * as element from "../../elements";

import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client";
import * as OrderQuery from "../../../Apollo/Query/Order";
import Form from "../Form/Form";
const EditModal = ({ CloseAction, controller, Fields, Action, Title }) => {
  const [Notif, setNotif] = React.useState(false);
  const [Load, setLoad] = React.useState(false);
  const [NotifType, setNotifType] = React.useState(false);
  const [NotifMsg, setNotifMsg] = React.useState("");
  const { Getme, userdata, deleteCart, GetCookies } = useAuth();

  return (
    <MotionBox controller={controller} variants={variantsFade}>
      <Container>
        <SignContainer>
          <SignRight>
            <BoxSign>
              <h1>{Title}</h1>
              <Form Fields={Fields} Action={Action}></Form>
            </BoxSign>
          </SignRight>
          <CloseContainer
            onClick={() => {
              if (!Load) {
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

export default EditModal;
