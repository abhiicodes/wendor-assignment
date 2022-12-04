import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import Otp from "./Otp";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN, PHONE } from "../redux/actions";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [otpspinner, setOtpspinner] = useState(false);
  const [showotp, setShowotp] = useState(false);
  const [mobile, setMobile] = useState("");
  const [sendOtpSpinner, setSendOtpSpinner] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const phone = useSelector((store) => store.phone);
  const handleOtp = (otp) => {
    setOtpspinner(true);
    axios
      .post("http://localhost:8080/login/verify", { phone_number: phone, otp })
      .then((res) => {
        dispatch({ type: LOGIN, payload: res.data.token });
        setOtpspinner(false);
        setShowotp(false);
        toast({
          title: `Otp Verified successfully`,
          status: "success",
          isClosable: true,
        });
        console.log(res)
        
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setOtpspinner(false);

        toast({
          title: `Invalid OTP`,
          status: "error",
          isClosable: true,
        });
      });
  };
  return (
    <Box margin={"auto"}> 
      <FormControl isRequired>
        <FormLabel>Mobile number</FormLabel>
        <Input
          type={"number"}
          placeholder="Mobile number"
          onChange={(e) => {
            setMobile(e.target.value);
          }}
        />
      </FormControl>
      <Button
        onClick={() => {
          if (mobile.toString().length != 10) {
            return toast({
              title: `Please enter 10 digits mobile number`,
              status: "warning",
              isClosable: true,
            });
          }
          setSendOtpSpinner(true);
          axios
            .post("http://localhost:8080/login", { phone_number: mobile })
            .then((res) => {
              setSendOtpSpinner(false);
              setShowotp(true);
              dispatch({ type: PHONE, payload: mobile });
              return toast({
                title: `Otp sent successfully and your OTP is ${res.data.otp}`,
                status: "success",
                isClosable: true,
              });
            })
            .catch((err) => {
              console.log(err);
              setSendOtpSpinner(false);

              toast({
                title: `Something went wrong`,
                status: "error",
                isClosable: true,
              });
            });
        }}
      >
        {(sendOtpSpinner && <Spinner color="white.500" />) || "Send OTP"}
      </Button>
      {showotp && (
        <Otp
          otpspinner={otpspinner}
          setOtpspinner={setOtpspinner}
          handleOtp={handleOtp}
        />
      )}
    </Box>
  );
};

export default Login;
