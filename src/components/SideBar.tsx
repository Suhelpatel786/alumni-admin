import { Box, Icon, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { Menu, Sidebar, MenuItem, sidebarClasses } from "react-pro-sidebar";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaCaretSquareLeft, FaCaretSquareRight } from "react-icons/fa";
import { MdOutlinePeopleAlt, MdEventNote } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";

import { useState } from "react";
import { colors } from "../utils";

const SidebarComponent = () => {
  const location = useLocation();
  // states
  const [collapsed, setCollapsed] = useState<boolean>(false);

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
        style={{ height: "100%", color: "white" }}
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
              <Typography
                sx={{
                  width: "100%",
                  py: "1rem",
                  fontSize: "25px",
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                Admin
              </Typography>
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
                }}
                onClick={() => setCollapsed(!collapsed)}
              >
                <IoCloseSharp />
              </Icon>
            )}
          </Box>
          <MenuItem
            style={{
              fontSize: collapsed ? "22px" : "18px",
              color: location?.pathname == "/" ? "lightgray" : "white",
            }}
            icon={<MdOutlinePeopleAlt />}
            component={<Link to="/" />}
          >
            Alumni List
          </MenuItem>
          <MenuItem
            style={{
              color:
                location?.pathname == "/news-events" ? "lightgray" : "white",
              fontSize: collapsed ? "22px" : "18px",
            }}
            icon={<MdEventNote />}
            component={<Link to="/news-events" />}
          >
            News - Events
          </MenuItem>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SidebarComponent;
