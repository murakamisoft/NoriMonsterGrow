import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const PlayerTraining = ({ playerId }) => {
  const [monsters, setMonsters] = useState([]); // プレイヤーが所有するモンスターの配列
  const [loading, setLoading] = useState(true); // ローディング状態の管理
  const [error, setError] = useState(null); // エラー状態の管理
  const [trainingMessage, setTrainingMessage] = useState(''); // 特訓中のメッセージ
  const [isBattling, setIsBattling] = useState(false); // バトル状態の管理
  const [selectedMonster, setSelectedMonster] = useState(null); // 選択されたモンスター
  const maxMessageLines = 4; // メッセージの最大行数

  // モンスターを取得するための副作用
  useEffect(() => {
    const fetchMonsters = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/monsters/${playerId}/monsters`);
        setMonsters(response.data); // モンスターのデータを状態に設定
      } catch (err) {
        setError('モンスターの取得に失敗しました。'); // エラーメッセージの設定
      } finally {
        setLoading(false); // ローディングを終了
      }
    };

    fetchMonsters();
  }, [playerId]);

  // 状態を監視し、コンソールにログ出力
  useEffect(() => {
    // console.log('Monsters:', monsters);
    // console.log('Loading:', loading);
    // console.log('Error:', error);
    // console.log('Training Message:', trainingMessage);
    // console.log('Is Battling:', isBattling);
    // console.log('Selected Monster:', selectedMonster);
  }, [monsters, loading, error, trainingMessage, isBattling, selectedMonster]);

  // ダメージを計算する関数
  const getRandomDamage = (attackPower, defensePower) => {
    const randomFactor = Math.random() * 0.5 + 0.75; // ダメージにランダム要素を加える
    return Math.max(0, Math.floor(attackPower * randomFactor - defensePower)); // 計算したダメージを返す
  };

  // モンスターの経験値を更新する関数
  const updateMonsterExperience = async (monster) => {
    try {
      await axios.put(`http://localhost:8080/api/monsters/${monster.monsterId}`, {
        ...monster,
        updatedBy: monster.updatedBy || '', // 更新者情報を追加
      });
    } catch (err) {
      console.error('モンスター情報の更新に失敗しました。', err); // エラーログを出力
    }
  };

  // モンスターのHPとMPを回復する関数
  const recoverMonsters = async () => {
    const updatedMonsters = monsters.map((monster) => ({
      ...monster,
      hp: monster.hpMax, // HPを最大値に設定
      mp: monster.mpMax, // MPを最大値に設定
    }));

    setMonsters(updatedMonsters); // 更新されたモンスターの状態を設定
    await Promise.all(updatedMonsters.map(updateMonsterExperience)); // 経験値を更新
  };

  // 特訓メッセージを追加する関数
  const appendTrainingMessage = (message) => {
    setTrainingMessage(message); // 新しいメッセージに設定
  };

  // 特訓を実行する関数
  const handleTraining = useCallback(async (monster) => {
    if (!isBattling) return; // バトル中でなければ何もしない

    let totalExperienceGain = 0; // 獲得経験値の合計
    let opponentMonsters = monsters.filter(m => m.monsterId !== monster.monsterId); // 対戦相手のモンスター
    let turn = 0; // ターン数

    // 指定したミリ秒だけ待機する関数
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const battleLoop = async () => {
      if (!isBattling || monster.hp <= 0 || opponentMonsters.length === 0) return; // バトルの終了条件

      // 倒れていない相手モンスターをフィルタリング
      opponentMonsters = opponentMonsters.filter(m => m.hp > 0);

      if (opponentMonsters.length === 0) {
        appendTrainingMessage(`${monster.monsterName} は全ての相手モンスターを倒しました！\n経験値${totalExperienceGain} を獲得。`);
        monster.experience += totalExperienceGain;
        console.log("倒した！");
        await sleep(2000);
        await recoverMonsters(); // モンスターを回復
        setTrainingMessage("");
        window.location.reload(); // 画面をリロード
        return; // 相手モンスターが全て倒れた場合は終了
      }

      const opponentMonster = opponentMonsters[turn % opponentMonsters.length]; // 対戦相手の選定
      let message = '';

      // ターンごとの攻撃処理
      if (turn % 2 === 0) {
        const damage = getRandomDamage(monster.attackPower, opponentMonster.defensePower); // ダメージを計算
        opponentMonster.hp = Math.max(0, opponentMonster.hp - damage); // 相手モンスターのHPを減少
        message = `${monster.monsterName} は ${opponentMonster.monsterName} に ${damage} ダメージを与えた！`;

        // 相手モンスターが倒れた場合
        if (opponentMonster.hp <= 0) {
          message += `\n${opponentMonster.monsterName} は倒された！`;
          totalExperienceGain += Math.floor(damage / 2); // 経験値を獲得
        }
      } else {
        const damage = getRandomDamage(opponentMonster.attackPower, monster.defensePower); // ダメージを計算
        monster.hp = Math.max(0, monster.hp - damage); // 自分のHPを減少
        message = `${monster.monsterName} は ${opponentMonster.monsterName} から ${damage} ダメージを受けた！`;

        // 自分のモンスターが倒れた場合
        if (monster.hp <= 0) {
          message += `\n${monster.monsterName} は倒された！`;
          await sleep(2000);
          await recoverMonsters(); // モンスターを回復
          window.location.reload(); // 画面をリロード
          return;
        }
      }

      appendTrainingMessage(message); // メッセージを追加
      turn += 1; // ターンを進める

      setTimeout(battleLoop, 1000);
    };

    await battleLoop(); // バトルループを開始
  }, [isBattling, monsters]);

  // バトル開始/停止時に特訓を実行
  useEffect(() => {
    if (isBattling && selectedMonster) {
      handleTraining(selectedMonster);
    }
  }, [isBattling, selectedMonster, handleTraining]);

  // 特訓のトグル関数
  const toggleTraining = (monster) => {
    setIsBattling((prev) => !prev); // バトル状態をトグル
    setSelectedMonster((prev) => (prev ? null : monster)); // 選択したモンスターを設定
  };

  // ローディング中の表示
  if (loading) return <p>読み込み中...</p>;
  // エラー時の表示
  if (error) return <p>{error}</p>;

  // コンポーネントの描画
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
              <button className="button" onClick={() => toggleTraining(monster)} disabled={isBattling} >
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
