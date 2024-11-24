import { Box, Button, Typography } from "@mui/material";
import { colors } from "../../utils";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Bounce, toast } from "react-toastify";
import axios, { AxiosResponse } from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import PageHeaderComponent from "../../components/PageHeaderComponent";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const StartAlumniList = () => {
  const [startAlumniData, setStarAlumniData] = useState<any>();
  const [searchAlumniBatch, setSearchAlumniBatch] = useState<any>(null);

  // table column list
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
      field: "delete",
      headerName: "Update",
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          sx={{ color: "white", backgroundColor: colors?.darkBlue }}
          onClick={() => {
            removeFromStarAlumni(params?.row?.key);
          }}
        >
          Remove
        </Button>
      ),
    },
  ];

  //remove from startAlumni
  const removeFromStarAlumni: any = async (id: number) => {
    try {
      const response: AxiosResponse | any = await axios.patch(
        "http://localhost:3001/v1/startalumni",
        {
          id: id,
          isStar: "false",
        }
      );

      setStarAlumniData(response?.data?.allStartAlumni);
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

  //get all star API
  const getAllStarAlumni: any = async () => {
    try {
      const response: AxiosResponse | any = await axios.get(
        "http://localhost:3001/v1/allstaralumni"
      );

      setStarAlumniData(response?.data?.allStartAlumni);
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

  const starAlumniDataArray: any = [];

  startAlumniData?.map((alumni: any) => {
    starAlumniDataArray?.push({
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
    });
  });

  const handleSubmit = () => {};

  useEffect(() => {
    getAllStarAlumni();
  }, []);
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
        <PageHeaderComponent title="Star Alumni List" />
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
                getAllStarAlumni();
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
          rows={starAlumniDataArray}
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
    </Box>
  );
};

export default StartAlumniList;
