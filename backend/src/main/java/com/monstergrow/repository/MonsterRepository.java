package com.monstergrow.repository;

import com.monstergrow.mapper.MonsterMapper;
import com.monstergrow.model.Monster;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class MonsterRepository {

  private final MonsterMapper monsterMapper;

  public MonsterRepository(MonsterMapper monsterMapper) {
    this.monsterMapper = monsterMapper;
  }

  public List<Monster> findAll() {
    return monsterMapper.getAllMonsters();
  }

  public void save(Monster monster) {
    monsterMapper.insertMonster(monster);
  }

  public Monster findById(Long monsterId) {
    return monsterMapper.getMonsterById(monsterId);
  }

  public List<Monster> findByPlayerId(Long playerId) {
    return monsterMapper.getMonstersByPlayerId(playerId);
  }

  public void update(Monster monster) {
    monsterMapper.updateMonster(monster);
  }

  public void delete(Long monsterId) {
    monsterMapper.deleteMonster(monsterId);
  }
}
