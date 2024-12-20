import {useState} from "react";
import { useHistory } from "react-router-dom";
import {toast} from "react-toastify";
import { register } from "../actions/auth";
import RegisterForm from "../components/forms/RegisterForm";

function Register() {
  
    const history = useHistory();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = async (e: { preventDefault: () => void; }) =>{
      
      e.preventDefault();

      try{
        
        const res = await register({
          name,
          email,
          password
        });

        if (!res){
          throw new Error("Register failed");
        }
        
        console.log("RESPONSE REGISTER", res);

        toast.success("Register successful. Please login");

        history.push("/login");

      }catch (error:any){
        if (error.response.status === 400){
          toast.error(error.response.data);
          return undefined;
        }
      }
    }
    return (
      <>
        <div className="container-fluid bg-secondary p-5 text-center">
          <h1>Register</h1>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <RegisterForm 
                handleSubmit={handleSubmit} 
                name={name} 
                setName={setName} 
                email={email} 
                setEmail={setEmail} 
                password={password} 
                setPassword={setPassword} />
            </div>
          </div>
        </div>
      </>
      
    );
  }
  
  export default Register;