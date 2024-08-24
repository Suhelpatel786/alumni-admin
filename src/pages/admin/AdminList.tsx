import { Box, Button, IconButton, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { colors } from "../../utils";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import { useFormik } from "formik";
import PageHeaderComponent from "../../components/PageHeaderComponent";
import CustomSelect from "../../components/CustomSelect";
import DataGridComponent from "../../components/DataGridTable";
import InputComponent from "../../components/InputComponent";
import DetailAdminModal from "../../components/DetailAdminModal";
const AdminList = () => {
  // states
  const [detailsOfAdmin, setDetailsOfAdmin] = useState<any>();
  const [openDetailModal, setOpenDetailModal] = useState<boolean>(false);
  const [isCreate, setIsCreate] = useState<boolean>(true);

  const handleOpenDetailModal = () => {
    setOpenDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setOpenDetailModal(false);
  };

  // table column list
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "created", headerName: "Date", width: 120 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "role", headerName: "Role", width: 200 },
    {
      field: "detail",
      headerName: "",
      sortable: false,
      renderCell: (parmas) => (
        <IconButton
          variant="contained"
          sx={{ color: colors.darkBlue }}
          onClick={() => {
            setIsCreate(false);
            setDetailsOfAdmin(parmas);
            handleOpenDetailModal();
          }}
        >
          <MdEdit />
        </IconButton>
      ),
    },
  ];

  const rows: any[] = [
    {
      id: 1,
      created: "2023-11-17",
      email: "user1@example.com",
      role: "SUB-ADMIN",
      password: "b7R3kLm9",
      detail: "Detail for user 1",
    },
    {
      id: 2,
      created: "2024-08-23",
      email: "user2@example.com",
      role: "ADMIN",
      password: "x9Pq5Vs2",
      detail: "Detail for user 2",
    },
    {
      id: 3,
      created: "2023-09-21",
      email: "user3@example.com",
      role: "SUB-ADMIN",
      password: "y8Tr2Bg4",
      detail: "Detail for user 3",
    },
    {
      id: 4,
      created: "2023-12-22",
      email: "user4@example.com",
      role: "SUB-ADMIN",
      password: "c5Gh8Qs3",
      detail: "Detail for user 4",
    },
    {
      id: 5,
      created: "2023-12-30",
      email: "user5@example.com",
      role: "ADMIN",
      password: "f4Jm9Rt6",
      detail: "Detail for user 5",
    },
  ];

  console.log({ detailsOfAdmin });

  // formik set-up
  const { values, setFieldValue, handleChange, resetForm, handleSubmit } =
    useFormik({
      initialValues: {
        role: { label: "", value: "" },
        email: "",
      },
      onSubmit: () => {
        console.log({ values });
      },
    });

  return (
    <Box sx={{ backgroundColor: "#F5FFFA", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <PageHeaderComponent title="Admin List" />
        <Box sx={{ p: "2rem", pt: "1rem" }}>
          <Button
            sx={{
              backgroundColor: colors.darkBlue,
              color: "white",
              ":hover": {
                backgroundColor: colors.darkBlue,
                color: "white",
              },
            }}
            onClick={() => {
              setIsCreate(true);
              handleOpenDetailModal();
            }}
          >
            &#43; Create Admin
          </Button>
        </Box>
      </Box>

      {/* searching filters  */}
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5rem",
            p: "2rem",
            mx: "1rem",
            backgroundColor: "white",
            boxShadow:
              "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              gap: ".2rem",
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
              name={"role"}
              width={"350"}
              value={values.role?.value}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              gap: ".2rem",
              width: 350,
            }}
          >
            {/* label  */}
            <Typography sx={{ fontSize: "18px" }}>Email</Typography>
            <InputComponent
              type="text"
              label=""
              handleChange={handleChange}
              error={""}
              name={"email"}
              handleBlur={() => {}}
              value={values.email}
              placeholder="Enter Admin Email"
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              mt: "10px",
              gap: "1rem",
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: colors.darkBlue,
                ":hover": { backgroundColor: colors.darkBlue },
              }}
              disabled={values?.role?.value === "" && values?.email === ""}
              type="submit"
            >
              Search
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                resetForm();
              }}
              disabled={values?.role?.value === "" && values?.email === ""}
              sx={{ backgroundColor: "red" }}
            >
              Reset
            </Button>
          </Box>
        </Box>
      </form>

      {/* ADMIN  list in table formate  */}
      <Box
        sx={{
          mt: "1rem",
          p: "1rem",
          mx: "1rem",
          backgroundColor: "white",
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;",
        }}
      >
        <DataGridComponent
          columns={columns}
          pageSize={10}
          pageSizeOption={[10, 20, 50, 100]}
          rows={rows}
          key={1}
        />
      </Box>

      <DetailAdminModal
        open={openDetailModal}
        handleClose={handleCloseDetailModal}
        email={detailsOfAdmin?.row?.email}
        password={detailsOfAdmin?.row?.password}
        role1={detailsOfAdmin?.row?.role}
        isCreate={isCreate}
        setIsCreate={setIsCreate}
      />
    </Box>
  );
};

export default AdminList;
