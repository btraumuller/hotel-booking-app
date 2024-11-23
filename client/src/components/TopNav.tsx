import { useDispatch } from "react-redux";
import {Link} from "react-router-dom";
import { useAuth } from "../selectors/auth";
const TopNav = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const logout = () =>{
    dispatch({
      type: "LOGOUT",
      payload: null
    });
    window.localStorage.removeItem("auth");
  }
  return(
    <div className="bg-light">
      <div className="nav container-xxl bg-light d-flex justify-content-between">
        <Link className="nav-link" to="/">Home</Link>
          {!auth ?(
              <>
                <Link className="nav-link" to="/login">Login</Link>
                <Link className="nav-link" to="/register">Register</Link>
              </>
            ):(
              <>
                <Link className="nav-link" to="/dashboard/sellers">Dashboard</Link>
                <Link className="nav-link" onClick={logout} to="/login">Logout</Link>
              </>
            )
          }
      </div>
    </div>
  )
};

  export default TopNav;