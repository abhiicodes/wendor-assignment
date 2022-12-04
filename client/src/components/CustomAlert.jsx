import { CardBody, Card, Image, Stack, Heading, Text, Divider, CardFooter, ButtonGroup, Button, useDisclosure, Box } from '@chakra-ui/react'
import React from 'react'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
  } from '@chakra-ui/react'
import { useState } from 'react';

const CustomAlert = ({product,isOpen,onClose,setOp,handleDelete}) => {
    const cancelRef = React.useRef()

 
  return (
   <Box>
    <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={()=>{
          onClose();
          setOp(false);
        }}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Product
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={()=>{
                handleDelete(product._id)
                onClose();
              }} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
   </Box>
  )
}

export default CustomAlert