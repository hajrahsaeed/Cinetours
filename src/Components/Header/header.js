// src/components/Header/Header.js
import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="container-fluid bg-white shadow-sm">
      <nav className="navbar navbar-expand-md navbar-light container py-2 py-md-3">
        {/* Hamburger (mobile only) */}
        <button
          className="navbar-toggler p-1 border-0 d-md-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" style={{ transform: "scale(0.7)" }}></span>
        </button>

        {/* Logo - always visible */}
        <a className="navbar-brand fs-4 fw-bold gradient-text me-md-4" href="/">
          QuantumTours
        </a>

        {/* Nav links + buttons container */}
        <div className="d-flex flex-grow-1">
          {/* Nav links - desktop horizontal */}
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav gap-md-3 me-auto">
              <li className="nav-item">
                <Link className="nav-link fw-medium text-dark" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-medium text-dark" to="/portal">Client Portal</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-medium text-dark" to="/pricing">Pricing</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-medium text-dark" to="/admin">Admin Panel</Link>
              </li>
            </ul>
          </div>

          {/* Right-aligned buttons - unchanged */}
          <div className=" d-flex gap-1 ms-auto">
            <button className="btn btn-outline-secondary btn-sm">Sign in</button>
            <button className="btn gradient-button btn-sm">Start</button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;