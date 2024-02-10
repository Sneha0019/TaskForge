import "./App.css";
import NoteState from "./context/notes/NoteState";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import React, { useState } from "react";
import ContactUs from "./components/ContactUs";


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";




function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type:type,
    });
    setTimeout(()=>{
      setAlert(null);
    }, 1500)
  };


  return (
    <>
    <NoteState>
      <BrowserRouter>
       
        <Navbar />
        <Alert alert={alert}/>
        <div className="container">
        <Routes>
        <Route exact path="/" element={<Home showAlert={showAlert}/>} />
        <Route exact path="/about" element={<About/>} />
        <Route exact path="/contact" element={<ContactUs showAlert={showAlert}/>} />
        <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
        <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />

        </Routes>
        </div>
      </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
