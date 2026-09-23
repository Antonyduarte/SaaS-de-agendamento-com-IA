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
      PRIMARY KEY (`id`) USING BTREE,
      KEY `fk_agendamentos_cliente` (`user_id`),
      CONSTRAINT `fk_agendamentos_cliente` FOREIGN KEY (`user_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE
  ) ENGINE = InnoDB AUTO_INCREMENT = 47 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci