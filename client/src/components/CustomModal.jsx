import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const CustomModal = ({ isOpen, onClose, country, setOp, handleForm }) => {
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const toast = useToast();
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setOp(false);
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Image URL</FormLabel>
            <Input
              type="text"
              placeholder="Image URL"
              onChange={(e) => {
                setImage(e.target.value);
              }}
            />
            <FormLabel>Price</FormLabel>
            <Input
              type={"number"}
              placeholder="Price"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            <FormLabel>Description</FormLabel>
            <Input
              type="text"
              placeholder="Description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <Button
              colorScheme="teal"
              mr={3}
              onClick={() => {
                if (price == "" || description == "") {
                  return toast({
                    title: `Please fill the complete information`,
                    status: "error",
                    isClosable: true,
                  });
                }

                setOp(false);
                if (image == "") {
                  handleForm({ price, description });
                } else {
                  handleForm({ image, price, description });
                }

                onClose();
              }}
            >
              Submit
            </Button>
          </FormControl>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
