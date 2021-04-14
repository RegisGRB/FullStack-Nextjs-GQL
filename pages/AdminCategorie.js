import React from "react";

import styled from "styled-components";
import { motion } from "framer-motion";
import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { useAuth, SignForm } from "../context/AuthContext";
import Form from "../components/ui/Form/Form";
import * as CategorieQuery from "../Apollo/Query/Categorie";
import Notification from "../components/ui/Notification/Notification";
import ProtectedNext from "../components/ui/ProtectedNext/ProtectedNext";
import Settings from "../components/Settings/Settings";
import * as elements from "../components/elements";
import CategModal from "../components/ui/CategModal/CategModal";
const AdminCategorie = () => {
  const [GetCategories, { loading, data, error, refetch }] = useLazyQuery(
    CategorieQuery.default.Categories,
    {
      notifyOnNetworkStatusChange: true,
      networkonly: true,
    }
  );

  const [Notif, setNotif] = React.useState(false);
  const [Selected, setSelected] = React.useState({});
  const [OpenEdit, setOpenEdit] = React.useState(false);
  const [DataCard, setDataCard] = React.useState([]);
  const [ActionType, setActionType] = React.useState(false);
  const [UpdateCategorie] = useMutation(CategorieQuery.default.CategorieUpdate);
  const [CreateCategorie] = useMutation(CategorieQuery.default.CreateCategorie);
  const [DeleteCategorie] = useMutation(CategorieQuery.default.DeleteCategorie);


  const UpdateAction = async (
    ProductsList,
    Title
  ) => {
    const result = await UpdateCategorie({
      variables: {
        id: Selected.id,
        Products: ProductsList,
        Title: Title,
      },
    }).then(async (e) => {
      refetch();
      setOpenEdit(false);
      setSelected({});
    });
  };

  const CreateAction = async (
    ProductsList,
    Title
  ) => {
    const result = await CreateCategorie({
      variables: {
        Products: ProductsList,
        Title: Title,
      },
    }).then(async (e) => {
      refetch();
      setOpenEdit(false);
      setSelected({});
    });
  };
  const DeleteAction = async (id) => {
    const result = await DeleteCategorie({
      variables: {
        id: id,
      },
    }).then(async (e) => {
      refetch();
    });
  };
  React.useEffect(() => {
    GetCategories();
  }, []);
  React.useEffect(() => {
    if (data) {
      setDataCard(data?.categories);
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
          <Title>Admin Categories</Title>
          <elements.Button
            onClick={() => {
              setActionType(false)
              setSelected({});
              setOpenEdit(true);
            }}
          >
            Create Categories
          </elements.Button>
          <HistoryGrid>
            {DataCard?.map((e, i) => {
              return (
                <HistoryCard size="2" key={i}>
                  <div>
                  <InfoSubContainer>
                      <span>Categorie:</span>
                      <span>{e.Title}</span>
                    </InfoSubContainer>
                  </div>
                  <InfoSubContainer>
                      <span>Products:</span>
                  <ListItem>
                    {e.Products?.map((elem, i) => {
                      return (
                        <li key={i}>
                          {elem.Title}
                        </li>
                      );
                    })}
                  </ListItem>
                  </InfoSubContainer>

                  <ButtonContainer>
                  <elements.Button red={true} onClick={() => DeleteAction(e.id)}>
                      Delete
                    </elements.Button>
                    <elements.Button
                      onClick={() => {
                        setActionType(true)
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
        <CategModal
          Selected={Selected}
          controller={OpenEdit}
          CloseAction={setOpenEdit}
          Action={ActionType ? UpdateAction : CreateAction }
        ></CategModal>
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
  margin-top: 30px;
  & span:nth-child(1) {
    opacity: 0.5;
  }
`;
const ListItem = styled.ul``;
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
  bCategorie: 2px solid ${(props) => props.theme.colors.primary};
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
export default AdminCategorie;
