package com.monstergrow.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

  @Override
  @SuppressWarnings("null")
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**") // すべてのエンドポイントにCORSを許可
        .allowedOrigins("http://localhost:3000") // フロントエンドのURLを指定
        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 許可するHTTPメソッド
        .allowedHeaders("*") // 許可するヘッダー
        .allowCredentials(true); // 認証情報を許可
  }
}
