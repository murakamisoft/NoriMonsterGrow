package com.monstergrow.mapper;

import com.monstergrow.model.Player;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface PlayerMapper {

  @Select("SELECT * FROM M_PLAYER")
  List<Player> getAllPlayers();

  @Select("SELECT * FROM M_PLAYER WHERE PLAYER_ID = #{playerId}")
  Player getPlayerById(Long playerId);

  @Insert("INSERT INTO M_PLAYER (PLAYER_ID, PLAYER_NAME, LV, EXPERIENCE, CREATED_BY, UPDATED_BY) " +
      "VALUES (#{playerId}, #{playerName}, #{lv}, #{experience}, #{createdBy}, #{updatedBy})")
  void insertPlayer(Player player);

  @Update("UPDATE M_PLAYER SET PLAYER_NAME = #{playerName}, LV = #{lv}, EXPERIENCE = #{experience}, " +
      "UPDATED_BY = #{updatedBy}, UPDATED_AT = CURRENT_TIMESTAMP WHERE PLAYER_ID = #{playerId}")
  void updatePlayer(Player player);

  @Delete("DELETE FROM M_PLAYER WHERE PLAYER_ID = #{playerId}")
  void deletePlayer(Long playerId);
}
