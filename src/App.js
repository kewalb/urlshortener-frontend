import { BrowserRouter, Route, Switch} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import './App.css';
import Register from "./components/Register";
import ResetPassword from "./components/ResetPassword";
import ResetPasswordForm from "./components/ResetPasswordForm";
import UserScreen from "./components/UserScreen";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
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
      <Route path="/user-dashboard">
        <UserScreen />
      </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
