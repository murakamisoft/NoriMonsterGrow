package com.monstergrow.service;

import com.monstergrow.model.Monster;
import com.monstergrow.repository.MonsterRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MonsterService {

  private final MonsterRepository monsterRepository;

  public MonsterService(MonsterRepository monsterRepository) {
    this.monsterRepository = monsterRepository;
  }

  public List<Monster> getAllMonsters() {
    return monsterRepository.findAll();
  }

  public Monster getMonsterById(Long monsterId) {
    return monsterRepository.findById(monsterId);
  }

  public List<Monster> getMonsterByPlayerId(Long playerId) {
    return monsterRepository.findByPlayerId(playerId);
  }

  public Monster createMonster(Monster monster) {
    monsterRepository.save(monster);
    return monster;
  }

  public Monster updateMonster(Long monsterId, Monster monster) {
    monster.setMonsterId(monsterId);
    monsterRepository.update(monster);
    return monster;
  }

  public void deleteMonster(Long monsterId) {
    monsterRepository.delete(monsterId);
  }
}
