import React from 'react';
import useMonster from '../hooks/useMonster';

const MonsterDisplay = ({ playerId }) => {
  const { monster, loading, error } = useMonster(playerId);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading monster data.</p>;

  const { image } = monster;
  const imageSrc = `/img/monster.png`;  // 画像ファイルパス
  const spriteStyle = {
    backgroundImage: `url(${imageSrc})`,
    backgroundPosition: `-${image.x}px -${image.y}px`,
    width: '64px',
    height: '64px',
  };

  return (
    <div>
      <h2>{monster.name}</h2>
      <div style={spriteStyle} />
    </div>
  );
};

export default MonsterDisplay;
