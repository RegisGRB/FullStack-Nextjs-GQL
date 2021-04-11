import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client";
import * as elements from "@components/elements";
import * as Product from "../../Apollo/Query/Product";
import { motion } from "framer-motion";
import Cookies from "universal-cookie";
import { useAuth } from "@context/AuthContext";
const Checkout = () => {
  return (
    <elements.Container>
      <elements.Title>Checkout</elements.Title>
      <elements.GRID>
        {data?.products?.map((e, i) => {
          return (
            <elements.GRIDCard>
              <ul>
                {e.Products.map((element) => {
                  <li>
                    {element.Title} - {element.Price}€
                  </li>;
                })}
              </ul>
              {e.AmountTotal}
            </elements.GRIDCard>
          );
        })}
      </elements.GRID>
    </elements.Container>
  );
};

export default Checkout;
