type loginProps = {
    email: string,
    setEmail: (email:string) => void,
    password: string,
    setPassword: (password:string) => void,
    handleSubmit: (e:any) => void
}

function LoginForm({handleSubmit, email, setEmail, password, setPassword}:loginProps){
    
    return(
        <form onSubmit={handleSubmit} className="mt-3">
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
        <button disabled={!email || !password} className="btn btn-primary">Log In</button>
      </form>
    )
}
export default LoginForm;