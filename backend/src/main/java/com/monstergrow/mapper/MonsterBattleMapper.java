package com.monstergrow.mapper;

import com.monstergrow.model.MonsterBattle;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface MonsterBattleMapper {

  @Select("SELECT * FROM T_MONSTER_BATTLE")
  List<MonsterBattle> getAllMonsterBattles();

  @Select("SELECT * FROM T_MONSTER_BATTLE WHERE MONSTER_BATTLE_ID = #{monsterBattleId}")
  MonsterBattle getMonsterBattleById(Long monsterBattleId);

  @Insert("INSERT INTO T_MONSTER_BATTLE (MONSTER_BATTLE_ID, RESULT, CREATED_BY, UPDATED_BY) " +
      "VALUES (#{monsterBattleId}, #{result}, #{createdBy}, #{updatedBy})")
  void insertMonsterBattle(MonsterBattle monsterBattle);

  @Update("UPDATE T_MONSTER_BATTLE SET RESULT = #{result}, UPDATED_BY = #{updatedBy}, UPDATED_AT = CURRENT_TIMESTAMP WHERE MONSTER_BATTLE_ID = #{monsterBattleId}")
  void updateMonsterBattle(MonsterBattle monsterBattle);

  @Delete("DELETE FROM T_MONSTER_BATTLE WHERE MONSTER_BATTLE_ID = #{monsterBattleId}")
  void deleteMonsterBattle(Long monsterBattleId);
}
