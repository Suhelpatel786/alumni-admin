import { useFormik } from "formik";
import React, { FC, useState } from "react";
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

interface DetailAdminProps {
  isCreate: boolean;
  email: String;
  open: boolean | any;
  password: String;
  role1: String;
  handleClose: any;
  setIsCreate: any;
}

const DetailAdminModal: FC<DetailAdminProps> = ({
  isCreate,
  email,
  open,
  handleClose,
  role1,
  setIsCreate,
  password,
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
  } = useFormik({
    initialValues: {
      email: email || "",
      password: password || "",
      role1: role1 || { label: "", value: "" },
    },
    validationSchema: "",
    onSubmit: () => {
      console.log({ values });
    },
  });

  console.log({ email, role1, password });

  const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false);

  const handleDeleteDialog = () => {
    setIsLoadingDetail(true);

    setTimeout(() => {
      setIsLoadingDetail(false);
      handleClose();
    }, 3000);
  };

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
                      { label: "SUB-ADMIN", value: "SUB_ADMIN" },
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
                {!isCreate ? "Update" : "Create"}
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
