import { BrowserRouter, Route, Switch} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
      {/* <Route path="/signUp">
        <Signup />
      </Route> */}
      <Route path="/login">
        <Login />
      </Route>
      {/* <Route path="/reset-password">
        <ResetPassword />
      </Route>
      <Route path="/reset-password-form/:token">
        <ResetPasswordForm />
      </Route> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
