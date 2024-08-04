import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/AuthSlice";
import "./LogIn.css";

const LogIn = () => {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AzaSyBpDSreYi8skp-6QztybIUn85TSigfUzSo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: inputs.email,
            password: inputs.password,
            returnSecureToken: true,
          }),
        }
      );

      const data = await response.json();
      navigate("/menu");

      if (!response.ok) {
        throw new Error(data.error.message || "Something went wrong");
      }

       // Dispatch actions to set user state in the store
       dispatch(authActions.setLogIn(true));
       dispatch(authActions.setEmail(data.email));
       dispatch(authActions.setToken(data.idToken));
 
       // Save user data in localStorage
       localStorage.setItem(
         "user",
         JSON.stringify({ email: data.email, idToken: data.idToken })
       );
 

      console.log("Successful:", data);
    
      setInputs({ email: "", password: "" });
    } catch (error) {
      console.error("Error:", error.message);
    }

  
  };

  return (
    <div className='containerL'>
      <form onSubmit={handleSubmit} className='formL'>
        <div>
          <label htmlFor='email' className='labelL'>Email</label>
          <input
            id='email'
            name='email'
            type='emailL'
            className='inputL'
            value={inputs.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='password' className='labelL'>Password</label>
          <input
            id='password'
            name='password'
            type='password'
            className='inputL'
            value={inputs.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type='submit' className='btn-L'>Login</button>
        <p> New to zomato? 
        <NavLink to="/" activeClassName="active" style={{ color: "blue" , margin: "3px"}}>
           Create account
         
        </NavLink>
        </p>
      </form>
    </div>
  );
};

export default LogIn;
