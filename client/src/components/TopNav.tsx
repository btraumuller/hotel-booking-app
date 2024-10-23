import {Link} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const TopNav = () => {
  const {auth} = useSelector((state:any) => ({...state}));
  const dispatch = useDispatch();
  const logout = () =>{
    dispatch({
      type: "LOGOUT",
      payload: null
    });
    window.localStorage.removeItem("auth");
  }
  return(
    <div className="nav bg-light d-flex justify-content-between">
      <Link className="nav-link" to="/">Home</Link>
      {!auth && (
        <>
          <Link className="nav-link" to="/login">Login</Link>
          <Link className="nav-link" to="/register">Register</Link>
        </>
      )}
      {auth &&(
        <>
          <Link className="nav-link" onClick={logout} to="/login">Logout</Link>
        </>
      )}
    </div>
  )
};

  export default TopNav;