import React from "react";

import styled from "styled-components";
import { motion } from "framer-motion";
import { useMutation } from "@apollo/client";
import { useAuth } from "../context/AuthContext";
import Form from "../components/ui/Form/Form";
import * as UserQuery from "../Apollo/Query/User";
import Notification from "../components/ui/Notification/Notification";
import ProtectedNext from "../components/ui/ProtectedNext/ProtectedNext";
import { useRouter } from "next/router";
const Account = () => {
  const { Getme, signOut, userdata, GetCookies } = useAuth();
  const [UpdateUser, { data, loading, error }] = useMutation(
    UserQuery.default.UserUpdate
  );
  const [Notif, setNotif] = React.useState(false);
  const router = useRouter();
  const Update = async ({
    Email,
    Password,
    Firstname,
    Lastname,
    Phone,
    Adress,
  }) => {
    let x = GetCookies().id;
    const result = await UpdateUser({
      variables: {
        id: x,
        Email:
          Email.value.length > 0 && Email.value != userdata.Email
            ? Email.value
            : userdata.Email,
        Password:
          Password.value.length > 0 && Password.value != userdata.Password
            ? Password.value
            : userdata.Password,
        Firstname:
          Firstname.value.length > 0 && Firstname.value != userdata.Firstname
            ? Firstname.value
            : userdata.Firstname,
        Lastname:
          Lastname.value.length > 0 && Lastname.value != userdata.Lastname
            ? Lastname.value
            : userdata.Lastname,
        Phone:
          Phone.value.length > 0 && Phone.value != userdata.Phone
            ? Phone.value
            : userdata.Phone,
        Adress:
          Adress.value.length > 0 && Adress.value != userdata.Adress
            ? Adress.value
            : userdata.Adress,
      },
    });
    Getme();
    setNotif(true);
  };
  const Fields = {
    Email: {
      type: "Email",
      placeholder: "",
      value: userdata ? userdata?.Email : "",
      required: false,
      label: "Email",
    },
    Firstname: {
      type: "text",
      placeholder: "",
      value: userdata ? userdata?.Firstname : "",
      required: false,
      label: "Firstname",
    },
    Lastname: {
      type: "text",
      placeholder: "",
      value: userdata ? userdata?.Lastname : "",
      required: false,
      label: "Lastname",
    },
    Phone: {
      type: "text",
      placeholder: "",
      value: userdata ? userdata?.Phone : "",
      required: false,
      label: "Phone",
    },
    Adress: {
      type: "text",
      placeholder: "",
      value: userdata ? userdata?.Adress : "",
      required: false,
      label: "Adress",
    },
    Password: {
      type: "Password",
      placeholder: "",
      value: "",
      required: false,
      label: "Password",
    },

    Submit: {
      type: "Submit",
      value: loading ? "loading.." : "Edit",
      disabled: loading,
    },
  };

  return (
    <ProtectedNext>
      <Container>
        <Notification
          Notiftype={true}
          controller={Notif}
          setController={setNotif}
        >
          {!error ? "Your data is Saved" : error}
        </Notification>
  
        <FormContainer>
        <h1 >Hello {userdata?.Firstname}</h1>
          <RouteAccount>
            <li>
              <span
                onClick={() => {
                  router.push("/OrderHistory");
                }}
              >
                Order History
              </span>
            </li>
            <li>
              <span
                onClick={() => {
                  router.push("/Wishlist");
                }}
              >
                Wishlist
              </span>
            </li>
          </RouteAccount>
          <Form Fields={Fields} Action={Update}></Form>
      
        </FormContainer>
      </Container>
    </ProtectedNext>
  );
};
const transition = { duration: 0.6, ease: [0.6, 0.01, -0.05, 0.9] };


const Container = styled.div`
  width: 100vw;
  position: relative;
  overflow: hidden;
  height: 100vh;
  background: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.primary};
`;
const SettingsContainer = styled.div`
  position: relative;
`;
const RouteAccount = styled.ul`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style-type:none;
  margin:60px;
  & li span{
    cursor:pointer;
  }
`;
const FormContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
export default Account;
