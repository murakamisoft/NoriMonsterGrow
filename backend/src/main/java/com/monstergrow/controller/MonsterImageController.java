package com.monstergrow.controller;

import com.monstergrow.model.MonsterImg;
import com.monstergrow.service.MonsterImageService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/monster-images")
public class MonsterImageController {

  private final MonsterImageService monsterImageService;

  public MonsterImageController(MonsterImageService monsterImageService) {
    this.monsterImageService = monsterImageService;
  }

  @GetMapping("/{monsterImgId}")
  public MonsterImg getMonsterImagesById(@PathVariable Long monsterImgId) {
    return monsterImageService.getMonsterImagesById(monsterImgId);
  }

}
