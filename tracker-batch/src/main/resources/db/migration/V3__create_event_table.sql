CREATE TABLE contracts
(
    `id`          BIGINT(20)  NOT NULL AUTO_INCREMENT,
    `name`        VARCHAR(66) NOT NULL,
    `address`     VARCHAR(42) NOT NULL,
    `description` TEXT,
    `user_id`     BIGINT(20)  NOT NULL,
    `updated_at`  TIMESTAMP,
    `created_at`  TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `user_id` (`user_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  ROW_FORMAT = DYNAMIC;

CREATE TABLE events
(
    `id`          BIGINT(20)  NOT NULL AUTO_INCREMENT,
    `name`        VARCHAR(66) NOT NULL,
    `description` TEXT,
    `contract_id` BIGINT(20)  NOT NULL,
    `signature`   VARCHAR(66) NOT NULL,
    `updated_at`  TIMESTAMP,
    `created_at`  TIMESTAMP,
    PRIMARY KEY (`id`),
    CONSTRAINT contract_id FOREIGN KEY (contract_id) REFERENCES contracts (id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  ROW_FORMAT = DYNAMIC;

CREATE TABLE event_params
(
    `id`         BIGINT(20)              NOT NULL AUTO_INCREMENT,
    `name`       VARCHAR(66)             NOT NULL,
    `type`       VARCHAR(66)             NOT NULL,
    `index`      TINYINT(1) DEFAULT TRUE NOT NULL,
    `decimal`    INT                     NOT NULL,
    `priority`   INT                     NOT NULL,
    `event_id`   BIGINT(20)              NOT NULL,
    `updated_at` TIMESTAMP,
    `created_at` TIMESTAMP,
    PRIMARY KEY (`id`),
    CONSTRAINT event_id FOREIGN KEY (event_id) REFERENCES events (id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  ROW_FORMAT = DYNAMIC;

CREATE TABLE event_logs
(
    `id`               BIGINT      NOT NULL AUTO_INCREMENT,
    `address`          VARCHAR(42) NOT NULL,
    `signature`        VARCHAR(66) NOT NULL,
    `transaction_hash` VARCHAR(66) NOT NULL,
    `topics`           TEXT        NOT NULL,
    `data`             TEXT        NOT NULL,
    `log_index`        BIGINT      NOT NULL,
    `block_time`       BIGINT      NOT NULL,
    `timestamp`        TIMESTAMP   NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique` (`transaction_hash`, `log_index`),
    KEY `index` (`address`, `signature`, `block_time`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  ROW_FORMAT = DYNAMIC;
