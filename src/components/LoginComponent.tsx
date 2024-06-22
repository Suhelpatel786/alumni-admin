import { Box, Button, Typography } from "@mui/material";
import CustomInput from "./CutomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { colors } from "../utils";

const LoginComponent = () => {
  const loginvalidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("*Please enter valid email")
      .required("*Please enter your email"),
    password: yup
      .string()
      .required("*Please enter your password")
      .min(6, "Please enter atleast 6 character or more ")
      .max(10, "Please Do not enter more then 10 character"),
  });

  const { values, handleBlur, handleChange, errors, touched, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginvalidationSchema,
      onSubmit: () => {
        console.log(values);
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
          {/* email input  */}
          <CustomInput
            name="email"
            type={"email"}
            handleBlur={handleBlur}
            handleChange={handleChange}
            value={values?.email}
            label="Email"
            error={errors.email}
            touched={touched?.email}
          />

          {/* password input  */}
          <CustomInput
            name="password"
            value={values.password}
            type="password"
            handleBlur={handleBlur}
            handleChange={handleChange}
            touched={touched?.password}
            error={errors?.password}
            label={"Password"}
          />

          {/* submit button  */}
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
    </Box>
  );
};

export default LoginComponent;
