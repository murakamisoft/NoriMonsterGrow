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
  private String imgFileName;
  private Integer lv;
  private Integer experience;
  private Integer hp;
  private Integer mp;
  private Integer hpMax;
  private Integer mpMax;
  private Integer attackPower;
  private Integer defensePower;
  private Integer magicAttack;
  private Integer magicHealing;
  private Integer strength;
  private Integer defense;
  private Integer agility;
  private Integer dexterity;
  private String createdBy;
  private LocalDateTime createdAt;
  private String updatedBy;
  private LocalDateTime updatedAt;
}
