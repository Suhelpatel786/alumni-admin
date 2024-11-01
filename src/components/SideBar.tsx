import { Box, Button, Icon, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Sidebar, MenuItem, sidebarClasses } from "react-pro-sidebar";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaCaretSquareLeft, FaCaretSquareRight } from "react-icons/fa";
import {
  MdNewspaper,
  MdOutlinePeopleAlt,
  MdEventNote,
  MdOutlineAdminPanelSettings,
  MdLogout,
} from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { useState } from "react";
import { colors } from "../utils";

const SidebarComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // states
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const adminDatails: any = localStorage.getItem("admin");
  const adminData: any = JSON.parse(adminDatails);

  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        height: "100vh",
        top: 0,
        bottom: 0,
        zIndex: 10000,
      }}
    >
      <Sidebar
        collapsed={collapsed}
        backgroundColor={colors.darkBlue}
        style={{ height: "100%", color: "white", position: "relative" }}
      >
        <Menu>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              px: ".9rem",
            }}
          >
            {collapsed && (
              <Icon
                sx={{
                  width: collapsed ? "100%" : "fitContent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontWeight: "900",
                  fontSize: "25px",
                  my: collapsed ? "1rem" : "0",
                }}
                onClick={() => setCollapsed(!collapsed)}
              >
                <RxHamburgerMenu />
              </Icon>
            )}

            {!collapsed && (
              <img
                src="/assets/logo.jpg"
                width={"200px"}
                style={{ marginTop: "1rem", marginBottom: "1rem" }}
                alt="clg logo"
              />
            )}

            {!collapsed && (
              <Icon
                sx={{
                  width: collapsed ? "100%" : "fitContent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontWeight: "400",
                  fontSize: "30px",
                  my: collapsed ? "1rem" : "0",
                  mt: "-6.5rem",
                  ml: ".2rem",
                }}
                onClick={() => setCollapsed(!collapsed)}
              >
                <IoCloseSharp />
              </Icon>
            )}
          </Box>
          <MenuItem
            style={{
              color: location?.pathname == "/admin" ? "white" : "lightgray",
              fontSize: collapsed ? "22px" : "18px",
            }}
            icon={<MdOutlineAdminPanelSettings />}
            component={<Link to="/admin" />}
          >
            Admin List
          </MenuItem>

          <MenuItem
            style={{
              fontSize: collapsed ? "22px" : "18px",
              color: location?.pathname == "/" ? "white" : "lightgray",
            }}
            icon={<MdOutlinePeopleAlt />}
            component={<Link to="/" />}
          >
            Alumni List
          </MenuItem>
          <MenuItem
            style={{
              color: location?.pathname == "/news" ? "white" : "lightgray",
              fontSize: collapsed ? "22px" : "18px",
            }}
            icon={<MdNewspaper />}
            component={<Link to="/news" />}
          >
            News
          </MenuItem>
          <MenuItem
            style={{
              color: location?.pathname == "/event" ? "white" : "lightgray",
              fontSize: collapsed ? "22px" : "18px",
            }}
            icon={<FaCalendarAlt />}
            component={<Link to="/event" />}
          >
            Events
          </MenuItem>
        </Menu>

        <Box sx={{ position: "absolute", bottom: 5 }}>
          {!collapsed && (
            <Typography sx={{ mb: "1rem", ml: "1rem" }}>
              {adminData?.email}
            </Typography>
          )}
          {!collapsed ? (
            <Button
              variant="contained"
              sx={{
                backgroundColor: "white",
                color: colors.darkBlue,
                mx: "4rem",
                ":hover": {
                  backgroundColor: "white",
                  color: colors.darkBlue,
                },
              }}
              onClick={() => {
                localStorage.removeItem("login");
                localStorage.removeItem("access-token");
                navigate("/login");
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{
                backgroundColor: "white",
                p: ".1rem",
                mx: ".3rem",
                fontSize: "12px",
                color: colors.darkBlue,
                ":hover": {
                  backgroundColor: "white",
                  color: colors.darkBlue,
                },
              }}
              onClick={() => {
                localStorage.removeItem("login");
                localStorage.removeItem("access-token");
                navigate("/login");
              }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Sidebar>
    </Box>
  );
};

export default SidebarComponent;
