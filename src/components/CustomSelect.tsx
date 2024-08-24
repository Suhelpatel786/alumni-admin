import { FC } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { MdKeyboardArrowDown } from "react-icons/md";
import { colors } from "../utils";
interface CustomSelectProps {
  placeholder: string;
  options: any[];
  name: string;
  width: string;
  value: any;
  handleChange: any;
  setFieldValue: any;
}
const CustomSelect: FC<CustomSelectProps> = ({
  placeholder,
  options,
  width,
  name,
  value,
  handleChange,
  setFieldValue,
}) => {
  return (
    <Select
      labelId="demo-simple-select-label"
      name={name}
      value={value || ""}
      onChange={(e, val) => {
        setFieldValue(name, {
          label: e?.target?.value,
          value: e?.target?.value,
        });
      }}
      placeholder={placeholder}
      sx={{
        color: colors.textColor,
        backgroundColor: "transparent",
        border: `1px solid ${colors.darkBlue}`,
        width: { xs: 280, sm: width },
      }}
    >
      {options?.map((option, index) => (
        <MenuItem value={option?.value} key={index}>
          {option?.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default CustomSelect;
