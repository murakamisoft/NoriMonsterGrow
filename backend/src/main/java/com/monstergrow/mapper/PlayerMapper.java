package com.monstergrow.mapper;

import com.monstergrow.model.Player;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PlayerMapper {
  List<Player> getAllPlayers();

  Player getPlayerById(Long playerId);

  void insertPlayer(Player player);

  void updatePlayer(Player player);

  void deletePlayer(Long playerId);
}
