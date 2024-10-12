package com.monstergrow.controller;

import com.monstergrow.model.Player;
import com.monstergrow.service.PlayerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/players")
public class PlayerController {

  private final PlayerService playerService;

  public PlayerController(PlayerService playerService) {
    this.playerService = playerService;
  }

  // プレイヤーの一覧を取得
  @GetMapping
  public ResponseEntity<List<Player>> getAllPlayers() {
    List<Player> players = playerService.getAllPlayers();
    return ResponseEntity.ok(players);
  }

  // 指定したプレイヤーの詳細情報を取得
  @GetMapping("/{playerId}")
  public ResponseEntity<Player> getPlayerById(@PathVariable Long playerId) {
    Player player = playerService.getPlayerById(playerId);
    return player != null ? ResponseEntity.ok(player) : ResponseEntity.notFound().build();
  }

  // 新しいプレイヤーを作成
  @PostMapping
  public ResponseEntity<Player> createPlayer(@RequestBody Player player) {
    Player createdPlayer = playerService.createPlayer(player);
    return ResponseEntity.status(HttpStatus.CREATED).body(createdPlayer);
  }

  // 指定したプレイヤーの情報を更新
  @PutMapping("/{playerId}")
  public ResponseEntity<Player> updatePlayer(@PathVariable Long playerId, @RequestBody Player player) {
    Player updatedPlayer = playerService.updatePlayer(playerId, player);
    return ResponseEntity.ok(updatedPlayer);
  }

  // 指定したプレイヤーを削除
  @DeleteMapping("/{playerId}")
  public ResponseEntity<Void> deletePlayer(@PathVariable Long playerId) {
    playerService.deletePlayer(playerId);
    return ResponseEntity.noContent().build();
  }
}
