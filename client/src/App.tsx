import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {ToastContainer} from "react-toastify";

//Route only accessible to authenticated users  
import PrivateRoute from "./components/PrivateRoute";

import Home from "./booking/Home";
import NewHotel from "./hotels/NewHotel";
import Login from "./auth/Login";
import Register from "./auth/Register";
import TopNav from "./components/TopNav";
import Dashboard from "./user/Dashboard";
import DashboardSeller from "./user/DashboardSeller";
import StripeCallback from "./stripe/StripeCallback";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
        <TopNav />
        <ToastContainer position="top-center" />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/dashboard/sellers" component={DashboardSeller} />
          <PrivateRoute exact path="/dashboard/sellers" component={DashboardSeller} />
          <PrivateRoute exact path="/hotels/new" component={NewHotel} />
          <PrivateRoute exact path="/stripe/callback" component={StripeCallback} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
