import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import {useHistory, useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

function ResetPasswordForm() {
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [message, setMessage] = useState('')
  const [open, setOpen] = useState(false);

  const{ token} = useParams();
  console.log(token)
  const history = useHistory();

  

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(!open);
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const changePassword = () => {
    if (newPassword !== confirmPassword) {
      setMessage("Entered password did not match");
    } else {
      const data = { password: newPassword, token };
      fetch("http://localhost:9000/user/new-password", {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json()).then(data => {
            if(data.message){
                setMessage(data.message)
                setOpen(true);
                setInterval(()=>history.push('/login'), 4000)
            }
        })
        .catch((error) => console.log(error));
    }
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
        Reset your password...
      </Typography>

      <div>
        <TextField
          onChange={handlePasswordChange}
          required
          id="old-password-required"
          label="New password"
          type="password"
        />
      </div>
      <div>
        <TextField
          fullWidth
          required
          id="confirm-password-required"
          label="Confirm password"
          type="password"
          onChange={handleConfirmChange}
        />
      </div>
      <div>
        <Button
          variant="outlined"
          color="success"
          style={{ textAlign: "center", display: "block", margin: "auto" }}
          onClick={changePassword}
        >
          Change password
        </Button>
      </div>
      {message ? (
        message === "password updated success" ? (
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

export default ResetPasswordForm;