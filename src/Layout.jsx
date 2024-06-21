import { Box } from "@mui/material";
import SidebarComponent from "./components/SideBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <header>
        <SidebarComponent />
      </header>
      <main style={{ width: "100%", minHeight: "100vh" }}>
        <Outlet />
      </main>
    </Box>
  );
};

export default Layout;
