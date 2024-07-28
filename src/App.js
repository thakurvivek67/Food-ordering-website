
import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/authentication/SignIn";
import LogIn from "./components/authentication/LogIn";

function App() {
  return (
    <div>
       <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </div>
  );
}

export default App;
