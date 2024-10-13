package com.monstergrow.mapper;

import com.monstergrow.model.MonsterImg;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MonsterImgMapper {

  List<MonsterImg> getAllMonsterImages();

  MonsterImg getMonsterImageById(Long monsterImgId);

  void insertMonsterImage(MonsterImg monsterImg);

  void updateMonsterImage(MonsterImg monsterImg);

  void deleteMonsterImage(Long monsterImgId);
}
