import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useHistory } from "react-router-dom";

function ResetPassword() {
  const [email, setEmail] = useState();
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const history = useHistory()

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(!open);
  };

  const resetPassword = () => {
    if (!email) {
      alert("enter your email");
    } else {
      const data = { email };
      fetch("https://urlshortener-backend1.herokuapp.com/user/forgot-password", {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            setMessage(data.message);
            setOpen(true);
            // history.push('/login')
            setInterval(()=>history.push('/login'), 4000)
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 2, width: "65ch" },
      }}
      noValidate
      autoComplete="off"
      style={{ textAlign: "center" }}
    >
      <Typography variant="h4" style={{ textAlign: "center", margin: 25 }}>
        Please Enter your Email to reset your password...
      </Typography>
      <div>
        <TextField
          onChange={handleEmailChange}
          required
          id="email-required"
          label="Email"
          type="email"
        />
      </div>
      <div>
        <Button
          variant="outlined"
          color="success"
          style={{ textAlign: "center", display: "block", margin: "auto" }}
          onClick={resetPassword}
        >
          Submit
        </Button>
      </div>
      {message ? (
        message === "Email Sent" ? (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              {message}
            </Alert>
          </Snackbar>
        ) : (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {message}
            </Alert>
          </Snackbar>
        )
      ) : (
        ""
      )}
    </Box>
  );
}

export default ResetPassword;
