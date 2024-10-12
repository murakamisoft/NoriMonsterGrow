package com.monstergrow.repository;

import com.monstergrow.mapper.MonsterImgMapper;
import com.monstergrow.model.MonsterImg;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MonsterImageRepository {

  private final MonsterImgMapper monsterImageMapper;

  public MonsterImageRepository(MonsterImgMapper monsterImageMapper) {
    this.monsterImageMapper = monsterImageMapper;
  }

  public void save(MonsterImg monsterImage) {
    monsterImageMapper.insertMonsterImage(monsterImage);
  }

  public MonsterImg findById(Long monsterImageId) {
    return monsterImageMapper.getMonsterImageById(monsterImageId);
  }

  public List<MonsterImg> findAll() {
    return monsterImageMapper.getAllMonsterImages();
  }

  public void update(MonsterImg monsterImage) {
    monsterImageMapper.updateMonsterImage(monsterImage);
  }

  public void delete(Long monsterImageId) {
    monsterImageMapper.deleteMonsterImage(monsterImageId);
  }
}
