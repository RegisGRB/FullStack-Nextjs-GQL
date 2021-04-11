import React from "react";

import styled from "styled-components";
import { motion } from "framer-motion";
import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { useAuth, SignForm } from "../context/AuthContext";
import Form from "../components/ui/Form/Form";
import * as OrderQuery from "../Apollo/Query/Order";
import Notification from "../components/ui/Notification/Notification";
import ProtectedNext from "../components/ui/ProtectedNext/ProtectedNext";
import Settings from "../components/Settings/Settings";
import * as elements from "../components/elements";
import EditModal from "../components/ui/EditModal/EditModal";
const AdminOrder = () => {
  const [GetOrders, { loading, data, error, refetch }] = useLazyQuery(
    OrderQuery.default.Orders,
    {
      notifyOnNetworkStatusChange: true,
      networkonly: true,
    }
  );
  const [UpdateOrder] = useMutation(OrderQuery.default.OrderUpdate);
  const [Notif, setNotif] = React.useState(false);
  const [Selected, setSelected] = React.useState({});
  const [OpenEdit, setOpenEdit] = React.useState(false);
  const [DataCard, setDataCard] = React.useState([]);

  const UpdateAction = async ({ Statut }) => {
    const result = await UpdateOrder({
      variables: {
        id: Selected.id,
        Statut:
        Statut.value.length > 0 && Statut.value != Selected.Statut
            ? Statut.value
            : Selected.Statut,
      },
    }).then(async (e) => {
      refetch();
      setOpenEdit(false);
      setSelected({});
    });
  };




  React.useEffect(() => {
    GetOrders();
  }, []);
  React.useEffect(() => {
    if (data) {
      setDataCard(data?.orders);
    }
  });
  // if (networkStatus === NetworkStatus.refetch) return 'Refetching!';
  if (loading) return null;
  if (error) return `Error! ${error}`;
  const FieldsUp = {
    Statut: {
      name: "Statut",
      label: "Statut",
      as: "select",
      value: "",
      option: ["livré", "en cours", "terminés"],
    },
    Submit: {
      type: "Submit",
      value: "Update",
    },
  };
  return (
    <ProtectedNext>
      <Container>
        <HistoryContainer>
          <Title>Admin Orders</Title>
          <HistoryGrid>
            {DataCard?.map((e, i) => {
              return (
                <HistoryCard size="2" key={i}>
                  <div>
                    <span>Commande </span>
                    <br></br>
                    <IdCommande>{e.id}</IdCommande>
                  </div>
                  <ul>
                    {e.Products?.map((elem, index) => {
                      return (
                        <li key={`product${index}`}>
                          {elem.Title} - {elem.Price}€
                        </li>
                      );
                    })}
                  </ul>
                  <InfoContainer>
                    <InfoSubContainer>
                      <span>Price:</span>
                      <span>{e.AmountTotal}€</span>
                    </InfoSubContainer>

                    <InfoSubContainer>
                      <span>Statut:</span>
                      <span>{e.Statut ? e.Statut : "Inconnu"}</span>
                    </InfoSubContainer>
                  </InfoContainer>

                  <ButtonContainer>
                    <elements.Button
                      onClick={() => {
              
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
          Fields={FieldsUp}
          controller={OpenEdit}
          CloseAction={setOpenEdit}
          Action={UpdateAction }
        ></EditModal>
      </Container>
    </ProtectedNext>
  );
};

const transition = { duration: 0.6, ease: [0.6, 0.01, -0.05, 0.9] };

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
const InfoSubContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`;
const IdCommande = styled.span``;
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
  width: 100%;
  justify-content: space-around;
  align-items: center;
  margin: 30px;
  & span:nth-child(1) {
    opacity: 0.5;
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
  ul li {
    margin: 5px;
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
export default AdminOrder;
