// src/pages/PlayerTraining.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlayerTraining = ({ playerId }) => {
  const [monsters, setMonsters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trainingMessage, setTrainingMessage] = useState(''); // メッセージ用の状態を追加
  const [battleEnded, setBattleEnded] = useState(false); // バトル終了フラグ
  const maxMessageLines = 4; // メッセージウィンドウの最大行数

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

  const getRandomDamage = (attackPower, defensePower) => {
    const randomFactor = Math.random() * 0.5 + 0.75; // 0.75から1.25の間で乱数を生成
    return Math.max(0, Math.floor(attackPower * randomFactor - defensePower));
  };

  const handleTraining = (selectedMonster) => {
    console.log(`${selectedMonster.monsterName} が特訓中...`);

    let totalExperienceGain = 0; // 総獲得経験値
    const results = [];
    const updatedMonsters = [...monsters]; // モンスターの状態を更新するための配列を作成
    let turn = 0; // ターンをカウントする
    let opponentMonsters = updatedMonsters.filter(m => m.monsterId !== selectedMonster.monsterId); // 対戦相手リスト

    const battleLoop = () => {
      console.log("opponentMonsters.length : " + opponentMonsters.length);
      if (opponentMonsters.length === 0) {
        setTrainingMessage(`${selectedMonster.monsterName} は全ての敵を倒し、${totalExperienceGain} 経験値を獲得しました！`);
        selectedMonster.experience += totalExperienceGain; // 経験値を加算

        // monstersリストの該当モンスターを更新する
        const updatedMonstersList = monsters.map(m =>
          m.monsterId === selectedMonster.monsterId ? { ...m, experience: selectedMonster.experience } : m
        );
        setMonsters(updatedMonstersList); // 状態を更新

        setBattleEnded(true);
        return;
      }

      const opponentMonster = opponentMonsters[turn % opponentMonsters.length]; // ターンごとに相手を選ぶ
      let message = '';

      if (turn % 2 === 0) {
        // 選択したモンスターの攻撃ターン
        const damage = getRandomDamage(selectedMonster.attackPower, opponentMonster.defensePower); // ダメージ計算
        opponentMonster.hp = Math.max(0, opponentMonster.hp - damage); // HPが負にならないようにする
        message = `${selectedMonster.monsterName} は ${opponentMonster.monsterName} に ${damage} ダメージを与えた！`;

        // HPが0になったモンスターをリストから除外
        if (opponentMonster.hp <= 0) {
          message += `\n${opponentMonster.monsterName} は倒された！`;
          opponentMonsters = opponentMonsters.filter(m => m.monsterId !== opponentMonster.monsterId);
          totalExperienceGain += Math.floor(damage / 2); // 経験値計算
        }
      } else {
        // 相手モンスターの攻撃ターン
        const damage = getRandomDamage(opponentMonster.attackPower, selectedMonster.defensePower); // ダメージ計算
        selectedMonster.hp = Math.max(0, selectedMonster.hp - damage); // HPが負にならないようにする
        message = `${selectedMonster.monsterName} は ${opponentMonster.monsterName} から ${damage} ダメージを受けた！`;

        // 選択モンスターのHPが0になった場合
        if (selectedMonster.hp <= 0) {
          message += `\n${selectedMonster.monsterName} は倒された！`;
          setTrainingMessage(message);
          setBattleEnded(true);
          return;
        }
      }

      // 結果を保存
      results.push(message);

      // メッセージを更新（4行を超える場合はクリア）
      const currentMessages = results.join('\n').split('\n');
      const visibleMessages = currentMessages.slice(-maxMessageLines); // 最大行数以内に収める
      setTrainingMessage(visibleMessages.join('\n'));

      // ターン交代
      turn += 1;

      // 次のターンへ（タイムアウトを利用してターン間に少し待機）
      if (opponentMonsters.length > 0 && selectedMonster.hp > 0) {
        setTimeout(battleLoop, 1000); // 1秒ごとに次のターン
      } else {
        setTrainingMessage(visibleMessages.join('\n') + `\n${selectedMonster.monsterName} は ${totalExperienceGain} 経験値を獲得しました！`);
        setTrainingMessage(`${selectedMonster.monsterName} は全ての敵を倒し、${totalExperienceGain} 経験値を獲得しました！`);
        selectedMonster.experience += totalExperienceGain; // 経験値を加算

        // monstersリストの該当モンスターを更新する
        const updatedMonstersList = monsters.map(m =>
          m.monsterId === selectedMonster.monsterId ? { ...m, experience: selectedMonster.experience } : m
        );
        setMonsters(updatedMonstersList); // 状態を更新

        setBattleEnded(true);
      }
    };

    // バトルループ開始
    setBattleEnded(false);
    battleLoop();
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
              <p>Ex {monster.experience}</p>
              <button className="button" onClick={() => handleTraining(monster)} disabled={battleEnded}>START</button>
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
