import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PageHeaderComponent from "../../components/PageHeaderComponent";
import CustomSelect from "../../components/CustomSelect";
import { useFormik } from "formik";
import { colors } from "../../utils";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { MdDelete } from "react-icons/md";
import DataGridComponent from "../../components/DataGridTable";
import UploadExcelDialog from "../../components/UploadExcelDialog";
import DeleteAlumniModal from "../../components/DeleteAlumniModal";
import axios, { AxiosResponse } from "axios";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Bounce, toast } from "react-toastify";

const AlumniList = () => {
  const [allAlumniDetails, setAllAlumniDetails] = useState<any>([]);
  const alumniDetailsArray: any = [];

  // localhost:3001/v2
  const getAllAlumniList: any = async (batch: any) => {
    console.log(batch);
    try {
      const reseponse = await axios.get(
        "http://localhost:3001/v2/getAllDetails",
        {
          params: batch ? { batch } : {},
        }
      );

      console.log({ reseponse });
      setAllAlumniDetails(reseponse?.data?.data);
    } catch (e) {
      console.log(e);
    }
  };

  //get all alumni list
  useEffect(() => {
    getAllAlumniList();
  }, []);

  allAlumniDetails?.map((alumni: any) => {
    alumniDetailsArray?.push({
      image: `http://localhost:3001/${
        alumni?.image
          .replace(/\\/g, "/") // Replace backslashes with forward slashes
          .replace(
            "D:/alumni-project/alumni-backend/alumni-backend/alumni-backend/public/",
            ""
          ) // Remove the local path
      }`,
      key: alumni?._id,
      id: alumni?.enrollementNumber,
      name: alumni?.firstName + " " + alumni?.lastName,
      batch: alumni?.batch,
      email: alumni?.email,
      phoneNo: alumni?.phoneNo,
      startAlumni: alumni?.startAlumni,
    });
  });

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
        console.log("function called");
        getAllAlumniList(dayjs(searchAlumniBatch)?.year());
      },
    });

  //get all news API
  const getAllStarAlumni: any = async () => {
    try {
      const response: AxiosResponse | any = await axios.get(
        "http://localhost:3001/v1/allstaralumni"
      );

      getAllAlumniList();
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
    } catch (e) {
      console.log("GET ALL Star API = " + e);
    }
  };

  //remove from startAlumni
  const addToStarAlumni: any = async (id: number) => {
    try {
      const response: AxiosResponse | any = await axios.patch(
        "http://localhost:3001/v1/startalumni",
        {
          id: id,
          isStar: "true",
        }
      );

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
    } catch (e) {
      console.log("GET ALL Star API = " + e);
    } finally {
      getAllStarAlumni();
    }
  };

  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "Image",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <Box
          sx={{
            width: 120, // Adjust as needed
            height: 120, // Adjust as needed
            backgroundImage: `url(${params?.value})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      ),
    },
    { field: "id", headerName: "Enrollment Number", width: 200 },
    { field: "name", headerName: "Name", width: 200 },
    {
      field: "batch",
      headerName: "Batch",
      type: "number",
      align: "left",
      headerAlign: "left",
      width: 150,
    },
    { field: "email", headerName: "Email", width: 250 },
    { field: "phoneNo", headerName: "Phone Number", width: 180 },
    {
      field: "star",
      width: 250,
      headerName: "Start-Alumni",
      sortable: false,
      renderCell: (params) =>
        params?.row?.startAlumni == "false" && (
          <Button
            variant="contained"
            sx={{ color: "white", backgroundColor: colors.darkBlue }}
            onClick={() => {
              addToStarAlumni(params?.row?.key);
            }}
          >
            Make Start Alumni
          </Button>
        ),
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
                getAllAlumniList();
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
        <DataGrid
          rows={alumniDetailsArray}
          columns={columns}
          autoHeight
          rowHeight={150} // Adjust to fit the image size
          sx={{
            "& .MuiDataGrid-cell": {
              alignItems: "flex-start", // Align text cells to the top
            },
            "& .MuiDataGrid-cell[data-field='image']": {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
          }}
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
