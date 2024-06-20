import { Box } from "@mui/material";
import SidebarComponent from "./components/SideBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <header>
        <SidebarComponent />
      </header>
      <main>
        <Outlet />
      </main>
    </Box>
  );
};

export default Layout;
