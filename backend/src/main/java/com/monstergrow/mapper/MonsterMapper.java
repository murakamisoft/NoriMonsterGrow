package com.monstergrow.mapper;

import com.monstergrow.model.Monster;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface MonsterMapper {

  @Select("SELECT * FROM M_MONSTER")
  List<Monster> getAllMonsters();

  @Select("SELECT * FROM M_MONSTER WHERE MONSTER_ID = #{monsterId}")
  Monster getMonsterById(Long monsterId);

  @Select("SELECT * FROM M_MONSTER WHERE PLAYER_ID = #{playerId}")
  List<Monster> getMonstersByPlayerId(Long playerId);

  @Insert("INSERT INTO M_MONSTER (MONSTER_ID, PLAYER_ID, MONSTER_TYPE_ID, MONSTER_ATTRIBUTE_ID, MONSTER_IMG_ID, MONSTER_NAME, CREATED_BY, UPDATED_BY) "
      +
      "VALUES (#{monsterId}, #{playerId}, #{monsterTypeId}, #{monsterAttributeId}, #{monsterImgId}, #{monsterName}, #{createdBy}, #{updatedBy})")
  void insertMonster(Monster monster);

  @Update("UPDATE M_MONSTER SET PLAYER_ID = #{playerId}, MONSTER_TYPE_ID = #{monsterTypeId}, " +
      "MONSTER_ATTRIBUTE_ID = #{monsterAttributeId}, MONSTER_IMG_ID = #{monsterImgId}, " +
      "MONSTER_NAME = #{monsterName}, UPDATED_BY = #{updatedBy}, UPDATED_AT = CURRENT_TIMESTAMP WHERE MONSTER_ID = #{monsterId}")
  void updateMonster(Monster monster);

  @Delete("DELETE FROM M_MONSTER WHERE MONSTER_ID = #{monsterId}")
  void deleteMonster(Long monsterId);
}
