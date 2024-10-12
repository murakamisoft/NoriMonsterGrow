package com.monstergrow.service;

import com.monstergrow.model.Player;
import com.monstergrow.repository.PlayerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerService {

  private final PlayerRepository playerRepository;

  public PlayerService(PlayerRepository playerRepository) {
    this.playerRepository = playerRepository;
  }

  public List<Player> getAllPlayers() {
    return playerRepository.findAll();
  }

  public Player getPlayerById(Long playerId) {
    return playerRepository.findById(playerId);
  }

  public Player createPlayer(Player player) {
    playerRepository.save(player);
    return player;
  }

  public Player updatePlayer(Long playerId, Player player) {
    player.setPlayerId(playerId);
    playerRepository.update(player);
    return player;
  }

  public void deletePlayer(Long playerId) {
    playerRepository.delete(playerId);
  }
}
