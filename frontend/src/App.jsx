// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './components/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'; // faMonsterをfaDragonに置き換え

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <button onClick={toggleMenu} className="menu-button">
        <FontAwesomeIcon icon={faBars} /> Menu
      </button>

      <Menu isOpen={isMenuOpen} onClose={toggleMenu} />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* 他のルートもここに追加 */}
      </Routes>
    </Router>
  );
};

export default App;
