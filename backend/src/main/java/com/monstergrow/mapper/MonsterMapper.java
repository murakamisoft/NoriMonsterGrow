package com.monstergrow.mapper;

import com.monstergrow.model.Monster;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MonsterMapper {

  List<Monster> getAllMonsters();

  Monster getMonsterById(Long monsterId);

  List<Monster> getMonstersByPlayerId(Long playerId);

  void insertMonster(Monster monster);

  void updateMonster(Monster monster);

  void deleteMonster(Long monsterId);
}
