import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/AuthSlice";
import { NavLink, useNavigate } from "react-router-dom";
import './SignIn.css';

const SignIn = () => {
  const dispatch = useDispatch();
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
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBf54DZqE61tjuvAHhvTf1YGxVlem1Dlag", // Adjust URL for sign-in or sign-up as needed
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
        throw new Error(data.error.message || "Invalid email or password");
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

      console.log("Sign-in successful:", data);
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="contanierS">
      <form onSubmit={handleSignIn} className="formS">
        <div>
          <label htmlFor="email" className="label">Email</label>
          <input
            id="email"
            type="email"
            className="input"
            value={inputs.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="label">Password</label>
          <input
            id="password"
            type="password"
            className="input"
            value={inputs.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="label">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            className="input"
            value={inputs.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn-s">Sign In</button>
        <NavLink to="/login"> Already have an account</NavLink>
      </form>
    </div>
  );
};

export default SignIn;

