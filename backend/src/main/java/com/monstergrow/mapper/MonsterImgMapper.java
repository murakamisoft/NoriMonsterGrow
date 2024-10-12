package com.monstergrow.mapper;

import com.monstergrow.model.MonsterImg;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface MonsterImgMapper {

  @Select("SELECT * FROM M_MONSTER_IMG")
  List<MonsterImg> getAllMonsterImages();

  @Select("SELECT * FROM M_MONSTER_IMG WHERE MONSTER_IMG_ID = #{monsterImgId}")
  MonsterImg getMonsterImageById(Long monsterImgId);

  @Insert("INSERT INTO M_MONSTER_IMG (MONSTER_IMG_ID, IMG_FILE_NAME, PIXEL_X, PIXEL_Y, CREATED_BY, UPDATED_BY) " +
      "VALUES (#{monsterImgId}, #{imgFileName}, #{pixelX}, #{pixelY}, #{createdBy}, #{updatedBy})")
  void insertMonsterImage(MonsterImg monsterImg);

  @Update("UPDATE M_MONSTER_IMG SET IMG_FILE_NAME = #{imgFileName}, PIXEL_X = #{pixelX}, PIXEL_Y = #{pixelY}, " +
      "UPDATED_BY = #{updatedBy}, UPDATED_AT = CURRENT_TIMESTAMP WHERE MONSTER_IMG_ID = #{monsterImgId}")
  void updateMonsterImage(MonsterImg monsterImg);

  @Delete("DELETE FROM M_MONSTER_IMG WHERE MONSTER_IMG_ID = #{monsterImgId}")
  void deleteMonsterImage(Long monsterImgId);
}
