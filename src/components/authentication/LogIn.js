import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./LogIn.css";

const LogIn = () => {
  const [inputs, setInputs] = useState({ email: '', password: '', confirmPassword: '' });
  //const [signUpMode, setSignUpMode] = useState(false); // Assuming you have a way to toggle this
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (inputs.password === inputs.confirmPassword) {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=YOUR_API_KEY",
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
        

  
        if (!response.ok) {
          throw new Error(data.error.message || "Something went wrong");
        }
  
        console.log("Registration successful:", data);
        navigate("/menu");
      } catch (error) {
        console.error("Error during registration:", error.message);
      }
    } else {
      alert("Confirm Password correctly!");
    }
    
    // Clear inputs after submission
    setInputs({ email: "", password: "", confirmPassword: "" });
  };

  return (
    <div className='containerL'>
      <form onSubmit={handleSubmit} className='formL'>
        <div>
          <label htmlFor='email' className='label'>Email</label>
          <input
            id='email'
            type='email'
            className='input'
            value={inputs.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='password' className='label'>Password</label>
          <input
            id='password'
            type='password'
            className='input'
            value={inputs.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type='submit' className='btn-l'>Login</button>
      </form>
    </div>
  );
};

export default LogIn;
