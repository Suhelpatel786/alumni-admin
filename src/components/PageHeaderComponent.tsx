import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { colors } from "../utils";
interface PageHeaderComponentProps {
  title: string;
}

const PageHeaderComponent: FC<PageHeaderComponentProps> = ({ title }) => {
  return (
    <Box sx={{ p: "2rem", pt: "1rem" }}>
      <Typography
        sx={{ fontSize: "28px", fontWeight: "600", color: colors.darkBlue }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default PageHeaderComponent;
