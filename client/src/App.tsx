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
import EditHotel from "./hotels/EditHotel";
import ViewHotel from "./hotels/ViewHotel";
import StripeSuccess from "./stripe/StripeSuccess";
import StripeCancel from "./stripe/StripeCancel";
import SearchResults from "./hotels/SearchResults";
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
          <Route exact path="/hotels/:hotelid" component={ViewHotel} />
          <Route exact path="/search-results" component={SearchResults} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/dashboard/sellers" component={DashboardSeller} />
          <PrivateRoute exact path="/dashboard/sellers" component={DashboardSeller} />
          <PrivateRoute exact path="/hotels/new" component={NewHotel} />
          <PrivateRoute exact path="/hotels/edit/:hotelid" component={EditHotel} />
          <PrivateRoute exact path="/stripe/callback" component={StripeCallback} />
          <PrivateRoute exact path="/stripe/success/:hotelid" component={StripeSuccess} />
          <PrivateRoute exact path="/stripe/cancel" component={StripeCancel} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
