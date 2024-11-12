import {useState} from "react";
import RegisterForm from "../components/forms/RegisterForm";
import {toast} from "react-toastify";
import { register } from "../actions/auth";
function Register({history}:any) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: { preventDefault: () => void; }) =>{
      e.preventDefault();

      try{

        const response:any = await register({
          name,
          email,
          password
        });
        
        console.log("RESPONSE REGISTER", response.json());
        toast.success("Register successful. Please login");
        history.push("/login");
      }catch (err:any){
        if (err.response.status === 400){
          toast.error(err.response.data);
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