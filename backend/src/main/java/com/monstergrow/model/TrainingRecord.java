package com.monstergrow.model;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class TrainingRecord {
  private Long trainingId;
  private Long monsterId;
  private String trainingType;
  private String result;
  private String createdBy;
  private LocalDateTime createdAt;
  private String updatedBy;
  private LocalDateTime updatedAt;
}
