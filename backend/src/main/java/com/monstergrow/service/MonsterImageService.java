package com.monstergrow.service;

import com.monstergrow.model.MonsterImg;
import com.monstergrow.repository.MonsterImageRepository;
import org.springframework.stereotype.Service;

@Service
public class MonsterImageService {

  private final MonsterImageRepository monsterImageRepository;

  public MonsterImageService(MonsterImageRepository monsterImageRepository) {
    this.monsterImageRepository = monsterImageRepository;
  }

  public MonsterImg getMonsterImagesById(Long monsterImgId) {
    return monsterImageRepository.findById(monsterImgId);
  }

}
