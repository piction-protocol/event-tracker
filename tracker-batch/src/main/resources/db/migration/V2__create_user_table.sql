CREATE TABLE `users`
(
    `id`         bigint(20)  NOT NULL AUTO_INCREMENT,
    `username`   varchar(15) NOT NULL,
    `password`   char(60)    NOT NULL,
    `updated_at` timestamp,
    `created_at` timestamp,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_username` (`username`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  ROW_FORMAT = DYNAMIC;

CREATE TABLE `authorities`
(
    `id`         bigint(20)   NOT NULL AUTO_INCREMENT,
    `name`       varchar(255) NOT NULL,
    `updated_at` timestamp,
    `created_at` timestamp,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  ROW_FORMAT = DYNAMIC;

CREATE TABLE `users_authorities`
(
    `user_id`      bigint(20) NOT NULL,
    `authority_id` bigint(20) NOT NULL,
    UNIQUE KEY `unique_user_authority` (`user_id`, `authority_id`),
    CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  ROW_FORMAT = DYNAMIC;

INSERT INTO users(`username`, `password`, `created_at`)
VALUES ('admin', '$2a$10$KJau0bbO8OIv8GfjYTHLUOFjcZnW8bWN9yqehNnO7XMaJxQqNcMOW', now());