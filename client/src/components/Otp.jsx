import {
  Box,
  Button,
  Heading,
  HStack,
  PinInput,
  PinInputField,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

const Otp = ({ otpspinner, setOtpspinner, handleOtp }) => {
  const [otpval, setOtpVal] = useState("");
  return (
    <Box>
      <Stack>
        <Box>
          <Heading size="xl">Enter the OTP below</Heading>
        </Box>
        <HStack>
          <PinInput
            otp
            value={otpval}
            onChange={(e) => {
              setOtpVal(e);
            }}
          >
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>

        <Button
          width="200px"
          bg={"teal"}
          color={"white"}
          _hover={{
            bg: "teal",
          }}
          onClick={() => {
            setOtpspinner(true);
            handleOtp(otpval);
          }}
        >
          {" "}
          {(otpspinner && <Spinner color="white.500" />) || "Confirm OTP"}
        </Button>
      </Stack>
    </Box>
  );
};

export default Otp;
