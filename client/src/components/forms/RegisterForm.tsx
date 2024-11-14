
import { registerProps } from "../../types/auth";

function RegisterForm({handleSubmit, name, setName, email, setEmail, password, setPassword}:registerProps){
    
    return(
        <form onSubmit={handleSubmit} className="mt-3">
        <div className="form-group mb-3">
          <label htmlFor="name" className="form-label">Your Name</label>
          <input 
            id="name" 
            name="name" 
            type="text" 
            className="form-control" 
            placeholder="Enter Name" 
            value={name} 
            onChange={e => setName(e.target.value)} />

        </div>
        <div className="form-group mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            id="email" 
            name="email" 
            type="email" 
            className="form-control" 
            placeholder="Enter email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} />

        </div>
        <div className="form-group mb-3">
          <label htmlFor="email" className="form-label">Password</label>
          <input 
            id="password" 
            name="password" 
            type="password" 
            className="form-control" 
            placeholder="Enter password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} />
            
        </div>
        <button disabled={!email || !password || !name} className="btn btn-primary">Register</button>
      </form>
    )
}
export default RegisterForm;