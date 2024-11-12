import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { colors } from "../utils";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import InputComponent from "./InputComponent";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { IoAddOutline, IoCloseOutline } from "react-icons/io5";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import axios, { AxiosResponse } from "axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface DetailNewsDialogProps {
  open: boolean | any;
  eventUpdate: boolean;
  setEventUpdate: any;
  setEventBatch: any;
  handleClose: any;
  content: any;
  isImageURL: any;
  setIsImageURL: any;
  eventDate: any;
  setEventDate: any;
  eventBatch: any;
  //   image: string | any;
  date: string;
  heading: string | any;
  totalPeople: number | any;
  isCreate: any;
  setIsCreate: any;
  setDetailsOfEvent: any;
  imageFile: any;
  setImageFile: any;
  id: any;
  getAllEventDetails: any;
  isEventUpdateState: any;
  setIsEventUpdateState: any;
  eventDetail: any;
}
const DetailEventDialog: FC<DetailNewsDialogProps> = ({
  open,
  eventDetail,
  isEventUpdateState,
  setIsEventUpdateState,
  imageFile,
  id,
  setImageFile,
  handleClose,
  eventBatch,
  setEventBatch,
  eventDate,
  eventUpdate,
  isImageURL,
  setEventDate,
  setDetailsOfEvent,
  getAllEventDetails,
  setEventUpdate,
  setIsImageURL,
  //   image,
  isCreate,
  setIsCreate,
  totalPeople,
  date,
  heading,
  content,
}) => {
  const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false);
  const adminDatails: any = localStorage.getItem("admin");
  const adminData: any = JSON.parse(adminDatails);

  const [uploaded, setUploaded] = useState(false);

  const [description, setDescription] = useState<string>("");

  const [titleOfEvent, setTitleOfEvent] = useState<string | any>("");

  useEffect(() => {
    if (eventUpdate) {
      setDescription(content);
      setEventDate(eventDate);
      setTitleOfEvent(heading);
      setEventBatch(eventBatch);
    } else {
      setDetailsOfEvent();
      setFieldValue("heading", "");
      setDescription("");
      setTitleOfEvent("");
      setEventDate(null);
      setEventBatch(null);
      setIsImageURL("");
    }
  }, [eventUpdate]);

  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];

    setImageFile(file);

    if (file && file.type.startsWith("image/")) {
      const reader: any = new FileReader();
      reader.onloadend = () => {
        setIsImageURL(reader.result);
        setUploaded(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setIsImageURL("");
    setUploaded(false);
  };

  const columns: GridColDef[] = [
    { field: "alumniEnrollment", headerName: "Enrollment Number", width: 200 },
    { field: "alumniEmail", headerName: "Email", width: 250 },
    { field: "alumniFirstName", headerName: "First Name", width: 150 },
    // Add more columns if needed
  ];

  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    touched,
    errors,
    validateForm,
    setFieldValue,
  } = useFormik({
    initialValues: {
      heading: "",
    },
    validationSchema: "",
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async () => {
      try {
        const formData = new FormData();

        if (imageFile) {
          formData.append("eventimage", imageFile);
        }

        formData.append("eventTitle", titleOfEvent);
        formData.append("adminID", adminData?._id);
        formData.append("eventContent", description);
        formData.append("dueDate", dayjs(eventDate).format("DD/MM/YYYY"));
        formData.append("eventBatch", dayjs(eventBatch).format("YYYY"));

        if (isEventUpdateState) {
          console.log("INSIDE UPDATE FUNCTION");
          console.log(Array.from(formData));

          const response: AxiosResponse | any = await axios.put(
            `http://localhost:3001/event/updateevent/${id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data", // Required for file uploads
              },
            }
          );

          console.log({ response, formData });
        } else {
          const response: AxiosResponse | any = await axios.post(
            "http://localhost:3001/event/createevents",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data", // Required for file uploads
              },
            }
          );

          console.log({ response });
        }
        getAllEventDetails();
      } catch (e) {
        console.log("EVENT CREATE", e);
      }
    },
  });

  const deleteEvent: any = async () => {
    setIsLoadingDetail(true);
    const response: AxiosResponse | any = await axios.delete(
      `http://localhost:3001/event/deleteEvents/${id}`
    );

    getAllEventDetails();
    setIsLoadingDetail(false);
    handleClose();
    console.log(response);
  };

  return (
    <Dialog
      open={open}
      maxWidth={"md"}
      disableEnforceFocus
      fullWidth
      sx={{ mt: { xl: "1rem" } }}
      aria-labelledby="responsive-dialog-title"
      onClose={handleClose}
    >
      <DialogTitle id="responsive-dialog-title">Event Detail</DialogTitle>
      {isCreate ? (
        <>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: { xs: "column" },
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "2rem",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    dispaly: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      pt: { xs: "2rem", xl: 0 },
                      mt: { xs: 0, sm: "2rem" },
                      mb: "2rem",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        backgroundImage: `url(${isImageURL})`,
                        backgroundSize: "cover",
                        backgroundColor: "#F5F5F5",
                        border: "2px dashed darkgray",
                        opacity: uploaded ? 1 : 1,
                        backgroundPosition: "center",
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        backgroundRepeat: "no-repeat",
                        height: "400px",
                        width: {
                          xs: "100vw !important",
                          sm: "50vw !important",
                        },
                      }}
                    />

                    {/* Add Button */}
                    {!uploaded && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <IconButton
                          sx={{
                            fontSize: "50px",
                            color: "#D4D4D4",
                            padding: "6px",
                            fontWeight: "800",
                            border: "3px dashed #D4D4D4",
                            background: "#ECECEC",
                            borderRadius: "0 !important",
                            width: "50px !important",
                            height: "50px !important",
                          }}
                          component="label"
                        >
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleImageUpload}
                          />
                          <IoAddOutline />
                        </IconButton>
                      </Box>
                    )}

                    {/* Remove Button */}
                    {uploaded && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: { xs: 15, sm: 10, xl: -23 },
                          right: {
                            xs: "-2%",
                            sm: "-1%",
                            md: "19.5%",
                            xl: "0%",
                          },
                        }}
                      >
                        <IconButton
                          sx={{
                            fontSize: "20px",
                            color: "white",
                            borderRadius: "50%",
                            padding: "6px",
                            backgroundColor: colors.darkBlue,
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                            "&:hover": {
                              backgroundColor: "#002244",
                            },
                          }}
                          onClick={handleRemoveImage}
                        >
                          <IoCloseOutline />
                        </IconButton>
                      </Box>
                    )}
                  </Box>
                </Box>

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
                    value={eventBatch}
                    onChange={(newValue) => setEventBatch(newValue)}
                  />
                </LocalizationProvider>

                {/* year  batch  */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label={"*Event Date"}
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
                    value={eventDate}
                    onChange={(newValue) => setEventDate(newValue)}
                  />
                </LocalizationProvider>

                {/* heading  */}
                <InputComponent
                  type="text"
                  label="*Heading"
                  handleChange={(e: any) => setTitleOfEvent(e?.target?.value)}
                  error={
                    errors.heading && touched?.heading ? errors.heading : ""
                  }
                  name={"heading"}
                  handleBlur={handleBlur}
                  value={titleOfEvent}
                  placeholder="Enter Event Heading"
                />

                <Box sx={{ width: { xs: "100%", sm: "100%" } }}>
                  <textarea
                    onChange={(e) => setDescription(e.target?.value)}
                    name={"description"}
                    value={description}
                    rows={7}
                    style={{
                      borderColor: colors.darkBlue,
                      borderRadius: "5px",
                      color: colors.textColor,
                      padding: "1rem .5rem",
                      fontWeight: "300",
                      resize: "vertical",
                      lineHeight: "1.5",
                      fontFamily: `"Roboto", "Helvetica" ,"Arial", sans-serif`,
                      fontSize: "18px",
                      width: "100%",
                    }}
                    placeholder="*Event description...."
                  />
                </Box>
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
                  titleOfEvent === "" || eventDate == null || description === ""
                }
              >
                {eventUpdate ? "Update" : "Create"}
              </Button>
            </DialogActions>
          </form>
        </>
      ) : (
        <DialogContent>
          {/* Event Detail Page content */}
          <Box>
            {/* image  */}
            <Box
              sx={{
                width: "100%",
                mb: "1rem",
                height: { xs: "300px", sm: "400px" },
                border: {
                  xs: `1px solid ${colors.darkBlue}`,
                  sm: `5px solid ${colors.darkBlue}`,
                },
                backgroundColor: colors.darkBlue,
                backgroundImage: `url(${isImageURL})`,
                //   backgroundImage: `url('${image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
          </Box>

          <Box
            sx={{
              px: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{ textAlign: "left", color: colors.darkBlue, mb: "1rem" }}
            >
              Total People = {totalPeople}
            </Typography>
            <Typography
              sx={{ textAlign: "right", color: colors.darkBlue, mb: "1rem" }}
            >
              {date}
            </Typography>
          </Box>

          <Typography sx={{ fontSize: "22px", fontWeight: "600", my: "1rem" }}>
            {heading}
          </Typography>

          <Typography sx={{ fontSize: "16px", my: "1rem" }}>
            {content}
          </Typography>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              // minHeight: "100vh",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                // alignItems: "center",
                // justifyContent: "center",
                p: { xs: "1rem", sm: "1rem" },
                position: "relative",
                overflowY: "auto",
              }}
            >
              <Box
                sx={{
                  width: { xs: "100%", sm: "95%" },
                  p: { xs: ".5rem", sm: "2rem" },
                  boxShadow:
                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                }}
              >
                {/* Event Details and Image */}

                {/* Attending Alumni Table */}
                <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                  Alumni Attending the Event
                </Typography>
                <Box sx={{ height: 400, width: "100%" }}>
                  <DataGrid
                    rows={eventDetail?.finalAlumniForEvents || []}
                    columns={columns}
                    getRowId={(row: any) => row?.alumniEnrollment}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 5,
                        },
                      },
                    }}
                    pageSizeOptions={[5, 10, 20]}
                    checkboxSelection={false}
                  />
                </Box>
              </Box>
            </Box>
          </Box>

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
                setEventUpdate(true);
                setIsEventUpdateState(true);
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
              onClick={() => deleteEvent()}
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

export default DetailEventDialog;
