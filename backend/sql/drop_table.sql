BEGIN
    -- プレイヤーマスタテーブルの削除
    BEGIN
        EXECUTE IMMEDIATE 'DROP TABLE m_player';
    EXCEPTION
        WHEN OTHERS THEN
            NULL; -- テーブルが存在しない場合は無視
    END;

    -- モンスターマスタテーブルの削除
    BEGIN
        EXECUTE IMMEDIATE 'DROP TABLE m_monster';
    EXCEPTION
        WHEN OTHERS THEN
            NULL; -- テーブルが存在しない場合は無視
    END;

    -- モンスタータイプマスタテーブルの削除
    BEGIN
        EXECUTE IMMEDIATE 'DROP TABLE m_monster_type';
    EXCEPTION
        WHEN OTHERS THEN
            NULL; -- テーブルが存在しない場合は無視
    END;

    -- モンスター属性マスタテーブルの削除
    BEGIN
        EXECUTE IMMEDIATE 'DROP TABLE m_monster_attribute';
    EXCEPTION
        WHEN OTHERS THEN
            NULL; -- テーブルが存在しない場合は無視
    END;

    -- モンスター育成記録テーブルの削除
    BEGIN
        EXECUTE IMMEDIATE 'DROP TABLE t_monster_growth';
    EXCEPTION
        WHEN OTHERS THEN
            NULL; -- テーブルが存在しない場合は無視
    END;

    -- モンスターバトル記録テーブルの削除
    BEGIN
        EXECUTE IMMEDIATE 'DROP TABLE t_monster_battle';
    EXCEPTION
        WHEN OTHERS THEN
            NULL; -- テーブルが存在しない場合は無視
    END;

    -- 特訓記録テーブルの削除
    BEGIN
        EXECUTE IMMEDIATE 'DROP TABLE t_training_record';
    EXCEPTION
        WHEN OTHERS THEN
            NULL; -- テーブルが存在しない場合は無視
    END;
END;
