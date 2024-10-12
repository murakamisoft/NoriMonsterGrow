# NoriMonsterGrow

## 概要

### 基本コンセプト
- プレイヤーはモンスターを卵から育てて、育て方によって進化や能力が変わる。
- モンスター同士をバトルさせたり、ミニゲームで特訓させたりして、どんどん強くしたりカスタマイズできる。

### 主な機能
1. **モンスターの育成**
   - モンスターは卵から孵り、プレイヤーの行動や選択によって成長します。
   
2. **カスタマイズ要素**
   - モンスターの外見や色、装備をカスタマイズできる機能。

3. **バトルモード**
   - 育てたモンスター同士を友達や家族と対戦させることができるバトルモード。

4. **特訓ミニゲーム**
   - 反射神経やタイミングを鍛えるミニゲームで、モンスターの特定のステータスを強化できる。

5. **成長の記録**
   - モンスターの成長や進化の過程を「アルバム」や「図鑑」として記録し、確認できる機能。

6. **日替わりイベント**
   - 毎日違ったクエストやチャレンジが登場。
  
## ディレクトリ構成

```
NoriMonsterGrow/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/
│   │   │   │       └── monstergrow/
│   │   │   │           ├── controller/
│   │   │   │           ├── service/
│   │   │   │           ├── repository/
│   │   │   │           ├── model/
│   │   │   │           ├── config/
│   │   │   │           └── listener/
│   │   │   └── resources/
│   │   │       ├── application.yml
│   │   │       └── static/
│   │   └── test/
│   │       └── java/
│   │           └── com/
│   │               └── monstergrow/
│   │                   ├── controller/
│   │                   ├── service/
│   │                   └── repository/
│   └── build.gradle
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   └── setupTests.js
│   └── package.json
└── README.md
```

## ソフトウェア構成

| ID  | ソフトウェア             | バージョン | カテゴリ          | 説明                                                                      |
| --- | ------------------------ | ---------- | ----------------- | ------------------------------------------------------------------------- |
| 1   | **Java Development Kit** | 17         | 開発環境          | Javaアプリケーションを開発するためのツールセット。                        |
| 2   | **Spring Boot**          | 3.2.x      | フレームワーク    | Javaでのアプリケーション開発を簡素化するためのフレームワーク。            |
| 3   | **MyBatis**              | 3.5.7      | ORM               | Javaオブジェクトとデータベースのマッピングをサポートするツール。          |
| 4   | **Gradle**               | 8.2        | ビルドツール      | プロジェクトのビルドや依存関係管理を自動化するためのツール。              |
| 5   | **Oracle Database**      | 21c        | データベース      | 大規模データ処理に適したリレーショナルデータベース管理システム。          |
| 6   | **Lombok**               | 1.18.28    | ツール            | Javaコードのボイラープレートを削減するためのライブラリ。                  |
| 7   | **Apache Commons Lang**  | 3.12.0     | ユーティリティ    | Javaの基本機能を拡張するためのユーティリティライブラリ。                  |
| 8   | **JUnit**                | 5.x        | テスト            | Javaアプリケーションの単体テストを実施するためのフレームワーク。          |
| 9   | **Mockito**              | 5.x        | テスト            | モックオブジェクトを使ってテストを行うためのフレームワーク。              |
| 10  | **React**                | 18.x       | フロントエンド    | ユーザーインターフェースを構築するためのJavaScriptライブラリ。            |
| 11  | **Bootstrap**            | 5.x        | CSSフレームワーク | モバイルファーストなレスポンシブデザインをサポートするCSSフレームワーク。 |




### 技術面
- フロントエンドはReactを使用し、モンスターやバトルシーンは簡単なアニメーションを追加。
- バックエンドはSpring Boot、Oracleを使って、データ管理や記録を保存。

