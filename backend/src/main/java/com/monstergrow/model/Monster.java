package com.monstergrow.model;

import lombok.Data;
import java.time.LocalDateTime;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Monster {
  private Long monsterId;
  private Long playerId;
  private Long monsterTypeId;
  private Long monsterAttributeId;
  private Long monsterImgId;
  private String monsterName;
  private Integer lv;
  private String createdBy;
  private LocalDateTime createdAt;
  private String updatedBy;
  private LocalDateTime updatedAt;
}
