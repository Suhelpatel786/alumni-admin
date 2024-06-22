import { Box, Button, IconButton, Typography } from "@mui/material";
import { colors } from "../../utils";
import { useFormik } from "formik";

import PageHeaderComponent from "../../components/PageHeaderComponent";
import CustomSelect from "../../components/CustomSelect";
import { GridColDef } from "@mui/x-data-grid";
import DataGridComponent from "../../components/DataGridTable";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import DetailEventDialog from "../../components/DetailEventDialog";

const Event = () => {
  // states
  const [detailsOfEvent, setDetailsOfEvent] = useState<any>();
  const [openDetailModal, setOpenDetailModal] = useState<boolean>(false);

  const handleOpenDetailModal = () => {
    setOpenDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setOpenDetailModal(false);
  };

  console.log({ detailsOfEvent });

  // table column list
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "created", headerName: "Date", width: 120 },
    { field: "heading", headerName: "Heading", width: 200 },
    { field: "content", headerName: "Content", width: 350 },
    {
      field: "detail",
      headerName: "",
      sortable: false,
      renderCell: (parmas) => (
        <IconButton
          variant="contained"
          sx={{ color: colors.darkBlue }}
          onClick={() => {
            setDetailsOfEvent(parmas);
            handleOpenDetailModal();
          }}
        >
          <MdEdit />
        </IconButton>
      ),
    },
  ];

  // table rows list
  const rows = [
    {
      id: 1,
      created: "12/10/2025",
      heading: "New Research on Quantum Computing",
      content:
        "Researchers have made a breakthrough in quantum computing, achieving unprecedented processing speeds.",
    },
    {
      id: 2,
      created: "15/10/2025",
      heading: "AI in Healthcare",
      content:
        "AI technologies are being increasingly adopted in healthcare, improving diagnostics and patient care.",
    },
    {
      id: 3,
      created: "18/10/2025",
      heading: "Climate Change Mitigation Efforts",
      content:
        "Countries around the world are implementing policies to combat climate change and reduce carbon emissions.",
    },
    {
      id: 4,
      created: "20/10/2025",
      heading: "Advancements in Renewable Energy",
      content:
        "Significant advancements in solar and wind energy are driving the global shift towards renewable energy sources.",
    },
    {
      id: 5,
      created: "22/10/2025",
      heading: "Economic Impact of Globalization",
      content:
        "Globalization continues to shape economies, with both positive and negative impacts on local markets.",
    },
    {
      id: 6,
      created: "25/10/2025",
      heading: "Innovations in Biotechnology",
      content:
        "Biotechnology is making strides in areas like genetic engineering and personalized medicine.",
    },
    {
      id: 7,
      created: "27/10/2025",
      heading: "Cybersecurity Threats on the Rise",
      content:
        "The frequency and sophistication of cyberattacks are increasing, necessitating enhanced cybersecurity measures.",
    },
    {
      id: 8,
      created: "30/10/2025",
      heading: "Space Exploration Milestones",
      content:
        "Recent missions have achieved significant milestones in space exploration, including Mars rover landings.",
    },
    {
      id: 9,
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
        <PageHeaderComponent title="Event List" />
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
          >
            &#43; Create Event
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
            <CustomSelect
              placeholder={"Alumni Batch"}
              options={[
                { label: "2021", value: "2021" },
                { label: "2022", value: "2022" },
                { label: "2023", value: "2023" },
              ]}
              name={"batch"}
              width={"350"}
              value={values.batch?.value}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
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
              disabled={values?.batch?.value === ""}
              type="submit"
            >
              Search
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                resetForm();
              }}
              disabled={values?.batch?.value === ""}
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
          rows={rows}
          key={1}
        />
      </Box>
      <DetailEventDialog
        totalPeople={15}
        open={openDetailModal}
        handleClose={handleCloseDetailModal}
        date={detailsOfEvent?.row?.created}
        content={detailsOfEvent?.row?.content}
        heading={detailsOfEvent?.row?.heading}
      />
    </Box>
  );
};

export default Event;
