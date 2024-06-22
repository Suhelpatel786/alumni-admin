import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { colors } from "../utils";
import { Box, Button, Typography } from "@mui/material";
import { FC, useState } from "react";

interface DetailNewsDialogProps {
  open: boolean | any;
  handleClose: any;
  //   image: string | any;
  date: string;
  heading: string | any;
  content: string | any;
  totalPeople: number | any;
}
const DetailEventDialog: FC<DetailNewsDialogProps> = ({
  open,
  handleClose,
  //   image,
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

  return (
    <Dialog open={open} sx={{ mt: { xl: "1rem" } }} onClose={handleClose}>
      <DialogTitle id="responsive-dialog-title">Event Detail</DialogTitle>
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

        <Typography sx={{ fontSize: "16px", my: "1rem" }}>{content}</Typography>

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
    </Dialog>
  );
};

export default DetailEventDialog;
