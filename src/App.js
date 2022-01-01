import { BrowserRouter, Route, Switch} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import './App.css';
import Register from "./components/Register";
import ResetPassword from "./components/ResetPassword";
import ResetPasswordForm from "./components/ResetPasswordForm";
import UserScreen from "./components/UserScreen";
import LogininNavbar from "./components/LogininNavbar"
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState();
  const [jwt, setJwt] = useState()

  useEffect(() => {
      setUser(localStorage.getItem('user'))
      setJwt(localStorage.getItem('jwt')
      )
  }, [])
  

  return (
    <BrowserRouter>
      { !(user && jwt) ? <Navbar /> : <LogininNavbar />}
      <Switch>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/reset-password">
        <ResetPassword />
      </Route>
      <Route path="/reset-password-form/:token">
        <ResetPasswordForm />
      </Route>
      <Route path="/user-dashboard/:user">
        <UserScreen />
      </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
