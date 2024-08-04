
import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/authentication/SignIn";
import LogIn from "./components/authentication/LogIn";
import Menu from "./components/menu/Menu";
import Order from "./components/home/Order";

function App() {
  return (
    <div>
       <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/menu" element={<Menu/>} />
        <Route path="/order" element={<Order/>} />
        <Route path="/home" element={<Menu/>} />
        
        

      </Routes>
    </div>
  );
}

export default App;
