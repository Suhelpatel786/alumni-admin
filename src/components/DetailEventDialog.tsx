import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { colors } from "../utils";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useFormik } from "formik";
import InputComponent from "./InputComponent";
import { DatePicker } from "@mui/x-date-pickers";
import { IoAddOutline, IoCloseOutline } from "react-icons/io5";

interface DetailNewsDialogProps {
  open: boolean | any;
  handleClose: any;
  //   image: string | any;
  date: string;
  heading: string | any;
  content: string | any;
  totalPeople: number | any;
  isCreate: any;
  setIsCreate: any;
}
const DetailEventDialog: FC<DetailNewsDialogProps> = ({
  open,
  handleClose,
  //   image,
  isCreate,
  setIsCreate,
  totalPeople,
  date,
  heading,
  content,
}) => {
  const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false);

  const handleDeleteDialog = () => {
    setIsLoadingDetail(true);

    setTimeout(() => {
      setIsLoadingDetail(false);
      handleClose();
    }, 3000);
  };

  const [eventDate, setEventDate] = useState<any>(null);

  const [image, setImage] = useState<string>("");

  const [uploaded, setUploaded] = useState(false);

  const [description, setDescription] = useState<string>("");

  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader: any = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setUploaded(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage("");
    setUploaded(false);
  };

  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    touched,
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
      console.log({ ...values, description, eventDate, image: image });
    },
  });

  return (
    <Dialog
      open={open}
      maxWidth={"xl"}
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
                        backgroundImage: `url(${image})`,
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

                {/* year  batch  */}
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
                  values.heading === "" ||
                  eventDate == null ||
                  description === ""
                }
              >
                Create
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

export default DetailEventDialog;