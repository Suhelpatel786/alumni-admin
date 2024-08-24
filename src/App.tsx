import { Box } from "@mui/material";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./Layout.jsx";
import LoginComponent from "./components/LoginComponent.js";
import AdminList from "./pages/admin/AdminList";
import PrivateRoute from "./components/PrivateRoute"; // Import the PrivateRoute component
import AlumniList from "./pages/alumni-list/AlumniList.js";
import NewsAndEvents from "./pages/news/News.js";
import Event from "./pages/events/Event.js";
import { useEffect } from "react";

function App() {
  const location = useLocation();

  return (
    <Box sx={{ height: "100vh" }}>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<AlumniList />} />
          <Route path="news" element={<NewsAndEvents />} />
          <Route path="event" element={<Event />} />
          <Route path="admin" element={<AdminList />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
