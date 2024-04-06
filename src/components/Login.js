import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Login = (props) => {
const [credentials, setCredentials] = useState({email: "", password:""});
let navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const response = await fetch(`https://task-management-system-reactapp-1.onrender.com/api/auth/login`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email: credentials.email, password: credentials.password}),
      });
      const json = await response.json();
     


      if(json.success){
      let name = json.username;
    console.log(`name is ${name}`);
    if (name) {
      localStorage.setItem('username', name)
      console.log(`set succesfully.. ${name}`);
    }
        //----save the auth token and redirect
        localStorage.setItem("token", json.authToken)  //-->>saved in localstorage
        props.showAlert("loggged in successfully", "success");
        navigate("/");
      }else{
        props.showAlert("Invalid credentials", "danger");
      }
  }

  
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  };

  // useEffect(() => {
  //   console.log(` use effect ${username}`); // This will log the updated value of username whenever it changes
  // }, [username]); // Run this effect whenever username changes



  return (
    <div className='mt-3' style={{backgroundColor:'#0C2D57', padding:15, borderRadius: 20 }}>
      <h2>Login to Continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" value={credentials.passowrd} onChange={onChange}/>
          </div>
          <button type="submit" className="btn btn-primary" >Submit</button>
     </form>
 </div>
  )
}

export default Login

