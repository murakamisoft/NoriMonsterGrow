import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const PlayerTraining = ({ playerId }) => {
  const [monsters, setMonsters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trainingMessage, setTrainingMessage] = useState('');
  const [isBattling, setIsBattling] = useState(false);
  const [selectedMonster, setSelectedMonster] = useState(null);
  const maxMessageLines = 4;

  useEffect(() => {
    const fetchMonsters = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/monsters/${playerId}/monsters`);
        setMonsters(response.data);
      } catch (err) {
        setError('モンスターの取得に失敗しました。');
      } finally {
        setLoading(false);
      }
    };

    fetchMonsters();
  }, [playerId]);

  // 状態を監視し、コンソールにログ出力
  useEffect(() => {
    console.log('Monsters:', monsters);
    console.log('Loading:', loading);
    console.log('Error:', error);
    console.log('Training Message:', trainingMessage);
    console.log('Is Battling:', isBattling);
    console.log('Selected Monster:', selectedMonster);
  }, [monsters, loading, error, trainingMessage, isBattling, selectedMonster]);

  const getRandomDamage = (attackPower, defensePower) => {
    const randomFactor = Math.random() * 0.5 + 0.75;
    return Math.max(0, Math.floor(attackPower * randomFactor - defensePower));
  };

  const updateMonsterExperience = async (monster) => {
    try {
      await axios.put(`http://localhost:8080/api/monsters/${monster.monsterId}`, {
        ...monster,
        updatedBy: monster.updatedBy || '',
      });
    } catch (err) {
      console.error('モンスター情報の更新に失敗しました。', err);
    }
  };

  const recoverMonsters = async () => {
    const updatedMonsters = monsters.map((monster) => ({
      ...monster,
      hp: monster.hpMax,
      mp: monster.mpMax,
    }));

    setMonsters(updatedMonsters);
    await Promise.all(updatedMonsters.map(updateMonsterExperience));
  };

  const appendTrainingMessage = (message) => {
    setTrainingMessage((prev) => {
      const currentMessages = prev.split('\n');
      const visibleMessages = [...currentMessages, message].slice(-maxMessageLines);
      return visibleMessages.join('\n');
    });
  };

  const handleTraining = useCallback(async (monster) => {
    if (!isBattling) return;

    let totalExperienceGain = 0;
    const opponentMonsters = monsters.filter(m => m.monsterId !== monster.monsterId);
    let turn = 0;

    const battleLoop = async () => {
      if (!isBattling || monster.hp <= 0 || opponentMonsters.length === 0) return;

      const opponentMonster = opponentMonsters[turn % opponentMonsters.length];
      let message = '';

      if (turn % 2 === 0) {
        const damage = getRandomDamage(monster.attackPower, opponentMonster.defensePower);
        opponentMonster.hp = Math.max(0, opponentMonster.hp - damage);
        message = `${monster.monsterName} は ${opponentMonster.monsterName} に ${damage} ダメージを与えた！`;

        if (opponentMonster.hp <= 0) {
          message += `\n${opponentMonster.monsterName} は倒された！`;
          totalExperienceGain += Math.floor(damage / 2);
        }
      } else {
        const damage = getRandomDamage(opponentMonster.attackPower, monster.defensePower);
        monster.hp = Math.max(0, monster.hp - damage);
        message = `${monster.monsterName} は ${opponentMonster.monsterName} から ${damage} ダメージを受けた！`;

        if (monster.hp <= 0) {
          message += `\n${monster.monsterName} は倒された！`;
          await recoverMonsters();

          window.location.reload(); // 画面をF5したようにリロード

          return;
        }
      }

      appendTrainingMessage(message);
      turn += 1;

      setTimeout(battleLoop, 1000);
    };

    await battleLoop();
  }, [isBattling, monsters]);

  useEffect(() => {
    if (isBattling && selectedMonster) {
      handleTraining(selectedMonster);
    }
  }, [isBattling, selectedMonster, handleTraining]);

  const toggleTraining = (monster) => {
    setIsBattling((prev) => !prev);
    setSelectedMonster((prev) => (prev ? null : monster));
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
              <button className="button" onClick={() => toggleTraining(monster)}>
                {isBattling && selectedMonster?.monsterId === monster.monsterId ? 'STOP' : 'START'}
              </button>
            </div>
          ))
        ) : (
          <p>特訓できるモンスターがいません。</p>
        )}
      </div>
      {trainingMessage && (
        <div className="message-container">
          <div className="message-window">
            <pre>{trainingMessage}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerTraining;
