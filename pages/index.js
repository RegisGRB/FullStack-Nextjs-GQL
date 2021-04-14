import styled from "styled-components";
import React from "react";
import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client";
import * as elements from "../components/elements";
import * as Product from "../Apollo/Query/Product";
import { motion } from "framer-motion";
import * as CategorieQuery from "../Apollo/Query/Categorie";
const Index = () => {
  const [SearchValue, setSearchValue] = React.useState("");
  const [DataCard, setDataCard] = React.useState([]);
  const [CategSelected, setCategSelected] = React.useState("all");
  const [GetProductsFilter, ProductsFilter] = useLazyQuery(
    Product.default.ProductsFilter,
    {
      variables: {
        value: SearchValue,
      },
    }
  );
  const [GetCategoriesFilter, CategoriesFilter] = useLazyQuery(
    CategorieQuery.default.CategoriesProductFilter,
    {
      variables: {
        id:CategSelected,
        value: SearchValue,
      },
    }
  );
  const [GetCategories, Categories] = useLazyQuery(
    CategorieQuery.default.Categories
  );

  React.useEffect(() => {
    GetProductsFilter();
    GetCategories();
    GetCategoriesFilter();
  }, []);
  React.useEffect(() => {
      if (CategSelected != "all" && CategoriesFilter.data && CategoriesFilter.data.categoriesProductFilter) {
        setDataCard(CategoriesFilter?.data?.categoriesProductFilter.Products);
      } else if(ProductsFilter.data && ProductsFilter.data.productsFilter){
        setDataCard(ProductsFilter?.data?.productsFilter);
      }

  }, [ProductsFilter, CategoriesFilter]);
  return (
    <Container>
      <Title>Shop</Title>
      <SearchContainer>
        <div className="inputFields">
          <elements.Input
            as="input"
            id="title"
            value={SearchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            placeholder="Recherche"
          ></elements.Input>
        </div>
      </SearchContainer>
      <SelectCateg
        id="Categories"
        onChange={(e) => setCategSelected(e.target.value)}
      >
        <option value="all">--choose a Categories--</option>
        {Categories?.data?.categories.map((e, i) => {
          return (
            <option value={e.id} key={e.id}>
              {e.Title}
            </option>
          );
        })}
      </SelectCateg>

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
const SearchContainer = styled.div`
  display: flex;
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
export default Index;
