import * as React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import HttpService from "../../HttpService";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { Stack } from "@mui/system";
import TextField from "@mui/material/TextField";

const BookCard = ({ book }) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [comments, setComments] = React.useState([]);
  const [ratingValue, setRatingValue] = useState("");
  const [hover, setHover] = React.useState();

  const handleCommentClick = () => {
    console.log(comments);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getComments = () => {
    HttpService.get(`/api/v1/review/getReviewByBookId/${book.bookId}`)
      .then((res) => {
        console.log(res.data);
        setComments(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getRatingValue = () => {
    HttpService.get(
      `/api/v1/rating/getAverageRatingOfBookByBookId/${book.bookId}`
    )
      .then((res) => {
        console.log(res.data);
        setRatingValue(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getComments();
    getRatingValue();
  }, []);

  const hoverValue = (event, newHover) => {
    setHover(newHover);
  };

  return (
    <>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardMedia
          component="img"
          sx={{
            // 16:9
            pt: "56.25%",
          }}
          image="/img/book3.png"
          alt="random"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {book.name}
          </Typography>
          <Typography>{book.author}</Typography>
        </CardContent>
        <CardActions>
          <Stack spacing={2} direction="row">
            <Button size="small" onClick={handleCommentClick}>
              Comments
            </Button>
            <Box
              sx={{
                width: 200,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Rating
                name="read-only"
                value={ratingValue}
                readOnly
                precision={0.5}
              />
              {/* {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )} */}
            </Box>
          </Stack>
        </CardActions>
      </Card>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Comments</DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            {comments.map((review) => (
              <DialogContentText>
                <TextField
                  id="outlined-read-only-input"
                  fullWidth
                  label="Comment"
                  defaultValue={review.comment}
                  // value={review.comment}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </DialogContentText>
            ))}
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default BookCard;
