import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import MotionBox from "../../Motion/MotionBox";
import * as ProductQuery from "../../../Apollo/Query/Product";
import { useAuth } from "../../../context/AuthContext";
import Notification from "../Notification/Notification";
import * as elements from "../../elements";
import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client";

const CategModal = ({ CloseAction, controller, Action, Selected }) => {
  const [GetProducts, { loading, data, error, refetch }] = useLazyQuery(
    ProductQuery.default.Products,
    {
      notifyOnNetworkStatusChange: true,
      networkonly: true,
    }
  );

  const GetIdList = (e) => {
    let w = [];
    e?.forEach((element) => {
      w.push(element.id);
    });
    return w;
  };
  const [Load, setLoad] = React.useState(false);
  const [DataCard, setDataCard] = React.useState([]);
  const [Title, setTitle] = React.useState("");
  const [ProductsList, setProductsList] = React.useState([]);

  React.useEffect(() => {
    GetProducts();
  }, []);
  React.useEffect(() => {
    if (data) {
      setDataCard(data?.products);
    }
  });
  React.useEffect(() => {
    if (Selected && Selected.Title) {
      setProductsList(GetIdList(Selected.Products));
      setTitle(Selected.Title);
    }else{
      setProductsList([]);
      setTitle("");
    }
  }, [Selected]);

  const remove = (id) => {
    setProductsList(
      ProductsList.filter(function (obj) {
        return obj !== id;
      })
    );
  };

  const add = (id) => {
    setProductsList([...ProductsList, id]);
  };

  return (
    <MotionBox controller={controller} variants={variantsFade}>
      <Container>
        <SignContainer>
          <SignRight>
            <BoxSign>
              <form>
                <div className="inputFields">
                  <elements.Input
                    as="input"
                    id="title"
                    type="text"
                    value={Title}
                    onChange={(e) => setTitle(e.target.value)}
                  ></elements.Input>
                  <elements.Label htmlfor="title">Title</elements.Label>
                </div>
                <elements.Button
                  onClick={() => {
                    Action(ProductsList, Title);
                  }}
                >
                  Save
                </elements.Button>
              </form>
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
                        {ProductsList.includes(e.id) ? (
                          <elements.Button
                            red={true}
                            onClick={() => remove(e.id)}
                          >
                            Remove
                          </elements.Button>
                        ) : (
                          <elements.Button
                            onClick={() => {
                              add(e.id);
                            }}
                          >
                            Add
                          </elements.Button>
                        )}
                      </ButtonContainer>
                    </HistoryCard>
                  );
                })}
              </HistoryGrid>
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
const SignContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90vw;
  height: 90vh;
  position: fixed;
  top: 5vh;
  left: 5vw;
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
  overflow: auto;
  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

export default CategModal;
