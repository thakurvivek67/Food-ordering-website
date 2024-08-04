import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import './SignIn.css'; // Ensure this file contains basic styling

const SignIn = () => {
  const navigate = useNavigate();

  // State to manage form inputs
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Update state on input change
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.id]: e.target.value,
    });
  };

  // Handle sign-in process
  const handleSignIn = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Check if passwords match
    if (inputs.password !== inputs.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBpDSreYi8skp-6QztybIUn85TSigfUzSo",
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
        throw new Error(data.error.message || "Failed to sign in");
      }

      console.log("Sign-in successful:", data);
      navigate("/login"); // Navigate to a different page on successful sign-in
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="containerS">
      <form onSubmit={handleSignIn} className="formS">
        <div>
          <label htmlFor="email" className="labelS">Email</label>
          <input
            id="email"
            type="email"
            className="inputS"
            value={inputs.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="labelS">Password</label>
          <input
            id="password"
            type="password"
            className="inputS"
            value={inputs.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="labelS">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            className="inputS"
            value={inputs.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn-S">Sign In</button>
        <p> Already have an account? 
        <NavLink to="/login" activeClassName="active" style={{ color: "blue", margin:"3px" }}>
           Login
         
        </NavLink>
        </p>
        
      </form>
    </div>
  );
};

export default SignIn;
