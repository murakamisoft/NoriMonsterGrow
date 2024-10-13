// src/components/Menu.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Menu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCog, faStar } from '@fortawesome/free-solid-svg-icons';


// Menu.jsx
const Menu = ({ isOpen, onClose }) => {
  return (
    <div className={`menu ${isOpen ? 'open' : ''}`}>
      <button className="close-button" onClick={onClose}>×</button>
      <h2>Menu</h2>
      <ul>
        <li><Link to="/"><FontAwesomeIcon icon={faHome} className="icon" /> Home</Link></li>
        <li><Link to="/monsters"><FontAwesomeIcon icon={faStar} className="icon" /> Monster</Link></li>
        <li><Link to="/settings"><FontAwesomeIcon icon={faCog} className="icon" /> Setting</Link></li>
      </ul>
    </div>
  );
};

export default Menu;




