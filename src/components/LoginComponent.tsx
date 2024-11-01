import { Box, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { colors } from "../utils";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import CustomInput from "./CutomInput";
import api from "../axiosConfing"; // Import your Axios instance
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginComponent = () => {
  const navigate = useNavigate(); // Initialize navigate
  const loginvalidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("*Please enter valid email")
      .required("*Please enter your email"),
    password: yup
      .string()
      .required("*Please enter your password")
      .min(6, "Please enter at least 6 characters or more ")
      .max(10, "Please do not enter more than 10 characters"),
  });

  const { values, handleBlur, handleChange, errors, touched, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginvalidationSchema,
      onSubmit: async () => {
        try {
          const response: any = await axios.post(
            "http://localhost:3001/v1/loginAdmin",
            {
              email: values.email,
              password: values.password,
            }
          );

          // Store the token in localStorage
          const token = response?.data?.token; // Assuming the token is in response.data.access_token
          localStorage.setItem("access-token", token);
          localStorage.setItem("login", String(true));
          localStorage.setItem("admin", JSON.stringify(response?.data?.admin));

          toast(response?.data?.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });

          // Redirect to home page
          navigate("/");
        } catch (error) {
          console.error("Login failed", error);
        }
      },
    });

  return (
    <Box
      sx={{
        pt: "3rem",
        width: "100vw",
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {/* logo container  */}
      <img src="/assets/logo.jpg" alt="clg logo" />

      <Box
        sx={{
          mt: "1rem",
          p: "2rem",
          py: "4rem",
          borderRadius: "1rem",
          width: "500px",
          backgroundColor: colors.darkBlue,
          color: "white",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "30px",
            fontWeight: "550",
            mb: "1rem",
          }}
        >
          Admin Login
        </Typography>

        <form onSubmit={handleSubmit} autoComplete="off">
          {/* email input */}
          <CustomInput
            name="email"
            type="email"
            handleBlur={handleBlur}
            handleChange={handleChange}
            value={values.email}
            label="Email"
            error={errors.email}
            touched={touched.email}
          />

          {/* password input */}
          <CustomInput
            name="password"
            type="password"
            handleBlur={handleBlur}
            handleChange={handleChange}
            value={values.password}
            label="Password"
            error={errors.password}
            touched={touched.password}
          />

          {/* submit button */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              type="submit"
              sx={{
                color: colors.darkBlue,
                backgroundColor: "white",
                ":hover": {
                  color: colors.darkBlue,
                  backgroundColor: "white",
                },
                mt: "1rem",
              }}
              variant="contained"
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default LoginComponent;
