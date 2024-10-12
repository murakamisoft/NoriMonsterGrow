package com.monstergrow.model;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class Player {
  private Long playerId;
  private String playerName;
  private Integer lv;
  private Integer experience;
  private String createdBy;
  private LocalDateTime createdAt;
  private String updatedBy;
  private LocalDateTime updatedAt;
}
