import React from "react";
import Form from "../Form/Form";
import styled from "styled-components";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import MotionBox from "../../Motion/MotionBox";
import { useAuth } from "../../../context/AuthContext";
import Notification from "../Notification/Notification";

const Sign = ({ CloseAction,controller }) => {
  const [SignType, setSigntype] = React.useState(true);
  const { signIn, signUp } = useAuth();
  const [Notif, setNotif] = React.useState(false);
  const [Error,setError]= React.useState("");
  const Login = ({ Email, Password }) => {
    signIn({ Email: Email.value, Password: Password.value }).then((e)=>{
      if(e){
        setError(e);
        setNotif(true);
      }
    })
  };
  const Register = ({
    Email,
    Password,
    Firstname,
    Lastname,
    Phone,
    Adress,
  }) => {
   signUp({
      Email: Email.value,
      Password: Password.value,
      Firstname: Firstname.value,
      Lastname: Lastname.value,
      Phone: Phone.value,
      Adress: Adress.value,
      isAdmin: false,
    }).then((e)=>{
      setNotif(true);
    })
    
  };

  return (
    <MotionBox controller={controller} variants={variantsFade}>
      <Container>
        <SignContainer>
          <SignRight>
            <MotionBox controller={SignType} variants={variantsIn}>
              <BoxSign>
                <Title>Sign In</Title>
                <Form Fields={FieldsIn} Action={Login}></Form>
              </BoxSign>
            </MotionBox>
            <MotionBox controller={!SignType} variants={variantsUp}>
              <BoxSign>
                <Title>Sign Up</Title>
                <Form Fields={FieldsUp} Action={Register}></Form>
              </BoxSign>
            </MotionBox>
            <SwipeSign onClick={() => setSigntype(!SignType)}>
              {SignType ? "Sign Up" : "Sign In"}
            </SwipeSign>
          </SignRight>
          <CloseContainer
            onClick={() => {
              CloseAction();
            }}
          >
            <AiOutlineClose></AiOutlineClose>
          </CloseContainer>
        </SignContainer>
        <Notification
          Notiftype={false}
          controller={Notif}
          setController={setNotif}
        >
          {Error}
        </Notification>
      </Container>
    </MotionBox>
  );
};

const FieldsIn = {
  Email: {
    type: "Email",
    placeholder: "",
    value: "test44@test.tes",
    required: true,
    label: "Email",
  },
  Password: {
    type: "Password",
    placeholder: "",
    value: "test44",
    required: true,
    label: "Password",
  },

  Submit: {
    type: "Submit",
    value: "Login",
    value: "Submit",
    disabled: false,
  },
};

const FieldsUp = {
  Email: {
    type: "Email",
    placeholder: "",
    value: "test44@test.test",
    required: true,
    label: "Email",
  },
  Firstname: {
    type: "text",
    placeholder: "",
    value: "test44",
    required: true,
    label: "Firstname",
  },
  Lastname: {
    type: "text",
    placeholder: "",
    value: "test44",
    required: true,
    label: "Lastname",
  },
  Phone: {
    type: "text",
    placeholder: "",
    value: "test44",
    required: true,
    label: "Phone",
  },
  Adress: {
    type: "text",
    placeholder: "",
    value: "test44",
    required: true,
    label: "Adress",
  },
  Password: {
    type: "Password",
    placeholder: "",
    value: "test44",
    required: true,
    label: "Password",
  },

  Submit: {
    type: "Submit",
    value: "Register",
  },
};
const transition = { duration: 0.6, ease: [0.6, 0.01, -0.05, 0.9] };
const variantsUp = {
  show: { y: 0, opacity: 1, transition, delay: 0.2 },
  hidden: { y: 1000, opacity: 0, transition },
  key: "up",
};
const variantsIn = {
  show: { y: 0, opacity: 1, transition, delay: 0.2 },
  hidden: { y: -1000, opacity: 0, transition },
  key: "down",
};
const variantsFade = {
  show: { opacity: 1, transition },
  hidden: {  opacity: 0, transition },
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
const Container = styled(motion.div)`
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index:99999999;
  top:0;
  left:0;
  &:before{
    content:"";
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    left:0;
    background: ${(props) => props.theme.colors.primary};
    opacity:0.5;
  }
`;
const SwipeSign = styled.div`
  cursor: pointer;
  right: 10%;
  bottom: 10%;
  position: absolute;
  z-index: 1;
  color: ${(props) => props.theme.colors.primary};
`;
const SignLeft = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  @media (max-width: 768px) {
    width: 0%;
    height: 0%;
  }
`;
const Image = styled.img`
  width: 100%;
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

export default Sign;
