import { useState, useEffect } from 'react';
import axios from 'axios';

const useMonster = (playerId) => {
  const [monster, setMonster] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMonsterData = async () => {
      try {
        const monsterResponse = await axios.get(`/api/monsters/player/${playerId}`);
        const monster = monsterResponse.data;
        const imageResponse = await axios.get(`/api/monster-images/${monster.imageId}`);
        const imageData = imageResponse.data;

        setMonster({ ...monster, image: imageData });
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMonsterData();
  }, [playerId]);

  return { monster, loading, error };
};

export default useMonster;
