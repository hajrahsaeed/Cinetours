// src/components/Header/Header.js
import React from 'react';
import './Header.module.css'; // Assuming you have a CSS file for styling

const Header = () => {
  return (
    <header className="container-fluid bg-white shadow-sm">
      <nav className="navbar navbar-expand-md navbar-light container py-3 d-flex justify-content-between align-items-center">
        {/* Hamburger on the VERY LEFT */}
        <button
          className="navbar-toggler p-1 border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span
            className="navbar-toggler-icon"
            style={{ transform: "scale(0.7)" }}
          ></span>
        </button>

        {/* Logo next to hamburger */}
        <a className="navbar-brand fs-4 fw-bold text-primary m-0" href="/">
          Cinetour
        </a>

        {/* Nav links (collapsible only) */}
        <div
          className="collapse navbar-collapse order-2 order-md-1"
          id="navbarContent"
        >
          <ul className="navbar-nav ms-md-4 gap-md-4">
            <li className="nav-item">
              <a className="nav-link fw-medium text-dark" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-medium text-dark" href="/blog">
                Blog
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-medium text-dark" href="/pricing">
                Pricing
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-medium text-dark" href="/contact">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Always-visible buttons on right */}
        <div className="d-flex gap-2 ms-auto order-1 order-md-2">
          <button className="btn btn-outline-secondary">Sign in</button>
          <button className="btn btn-primary">Get started</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;