import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BookCard from "../../components/BookCard/BookCard";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import HttpService from "../../HttpService";
import AppBar from "../../components/AppBar/AppBar";

// function Copyright() {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center">
//       {"Copyright © "}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

function Home() {
  const [books, setBooks] = useState([]);
  const [selectBook, setSelectBook] = useState();
  const [searchBook, setSearchBook] = useState({});
  const [isSearch, setIsSearch] = useState(true);
  useEffect(() => {
    getBookNames();
  }, []);
  const getBookNames = () => {
    let bookArray = [];

    HttpService.get("/api/v1/books")
      .then((res) => {
        console.log(res.data);
        for (let index = 0; index < 9; index++) {
          bookArray[index] = res.data[index];
        }
        // res.data.map((row) =>
        //   bookArray.push({ label: row.name, value: row.bookId })
        // );
        console.log(bookArray);
        setBooks(bookArray);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleBookSelect = (event, newValue) => {
    console.log(newValue);
    setSelectBook(newValue.label);
  };

  const handleClickSearch = () => {
    console.log(selectBook);
    HttpService.get(`/api/v1/books/getBooksByName/?book_name=${selectBook}`)
      .then((res) => {
        console.log(res.data);
        setSearchBook(res.data);
        console.log(isSearch);
        setIsSearch(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <AppBar /> */}
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Let's Find A Book
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Something short and leading about the collection below—its
              contents, the creator, etc. Make it short and sweet, but not too
              short so folks don&apos;t simply skip over it entirely.
            </Typography>
          </Container>
        </Box>

        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}

          {/* {isSearch === "true" ? <BookCard searchBook={searchBook} /> : <></>} */}

          <Grid container spacing={4}>
            {books !== undefined ? (
              books.map((book) => (
                <>
                  {book !== undefined ? (
                    <Grid item key={book.bookId} xs={12} sm={6} md={4}>
                      <BookCard book={book} />
                    </Grid>
                  ) : (
                    <></>
                  )}
                </>
              ))
            ) : (
              <></>
            )}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        {/* <Copyright /> */}
      </Box>
    </ThemeProvider>
  );
}
export default Home;
