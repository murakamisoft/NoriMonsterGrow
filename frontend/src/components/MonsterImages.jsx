import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MonsterImages = ({ playerId }) => {
  const [monsterImages, setMonsterImages] = useState([]);

  useEffect(() => {
    const fetchMonsterImages = async () => {
      try {
        // モンスター画像リストを取得
        const response = await axios.get(`http://localhost:8080/api/monsters/${playerId}/monsters`);
        const monsters = response.data;
        setMonsterImages(monsters); // 取得したデータをステートに設定
        console.log(JSON.stringify(monsters));
      } catch (error) {
        console.error('Error fetching monster images:', error);
      }
    };

    fetchMonsterImages();
  }, [playerId]);

  return (
    <div>
      <h2>モンスターの画像</h2>
      <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto' }}>
        {monsterImages.map((monster) => (
          <div
            key={monster.monsterId}
            style={{
              width: '64px', // モンスターの画像の幅
              height: '64px', // モンスターの画像の高さ
              backgroundImage: `url(/img/monster/${monster.imgFileName})`, // モンスターの画像を背景として設定
              backgroundSize: 'contain', // 画像を要素のサイズに合わせる
              backgroundRepeat: 'no-repeat', // 画像を繰り返さない
              marginRight: '10px', // モンスター間のスペース
            }}
            title={monster.monsterName}
          >
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonsterImages;
