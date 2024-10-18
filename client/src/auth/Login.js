import {toast} from "react-toastify";
//import {login} from "../actions/auth";
import axios from "axios";
import {useState} from "react";
import LoginForm from "../components/LoginForm";
import {useDispatch} from "react-redux";

function Login({history}) {
  const [email, setEmail] = useState("btraumuller@gmail.com");
  const [password, setPassword] = useState("Dragons1988");
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
      e.preventDefault();
      try{

        // returns and error when you import the axios action. Need to figure out why.
        //let res = await login({email, password});

        let res = await axios.post(`${process.env.REACT_APP_Server_API}/login`, {
          email,
          password
        });

        if (res.data) {
            console.log('Save USER Response IN Redux and Local Storage then redirect');
            //save user and token to local storage
            window.localStorage.setItem('auth', JSON.stringify(res.data));
            dispatch({
              type: "LOGGED_IN_USER",
              payload: res.data
            })
            history.push('/');
        }
        return res;
      }catch (err){
        console.log(err);
        if (err.response.status === 400){
          toast.error(err.response.data);
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