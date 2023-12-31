import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import ReactDOM from "react-dom";
import TopBar from "./topbar";
import Login from "./login";
import Register from "./register";
import App from "./App";
import CommonBar from "./commonNav";
import { useNavigate } from "react-router-dom";


function Init() {
  const [log, setLog] = useState(0);
  const [reg, setReg] = useState(0);
 
  const navigate = useNavigate();
  useEffect(() => {
    // if(!isLogged){navigate('/')}
    if(localStorage.getItem('loggedIn')==='true'){navigate('/profile')}
  })

  function Logportal(){
    setLog(1);
    setReg(0);
  }
  
  function Regportal(){
    setLog(0);
    setReg(1);
  }
  return (
    <div className="EntryPage">
      <TopBar />
      <div className="box">
        <center>
          <h2 className="Heading1">Greddiit is a user friendly confessions platform</h2>
          <button type="submit" class="btn btn-outline-dark btn-lg entry-button" onClick={Logportal}>Login</button>
          <button type="submit" class="btn btn-outline-dark btn-lg entry-button" onClick={Regportal}>Register</button>
          {log ? <Login/> : console.log(1)}
          {reg ? <Register/> : console.log(1)}
        </center>
      </div>
    </div>
  );
}
export default Init;



