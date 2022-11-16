import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import HttpService from "../../HttpService";
import UserContext from "../../Utill/UserContext";
//import RadioBox from "../../components/RadioBox/Title";

const theme = createTheme();

export default function Account({ changeStep, step }) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [userDetails, setUserDetails] = useState({
    userID: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleChange = (prop) => (event) => {
    setUserDetails({ ...userDetails, [prop]: event.target.value });
    // if (prop === 'birthday') {
    //   setUserDetails({ ...userDetails, [prop]: event })
    // } else if (prop === 'address') {
    //   setUserDetails({ ...userDetails, [prop]: event })
    //   alert(':Asd')
    // } else {
    //   setUserDetails({ ...userDetails, [prop]: event.target.value })
    // }
  };
  const updateUser = async () => {
    HttpService.post(`/api/v1/users/update/${user.userID}`, userDetails)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserDetails = async () => {
    await HttpService.get(`/api/v1/users/getUserById?user_Id=${user.userID}`)
      .then((res) => {
        console.log(res);
        let currentuser = res.data.message;
        setUserDetails({
          userId: currentuser?.userId || "",
          firstName: currentuser?.firstName || "",
          lastName: currentuser?.lastName || "",
          email: currentuser?.email || "",
        });
        console.log(currentuser);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <Box>
      <Typography component="h1" variant="h5">
        Update Account details
      </Typography>
      <Box>
        <Grid container spacing={2}>
          {/* <Grid item xs={12} sm={12}>
            <RadioBox handleChange={handleChange} userDetails={userDetails} />
          </Grid> */}
          <Grid item xs={12} sm={6}>
            <TextField
              required={true}
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="family-name"
              value={userDetails.firstName}
              onChange={handleChange("firstName")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required={true}
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              value={userDetails.lastName}
              onChange={handleChange("lastName")}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required={true}
              fullWidth
              name="email"
              label="Email"
              type="email"
              id="email"
              autoComplete="email"
              value={userDetails.email}
              disabled={true}
              onChange={handleChange("email")}
            />
          </Grid>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {
                  navigate("/");
                }}
              >
                Discard changes
              </Button>
            </Grid>
            <Grid item>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {
                  updateUser();
                }}
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
