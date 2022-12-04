import {
  CardBody,
  Card,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_PRODUCTS } from "../redux/actions";
import CustomAlert from "./CustomAlert";

const CustomCard = ({ product }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const token = useSelector((store) => store.token);
  const toast = useToast();
  const dispatch = useDispatch();

  const [op, setOp] = useState(false);
  const handleDelete = (id) => {
    axios
      .delete(
        `https://wendor-backend-production.up.railway.app/products/${id}`,
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        toast({
          title: `Item deleted successfully`,
          status: "success",
          isClosable: true,
        });
        axios
          .get("https://wendor-backend-production.up.railway.app/products")
          .then((res) => {
            console.log(res);
            dispatch({ type: UPDATE_PRODUCTS, payload: res.data });
          })
          .catch((err) => {
            console.log(err);
            toast({
              title: `Something went wrong`,
              status: "error",
              isClosable: true,
            });
          });
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: `Something went wrong`,
          status: "error",
          isClosable: true,
        });
      });
  };
  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          height={"300px"}
          src={product.image}
          alt="Wendor.jpg"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">₹ {product.price}</Heading>
          <Text> {product.description}</Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        {token && (
          <ButtonGroup spacing="2">
            <Button
              variant="solid"
              colorScheme="red"
              onClick={() => {
                setOp(true);
                onOpen();
              }}
            >
              Delete
            </Button>
            {op && (
              <CustomAlert
                isOpen={isOpen}
                onClose={onClose}
                product={product}
                setOp={setOp}
                handleDelete={handleDelete}
              />
            )}
          </ButtonGroup>
        )}
      </CardFooter>
    </Card>
  );
};

export default CustomCard;
