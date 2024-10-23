import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Button, Typography } from "@mui/material";
import { FC, useState } from "react";
import { MdDelete } from "react-icons/md";

interface DeleteAlumniModalProps {
  open: boolean;
  handleClose: any;
  deleteAlumniData: any;
}

const DeleteAlumniModal: FC<DeleteAlumniModalProps> = ({
  open,
  handleClose,
  deleteAlumniData,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteAlumniAPI = () => {
    setLoading(true);
    console.log({ deleteAlumniData });

    setTimeout(() => {
      setLoading(false);
      handleClose();
    }, 5000);
  };

  return (
    <Dialog
      open={open}
      sx={{ mt: { xl: "1rem" } }}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        Are you Sure? You want to delete this Alumni !!
      </DialogTitle>
      <DialogContent>
        <Box sx={{}}>
          <Typography>This action will not revert</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={deleteAlumniAPI}
          startIcon={<MdDelete />}
          sx={{
            backgroundColor: "red",
            ":hover": { backgroundColor: "red" },
          }}
          variant="contained"
          disabled={loading}
          autoFocus
        >
          {loading ? "Loading..." : "Delete"}
        </Button>
        <Button
          variant="contained"
          sx={{
            color: "black",
            backgroundColor: "lightgray",
            ":hover": { backgroundColor: "lightgray" },
          }}
          disabled={loading}
          onClick={handleClose}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAlumniModal;
