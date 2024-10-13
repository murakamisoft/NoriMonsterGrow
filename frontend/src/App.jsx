import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MonsterImages from './components/MonsterImages';

const App = () => {
  const playerId = 1; // プレイヤーIDを指定

  return (
    <div>
      <h1>NoriMonsterGrow</h1>
      <MonsterImages playerId={playerId} />
    </div>
  );
};

export default App;
