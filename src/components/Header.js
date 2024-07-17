import React from 'react';
import Logo from './assets/logo.png'
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <img src={Logo} alt="SCAM Factory" className="logo" />
        <p className="tagline">Constructeur de bot de qualité.</p>
      </div>
    </header>
  );
};

export default Header;
