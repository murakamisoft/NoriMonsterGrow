package com.monstergrow.model;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class MonsterBattle {
  private Long monsterBattleId;
  private String result;
  private String createdBy;
  private LocalDateTime createdAt;
  private String updatedBy;
  private LocalDateTime updatedAt;
}
