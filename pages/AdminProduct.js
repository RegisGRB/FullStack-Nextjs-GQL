import React from "react";

import styled from "styled-components";
import { motion } from "framer-motion";
import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { useAuth, SignForm } from "../context/AuthContext";
import Form from "../components/ui/Form/Form";
import * as ProductQuery from "../Apollo/Query/Product";
import Notification from "../components/ui/Notification/Notification";
import ProtectedNext from "../components/ui/ProtectedNext/ProtectedNext";
import Settings from "../components/Settings/Settings";
import * as elements from "../components/elements";
import EditModal from "../components/ui/EditModal/EditModal";
const AdminProduct = () => {
  const [GetProducts, { loading, data, error, refetch }] = useLazyQuery(
    ProductQuery.default.Products,
    {
      notifyOnNetworkStatusChange: true,
      networkonly: true,
    }
  );
  const [UpdateProduct] = useMutation(ProductQuery.default.ProductUpdate);
  const [DeleteProduct] = useMutation(ProductQuery.default.DeleteProduct);
  const [CreateProduct] = useMutation(ProductQuery.default.CreateProduct);
  const [ActionType, setActionType] = React.useState(false);

  const [Notif, setNotif] = React.useState(false);
  const [Selected, setSelected] = React.useState({});
  const [OpenEdit, setOpenEdit] = React.useState(false);
  const [DataCard, setDataCard] = React.useState([]);

  const UpdateAction = async ({ Title, Price, Url, Description }) => {
    const result = await UpdateProduct({
      variables: {
        id: Selected.id,
        Title:
          Title.value.length > 0 && Title.value != Selected.Title
            ? Title.value
            : Selected.Title,
        Price:
          Price.value.length > 0 && Price.value != Selected.Price
            ? parseFloat(Price.value)
            : parseFloat(Selected.Price),
        Url:
          Url.value.length > 0 && Url.value != Selected.Url
            ? Url.value
            : Selected.Url,
        Description:
          Description.value.length > 0 &&
          Description.value != Selected.Description
            ? Description.value
            : Selected.Description,
      },
    }).then(async (e) => {
      refetch();
      setOpenEdit(false);
      setSelected({});
    });
  };

  const CreateAction = async ({ Title, Price, Url, Description }) => {
    const result = await CreateProduct({
      variables: {
        id: Selected.id,
        Title: Title.value.length > 0 && Title.value ? Title.value : "Inconnu",
        Price:
          Price.value.length > 0 && Price.value
            ? parseFloat(Price.value)
            : parseFloat("0"),
        Url:
          Url.value.length > 0 && Url.value
            ? Url.value
            : "https://d1p2aimeyx6kdr.cloudfront.net/wp-content/uploads/2019/02/26102405/inconnu-jeune-ombre-visage.jpg",
        Description:
          Description.value.length > 0 && Description.value
            ? Description.value
            : "",
      },
    }).then(async (e) => {
      refetch();
      setOpenEdit(false);
      setSelected({});
    });
  };

  const DeleteAction = async (id) => {
    const result = await DeleteProduct({
      variables: {
        id: id,
      },
    }).then(async (e) => {
      refetch();
      setOpenEdit(false);
    });
  };

  React.useEffect(() => {
    GetProducts();
  }, []);
  React.useEffect(() => {
    if (data) {
      setDataCard(data?.products);
    }
  });
  // if (networkStatus === NetworkStatus.refetch) return 'Refetching!';
  if (loading) return null;
  if (error) return `Error! ${error}`;
  const FieldsUp = {
    Title: {
      type: "text",
      placeholder: "",
      value: Selected ? Selected?.Title : "",
      required: true,
      label: "Title",
    },
    Price: {
      type: "number",
      placeholder: "",
      value: Selected ? Selected?.Price : "",
      required: true,
      label: "Price",
      step: "0.01",
    },
    Url: {
      type: "text",
      placeholder: "",
      value: Selected ? Selected?.Url : "",
      required: true,
      label: "Url",
    },
    Description: {
      as: "textarea",
      type: "text",
      placeholder: "Description",
      value: Selected ? Selected?.Description : "",
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
          <Title>Admin Products</Title>
          <elements.Button
            onClick={() => {
              setActionType(false);
              setSelected({});
              setOpenEdit(true);
            }}
          >
            Create Product
          </elements.Button>
          <HistoryGrid>
            {DataCard?.map((e, i) => {
              return (
                <HistoryCard size="2" key={i}>
                  <img src={e.Url}></img>
                  <InfoContainer>
                    <li>
                      <span>Title:</span> {e.Title}
                    </li>
                    <li>
                      <span>Price:</span> {e.Price}€
                    </li>
                    <li>
                      <span>Url:</span> {e.Url}
                    </li>
                    <li>
                      <span>Desc:</span> {e.Description}
                    </li>
                  </InfoContainer>
                  <ButtonContainer>
                    <elements.Button red={true} onClick={() => DeleteAction(e.id)}>
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
          Fields={FieldsUp}
          controller={OpenEdit}
          CloseAction={setOpenEdit}
          Action={ActionType ? UpdateAction : CreateAction}
        ></EditModal>
      </Container>
    </ProtectedNext>
  );
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
const variantsIdd = {
  show: { y: 0, opacity: 1, transition, delay: 0.2 },
  hidden: { y: -1000, opacity: 0, transition },
  key: "downx",
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
export default AdminProduct;
