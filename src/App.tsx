import "./App.css";
import { Box, Typography } from "@mui/material";
import { NewsAndEvents, AlumniList } from "./pages";
import { Route, Routes } from "react-router-dom";
import SidebarComponent from "./components/SideBar";
import Layout from "./Layout.jsx";

function App() {
  return (
    <Box sx={{ height: "100vh" }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<AlumniList />} />
          <Route path="/news-events" element={<NewsAndEvents />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
