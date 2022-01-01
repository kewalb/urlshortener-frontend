import { Button, Card } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React, { useState, useEffect } from "react";

function UserScreen() {
  const [originalUrl, setoriginalUrl] = useState("");
  const [allUrl, setAllUrl] = useState();
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    fetch("https://urlshortener-backend1.herokuapp.com/urls", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
        user: JSON.parse(localStorage.getItem("user")),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAllUrl(data);
       
      })
      .catch((error) => console.log(error));
  }, []);

  const handleUrlChange = (e) => {
    setoriginalUrl(e.target.value);
  };

  const shorten = () => {
    fetch("https://urlshortener-backend1.herokuapp.com/short", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        originalUrl,
        user: JSON.parse(localStorage.getItem("user")),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setoriginalUrl();
        setMessage(data.message);
        setOpen(true);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Card>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, maxWidth: "100ch" },
          }}
          noValidate
          autoComplete="off"
          style={{ textAlign: "center", margin: 50 }}
        >
          <TextField
            id="outlined-multiline-flexible"
            label="Enter Original URL"
            multiline
            maxRows={6}
            fullWidth
            required
            onChange={handleUrlChange}
          />
          <div>
            <Button
              color="primary"
              variant="contained"
              style={{ marginTop: 20 }}
              onClick={shorten}
            >
              Shorten
            </Button>
          </div>
        </Box>
      </Card>

      {allUrl ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Original URL</TableCell>
                <TableCell align="right">Short URL</TableCell>
                <TableCell align="right">Clicks</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUrl.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.originalUrl}
                  </TableCell>
                  <TableCell align="right">{row.shortUrl}</TableCell>
                  <TableCell align="right">{row.clicks}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        ""
      )}

      {message ? (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
      ) : (
        ""
      )}
    </div>
  );
}

export default UserScreen;
