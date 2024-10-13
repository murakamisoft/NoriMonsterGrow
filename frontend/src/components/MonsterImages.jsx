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
        console.log(JSON.stringify(monsters));
        // 各モンスターの画像を個別に取得
        const imagePromises = monsters.map(async (monster) => {
          const imageResponse = await axios.get(`http://localhost:8080/api/monster-images/${monster.monsterImgId}`);
          console.log(JSON.stringify(imageResponse));
          return {
            ...monster,
            imageData: imageResponse.data
          };
        });

        // すべての画像データを取得してステートに保存
        const monstersWithImages = await Promise.all(imagePromises);
        console.log("monstersWithImages : " + JSON.stringify(monstersWithImages));
        setMonsterImages(monstersWithImages);
      } catch (error) {
        console.error('Error fetching monster images:', error);
      }
    };

    fetchMonsterImages();
  }, [playerId]);

  return (
    <div>
      <h2>モンスターの画像</h2>
      <div style={{ position: 'relative', width: '1024px', height: '1024px' }}>

        {monsterImages.map((monster) => (
          <div
            key={monster.monsterImgId}
            style={{
              position: 'absolute',
              left: `${monster.imageData.pixelX}px`,
              top: `${monster.imageData.pixelY}px`,
              width: '64px',
              height: '64px',
              overflow: 'hidden',
            }}
          >
            <img
              src="/img/monster.png"
              alt={monster.monsterName}
              style={{
                position: 'relative',
                left: `-${monster.imageData.pixelX}px`,
                top: `-${monster.imageData.pixelY}px`,
                width: '1024px',
                height: '1024px',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonsterImages;
