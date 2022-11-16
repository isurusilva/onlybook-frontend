import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BookCard from "./component/BookCard";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import HttpService from "../../HttpService";
import AppBar from "../../components/AppBar/AppBar";

const theme = createTheme();

function Search() {
  const [books, setBooks] = useState([]);
  const [selectBook, setSelectBook] = useState();
  const [searchBookId, setSearchBookId] = useState("");
  const [searchBook, setSearchBook] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  useEffect(() => {
    getBookNames();
  }, []);
  const getBookNames = () => {
    const bookArray = [];

    HttpService.get("/api/v1/books")
      .then((res) => {
        console.log(res.data);
        res.data.map((row) =>
          bookArray.push({ label: row.name, value: row.bookId })
        );

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
        console.log(res.data.bookId);
        setSearchBookId(res.data.bookId);
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
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={books}
                onChange={handleBookSelect}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Books" color="secondary" />
                )}
              />
              <Button variant="contained" onClick={handleClickSearch}>
                Search
              </Button>
            </Stack>
          </Container>
        </Box>
        {/* {console.log(searchBookId)} */}
        {searchBookId !== "" ? (
          <Container sx={{ py: 8 }} maxWidth="lg">
            {/* End hero unit */}

            <Grid container spacing={4}>
              <Grid item key={searchBook.bookId} xs={12} sm={6} md={4}>
                <BookCard book={searchBook} />
              </Grid>
            </Grid>
          </Container>
        ) : (
          <></>
        )}
        {/* {isSearch === "true" ? (
          <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12} md={12}>
                <BookCard />
              </Grid>
            </Grid>
          </Container>
        ) : (
          <></>
        )} */}
      </main>
    </ThemeProvider>
  );
}
export default Search;
