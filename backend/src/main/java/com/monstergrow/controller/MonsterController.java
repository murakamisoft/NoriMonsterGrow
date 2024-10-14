package com.monstergrow.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import com.monstergrow.model.Monster;
import com.monstergrow.service.MonsterService;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/monsters")
public class MonsterController {

  @Autowired
  private MonsterService monsterService;

  // モンスターの一覧を取得する
  @GetMapping
  public List<Monster> getAllMonsters() {
    return monsterService.getAllMonsters();
  }

  // 指定したモンスターの詳細情報を取得する
  @GetMapping("/{monsterId}")
  public ResponseEntity<Monster> getMonsterById(@PathVariable Long monsterId) {
    Monster monster = monsterService.getMonsterById(monsterId);
    return ResponseEntity.ok(monster);
  }

  // 指定したプレイヤーのモンスター一覧の情報を取得する
  @GetMapping("/{playerId}/monsters")
  public ResponseEntity<List<Monster>> getMonstersByPlayerId(@PathVariable Long playerId) {
    List<Monster> monsters = monsterService.getMonsterByPlayerId(playerId);
    return ResponseEntity.ok(monsters);
  }

  // 新しいモンスターを作成する
  @PostMapping
  public ResponseEntity<Monster> createMonster(@RequestBody Monster monster) {
    Monster createdMonster = monsterService.createMonster(monster);
    return ResponseEntity.status(HttpStatus.CREATED).body(createdMonster);
  }

  // 指定したモンスターの情報を更新する
  @PutMapping("/{monsterId}")
  public ResponseEntity<Monster> updateMonster(@PathVariable Long monsterId, @RequestBody Monster monsterDetails) {
    monsterDetails.setUpdatedAt(LocalDateTime.now());
    Monster updatedMonster = monsterService.updateMonster(monsterId, monsterDetails);
    return ResponseEntity.ok(updatedMonster);
  }

  // 指定したモンスターを削除する
  @DeleteMapping("/{monsterId}")
  public ResponseEntity<Void> deleteMonster(@PathVariable Long monsterId) {
    monsterService.deleteMonster(monsterId);
    return ResponseEntity.noContent().build();
  }
}
