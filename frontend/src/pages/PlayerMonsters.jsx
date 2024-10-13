import React from 'react';
import MonsterDisplay from '../components/MonsterDisplay';

const PlayerMonsters = ({ playerId }) => {
  return (
    <div>
      <h1>Player's Monsters</h1>
      <MonsterDisplay playerId={playerId} />
    </div>
  );
};

export default PlayerMonsters;
