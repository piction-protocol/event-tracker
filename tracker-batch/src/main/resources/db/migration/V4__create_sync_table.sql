CREATE TABLE sync_blocks
(
    `number`          BIGINT(20) NOT NULL,
    `block_timestamp` timestamp,
    PRIMARY KEY (`number`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  ROW_FORMAT = DYNAMIC;
