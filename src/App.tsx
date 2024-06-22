import "./App.css";
import { Box, Typography } from "@mui/material";
import { News, AlumniList, Event } from "./pages";
import { Route, Routes } from "react-router-dom";
import SidebarComponent from "./components/SideBar";
import Layout from "./Layout.jsx";
import LoginComponent from "./components/LoginComponent.js";

function App() {
  return (
    <Box sx={{ height: "100vh" }}>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<AlumniList />} />
          <Route path="/news" element={<News />} />
          <Route path="/event" element={<Event />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
