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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const theme = createTheme();

export default function Account({ changeStep, step }) {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [type, setType] = useState("");

  const handleBookNameChange = (event, newValue) => {
    setBookName(event.target.value);
  };

  const handleAuthorChange = (event, newValue) => {
    setAuthor(event.target.value);
  };

//   const handleTypeChange = (event, newValue) => {
//     setType(event.target.value);
//   };

  const handleTypeChange = (event, newValue) => {
    console.log(newValue.props.value);
    setType(newValue.props.value);
  };

  //   const handleChange = (prop) => (event) => {
  //     setBookDetails({ ...bookDetails, [prop]: event.target.value });
  //   };
  const addBook = async () => {
    var bookDetails = {
      name: bookName,
      author: author,
      type: type,
    };
    HttpService.post("/api/v1/books", bookDetails)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box>
      <Typography component="h1" variant="h5">
        Add New Book
      </Typography>
      <div style={{height : 20}} />
      <Box>
        <Grid container spacing={2}>
          {/* <Grid item xs={12} sm={12}>
            <RadioBox handleChange={handleChange} userDetails={userDetails} />
          </Grid> */}

          <Grid item xs={12} sm={6}>
            <TextField
              required={true}
              fullWidth
              id="bookName"
              label="Book Name"
              name="bookName"
              value={bookName}
              onChange={handleBookNameChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required={true}
              fullWidth
              id="author"
              label="Author"
              name="author"
              value={author}
              onChange={handleAuthorChange}
            />
          </Grid>
          <Grid item xs={12}>
            {/* <TextField
              required={true}
              fullWidth
              id="type"
              label="Type"
              name="type"
              value={type}
              onChange={handleTypeChange}
            /> */}
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="Type"
              fullWidth
              onChange={handleTypeChange}
            >
              <MenuItem value={"FAIRY_TALES"}>Fairy Tales</MenuItem>
              <MenuItem value={"FANTASY"}>Fantasy</MenuItem>
              {/* <MenuItem value={"PENDING"}>PENDING</MenuItem> */}
            </Select>
          </Grid>

          <Grid container justifyContent="space-between">
            <Grid item>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {
                  window.location.reload();
                }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {
                  addBook();
                }}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
