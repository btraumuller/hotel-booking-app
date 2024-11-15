import {useState} from "react";
import { useHistory } from "react-router-dom";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {login} from "../actions/auth";
import { LoginApiResponse } from "../types/auth";
import LoginForm from "../components/forms/LoginForm";

function Login() {
  
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    
    e.preventDefault();
    
    try{
    
      let res = await login({email, password}) as LoginApiResponse;

      if (res.data) {

          //save user and token to local storage
          window.localStorage.setItem('auth', JSON.stringify(res.data));
          
          //save user and token to redux
          dispatch({
            type: "LOGGED_IN_USER",
            payload: res.data
          })

          history.push('/dashboard/sellers');
          
      }else{
        throw new Error('Login Failed');
      }
    
      return res;

    }catch (err:any){
    
      console.log(err);

      if (err.response.status === 400){
        toast.error(err.response.data);
        return undefined;
      }
    }
  }

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
          <h1>Login</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <LoginForm 
              email={email}
              setEmail={setEmail} 
              password={password}
              setPassword={setPassword} 
              handleSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </>
    
  );
}
  
  export default Login;