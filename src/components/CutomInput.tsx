import { Box, TextField, Typography, styled } from "@mui/material";
import { FC } from "react";

interface CustomInputProps {
  name: string;
  value: any;
  type: string;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: React.FocusEvent<any, Element>) => void;
  error: string | undefined;
  label: string;
  placeholder?: string;
  touched: boolean | undefined;
}

const CustomStyledTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    color: "white",
  },
  "& .MuiInputBase-input": {
    "&::placeholder": {
      color: "white",
      opacity: 1,
    },
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
  "& .MuiInputLabel-root": {
    color: "white",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "white",
  },
});

const CustomInput: FC<CustomInputProps> = ({
  name,
  value,
  type,
  handleBlur,
  handleChange,
  error,
  touched,
  placeholder,
  label,
}) => {
  return (
    <Box sx={{ py: "1rem", width: "100%", color: "white" }}>
      <CustomStyledTextField
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        label={label}
        variant="outlined"
        placeholder={placeholder}
        sx={{
          color: "white",
          width: "100%",
          "::placeholder": { color: "white !important" },
        }}
      />
      {error && touched && (
        <Typography sx={{ color: "red", fontSize: "14px", mt: ".1rem" }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default CustomInput;
