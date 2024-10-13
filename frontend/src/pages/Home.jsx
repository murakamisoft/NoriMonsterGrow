import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Link をインポート
import '../css/Home.css'; // スタイルを追加する場合に備えて

const Home = () => {
  const [player, setPlayer] = useState(null);
  const [monsters, setMonsters] = useState([]);

  const playerId = 1; // プレイヤーID（適宜変更してください）

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/players/${playerId}`);
        if (!response.ok) {
          const errorMessage = await response.text(); // エラーメッセージを取得
          console.error('Error:', errorMessage); // エラーメッセージをコンソールに表示
          throw new Error('ネットワークエラー');
        }
        const data = await response.json();
        console.log("fetchPlayerData : " + JSON.stringify(data));
        setPlayer(data);
      } catch (error) {
        console.error('Fetch player data failed:', error);
      }
    };


    const fetchMonstersData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/monsters?playerId=${playerId}`);
        if (!response.ok) {
          throw new Error('ネットワークエラー');
        }
        const data = await response.json();
        console.log("fetchMonstersData : " + JSON.stringify(data));
        setMonsters(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlayerData();
    fetchMonstersData();
  }, [playerId]);

  if (!player) {
    return <div>ローディング中...</div>; // プレイヤーデータが取得できるまでのローディング表示
  }

  return (
    <div className="container">
      <header className="py-4 text-center">
        <h1>NoriMonsterGrow</h1>
        <h2>{player.playerName}</h2>
        <p>レベル: {player.lv}</p>
        <div className="progress" style={{ height: '20px' }}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${(player.experience / 2000) * 100}%` }}
            aria-valuenow={player.experience}
            aria-valuemin="0"
            aria-valuemax="2000"
          >
            {player.experience} / 2000
          </div>
        </div>
      </header>

      <div className="row my-4">
        {monsters.map((monster, index) => (
          <div className="col-md-4" key={index}>
            <div className="card mb-4">
              <img
                src={`https://via.placeholder.com/150?text=${monster.name}`}
                className="card-img-top"
                alt={monster.name}
              />
              <div className="card-body">
                <h5 className="card-title">{monster.name}</h5>
                <p className="card-text">レベル: {monster.level}</p>
                <p className="card-text">HP: {monster.hp}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <nav className="mt-4">
        <h4>メインメニュー</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/育成" className="nav-link">モンスター育成</Link>
          </li>
          <li className="list-group-item">
            <Link to="/カスタマイズ" className="nav-link">カスタマイズ</Link>
          </li>
          <li className="list-group-item">
            <Link to="/バトル" className="nav-link">バトル</Link>
          </li>
          <li className="list-group-item">
            <Link to="/特訓" className="nav-link">特訓</Link>
          </li>
          <li className="list-group-item">
            <Link to="/アルバム" className="nav-link">アルバム</Link>
          </li>
          <li className="list-group-item">
            <Link to="/図鑑" className="nav-link">図鑑</Link>
          </li>
          <li className="list-group-item">
            <Link to="/イベント" className="nav-link">イベント</Link>
          </li>
          <li className="list-group-item">
            <Link to="/設定" className="nav-link">設定</Link>
          </li>
        </ul>
      </nav>

      <footer className="text-center mt-4">
        <p>© 2024 NoriMonsterGrow. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
