import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useLazyQuery } from "@apollo/client";
import * as elements from "../components/elements";
import * as Product from "../Apollo/Query/Product";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
const Wishlist = () => {
  const { wishlist, AddCart, Togglewishlist } = useAuth();
  const [DataCard, setDataCard] = React.useState([]);
  const [GetProduct, { data }] = useLazyQuery(Product.default.ProductsByArray, {
    variables: {
      array: wishlist,
    },
  });
  React.useEffect(() => {
    GetProduct();
  }, []);
  React.useEffect(() => {
    if (data) {
      setDataCard(data.productsByArray);
    }
  }, [data]);
  return (
    <Container>
      <Title>Wishlist</Title>

      <EcommerceGRID
        as={motion.div}
        initial="hidden"
        animate="show"
        exit="hidden"
        variants={variantsUp}
      >
        {DataCard.map((e, i) => {
          return (
            <EcommerceCard
              key={i}
              size={i == 0 || i / 5 == 1 ? 2 : 1}
              background={e.Url}
            >
              <CardTitle>{e.Title}</CardTitle>
              <CardPrice>{e.Price}€</CardPrice>
              <WishlistButton
                onClick={() => Togglewishlist(e.id)}
                red={wishlist.includes(e.id)}
              >
                wishlist
              </WishlistButton>
              <CartButton as="a" href={`product/${e.id}`}>
                Voir
              </CartButton>
            </EcommerceCard>
          );
        })}
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
const WishlistButton = styled(elements.Button)`
  position: absolute;
  top: 30px;
  right: 30px;
  z-index: 999;
  pointer-events: all;
`;
const CartButton = styled(elements.Button)`
  position: absolute;
  bottom: 30px;
  z-index: 999;
  left: 30px;
  font-size:1rem;
  pointer-events: all;
`;
const SelectCateg = styled.select`
  margin: 30px;
`;
const Title = styled.h1`
  margin: 30px;
`;
const EcommerceCard = styled(elements.GRIDCard)``;
const EcommerceGRID = styled(elements.GRID)``;
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
const CardDesc = styled.p`
  position: absolute;
  bottom: 30px;
  right: 30px;
  opacity: 0.4;
  font-size: 2rem;
`;
export default Wishlist;
