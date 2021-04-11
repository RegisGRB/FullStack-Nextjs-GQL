import styled from "styled-components";
import React from "react";
import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { CARD, GRID } from "../components/elements/Grid";
import * as Product from "../Apollo/Query/Product";
import { motion } from "framer-motion";
const Zerbib = () => {
  const [GetProducts, { loading, data,error }] = useLazyQuery(Product.default.Products);
  if (error) {
    console.error(error);
    return <Title>Error!</Title>;
  }

  React.useEffect(()=>{
    GetProducts();
  },[])
  return (
    <Container>
      <Title>Shop</Title>
      <EcommerceGRID
        as={motion.div}
        initial="hidden"
        animate="show"
        exit="hidden"
        variants={variantsUp}
      >
        {
          data?.products?.map((e, i) => {
            return (
              <EcommerceCard
                as={motion.a}
                href={`product/${e.id}`}
                key={i}
                size={i == 0 || i / 5 == 1 ? 2 : 1}
                background={e.Url}
              >
                <CardTitle>{e.Title}</CardTitle>
                <CardPrice>{e.Price}€</CardPrice>
              </EcommerceCard>
            );
          })
}
      </EcommerceGRID>
    </Container>
  );
};
const transition = { duration: 1.2, ease: [0.6, 0.01, -0.05, 0.9] };
const variantsUp = {
  show: { y: 0, opacity: 1, transition: { ...transition, delay: 0.3 } },
  hidden: { y: 20, opacity: 0, transition },
  key: "up",
};
const containerVariants = {
  show: {
    transition: {
      staggerChildren: 1,
      delayChildren: 1,
    },
  },
};
const Container = styled.div`
  padding: 5rem 15vw;
  display: flex;
  align-items: center;
  overflow-x: hidden;
  flex-direction: column;
  background: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.primary};
`;
const Title = styled.h1`
  margin: 30px;
`;
const EcommerceCard = styled(CARD)``;
const EcommerceGRID = styled(GRID)``;
const CardTitle = styled.span`
  position: absolute;
  top: 30px;
  left: 30px;
  font-size: 2rem;
`;
const CardPrice = styled.span`
  position: absolute;
  bottom: 30px;
  right: 30px;
  opacity: 0.4;
  font-size: 2rem;
`;
export default Zerbib;
