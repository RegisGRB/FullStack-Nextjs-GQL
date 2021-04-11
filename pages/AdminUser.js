import React from "react";

import styled from "styled-components";
import { motion } from "framer-motion";
import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { useAuth, SignForm } from "../context/AuthContext";
import Form from "../components/ui/Form/Form";
import * as UserQuery from "../Apollo/Query/User";
import Notification from "../components/ui/Notification/Notification";
import ProtectedNext from "../components/ui/ProtectedNext/ProtectedNext";
import Settings from "../components/Settings/Settings";
import * as elements from "../components/elements";
import EditModal from "../components/ui/EditModal/EditModal";
const AdminUser = () => {
  const [GetUsers, { loading, data, error, refetch }] = useLazyQuery(
    UserQuery.default.Users,
    {
      notifyOnNetworkStatusChange: true,
      networkonly: true,
    }
  );
  const [UpdateUser] = useMutation(UserQuery.default.UserUpdate);
  const [DeleteUser] = useMutation(UserQuery.default.DeleteUser);
  const [CreateUser] = useMutation(UserQuery.default.CreateUser);
  const [ActionType, setActionType] = React.useState(false);

  const [Notif, setNotif] = React.useState(false);
  const [Selected, setSelected] = React.useState({});
  const [OpenEdit, setOpenEdit] = React.useState(false);
  const [DataCard, setDataCard] = React.useState([]);

  const UpdateAction = async ({
    Email,
    Password,
    Firstname,
    Lastname,
    Phone,
    Adress,
    IsAdmin,
  }) => {
    const result = await UpdateUser({
      variables: {
        id: Selected.id,
        Email:
          Email.value.length > 0 && Email.value != Selected.Email
            ? Email.value
            : Selected.Email,
        Password:
          Password.value.length > 0 && Password.value != Selected.Password
            ? Password.value
            : Selected.Password,
        Firstname:
          Firstname.value.length > 0 && Firstname.value != Selected.Firstname
            ? Firstname.value
            : Selected.Firstname,
        Lastname:
          Lastname.value.length > 0 && Lastname.value != Selected.Lastname
            ? Lastname.value
            : Selected.Lastname,
        Phone:
          Phone.value.length > 0 && Phone.value != Selected.Phone
            ? Phone.value
            : Selected.Phone,
        Adress:
          Adress.value.length > 0 && Adress.value != Selected.Adress
            ? Adress.value
            : Selected.Adress,
        IsAdmin: IsAdmin.checked ? IsAdmin.checked : false,
      },
    }).then(async (e) => {
      refetch();
      setOpenEdit(false);
      setSelected({});
    });
  };

  const CreateAction = async ({
    Email,
    Password,
    Firstname,
    Lastname,
    Phone,
    Adress,
    IsAdmin,
  }) => {
    const result = await CreateUser({
      variables: {
        Email: Email.value,
        Password: Password.value,
        Firstname: Firstname.value,
        Lastname: Lastname.value,
        Phone: Phone.value,
        Adress: Adress.value,
        IsAdmin: IsAdmin.checked ? IsAdmin.checked : false,
      },
    }).then(async (e) => {
      refetch();
      setOpenEdit(false);
      setSelected({});
    });
  };

  const DeleteAction = async (id) => {
    const result = await DeleteUser({
      variables: {
        id: id,
      },
    }).then(async (e) => {
      refetch();
      setOpenEdit(false);
    });
  };

  React.useEffect(() => {
    GetUsers();
  }, []);
  React.useEffect(() => {
    if (data) {
      setDataCard(data?.users);
    }
  });
  // if (networkStatus === NetworkStatus.refetch) return 'Refetching!';
  if (loading) return null;
  if (error) return `Error! ${error}`;
  const Fields = {
    Email: {
      type: "Email",
      placeholder: "",
      value: Selected ? Selected?.Email : "",
      required: false,
      label: "Email",
    },
    Firstname: {
      type: "text",
      placeholder: "",
      value: Selected ? Selected?.Firstname : "",
      required: false,
      label: "Firstname",
    },
    Lastname: {
      type: "text",
      placeholder: "",
      value: Selected ? Selected?.Lastname : "",
      required: false,
      label: "Lastname",
    },
    Phone: {
      type: "text",
      placeholder: "",
      value: Selected ? Selected?.Phone : "",
      required: false,
      label: "Phone",
    },
    Adress: {
      type: "text",
      placeholder: "",
      value: Selected ? Selected?.Adress : "",
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
    IsAdmin: {
      label: "IsAdmin",
      type: "Checkbox",
      placeholder: "",
      value: "",
      checked: Selected ? Selected.IsAdmin : false,
    },
    Submit: {
      type: "Submit",
      value: ActionType ? "Update" : "Create",
    },
  };
  return (
    <ProtectedNext>
      <Container>
        <HistoryContainer>
          <Title>Admin Users</Title>
          <elements.Button
            onClick={() => {
              setActionType(false);
              setSelected({});
              setOpenEdit(true);
            }}
          >
            Create User
          </elements.Button>
          <HistoryGrid>
            {DataCard?.map((e, i) => {
              return (
                <HistoryCard size="2" key={i}>
                  <InfoContainer>
                    <li>
                      <span>Firstname:</span> {e.Firstname}
                    </li>
                    <li>
                      <span>Lastname:</span> {e.Lastname}
                    </li>
                    <li>
                      <span>Email:</span> {e.Email}
                    </li>
                    <li>
                      <span>Phone:</span> {e.Phone}
                    </li>
                    <li>
                      <span>Adress:</span> {e.Adress}
                    </li>
                    <li>
                      <span>IsAdmin:</span> {e.IsAdmin.toString()}
                    </li>
                  </InfoContainer>
                  <ButtonContainer>
                    <elements.Button
                      red={true}
                      onClick={() => DeleteAction(e.id)}
                    >
                      Delete
                    </elements.Button>
                    <elements.Button
                      onClick={() => {
                        setActionType(true);
                        setSelected(e);
                        setOpenEdit(true);
                      }}
                    >
                      Edit
                    </elements.Button>
                  </ButtonContainer>
                </HistoryCard>
              );
            })}
          </HistoryGrid>
        </HistoryContainer>
        <EditModal
          Fields={Fields}
          controller={OpenEdit}
          CloseAction={setOpenEdit}
          Action={ActionType ? UpdateAction : CreateAction}
        ></EditModal>
      </Container>
    </ProtectedNext>
  );
};

const Container = styled.div`
  width: 100vw;
  position: relative;
  background: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const IdCommande = styled.span`
  font-size: 0.7rem;
`;
const Title = styled.h1`
  margin: 30px;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  align-items: center;
`;

const HistoryGrid = styled(elements.GRID)`
  height: 100%;
  padding-top: 60px;
  padding-bottom: 60px;
`;
const InfoContainer = styled.ul`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 30px;
  list-style-type: none;
  flex-direction: column;
  & li {
    display: flex;
    margin: 15px;
  }
  & li span {
    opacity: 0.5;
  }
  & li:nth-child(1) {
    font-size: 2rem;
  }
  & li:nth-child(2) {
    font-size: 2rem;
  }
  & li:nth-child(3) {
    font-size: 0.7rem;
    width: 70%;
  }

  & li:nth-child(4) {
    font-size: 0.7rem;
    width: 70%;
  }
`;
const HistoryCard = styled(elements.GRIDCard)`
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: unset;
  color: ${(props) => props.theme.colors.primary};
  position: relative;
  border: 2px solid ${(props) => props.theme.colors.primary};
  & img {
    position: absolute;
    right: 30px;
    top: 30px;
    width: 120px;
  }
`;
const HistoryContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 60vw;
  padding-top: 120px;
  background: ${(props) => props.theme.colors.secondary};
  overflow-x: visible;
  @media (max-width: 768px) {
    width: 80vw;
    left: 10vw;
  }
`;
export default AdminUser;
