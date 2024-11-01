import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PageHeaderComponent from "../../components/PageHeaderComponent";
import CustomSelect from "../../components/CustomSelect";
import { useFormik } from "formik";
import { colors } from "../../utils";
import { GridColDef } from "@mui/x-data-grid";
import { MdDelete } from "react-icons/md";
import DataGridComponent from "../../components/DataGridTable";
import UploadExcelDialog from "../../components/UploadExcelDialog";
import DeleteAlumniModal from "../../components/DeleteAlumniModal";
import axios from "axios";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const AlumniList = () => {
  // localhost:3001/v2
  const getAllAlumniList = async () => {
    try {
      const reseponse = await axios.get("http://localhost:3001/v2");

      console.log({ reseponse });
    } catch (e) {
      console.log(e);
    }
  };

  //get all alumni list
  useEffect(() => {
    getAllAlumniList();
  }, []);

  const [openUploadExcelDialog, setOpenUploadExcelDialog] =
    useState<boolean>(false);

  const [searchAlumniBatch, setSearchAlumniBatch] = useState<any>(null);

  const handleClickOpen = () => {
    setOpenUploadExcelDialog(true);
  };

  const handleClose = () => {
    setOpenUploadExcelDialog(false);
  };

  const [deleteAlumniData, setDeleteAlumniData] = useState<any>();

  const [openDeleteAlumniDialog, setOpenDeleteAlumniDialog] =
    useState<boolean>(false);

  const handleDeleteModalOpen = () => {
    setOpenDeleteAlumniDialog(true);
  };

  const handleDeleteModalClose = () => {
    setOpenDeleteAlumniDialog(false);
  };

  //formik set-up
  const { values, setFieldValue, handleChange, resetForm, handleSubmit } =
    useFormik({
      initialValues: {
        batch: { label: "", value: "" },
      },
      onSubmit: () => {
        console.log({ searchAlumniBatch });
      },
    });

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 150 },
    { field: "lastName", headerName: "Last name", width: 150 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      align: "left",
      headerAlign: "left",
      width: 70,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 170,
      valueGetter: (value, row) =>
        `${row.firstName || ""} ${row.lastName || ""}`,
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      renderCell: (params) => (
        <IconButton
          // variant="contained"
          sx={{ color: "red" }}
          onClick={() => {
            setDeleteAlumniData(params);
            handleDeleteModalOpen();
          }}
        >
          <MdDelete />
        </IconButton>
      ),
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];
  return (
    <Box sx={{ backgroundColor: "#F5FFFA", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <PageHeaderComponent title="Alumni List" />
        <Box sx={{ p: "2rem", pt: "1rem" }}>
          <Button
            onClick={() => handleClickOpen()}
            sx={{
              backgroundColor: colors.darkBlue,
              color: "white",
              ":hover": {
                backgroundColor: colors.darkBlue,
                color: "white",
              },
            }}
          >
            Upload CSV
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
              gap: "1rem",
            }}
          >
            {/* label  */}
            <Typography sx={{ fontSize: "18px" }}>Batch</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={"*Alumni Batch"}
                views={["year"]}
                sx={{
                  width: { xs: "100%", sm: "100%" },
                  border: `1px solid ${colors.darkBlue}`,
                  borderRadius: "5px",
                  outline: "none !important",

                  ":focus": {
                    border: `1px solid ${colors.darkBlue} !important`,
                  },
                  ":hover": {
                    border: `1px solid ${colors.darkBlue}  !important`,
                  },
                }}
                value={searchAlumniBatch}
                onChange={(newValue) => setSearchAlumniBatch(newValue)}
              />
            </LocalizationProvider>
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
              disabled={searchAlumniBatch === null}
              type="submit"
            >
              Search
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setSearchAlumniBatch(null);
              }}
              disabled={searchAlumniBatch === null}
              sx={{ backgroundColor: "red" }}
            >
              Reset
            </Button>
          </Box>
        </Box>
      </form>

      {/* list table  */}
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

      {/* upload excel file  */}
      <UploadExcelDialog
        open={openUploadExcelDialog}
        handleClose={handleClose}
      />

      {/* delete alumni dialog  */}
      <DeleteAlumniModal
        deleteAlumniData={deleteAlumniData}
        open={openDeleteAlumniDialog}
        handleClose={handleDeleteModalClose}
      />
    </Box>
  );
};

export default AlumniList;
