package com.monstergrow.mapper;

import com.monstergrow.model.TrainingRecord;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface TrainingRecordMapper {

  @Select("SELECT * FROM T_TRAINING_RECORD")
  List<TrainingRecord> getAllTrainingRecords();

  @Select("SELECT * FROM T_TRAINING_RECORD WHERE TRAINING_ID = #{trainingId}")
  TrainingRecord getTrainingRecordById(Long trainingId);

  @Insert("INSERT INTO T_TRAINING_RECORD (TRAINING_ID, MONSTER_ID, TRAINING_TYPE, RESULT, CREATED_BY, UPDATED_BY) " +
      "VALUES (#{trainingId}, #{monsterId}, #{trainingType}, #{result}, #{createdBy}, #{updatedBy})")
  void insertTrainingRecord(TrainingRecord trainingRecord);

  @Update("UPDATE T_TRAINING_RECORD SET MONSTER_ID = #{monsterId}, TRAINING_TYPE = #{trainingType}, " +
      "RESULT = #{result}, UPDATED_BY = #{updatedBy}, UPDATED_AT = CURRENT_TIMESTAMP WHERE TRAINING_ID = #{trainingId}")
  void updateTrainingRecord(TrainingRecord trainingRecord);

  @Delete("DELETE FROM T_TRAINING_RECORD WHERE TRAINING_ID = #{trainingId}")
  void deleteTrainingRecord(Long trainingId);
}
