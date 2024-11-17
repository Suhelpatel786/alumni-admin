import { Box, Button, IconButton, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { colors } from "../../utils";
import { MdEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import PageHeaderComponent from "../../components/PageHeaderComponent";
import CustomSelect from "../../components/CustomSelect";
import DataGridComponent from "../../components/DataGridTable";
import InputComponent from "../../components/InputComponent";
import DetailAdminModal from "../../components/DetailAdminModal";
import axios, { AxiosResponse } from "axios";
import { Bounce, toast } from "react-toastify";
const AdminList = () => {
  // states
  const [detailsOfAdmin, setDetailsOfAdmin] = useState<any>();
  const [openDetailModal, setOpenDetailModal] = useState<boolean>(false);
  const [isCreate, setIsCreate] = useState<boolean>(true);

  const [isAlumniCreate, setIsAlumniCreate] = useState<boolean>(true);

  const handleOpenDetailModal = () => {
    setOpenDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setOpenDetailModal(false);
  };

  const adminDatails: any = localStorage.getItem("admin");
  const adminData: any = JSON.parse(adminDatails);

  // table column list
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 200 },
    // { field: "created", headerName: "Date", width: 200 },
    { field: "name", headerName: "Name", width: 300 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "role", headerName: "Role", width: 150 },

    {
      field: "detail",
      headerName: "",
      sortable: false,
      renderCell: (parmas) => {
        if (adminData?.role !== "Admin") return null;

        return (
          <IconButton
            sx={{ color: colors.darkBlue }}
            onClick={() => {
              setIsCreate(false);
              setDetailsOfAdmin(parmas);
              setAdminID(parmas?.row?.id);
              handleOpenDetailModal();
            }}
          >
            <MdEdit />
          </IconButton>
        );
      },
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

  const [allAdminDetails, setAllAdminDetails] = useState<any>();
  const [adminUpdate, setAdminUpdate] = useState<boolean>(false);
  const [isAdminUpdateState, setIsAdminUpdateState] = useState<boolean>(false);
  const [adminID, setAdminID] = useState<string | any>();
  //get all news API
  const getAllAdminDetails: any = async () => {
    try {
      const response: AxiosResponse | any = await axios.get(
        "http://localhost:3001/v1/getadminDetails"
      );

      setAllAdminDetails(response?.data?.data);

      setAdminUpdate(false);

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

      setIsAdminUpdateState(false);
    } catch (e) {
      console.log("GET ALL NEWS API = " + e);
    }
  };

  useEffect(() => {
    getAllAdminDetails();
  }, []);

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

  const adminDetailsArray: any = [];

  allAdminDetails?.map((admin: any, index: number) => {
    adminDetailsArray?.push({
      id: admin?._id,
      // created: "2024-11-17",
      name: admin?.adminName,
      email: admin?.email,
      role: admin?.role,
    });
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
        {adminData?.role === "Admin" && (
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
                setIsAlumniCreate(true);
                setDetailsOfAdmin(() => {});
                handleOpenDetailModal();
              }}
            >
              &#43; Create Admin
            </Button>
          </Box>
        )}
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
          rows={adminDetailsArray}
          key={1}
        />
      </Box>

      <DetailAdminModal
        open={openDetailModal}
        getAllAdminDetails={getAllAdminDetails}
        handleClose={handleCloseDetailModal}
        email={detailsOfAdmin?.row?.email}
        adminName={detailsOfAdmin?.row?.name}
        password={detailsOfAdmin?.row?.password}
        id={adminID}
        role1={detailsOfAdmin?.row?.role}
        isCreate={isCreate}
        isAlumniCreate={isAlumniCreate}
        setIsAlumniCreate={setIsAlumniCreate}
        setIsCreate={setIsCreate}
        setDetailsOfAdmin={setDetailsOfAdmin}
      />
    </Box>
  );
};

export default AdminList;
