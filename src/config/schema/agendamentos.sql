CREATE TABLE
  `agendamentos` (
    `id` int unsigned NOT NULL AUTO_INCREMENT,
    `user_id` int unsigned NOT NULL,
    `compromisso` varchar(255) CHARACTER
    SET
      utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
      `data` date NOT NULL,
      `hora` time NOT NULL,
      `created_at` timestamp NOT NULL DEFAULT (now ()),
      `modified_at` timestamp NOT NULL DEFAULT (now ()) ON UPDATE CURRENT_TIMESTAMP,
      `status` enum (
        'PENDING',
        'CONFIRMED',
        'COMPLETED',
        'CANCELED',
        'EXPIRED'
      ) DEFAULT 'PENDING',
      PRIMARY KEY (`id`) USING BTREE
  ) ENGINE = InnoDB AUTO_INCREMENT = 46 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci