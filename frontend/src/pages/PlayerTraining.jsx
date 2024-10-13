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

  const handleTraining = (selectedMonster) => {
    // バトルロジックをここに追加
    console.log(`${selectedMonster.monsterName} が特訓中...`);

    let totalExperienceGain = 0; // 総獲得経験値
    const results = [];
    const updatedMonsters = [...monsters]; // モンスターの状態を更新するための配列を作成

    // 選択されたモンスターと他のモンスターでバトル
    updatedMonsters.forEach((monster) => {
      if (monster.monsterId !== selectedMonster.monsterId) {
        // 簡易的なバトルロジック
        const damage = Math.max(0, selectedMonster.attackPower - monster.defensePower); // ダメージ計算
        const monsterExperienceGain = Math.floor(damage / 2); // 獲得経験値計算

        // モンスターのHPを減少させる処理
        monster.hp = Math.max(0, monster.hp - damage); // HPが負にならないようにする

        // 結果を保存
        results.push(`${selectedMonster.monsterName} が ${monster.monsterName} に ${damage} ダメージを与えた！`);
        totalExperienceGain += monsterExperienceGain;
      }
    });

    // モンスターの状態を更新
    setMonsters(updatedMonsters);

    // 結果メッセージを設定
    const message = results.join('\n') + `\n${selectedMonster.monsterName} は ${totalExperienceGain} 経験値を獲得しました！`;
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
              <p>経験値 {monster.experience}</p>
              <button className="button" onClick={() => handleTraining(monster)}>START</button>
            </div>
          ))
        ) : (
          <p>特訓できるモンスターがいません。</p>
        )}
      </div>
      {trainingMessage && ( // メッセージウィンドウを表示
        <div className="message-container">
          <div className="message-window">
            <pre>{trainingMessage}</pre> {/* 結果を整形して表示 */}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerTraining;
