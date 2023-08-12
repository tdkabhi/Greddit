import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Init from "./init";
import Login from "./login";
import Profile from "./Profile";
import Register from "./register";
import View from "./view_profile";
import Followers from "./followers";
import Following from "./following";
import { BrowserRouter, useNavigate } from "react-router-dom";

function IntoProfile(){
    return(
        <div> 
            <Routes>
                <Route path='/' element={<Init/>}></Route>
                <Route path='/profile' element={<Profile/>}></Route>
                <Route path='/profile/view' element={<View/>}></Route>
                <Route path='/profile/followers' element={<Followers/>}></Route>
                <Route path='/profile/following' element={<Following/>}></Route> 
            </Routes>
            
            <Outlet/>
        </div>
    );
}

export default IntoProfile