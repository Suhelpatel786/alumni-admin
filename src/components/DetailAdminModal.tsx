import { useFormik } from "formik";
import React, { FC, useEffect, useState } from "react";
import InputComponent from "./InputComponent";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { colors } from "../utils";
import CustomSelect from "./CustomSelect";
import axios from "axios";

interface DetailAdminProps {
  isCreate: boolean;
  email: String;
  open: boolean | any;
  password: String;
  role1: any;
  setDetailsOfAdmin: any;
  handleClose: any;
  setIsCreate: any;
  isAlumniCreate: boolean;
  setIsAlumniCreate: any;
}

const DetailAdminModal: FC<DetailAdminProps> = ({
  isCreate,
  email,
  open,
  handleClose,
  role1,
  setIsCreate,
  password,
  setDetailsOfAdmin,
  isAlumniCreate,
  setIsAlumniCreate,
}) => {
  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    touched,
    errors,
    setFieldValue,
    validateForm,
    resetForm,
  } = useFormik({
    initialValues: {
      email: email ? email : "",
      password: password ? password : "",
      role1: role1 ? { label: role1, value: role1 } : { label: "", value: "" },
    },
    validationSchema: "",
    onSubmit: async () => {
      try {
        const response: any = await axios.post(
          "http://localhost:3001/v1/createAdmin",
          {
            email: values?.email,
            password: values?.password,
            role1: values?.role1?.value === "ADMIN" ? "Admin" : "Sub-Admin",
          }
        );

        console.log({ response });
        // Redirect to home page
        handleClose();
      } catch (error) {
        console.error("Login failed", error);
        // Handle login error (e.g., show an error message)
      }
    },
  });

  const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false);

  const handleDeleteDialog = () => {
    setIsLoadingDetail(true);

    setTimeout(() => {
      setIsLoadingDetail(false);
      handleClose();
    }, 3000);
  };

  // Use useEffect to update initial form values dynamically
  useEffect(() => {
    if (isAlumniCreate) {
      resetForm({
        values: {
          email: email ? email : "",
          password: password ? password : "",
          role1: role1
            ? { label: role1, value: role1 }
            : { label: "", value: "" },
        },
      });
    }
  }, [isAlumniCreate, email, password, role1, resetForm]); // Add necessary dependencies

  return (
    <Dialog
      open={open}
      maxWidth={"xl"}
      // fullWidth={bigDevice}
      // fullScreen={fullScreen}
      sx={{ mt: { xl: "1rem" } }}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {isCreate ? "Create Admin" : "Admin Details"}
      </DialogTitle>
      {isCreate ? (
        <>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Box
                sx={{
                  width: "700px",
                  overflowX: "hidden",
                  display: "flex",
                  flexDirection: { xs: "column" },
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "2rem",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    gap: ".2rem",
                    width: "100%",
                  }}
                >
                  {/* label  */}
                  <Typography sx={{ fontSize: "18px" }}>Role</Typography>
                  <CustomSelect
                    placeholder={"Alumni Batch"}
                    options={[
                      { label: "ADMIN", value: "ADMIN" },
                      { label: "SUB-ADMIN", value: "SUB-ADMIN" },
                    ]}
                    name={"role1"}
                    width={"100%"}
                    value={values.role1?.value}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                  />
                </Box>

                <InputComponent
                  type="text"
                  label="*Email"
                  handleChange={handleChange}
                  error={errors.email && touched?.email ? errors.email : ""}
                  name={"email"}
                  handleBlur={handleBlur}
                  value={values.email}
                  placeholder="Enter Email"
                />
                <InputComponent
                  type="password"
                  label="*Password"
                  handleChange={handleChange}
                  error={
                    errors.password && touched?.password ? errors.password : ""
                  }
                  name={"password"}
                  handleBlur={handleBlur}
                  value={values.password}
                  placeholder="Enter Password"
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClose}
                sx={{
                  backgroundColor: colors.darkBlue,
                  ":hover": { backgroundColor: colors.darkBlue },
                }}
                type="submit"
                variant="contained"
                autoFocus
                disabled={
                  values.email == "" ||
                  values.password == "" ||
                  values.role1?.value == ""
                }
              >
                {isAlumniCreate ? "Create" : "Update"}
              </Button>
            </DialogActions>
          </form>
        </>
      ) : (
        <DialogContent sx={{ width: "700px" }}>
          <Typography sx={{ fontSize: "18px", fontWeight: "500", my: "1rem" }}>
            Role : {role1}
          </Typography>
          <Typography sx={{ fontSize: "18px", fontWeight: "500", my: "1rem" }}>
            Email : {email}
          </Typography>
          <Typography
            sx={{ fontSize: "18px", fontWeight: "500", my: "1rem", mb: "2rem" }}
          >
            Password : {password}
          </Typography>

          {/* update and delete btn  */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "1rem",
            }}
          >
            <Button
              sx={{
                color: "white",
                backgroundColor: colors.darkBlue,
                ":hover": { color: "white", backgroundColor: colors.darkBlue },
              }}
              onClick={() => {
                setIsCreate(!isCreate);
                setIsAlumniCreate(false);
              }}
            >
              Update
            </Button>
            <Button
              sx={{
                color: "white",
                backgroundColor: "red",
                ":hover": { color: "white", backgroundColor: "red" },
              }}
              onClick={() => handleDeleteDialog()}
              disabled={isLoadingDetail}
            >
              {isLoadingDetail ? "Loading..." : "Delete"}
            </Button>
          </Box>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default DetailAdminModal;
