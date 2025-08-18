// src/components/Header/Header.js
import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="container-fluid bg-white shadow-sm">
      <nav className="navbar navbar-expand-md navbar-light container py-2 py-md-3">
        <div className="d-flex align-items-center w-100">
          {/* Hamburger and Logo Container */}
          <div className="d-flex align-items-center">
            <button
              className="navbar-toggler p-1 border-0 me-2"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarContent"
              aria-controls="navbarContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" style={{ transform: "scale(0.7)" }}></span>
            </button>

            <a className="navbar-brand fs-4 fw-bold gradient-text" href="/">
              QuantumTours
            </a>
          </div>

          {/* Right-aligned buttons - unchanged from your original */}
          <div className="d-flex gap-1 gap-md-2 ms-auto order-1 order-md-2">
            <button className="btn btn-outline-secondary btn-sm">Sign in</button>
            <button className="btn gradient-button btn-sm">Start</button>
          </div>

          {/* Nav links - now properly collapsing downward */}
          <div className="collapse navbar-collapse order-3" id="navbarContent">
            <ul className="navbar-nav mt-2 mt-md-0 gap-2 gap-md-3">
              <li className="nav-item">
                <Link className="nav-link fw-medium text-dark py-1" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-medium text-dark py-1" to="/portal">Client Portal</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-medium text-dark py-1" to="/pricing">Pricing</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-medium text-dark py-1" to="/admin">Admin Panel</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;