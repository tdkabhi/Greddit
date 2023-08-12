import React, { useEffect, useState } from "react";
import CommonBar from "./commonNav";
import { BrowserRouter, useNavigate } from "react-router-dom";

function Profile(){
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('loggedIn')==='false'){navigate('/')}
      })
    return(
        <div>
            <CommonBar/>
        </div>
    );
}

export default Profile