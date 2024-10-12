package com.monstergrow.model;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class MonsterImg {
  private Long monsterImgId;
  private String imgFileName;
  private Integer pixelX;
  private Integer pixelY;
  private String createdBy;
  private LocalDateTime createdAt;
  private String updatedBy;
  private LocalDateTime updatedAt;
}
