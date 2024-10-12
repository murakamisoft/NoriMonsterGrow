package com.monstergrow.repository;

import com.monstergrow.mapper.PlayerMapper;
import com.monstergrow.model.Player;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PlayerRepository {

  private final PlayerMapper playerMapper;

  public PlayerRepository(PlayerMapper playerMapper) {
    this.playerMapper = playerMapper;
  }

  public void save(Player player) {
    playerMapper.insertPlayer(player);
  }

  public Player findById(Long playerId) {
    return playerMapper.getPlayerById(playerId);
  }

  public List<Player> findAll() {
    return playerMapper.getAllPlayers();
  }

  public void update(Player player) {
    playerMapper.updatePlayer(player);
  }

  public void delete(Long playerId) {
    playerMapper.deletePlayer(playerId);
  }
}
