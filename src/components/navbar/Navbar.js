import React from "react";
import { NavLink } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <h1>Vivek Restaurant</h1>
        <div className="nav-links">
          <NavLink
            to="/home"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Home
          </NavLink>
          <NavLink
            to="/menu"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Add Menu
          </NavLink>
          <NavLink
            to="/order"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Order status
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
