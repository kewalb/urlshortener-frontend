import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(!open);
  };

  const signUp = () => {
      console.log("hi")
    const data = {
      name,
      email,
      password,
    };
    fetch("http://localhost:9000/user/signup", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
          console.log(data)
          if(data.message){
              setMessage(data.message)
              setOpen(true)
          }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
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
        Please fill out the sign up form...
      </Typography>
      <div>
        <TextField
          required
          id="name-required"
          label="Name"
          type="text"
          onChange={handleNameChange}
        />
      </div>
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
        <TextField
          fullWidth
          required
          id="password-required"
          label="Password"
          type="password"
          onChange={handlePasswordChange}
        />
      </div>
      <div>
        <Button
          variant="outlined"
          color="success"
          style={{ textAlign: "center", display: "block", margin: "auto" }}
          onClick={signUp}
        >
          Sign Up
        </Button>
      </div>
      {message ? (
        message === "User created" ? (
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

export default Register;
