import React from 'react'
import {Link,  useLocation, useNavigate} from "react-router-dom";



const Navbar = () => {
  let location = useLocation();
  let navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleLogout = () =>{
    localStorage.removeItem('username');
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: '#0C2D57'}}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">iNotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"? "active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"? "active":""}`} to="/about">About</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/contact"? "active":""}`} to="/contact">Contact</Link>
        </li>
      </ul>
      {!localStorage.getItem("token")? (<form className="d-flex">
      <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
      <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
      </form>) :(
        <>
        <div className="d-flex align-items-center">
        {console.log(`local storage ${localStorage.getItem("username")}`)}
      {username && <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link active`} aria-current="page" to="/">{username}</Link>
        </li>
        </ul>}
        </div>
      <button onClick={handleLogout} className='btn btn-primary'>Logout</button>
      
      </>
      )}
    </div>
  </div>
</nav>
      
    </div>
  )
}

export default Navbar
