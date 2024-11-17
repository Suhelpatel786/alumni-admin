import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";
import {
  FaUsers,
  FaUserCircle,
  FaNewspaper,
  FaCalendarAlt,
  FaUserTie,
} from "react-icons/fa";
import axios, { AxiosResponse } from "axios";

const Dashboard = () => {
  const [getLoginAlumniCount, setGetLoginALumniCount] = useState<number | any>(
    0
  );

  const [getSignUpAlumniCount, setSignUpAlumniCount] = useState<number | any>(
    0
  );

  const [getAllEventsCount, setGetAllEventsCount] = useState<number | any>(0);

  const [getAllNewsCount, setGetAllNewsCount] = useState<number | any>(0);

  const [getAllSubAdminCount, setAllSubAdminCount] = useState<number | any>(0);

  // Loading states
  const [loading, setLoading] = useState({
    signUpAlumni: true,
    loginAlumni: true,
    events: true,
    news: true,
    subAdmin: true,
  });

  //set data
  const stats = [
    {
      title: "Users Logged In",
      value: getLoginAlumniCount,
      isLoading: loading.loginAlumni,
      icon: <FaUsers size={40} color="#0066c4" />,
    },
    {
      title: "Profiles Created",
      value: getSignUpAlumniCount,
      isLoading: loading.signUpAlumni,
      icon: <FaUserCircle size={40} color="#0066c4" />,
    },
    {
      title: "News Available",
      value: getAllNewsCount,
      isLoading: loading.news,
      icon: <FaNewspaper size={40} color="#0066c4" />,
    },
    {
      title: "Active Events",
      value: getAllEventsCount,
      isLoading: loading.events,
      icon: <FaCalendarAlt size={40} color="#0066c4" />,
    },
    {
      title: "Total SUB-ADMIN",
      value: getAllSubAdminCount,
      isLoading: loading.subAdmin,
      icon: <FaUserTie size={40} color="#0066c4" />,
    },
  ];

  //get signInAlumni details
  const getSignInAlumniDetails = async () => {
    try {
      const response: AxiosResponse | any = await axios.get(
        "http://localhost:3001/dashboard/singAlumni"
      );

      setSignUpAlumniCount(response?.data?.data?.length);
    } catch (e) {
      console.log("DASHBOARD-SignInAlumni API error", e);
    } finally {
      setLoading((prev) => ({ ...prev, signUpAlumni: false }));
    }
  };

  const getLoginAlumniDetails = async () => {
    try {
      const response: AxiosResponse | any = await axios.get(
        "http://localhost:3001/dashboard/pendingAlumni"
      );
      setGetLoginALumniCount(response?.data?.data?.length);
    } catch (e) {
      console.log("DASHBOAD-LoginAlumni API error", e);
    } finally {
      setLoading((prev) => ({ ...prev, loginAlumni: false }));
    }
  };

  const getTotalEventDetail = async () => {
    try {
      const response: AxiosResponse | any = await axios.get(
        "http://localhost:3001/dashboard/allEvent"
      );

      setGetAllEventsCount(response?.data?.data?.length);
    } catch (e) {
      console.log("DASHBOAD-Event API error", e);
    } finally {
      setLoading((prev) => ({ ...prev, events: false }));
    }
  };

  const getTotalNewsDetail = async () => {
    try {
      const response: AxiosResponse | any = await axios.get(
        "http://localhost:3001/dashboard/allNEWS"
      );

      setGetAllNewsCount(response?.data?.data?.length);
    } catch (e) {
      console.log("DASHBOAD-NEWS API error", e);
    } finally {
      setLoading((prev) => ({ ...prev, news: false }));
    }
  };

  const getTotalSubAdmin = async () => {
    try {
      const response: AxiosResponse | any = await axios.get(
        "http://localhost:3001/dashboard/subAdmin"
      );

      setAllSubAdminCount(response?.data?.data?.length);
    } catch (e) {
      console.log("DASHBOAD-TOTAL SUB-ADMIN API error", e);
    } finally {
      setLoading((prev) => ({ ...prev, subAdmin: false }));
    }
  };

  useEffect(() => {
    getLoginAlumniDetails();
    getSignInAlumniDetails();
    getTotalEventDetail();
    getTotalNewsDetail();
    getTotalSubAdmin();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#f1f1f1", // mainWhiteBackGrounColor
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      {/* <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#0E1725", // textColor
          marginBottom: "2rem",
          textAlign: "center",
        }}
      >
        Dashboard Overview
      </Typography> */}

      <Grid
        container
        spacing={3}
        sx={{
          justifyContent: "center", // Center the grid for better alignment on larger screens
        }}
      >
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={2.4} key={index}>
            <StatCard>
              <Box sx={{ marginBottom: "1rem" }}>{stat.icon}</Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  color: "#004688", // darkBlue
                }}
              >
                {stat.title}
              </Typography>
              {stat.isLoading ? (
                <CircularProgress size={30} sx={{ marginTop: "0.5rem" }} />
              ) : (
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    color: "#0066c4", // lightBlueColor
                    marginTop: "0.5rem",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  {stat.value}
                </Typography>
              )}
            </StatCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

// Styled component for the statistic cards
const StatCard = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
  padding: "1.5rem",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  border: `1px solid #f0f0f0`, // borderColor
  transition: "transform 0.4s ease, box-shadow 0.4s ease",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  },
}));

export default Dashboard;
