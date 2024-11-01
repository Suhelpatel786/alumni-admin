import { Box, Button, IconButton, Typography } from "@mui/material";
import { colors } from "../../utils";
import { useFormik } from "formik";

import PageHeaderComponent from "../../components/PageHeaderComponent";
import CustomSelect from "../../components/CustomSelect";
import { GridColDef } from "@mui/x-data-grid";
import DataGridComponent from "../../components/DataGridTable";
import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import DetailNewsDialog from "../../components/DetailNewsDialog";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios, { AxiosResponse } from "axios";
import { Bounce, toast } from "react-toastify";

const NewsAndEvents = () => {
  // states
  const [detailsOfNews, setDetailsOfNews] = useState<any>();
  const [openDetailModal, setOpenDetailModal] = useState<boolean>(false);
  const [isCreate, setIsCreate] = useState<boolean>(true);
  const [content, setContent] = useState<any>();
  const [isImageURL, setIsImageURL] = useState<any>();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [newsDate, setNewsDate] = useState<any>(null);
  const [newsBatch, setNewsBatch] = useState<any>(null);

  const [searchnewsBatch, setSearchNewsBatch] = useState<any>(null);
  const [newsUpdate, setNewsUpdate] = useState<boolean>(false);

  const [getAllNewsData, setgetAllNewsData] = useState<any>();

  const handleOpenDetailModal = () => {
    setOpenDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setNewsUpdate(false);
    setOpenDetailModal(false);
  };

  // table column list
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "batch", headerName: "Batch", width: 120 },
    { field: "created", headerName: "Date", width: 120 },
    { field: "heading", headerName: "Heading", width: 200 },
    { field: "content", headerName: "Content", width: 350 },
    {
      field: "detail",
      headerName: "",
      sortable: false,
      renderCell: (parmas) => (
        <IconButton
          // variant="contained"
          sx={{ color: colors.darkBlue }}
          onClick={() => {
            setIsCreate(false);
            setDetailsOfNews(parmas);

            setContent(parmas?.row?.content);
            const isImageURLConvert = `http://localhost:3001/${
              parmas?.row?.img
                .replace(/\\/g, "/") // Replace backslashes with forward slashes
                .replace(
                  "D:/alumni-project/alumni-backend/alumni-backend/alumni-backend/public/",
                  ""
                ) // Remove the local path
            }`;
            setIsImageURL(isImageURLConvert);

            let date = dayjs(parmas?.row?.created);
            setNewsDate(date);

            let year = dayjs(parmas?.row?.batch);
            setNewsBatch(year);

            handleOpenDetailModal();
          }}
        >
          <MdEdit />
        </IconButton>
      ),
    },
  ];

  const newDataArray: any = [];

  getAllNewsData?.map((news: any, index: number) => {
    newDataArray.push({
      batch: news?.newsBatch,
      heading: news?.newsTitle,
      content: news?.newsContent,
      img: news?.newsImage,
      id: news?._id,
      created: news?.publishedDate,
    });
  });

  // table rows list
  const rows = [
    {
      id: 1,
      batch: "2021",
      img: "/assets/n_e/n1.webp",
      created: "2025-12-10",
      heading: "New Research on Quantum Computing",
      content:
        "Researchers have made a breakthrough in quantum computing, achieving unprecedented processing speeds.",
    },
    {
      id: 2,
      batch: "2022",
      img: "/assets/n_e/n3.png",
      created: "2025-12-16",
      heading: "AI in Healthcare",
      content:
        "AI technologies are being increasingly adopted in healthcare, improving diagnostics and patient care.",
    },
    {
      id: 3,
      batch: "2023",
      img: "/assets/n_e/n2.avif",
      created: "2025-12-17",
      heading: "Climate Change Mitigation Efforts",
      content:
        "Countries around the world are implementing policies to combat climate change and reduce carbon emissions.",
    },
    {
      id: 4,
      batch: "2024",
      img: "/assets/n_e/n4.jpeg",
      created: "20-10-2025",
      heading: "Advancements in Renewable Energy",
      content:
        "Significant advancements in solar and wind energy are driving the global shift towards renewable energy sources.",
    },
    {
      id: 5,
      batch: "2021",
      created: "22-10-2025",
      heading: "Economic Impact of Globalization",
      content:
        "Globalization continues to shape economies, with both positive and negative impacts on local markets.",
    },
    {
      id: 6,
      batch: "2025",
      created: "25-10-2025",
      heading: "Innovations in Biotechnology",
      content:
        "Biotechnology is making strides in areas like genetic engineering and personalized medicine.",
    },
    {
      id: 7,
      batch: "2026",
      created: "27-10-2025",
      heading: "Cybersecurity Threats on the Rise",
      content:
        "The frequency and sophistication of cyberattacks are increasing, necessitating enhanced cybersecurity measures.",
    },
    {
      id: 8,
      batch: "2022",
      created: "30/10/2025",
      heading: "Space Exploration Milestones",
      content:
        "Recent missions have achieved significant milestones in space exploration, including Mars rover landings.",
    },
    {
      id: 9,
      batch: "2023",
      created: "02/11/2025",
      heading: "Breakthroughs in Artificial Intelligence",
      content:
        "New developments in AI are paving the way for smarter and more autonomous systems in various industries.",
    },
    {
      id: 10,
      created: "05/11/2025",
      heading: "Global Health Initiatives",
      content:
        "International health organizations are launching new initiatives to combat diseases and improve public health.",
    },
  ];

  // formik set-up
  const { values, setFieldValue, handleChange, resetForm, handleSubmit } =
    useFormik({
      initialValues: {
        batch: { label: "", value: "" },
      },
      onSubmit: () => {
        console.log({ searchnewsBatch });
      },
    });

  //get all news API
  const getAllNewsDetails: any = async () => {
    try {
      const response: AxiosResponse | any = await axios.get(
        "http://localhost:3001/v3"
      );

      setgetAllNewsData(response?.data?.data);

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
      console.log("GET ALL NEWS API = " + e);
    }
  };

  //main useEffect
  useEffect(() => {
    getAllNewsDetails();
  }, []);

  return (
    <Box sx={{ backgroundColor: "#F5FFFA", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <PageHeaderComponent title="News List" />
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
            &#43; Create News
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
            {/* news batch  */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={"*News Batch"}
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
                value={searchnewsBatch}
                onChange={(newValue) => setSearchNewsBatch(newValue)}
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
              disabled={searchnewsBatch === null}
              type="submit"
            >
              Search
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setSearchNewsBatch(null);
              }}
              disabled={searchnewsBatch === null}
              sx={{ backgroundColor: "red" }}
            >
              Reset
            </Button>
          </Box>
        </Box>
      </form>

      {/* news list in table formate  */}
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
          rows={newDataArray}
          key={1}
        />
      </Box>
      <DetailNewsDialog
        open={openDetailModal}
        newsUpdate={newsUpdate}
        setNewsUpdate={setNewsUpdate}
        handleClose={handleCloseDetailModal}
        setDetailsOfNews={setDetailsOfNews}
        date={detailsOfNews?.row?.created}
        content={content}
        isImageURL={isImageURL}
        imageFile={imageFile}
        setImageFile={setImageFile}
        newsDate={newsDate}
        setNewsDate={setNewsDate}
        newsBatch={newsBatch}
        setNewsBatch={setNewsBatch}
        setIsImageURL={setIsImageURL}
        getAllNewsAPI={getAllNewsDetails}
        newsId={detailsOfNews?.row?.id}
        heading={detailsOfNews?.row?.heading}
        isCreate={isCreate}
        setIsCreate={setIsCreate}
      />
    </Box>
  );
};

export default NewsAndEvents;
