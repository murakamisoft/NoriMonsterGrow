// src/pages/PlayerTraining.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlayerTraining = ({ playerId }) => {
  const [monsters, setMonsters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trainingMessage, setTrainingMessage] = useState(''); // メッセージ用の状態を追加

  useEffect(() => {
    const fetchMonsters = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/monsters/${playerId}/monsters`);
        setMonsters(response.data);
        console.log("response.data : " + JSON.stringify(response.data));
      } catch (err) {
        setError('モンスターの取得に失敗しました。');
      } finally {
        setLoading(false);
      }
    };

    fetchMonsters();
  }, [playerId]);

  const handleTraining = (monster1, monster2) => {
    // 特訓ロジックをここに追加
    console.log(`${monster1.monsterName} と ${monster2.monsterName} が特訓中...`);

    // 特訓の結果メッセージを設定
    const message = `${monster1.monsterName} と ${monster2.monsterName} が特訓を行い、経験値を獲得しました！`;
    setTrainingMessage(message);
  };

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="title">Training</h2>
      <div className="monster-grid">
        {monsters.length > 0 ? (
          monsters.map((monster) => (
            <div key={monster.monsterId} className="monster-item">
              <img
                src={`/img/monster/${monster.imgFileName}`}
                alt={monster.monsterName}
                className="monster-image"
              />
              <p>{monster.monsterName}</p>
              <p>HP {monster.hp}</p>
              <p>MP {monster.mp}</p>
              <p>Lv {monster.lv}</p>
              <button className="button" onClick={() => handleTraining(monsters[0], monster)}>START</button>
            </div>
          ))
        ) : (
          <p>特訓できるモンスターがいません。</p>
        )}
      </div>
      {trainingMessage && ( // メッセージウィンドウを表示
        <div className="message-container">
          <div className="message-window">
            <p>{trainingMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerTraining;
