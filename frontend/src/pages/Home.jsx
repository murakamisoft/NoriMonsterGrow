// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
        const monstersResponse = await axios.get(`http://localhost:8080/api/monsters?playerId=${playerResponse.data.id}`);
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
    <div>
      <h1>ホーム画面</h1>
      {player && (
        <div>
          <h2>プレイヤー情報</h2>
          <p>名前: {player.playerName}</p>
          <p>レベル: {player.lv}</p>
          <p>経験値: {player.experience}</p>

          <h2>所持モンスター</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {monsters && monsters.length > 0 ? (
              monsters.map((monster) => (
                <div key={monster.monsterId} style={{ margin: '10px' }}>
                  <img
                    src={`/img/monster/${monster.imgFileName}`} // モンスターの画像のパスを設定
                    alt={monster.monsterName}
                    style={{ width: '64px', height: '64px' }} // 画像サイズを設定
                  />
                  <p>{monster.monsterName}</p>
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