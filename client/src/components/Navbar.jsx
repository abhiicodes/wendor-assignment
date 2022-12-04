import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,

  Spacer,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import ModeSwitch from "./ModeSwitch";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { LOGOUT, UPDATE_PRODUCTS } from "../redux/actions";
import CustomModal from "./CustomModal";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((store) => store.token);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [op, setOp] = useState(false);

  const toast = useToast();

  const handleForm = (data) => {
    axios
      .post("http://localhost:8080/products", data, {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log("Added");

        toast({
          title: `Item added successfully`,
          status: "success",
          isClosable: true,
        });
        axios
          .get("http://localhost:8080/products")
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
    <Flex
      minWidth="max-content"
      alignItems="center"
      gap="2"
      marginBottom={"10px"}
      marginTop={"10px"}
    >
      <Box p="2">
        <Link to="/">
          <Heading size="md">Wendor</Heading>
        </Link>
      </Box>
      <Spacer />
      <ButtonGroup gap="2">
        <Button
          colorScheme="teal"
          onClick={() => {
            if (!token) {
              return navigate("/login");
            } else {
              return dispatch({ type: LOGOUT });
            }
          }}
        >
          {(token && "Log Out") || "Log In"}
        </Button>
        <ModeSwitch />
        {token && (
          <Button
            colorScheme="teal"
            onClick={() => {
              setOp(true);
              onOpen();
            }}
          >
            Add Item
          </Button>
        )}
        {op && (
          <CustomModal
            isOpen={isOpen}
            onClose={onClose}
            handleForm={handleForm}
            setOp={setOp}
          />
        )}
      </ButtonGroup>
    </Flex>
  );
};

export default Navbar;
