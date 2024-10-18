import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { colors } from "../utils";
import { Box, Button, Typography } from "@mui/material";
import { FileUploader } from "react-drag-drop-files";
import { useState } from "react";
import axios from "axios";

interface UploadExcelDialogProps {
  open: any;
  handleClose: any;
}

const fileTypes = ["csv", "xls", "xlsx"];

const UploadExcelDialog: React.FC<UploadExcelDialogProps> = ({
  open,
  handleClose,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // Handle file change from the drag-drop component
  const handleFileChange = (file: File) => {
    setFile(file); // File is directly passed here
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("details", file);

    setUploading(true);

    try {
      const response = await axios.post(
        "http://localhost:3001/v1/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status == 200) {
        const sendInvitation = await axios.post(
          "http://localhost:3001/v1/sendInvitaion"
        );

        console.log({ sendInvitation });
      }

      console.log("File uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading the file:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleModalClose = () => {
    handleClose();
    setFile(null);
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
        <Box>
          <FileUploader
            onTypeError={(err: any) => console.log(err)}
            handleChange={handleFileChange} // Correct handler
            name="file"
            types={fileTypes}
            multiple={false} // Ensure only one file is uploaded at a time
          />
          <Typography>{file ? file?.name : "No files uploaded yet"}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleUpload}
          sx={{
            backgroundColor: colors.darkBlue,
            ":hover": { backgroundColor: colors.darkBlue },
          }}
          variant="contained"
          autoFocus
          disabled={!file || uploading} // Disable button if no file or during upload
        >
          {uploading ? "Uploading..." : "Upload CSV"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadExcelDialog;
