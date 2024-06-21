import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { colors } from "../utils";
import { Box, Button, Typography } from "@mui/material";
import { FileUploader } from "react-drag-drop-files";
import { useState } from "react";

interface UploadExcelDialogProps {
  open: any;
  handleClose: any;
}

const fileTypes = ["csv", "xls", "xlsx"];

const UploadExcelDialog: React.FC<UploadExcelDialogProps> = ({
  open,
  handleClose,
}) => {
  const [file, setFile] = useState<any>(null);
  const handleChange = (file: any) => {
    setFile(file);
  };

  return (
    <Dialog
      open={open}
      sx={{ mt: { xl: "1rem" } }}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        Upload Alumni CSV File
      </DialogTitle>
      <DialogContent>
        <Box sx={{}}>
          <FileUploader
            onTypeError={(err: any) => console.log(err)}
            handleChange={handleChange}
            name="file"
            types={fileTypes}
          />
          <Typography>
            {file ? `File name: ${file.name}` : "No files uploaded yet"}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{
            backgroundColor: colors.darkBlue,
            ":hover": { backgroundColor: colors.darkBlue },
          }}
          variant="contained"
          autoFocus
        >
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadExcelDialog;
