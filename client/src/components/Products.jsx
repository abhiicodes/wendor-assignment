import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { UPDATE_PRODUCTS } from "../redux/actions";
import { useSelector } from "react-redux";
import { Box, Button, Grid, GridItem, HStack } from "@chakra-ui/react";
import CustomCard from "./CustomCard";

const Products = () => {
  const products = useSelector((store) => store.products);
  const token = useSelector((store) => store.token);
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get("http://localhost:8080/products").then((res) => {
        console.log(res)
      dispatch({ type: UPDATE_PRODUCTS, payload: res.data });
    });
  }, []);
  return (
   

    <Grid
      templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(4, 1fr)"]}
      gap={6}
      >
      {products.map((el) => {
        return (
          <GridItem key={el._id}>
            <CustomCard product={el} />
          </GridItem>
        );
      })}
    </Grid>
   
     
  );
};

export default Products;
