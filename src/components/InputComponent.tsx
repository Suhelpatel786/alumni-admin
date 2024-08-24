import {
  Theme,
  ThemeProvider,
  createTheme,
  useTheme,
} from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { FormControl, Typography } from "@mui/material";
import { colors } from "../utils";
export const customTheme = (outerTheme: Theme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "--TextField-brandBorderColor": colors.darkBlue,
            "--TextField-brandBorderHoverColor": colors.darkBlue,
            "--TextField-brandBorderFocusedColor": colors.darkBlue,
            "& label.Mui-focused": {
              color: colors.darkBlue,
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: "var(--TextField-brandBorderColor)",
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderHoverColor)",
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
    },
  });

//props
interface InputComponentProps {
  type: string;
  label: string;
  handleChange: any;
  error?: string;
  name: string;
  placeholder: string;
  value: any;
  isError?: string;
  color?: string;
  disabledInput?: boolean;
  handleBlur?: any;
}
const InputComponent = ({
  label,
  type,
  handleChange,
  error,
  name,
  value,
  isError,
  placeholder,
  disabledInput,
  color,
  handleBlur,
}: InputComponentProps) => {
  const outerTheme = useTheme();

  return (
    <Box sx={{ width: "100%" }}>
      <ThemeProvider theme={customTheme(outerTheme)}>
        <TextField
          type={type}
          label={label}
          onChange={handleChange}
          onBlur={handleBlur}
          value={value || ""}
          placeholder={placeholder}
          name={name}
          disabled={disabledInput}
          sx={{
            width: "100%",
            color: color,
          }}
        />

        {error && error != "" && (
          <Typography
            fontSize={"12px"}
            sx={{ mt: "0.4rem" }}
            color={"red"}
            textAlign={"left"}
          >
            {error}
          </Typography>
        )}
      </ThemeProvider>
    </Box>
  );
};

export default InputComponent;
