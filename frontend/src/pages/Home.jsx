// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Home.css'; // カスタムスタイルを読み込み

const Home = () => {
  const [player, setPlayer] = useState(null);
  const [monsters, setMonsters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const playerResponse = await axios.get('http://localhost:8080/api/players/1'); // プレイヤーIDを1に設定
        setPlayer(playerResponse.data);
        console.log("playerResponse.data : " + JSON.stringify(playerResponse.data));
        // モンスター情報をAPIから取得
        const monstersResponse = await axios.get(`http://localhost:8080/api/monsters/${playerResponse.data.playerId}/monsters`);
        setMonsters(monstersResponse.data);
        console.log("monstersResponse.data : " + JSON.stringify(monstersResponse.data));
      } catch (err) {
        setError('情報の取得に失敗しました。');
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerData();
  }, []);

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="home-container">
      <div className="background-overlay"></div> {/* 背景オーバーレイ */}
      <h1 className="game-title">Nori Monster Grow</h1>
      {player && (
        <div className="player-info">
          <h2>Player</h2>
          <p>{player.playerName}</p>
          <p>Lv: {player.lv}</p>
          <p>Ex: {player.experience}</p>

          <h2>Monster</h2>
          <div className="monster-grid">
            {monsters && monsters.length > 0 ? (
              monsters.map((monster) => (
                <div key={monster.monsterId} className="monster-card">
                  <img
                    src={`/img/monster/${monster.imgFileName}`} // モンスターの画像のパスを設定
                    alt={monster.monsterName}
                    className="monster-image" // カスタムクラスを追加
                  />
                  <p className="monster-name">{monster.monsterName} Lv{monster.lv}</p>
                </div>
              ))
            ) : (
              <p>所持モンスターはいません。</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
