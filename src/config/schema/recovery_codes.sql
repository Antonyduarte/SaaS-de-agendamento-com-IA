CREATE TABLE
    `recovery_codes` (
        `id` int unsigned NOT NULL AUTO_INCREMENT,
        `user_id` int unsigned NOT NULL,
        `code_hash` varchar(255) CHARACTER
        SET
            utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
            `expires_at` datetime NOT NULL,
            `used` tinyint (1) NOT NULL DEFAULT '0',
            `used_at` datetime DEFAULT NULL,
            `created_at` timestamp NOT NULL DEFAULT (now ()),
            PRIMARY KEY (`id`) USING BTREE,
            KEY `idx_user_id` (`user_id`) USING BTREE,
            KEY `idx_code_hash` (`code_hash`) USING BTREE,
            CONSTRAINT `recovery_codes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE
    ) ENGINE = InnoDB AUTO_INCREMENT = 44 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci