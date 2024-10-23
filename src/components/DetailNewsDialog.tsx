import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { colors } from "../utils";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import { IoAddOutline, IoCloseOutline } from "react-icons/io5";
import InputComponent from "./InputComponent";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import CustomSelect from "./CustomSelect";

interface DetailNewsDialogProps {
  open: boolean | any;
  handleClose: any;
  setNewsDate: any;
  newsDate: any;
  newsBatch: any;
  setNewsBatch: any;
  //   image: string | any;
  isCreate: any;
  setIsCreate: any;
  date: string;
  heading: string | any;
  content: string | any;
  setDetailsOfNews: any;
  newsUpdate: boolean;
  setNewsUpdate: any;
  setIsImageURL: any;
  isImageURL: any;
}
const DetailNewsDialog: FC<DetailNewsDialogProps> = ({
  open,
  handleClose,
  isImageURL,
  setIsImageURL,
  newsDate,
  setNewsDate,
  newsBatch,
  setNewsBatch,
  //   image,
  isCreate,
  setIsCreate,
  date,
  heading,
  content,
  setDetailsOfNews,
  setNewsUpdate,
  newsUpdate,
}) => {
  const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false);

  const handleDeleteDialog = () => {
    setIsLoadingDetail(true);

    setTimeout(() => {
      setIsLoadingDetail(false);
      handleClose();
    }, 3000);
  };

  const [image, setImage] = useState<string>("");

  const [uploaded, setUploaded] = useState(false);

  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    if (newsUpdate) {
      setDescription(content);
      setNewsDate(newsDate);
      setFieldValue("heading", heading);
      setNewsBatch(newsBatch);
    } else {
      setDetailsOfNews();
      setFieldValue("heading", "");
      setDescription("");
      setNewsDate(null);
      setNewsBatch(null);
      setIsImageURL("");
    }
  }, [newsUpdate]);

  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
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

  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    touched,
    resetForm,
    setFieldValue,
    errors,
    validateForm,
  } = useFormik({
    initialValues: {
      heading: "",
    },
    validationSchema: "",
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: () => {
      console.log({
        ...values,
        description,
        newsDate,
        image: isImageURL,
        newsBatch,
      });
    },
  });

  return (
    <Dialog
      open={open}
      maxWidth={"xl"}
      // fullWidth={bigDevice}
      // fullScreen={fullScreen}
      disableEnforceFocus
      sx={{ mt: { xl: "1rem" } }}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">News Detail</DialogTitle>
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
                    value={newsBatch}
                    onChange={(newValue) => setNewsBatch(newValue)}
                  />
                </LocalizationProvider>

                {/* year  batch  */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label={"*News Date"}
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
                    value={newsDate}
                    onChange={(newValue) => setNewsDate(newValue)}
                  />
                </LocalizationProvider>
                {/* </LocalizationProvider> */}

                {/* heading  */}
                <InputComponent
                  type="text"
                  label="*Heading"
                  handleChange={handleChange}
                  error={
                    errors.heading && touched?.heading ? errors.heading : ""
                  }
                  name={"heading"}
                  handleBlur={handleBlur}
                  value={values.heading}
                  placeholder="Enter News Heading"
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
                    placeholder="*News description...."
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
                  values.heading === "" ||
                  newsDate == null ||
                  description === ""
                }
              >
                {newsUpdate ? "Update" : "Create"}
              </Button>
            </DialogActions>
          </form>
        </>
      ) : (
        <DialogContent>
          {/* News Detail Page content */}
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
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
          </Box>

          <Typography
            sx={{ textAlign: "right", color: colors.darkBlue, mb: "1rem" }}
          >
            {date}
          </Typography>

          <Typography sx={{ fontSize: "22px", fontWeight: "600", my: "1rem" }}>
            {heading}
          </Typography>

          <Typography sx={{ fontSize: "16px", my: "1rem" }}>
            {content}
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
                setNewsUpdate(true);
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

export default DetailNewsDialog;
