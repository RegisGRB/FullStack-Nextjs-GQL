import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client";
import * as elements from "../../components/elements";
import * as Product from "../../Apollo/Query/Product";
import { motion } from "framer-motion";
import Cookies from "universal-cookie";
import { useAuth } from "../../context/AuthContext";
const product = () => {
  const { Cart, AddCart } = useAuth();
  const [GetProduct, { loading, data, error }] = useLazyQuery(
    Product.default.Product
  );

  const router = useRouter();
  const { id } = router.query;

  const getProduct = async () => {
    const result = await GetProduct({
      variables: {
        id: id,
      },
    });
  };
  React.useEffect(() => {
    if (id && !data) {
      getProduct();
    }
  }, [id]);

  //   getProduct(id);
  return (
    <elements.Container>
      <elements.Title>{data?.product?.Title}</elements.Title>
      <elements.Flex>
        <elements.Box>
          <elements.GRID>
            <elements.GRIDCard
              onClick={() => {
                const cookies = new Cookies();
                cookies.remove("cartx");
              }}
              background={data?.product?.Url}
              size="2"
            ></elements.GRIDCard>
          </elements.GRID>
        </elements.Box>
        <elements.Box>
          <p>{data?.product?.Description}</p>
          <elements.FlexRight>
            <elements.Title>{data?.product?.Price}€</elements.Title>
          </elements.FlexRight>
          <elements.FlexRight>
            <elements.Button onClick={() => AddCart(data)}>
              Add To Cart
            </elements.Button>
          </elements.FlexRight>
        </elements.Box>
      </elements.Flex>
    </elements.Container>
  );
};
export default product;
