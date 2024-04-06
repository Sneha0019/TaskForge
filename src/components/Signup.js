import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';


const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"", email: "", password:"", cpassword:""});
  let navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();
  const {name, email, password} = credentials;
    const response = await fetch(`https://task-management-system-reactapp-1.onrender.com/api/auth/createuser`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name, email, password}),
      });
      const json = await response.json();
      console.log(json);
      if(json.success){
        //----save the auth token and redirect
        localStorage.setItem("token", json.authToken)  //-->>saved in localstorage
        localStorage.setItem("username", json.username);
        navigate("/");
        props.showAlert("Account created successfully", "success");
      }else{
      props.showAlert("Invalid Details", "danger");
      }
  }

  
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };


  return (
    <div className='container mt-2 my-2' style={{backgroundColor: '#0C2D57', padding: 15, borderRadius:20}}>
      <h2>Create an account</h2>
      <form onSubmit={handleSubmit}>
      <div className="my-3">
    <label htmlFor="name" className="form-label">Username</label>
    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp"/>
  </div>     
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup
