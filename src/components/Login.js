import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useHistory } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const history = useHistory()



  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const login = () => {
    if (
      !/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      setMessage("Invalid Email");
      setOpen(true);
      return;
    }
    fetch("http://localhost:9000/user/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message) {
          //   M.toast({ html: data.message, classes: "#c62828 red darken-3" });
          setMessage(data.message);
          setOpen(true);
        } else {
          localStorage.setItem("jwt", data.jwtToken);
          localStorage.setItem("user", JSON.stringify(data.name));
          //   M.toast({
          //     html: "Login Successful",
          //     classes: "#43a047 green darken-1",
          //   });
          setMessage("Login Successful");
          //   history.push("/");
          setOpen(true);
          setTimeout(() => history.push(`user-dashboard/${data.name}`), 2000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 2, width: "50ch" },
      }}
      noValidate
      autoComplete="off"
      style={{ textAlign: "center" }}
    >
      <Typography variant="h4" style={{ textAlign: "center", margin: 25 }}>
        Login
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
          onClick={login}
        >
          Login
        </Button>
      </div>
      <div style={{ marginTop: 20 }}>
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to="/reset-password"
        >
          Forget Password?
        </Link>
      </div>
      <div style={{ marginTop: 20 }}>
        <Typography>
          Don't have an account yet?{" "}
          <Link
            style={{ textDecoration: "none", color: "blue" }}
            to="/reset-password"
          >
            Sign Up
          </Link>
        </Typography>
      </div>
      {message ? (
        message === "Login Successful" ? (
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

export default Login;
