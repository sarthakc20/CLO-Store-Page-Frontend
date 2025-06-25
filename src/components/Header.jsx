import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="app-header">
      <div className="header">
        <img
          src="https://storagefiles.clo-set.com/public/connect/common/connect-desktop-header-bi.svg"
          alt="Logo"
          className="app-logo"
        />
        <button className="feature-button">REQUIRED FEATURE</button>
      </div>
    </header>
  );
};

export default Header;
